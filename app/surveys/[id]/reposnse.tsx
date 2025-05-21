import type { QuestionResult } from '../../lib/definitions'
import { fetchSurveyResponses } from '@/app/lib/data'
import ResponsesTable from '@/app/components/ResponsesTable'

interface Props {
    params: {
        id: number
        question: string
    }
}

export default async function QuestionResult({ params }: Props) {
    const resolvedParams = await params
    const id = resolvedParams.id
    const question = resolvedParams.question
    const allQ = await fetchSurveyResponses(id, question)

    if (!allQ) return <p>Survey not found!</p>

    return (
        <ResponsesTable questionResult={{
            question_id: allQ.question_id,
            total_votes: allQ.total_votes,
            option_totals: allQ.option_totals,
            percentages: allQ.percentages
        }} />
    )
}