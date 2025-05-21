export type Survey = {
    id: number
    title: string
    description: string
    questions: Question[]
}

export type SurveyResponse = {
    surveys: Survey[]
}

export type Question = {
    id: string
    type: 'single_choice' | 'multiple_choice' | 'text' | 'number'
    question: string
    options?: string[]
}

export type QuestionResult = {
    question_id: string
    total_votes: number
    option_totals: { [key: string]: number }
    percentages: { [key: string]: number }
}

export type SurveyResultsData = {
    questions: QuestionResult[]
}