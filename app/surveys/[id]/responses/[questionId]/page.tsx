import type { QuestionResult } from '../../../../lib/definitions'
import { fetchSurveyResponses } from '@/app/lib/data'
import ResultsTable from '@/app/components/ResponsesTable'

interface Props {
    params: Promise<{
        id: string
        questionId: string
    }>
}

export default async function QuestionResultPage({ params }: Props) {
    const resolvedParams = await params
    const id = Number(resolvedParams.id)
    const questionId = resolvedParams.questionId
    let questionResultData: QuestionResult | null = null

    questionResultData = await fetchSurveyResponses(id, questionId)

    return (
        <div className="grid place-items-center mt-6">
            <ResultsTable questionResult={questionResultData!} />
        </div>
    )
}