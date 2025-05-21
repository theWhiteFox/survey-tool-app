import type { Question } from '../lib/schemas'

interface QuestionFieldProps {
  question: Question
}

export default function QuestionField({ question }: QuestionFieldProps) {
  return (
    <div className="mb-4">
      <p className="font-medium text-gray-900 mb-4">{question.question}</p>
      {question.type === 'single_choice' && (
        question.options?.map((option: string) => (
          <label key={`${question.id}-${option}`} className="block text-gray-700 mb-2">
            <input type="radio" name={question.id}
              value={option}
              className="mr-2" />
            {option}
          </label>
        ))
      )}
      {question.type === 'multiple_choice' && (
        question.options?.map((option: string) => (
          <label key={`${question.id}-${option}`} className="block mb-2">
            <input type="checkbox" name={question.id} value={option}
              className="mr-2" />
            {option}
          </label>
        ))
      )}
    </div>
  )
}
