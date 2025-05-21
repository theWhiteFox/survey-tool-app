import { QuestionResult, Survey } from './definitions'
import { surveysResponse } from './mock-data/surveys'
import { response as mockQuestionResult } from './mock-data/response-q1'

// const BASE_URL = 'https://interview.staging.derilinx.com'
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
        return data
    } catch (error) {
        logFetchError(url, error)
        console.warn(`Falling back to mock data for ${url}`)
        return surveysResponse.surveys
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
        return data
    } catch (error) {
        logFetchError(url, error)
        console.warn(`Falling back to mock data for ${url}`)
        return surveysResponse.surveys.find(s => s.id === surveyId) || null
    }
}

export async function fetchSurveyResponses(surveyId: number, questionId: string): Promise<QuestionResult> {
    const url = `${BASE_URL}/surveys/${surveyId}/responses?question_id=${questionId}`
    console.log("DEBUG: Constructed URL for fetch:", url)
    try {
        const response = await fetch(url, getAuthHeaders('GET'))
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText || response.statusText}`)
        }
        const data = await response.json()
        console.log("DEBUG: API Response Data:", data)
        return data
    } catch (error) {
        logFetchError(url, error)
        console.warn(`Falling back to mock data for ${url}`)
        return mockQuestionResult
    }
}

export async function postSurveyResponse(
    surveyId: number,
    responses: Array<{ question_id: string; selected_option: string | string[] }>
): Promise<{ status: string; id: number } | null> {
    const url = `${BASE_URL}/surveys/${surveyId}/responses`

    const requestBody = {
        responses: responses
    }

    try {
        const response = await fetch(url, getAuthHeaders('POST', requestBody))
        if (!response.ok) {
            const errorText = await response.text()
            console.error(`HTTP error! status: ${response.status}, message: ${errorText || response.statusText}`)
            throw new Error(`Failed to post survey response: ${errorText || response.statusText}`)
        }

        const data: { status: string; id: number } = await response.json()
        console.log(`Successfully posted response for Survey ID: ${surveyId}, Response ID: ${data.id}`)
        return data
    } catch (error) {
        logFetchError(url, error)
        console.error("Failed to post survey response due to an error.", error)
        return null
    }
}