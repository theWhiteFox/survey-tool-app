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
import { response as mockQuestionResult } from './mock-data/response-q1'

const APP_ORIGIN = process.env.NEXT_PUBLIC_APP_BASE_URL || process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'
const BASE_URL = `${APP_ORIGIN}/api`
const API_TOKEN = 'uNjuRUsFONzKnjOk'

function logFetchError(url: string, error: unknown) {
    console.log(`Error fetching from ${url}`, error)
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
        logFetchError(url, error)
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
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText || response.statusText}`)
        }
        const data = await response.json()
        const validatedData = SurveySchema.parse(data)
        return validatedData
    } catch (error) {
        logFetchError(url, error)
        console.warn(`Falling back to mock data for ${url}`)
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

export async function fetchSurveyResponses(surveyId: number, questionId: string): Promise<QuestionResponse> {
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
        logFetchError(url, error)
        try {
            return QuestionResponseSchema.parse(mockQuestionResult)
        } catch (mockError) {
            throw mockError
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
        throw new Error("Invalid survey response data provided")
    }

    const validRequestBody = validationResponse.data

    try {
        const response = await fetch(url, getAuthHeaders('POST', validRequestBody))
        if (!response.ok) {
            const errorText = await response.text()
            console.error(`HTTP error! status: ${response.status}, message: ${errorText || response.statusText}`)
            throw new Error(`Failed to post survey response: ${errorText || response.statusText}`)
        }

        const data: { status: string; id: number } = await response.json()
        const postResponseSchema = z.object({ status: z.string(), id: z.number() })
        const validatedPostResponse = postResponseSchema.parse(data)
        return validatedPostResponse

    } catch (error) {
        logFetchError(url, error)
        console.error("Failed to post survey response due to an error.", error)
        return null
    }
}