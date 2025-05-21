'use client'

import QuestionField from './QuestionField'
import type { PostResponseItem, Survey } from '../lib/schemas'
import Link from 'next/link'
import { FormEvent } from 'react'
import { postSurveyResponse } from '../lib/data'
import toast, { Toaster } from 'react-hot-toast'
interface Props {
  survey: Survey
}

export default function SurveyForm({ survey }: Props) {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const form = e.currentTarget as HTMLFormElement
    const formDataEntries = new FormData(form).entries()
    const rawData: { [key: string]: string | string[] } = {}
    const transformedResponses: PostResponseItem[] = []

    for (const [key, value] of formDataEntries) {
      if (rawData[key]) {
        if (Array.isArray(rawData[key])) {
          (rawData[key] as string[]).push(value as string)
        } else {
          rawData[key] = [rawData[key] as string, value as string]
        }
      } else {
        rawData[key] = value as string
      }
    }

    survey.questions.forEach(question => {
      const rawAnswer = rawData[question.id]

      if (rawAnswer !== undefined && rawAnswer !== '') {
        let selectedOptionForApi: string | number | (string | number)[]

        if (question.type === 'multiple_choice' && Array.isArray(rawAnswer)) {
          selectedOptionForApi = rawAnswer.join(',')
        } else if (question.type === 'number' && typeof rawAnswer === 'string' && !isNaN(Number(rawAnswer))) {
          selectedOptionForApi = Number(rawAnswer)
        } else {
          selectedOptionForApi = rawAnswer as string
        }

        transformedResponses.push({
          question_id: question.id,
          selected_option: selectedOptionForApi
        })
      }
    })

    if (transformedResponses.length === 0) {
      toast.error('Please select at least one question')
      return
    }

    const loadingToastId = toast.loading('Submitting your survey...')

    try {
      const result = await postSurveyResponse(survey.id, transformedResponses)

      if (result && (result.status === 'saved' || result.status === 'success_local_fallback')) {
        toast.success('Survey Submitted Successfully!', { id: loadingToastId })
        form.reset()
      } else {
        toast.error('Failed to submit survey. Please try again.', { id: loadingToastId })
      }
    } catch (error: unknown) {
      console.error("Error during survey submission:", error)
    }
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="p-2">

        <Link href="/surveys" className="text-blue-500 hover:underline mb-4 block">
          Back to Surveys
        </Link>
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">{survey.title}</h2>
          {survey.description && (
            <p className="text-gray-700 mb-4">{survey.description}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
            {survey.questions.map(q => (
              <QuestionField key={q.id} question={q} />
            ))}
            <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
              Submit Survey
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
