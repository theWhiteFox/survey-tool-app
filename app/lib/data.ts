import { z } from 'zod'
import {
    Survey,
    QuestionResponse,
    SurveySchema,
    QuestionResponseSchema,
    PostResponseItem,
    PostResponsesBodySchema,
    PostSurveySuccessResponse
} from './schemas'
import { surveysResponse } from './mock-data/surveys'
import { ALL_MOCK_QUESTIONS_RESPONSES } from './mock-data/question-responses'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const API_TOKEN = process.env.API_TOKEN

interface StoredSurveySubmission {
    timestamp: number
    surveyId: number
    responses: Array<PostResponseItem>
}

function logFetchError(error: unknown) {
    console.log(`Error fetching from`, error)
}

function getAuthHeaders(method: string = 'GET', body?: object) {
    const headers: HeadersInit = {
        'Authorization': `${API_TOKEN}`,
        'Content-Type': 'application/json'
    }

    const options: RequestInit = {
        method,
        headers,
        cache: 'no-store'
    }

    if (body) {
        options.body = JSON.stringify(body)
    }

    return options
}

function getStoredSurveySubmission(): StoredSurveySubmission[] {
    try {
        const stored = localStorage.getItem('localSurveySubmissions')
        return stored ? JSON.parse(stored) : []
    } catch (e) {
        console.log('error: ', e)
        return []
    }
}

function saveSurveySubmissionToLocalStorage(submission: StoredSurveySubmission) {
    try {
        const existing = getStoredSurveySubmission()
        existing.push(submission)
        localStorage.setItem('localSurveySubmissions', JSON.stringify(existing))
        console.log(`Survey submission for surveyId ${submission.surveyId} saved to localStorage`)
    } catch (e) {
        console.log('Function not implemented.', e)
    }
}

export async function fetchAllSurveys(): Promise<Survey[]> {
    const url = `${BASE_URL}/surveys?offset=0&limit=300`

    try {
        const response = await fetch(url, getAuthHeaders('GET'))
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText || response.statusText}`)
        }
        const data = await response.json()
        const validatedData = z.array(SurveySchema).parse(data)
        return validatedData
    } catch (error) {
        logFetchError(error)
        console.warn(`Falling back to mock data for ${url}`)
        try {
            return z.array(SurveySchema).parse(surveysResponse.surveys)
        } catch (mockError) {
            console.log("Mock data it failed Zod validation!", mockError)
            return []
        }
    }
}

export async function fetchSurveyById(surveyId: number): Promise<Survey | null> {
    const url = `${BASE_URL}/surveys/${surveyId}`
    try {
        const response = await fetch(url, getAuthHeaders('GET'))
        if (!response.ok) {
            const errorText = await response.text()
            console.log(`HTTP error! status: ${response.status}, message: ${errorText || response.statusText}`)
            console.warn(`HTTP fetch for surveyId ${surveyId} failed.`)
            try {
                const mockSurvey = surveysResponse.surveys.find((survey: {
                    id: number
                }) => survey.id === surveyId) || null
                if (mockSurvey) {
                    return SurveySchema.parse(mockSurvey)
                }
            } catch (mockError) {
                console.log("Mock survey", mockError)
            }

        }
        const data = await response.json()
        const validatedData = SurveySchema.parse(data)
        return validatedData
    } catch (error) {
        logFetchError(error)
        console.warn(`Falling back to mock data`)
        try {
            const mockSurvey = surveysResponse.surveys.find((survey: { id: number }) => survey.id === surveyId) || null
            if (mockSurvey) {
                return SurveySchema.parse(mockSurvey)
            }
            return null
        } catch (mockError) {
            console.error("mock survey data itself failed Zod validation!", mockError)
            return null
        }
    }
}

export async function fetchSurveyResponses(surveyId: number, questionId: string): Promise<QuestionResponse | null> {
    const url = `${BASE_URL}/surveys/${surveyId}/responses?question_id=${questionId}`

    try {
        const response = await fetch(url, getAuthHeaders('GET'))

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText || response.statusText}`)
        }
        const data = await response.json()
        const validatedData = QuestionResponseSchema.parse(data)

        return validatedData

    } catch (error) {
        logFetchError(error)

        const fallbackResponses = ALL_MOCK_QUESTIONS_RESPONSES.find(
            mock => mock.survey_id === surveyId && mock.question_id === questionId
        )

        console.warn(`Falling back to mock data for ${url}`)
        try {
            return QuestionResponseSchema.parse(fallbackResponses)
        } catch (mockError) {
            console.log("Mock data it failed Zod validation!", mockError)
            return null
        }
    }
}

export async function postSurveyResponse(
    surveyId: number,
    responses: Array<PostResponseItem>
): Promise<PostSurveySuccessResponse | null> {
    const url = `${BASE_URL}/surveys/${surveyId}/responses`

    const requestBody = {
        responses: responses
    }

    const validationResponse = PostResponsesBodySchema.safeParse(requestBody)

    if (!validationResponse.success) {
        console.error("Invalid survey response data provided:", validationResponse.error.errors)
        throw new Error("Invalid survey response data provided")
    }

    const validRequestBody = validationResponse.data

    try {
        const response = await fetch(url, getAuthHeaders('POST', validRequestBody))

        if (!response.ok) {
            const errorText = await response.text()

            if (response.status === 403 && errorText.includes("Invalid token")) {
                console.warn(`API fetch for surveyId ${surveyId}, failed with 403 (Invalid token). Attempting Local Storage fallback.`)
            } else {
                console.error(`HTTP error! status: ${response.status}, message: ${errorText || response.statusText}`)
            }

            const newSubmission: StoredSurveySubmission = {
                timestamp: Date.now(),
                surveyId: surveyId,
                responses: responses,
            }

            saveSurveySubmissionToLocalStorage(newSubmission)
            return { status: "success_local_fallback", id: Date.now() }
        }

        const data: { status: string; id: number } = await response.json()
        const postResponseSchema = z.object({ status: z.string().optional(), id: z.number().optional() })
        const validatedPostResponse = postResponseSchema.parse(data)
        return validatedPostResponse

    } catch (error) {
        logFetchError(error)
        console.error("Failed to post survey response due to an error.", error)

        console.warn("Network error during API post. Saving survey response")
        try {
            const newSubmission: StoredSurveySubmission = {
                timestamp: Date.now(),
                surveyId: surveyId,
                responses: responses
            }
            saveSurveySubmissionToLocalStorage(newSubmission)
            return { status: "success_local_fallback", id: Date.now() }
        } catch (lsError) {
            console.error("Failed to save to Local Storage", lsError)
            return null
        }
    }
}
