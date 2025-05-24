import type { Question, Survey } from '@/app/lib/schemas'
import SurveyForm from '@/app/components/SurveyForm'
import { fetchSurveyById } from '@/app/lib/data'
import { notFound } from 'next/navigation'

interface SurveyDetailPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function Survey({ params }: SurveyDetailPageProps) {
    const resolvedParams = await params
    const id = Number(resolvedParams.id)
    const survey: Survey | null = await fetchSurveyById(id)

    if (!survey) {
        notFound()
    }

    const formattedQuestions: Question[] = survey.questions.map(q => ({
        id: q.id,
        type: q.type as Question['type'],
        question: q.question,
        options: q.options,
    }))

    return (
        <div className="grid place-items-center mt-6">
            <div className="">
                <SurveyForm survey={{
                    id: survey.id,
                    title: survey.title,
                    description: survey.description,
                    questions: formattedQuestions
                }} />
            </div>
        </div>
    )
}