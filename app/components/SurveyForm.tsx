'use client'

import QuestionField from './QuestionField'
import type { Survey } from '../lib/definitions'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { postSurveyResponse } from '../lib/data'

interface Props {
  survey: Survey
}

export default function SurveyForm({ survey }: Props) {
  const [formData, setFormData] = useState<{ [key: string]: string | string[] }>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const form = e.currentTarget as HTMLFormElement
    const formDataEntries = new FormData(form).entries()
    const rawData: { [key: string]: string | string[] } = {}
    const transformedResponses: Array<{ question_id: string; selected_option: string | string[] }> = []

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
      if (rawData[question.id] !== undefined && rawData[question.id] !== '') {
        transformedResponses.push({
          question_id: question.id,
          selected_option: rawData[question.id]
        })
      }
    })
    try {
      const result = await postSurveyResponse(survey.id, transformedResponses)

      if (result && result.status === 'saved') {
        setSubmitted(true)
        setFormData({})
        form.reset()
      } else {
        console.log('Failed to submit survey. Please try again.')
      }
    } catch (error: unknown) {
      console.error("Error during survey submission:", error)
    }
  }

  return (
    <div className="p-4">
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
        {submitted && (
          <div className="mt-6 p-4 border rounded bg-green-100 text-green-800">
            <h3 className="font-semibold text-lg mb-2">Survey Submitted!</h3>
            <p>Here is the data:</p>
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
