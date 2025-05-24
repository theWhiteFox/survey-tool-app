import { z } from 'zod'

export const QuestionSchema = z.object({
    id: z.string(),
    type: z.union([z.literal('single_choice'), z.literal('multiple_choice'), z.literal('text'), z.literal('number')]),
    question: z.string(),
    options: z.array(z.string()).optional()
})

export const SurveySchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    questions: z.array(QuestionSchema)
})

export const SurveyResponseSchema = z.object({
    surveys: z.array(SurveySchema)
})

export const QuestionResponseSchema = z.object({
    question_id: z.string(),
    total_votes: z.number(),
    option_totals: z.record(z.string(), z.number()),
    percentages: z.record(z.string(), z.number())
})

export const PostResponseItemSchema = z.object({
    question_id: z.string(),
    selected_option: z.union([z.string(), z.array(z.string()), z.number()])
})

export const PostResponsesBodySchema = z.object({
    responses: z.array(PostResponseItemSchema)
})

export const PostSurveySuccessResponseSchema = z.object({
    status: z.string(),
    id: z.number()
})

export type Question = z.infer<typeof QuestionSchema>
export type Survey = z.infer<typeof SurveySchema>
export type SurveyResponse = z.infer<typeof SurveyResponseSchema>
export type QuestionResponse = z.infer<typeof QuestionResponseSchema>
export type PostResponseItem = z.infer<typeof PostResponseItemSchema>
export type PostSurveyResponsesBody = z.infer<typeof PostResponsesBodySchema>
export type PostSurveySuccessResponse = z.infer<typeof PostSurveySuccessResponseSchema>