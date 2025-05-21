import { z, ZodTypeAny } from 'zod'
import { Question } from './definitions'

export const generateSurveyFormSchema = (questions: Question[]) => {
  const schemaShape: Record<string, ZodTypeAny> = {}

  questions.forEach(question => {
    let fieldSchema: ZodTypeAny

    switch (question.type) {
      case 'text':
        fieldSchema = z.string().min(1, { message: `${question.question} cannot be empty.` })
        break

      case 'number':
        fieldSchema = z.coerce.number()
          .refine(val => !isNaN(val), { message: `${question.question} must be a valid number.` })
        break

      case 'single_choice':
        fieldSchema = z.string()
          .min(1, { message: `Please select an option for "${question.question}".` })
          .refine(val => question.options?.includes(val) ?? true, {
            message: `Invalid option selected for "${question.question}".`,
          })
        break

      case 'multiple_choice':
        fieldSchema = z.array(z.string())
          .min(1, { message: `Please select at least one option for "${question.question}".` })
          .refine(selectedOptions =>
            selectedOptions.every(option => question.options?.includes(option) ?? true),
            { message: `One or more selected options for "${question.question}" are invalid.` }
          )
        break

      default:
        fieldSchema = z.any().refine(val => val !== undefined && val !== null && val !== '', {
          message: `Please provide a response for "${question.question}".`,
        })
        break
    }

    schemaShape[question.id] = fieldSchema
  })

  return z.object(schemaShape)
}