import Link from 'next/link'
import { Survey } from '../lib/schemas'
import { fetchAllSurveys } from '../lib/data'

export default async function SurveysTable() {
    let surveys: Survey[] = []

    try {
        surveys = await fetchAllSurveys()
    } catch (error) {
        console.error("Failed to load surveys:", error)
        return (
            <div className="py-4 text-center text-red-500">
                <p>Unexpected error loading surveys. Please try again later.</p>
            </div>
        )
    }

    if (!surveys || surveys.length === 0) {
        return (
            <div className="py-4 text-center">
                <p>No surveys found</p>
            </div>
        )
    }

    return (
        <div className="mt-6 flow-root">
            <Link href="/" className="text-blue-500 hover:underline mb-4 block">
                Home
            </Link>
            <div className="inline-block min-w-full align-middle w-full">
                <div className="rounded-lg bg-gray-50 p-2 outline-1 md:pt-0">
                    <div className="md:hidden">
                        {surveys.map((survey) => (
                            <div
                                key={survey.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center text-blue-500">
                                            🔗 {' '}
                                            <Link
                                                href={`/surveys/${survey.id}`}
                                                rel="noopener noreferrer"
                                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                                aria-label={`View survey: ${survey.title}`}
                                            >
                                                {survey.title}
                                            </Link>
                                        </div>
                                        <div className="mb-2 flex items-center">
                                            <ul className="list-inside">
                                                {survey.questions && survey.questions.map((question, index) => (
                                                    <li key={question.id}>
                                                        <Link
                                                            href={`/surveys/${survey.id}/responses/${question.id}?surveyTitle=${encodeURIComponent(survey.title)}`}
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 hover:underline"
                                                            aria-label={`View results for question: ${question.id} in survey ${survey.id}`}
                                                        >
                                                            📊 {`Question ${index + 1}`}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <p className="truncate max-w-[200px] text-sm text-gray-500">
                                            📝 {survey.description}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            💡 {Array.isArray(survey.questions) ? survey.questions.length : 0} questions
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-500 sm:pl-6"
                                >
                                    Survey Title
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-500"
                                >
                                    Description
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-500"
                                >
                                    Total Questions
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3 text-center text-sm font-semibold uppercase tracking-wider text-gray-500"
                                >
                                    View Questions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {surveys.map((survey) => (
                                <tr
                                    key={survey.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="py-3 pr-3 pl-6">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={`/surveys/${survey.id}`}
                                                className="text-blue-500 hover:underline block"
                                                aria-label={`View survey: ${survey.title}`}
                                            >
                                                {survey.title}
                                            </Link>
                                        </div>
                                    </td>
                                    <td className="">
                                        {survey.description}
                                    </td>
                                    <td className="px-3 py-3 text-center">
                                        {survey.questions.length}
                                    </td>
                                    <td className="px-3 py-3 flex items-center justify-center">
                                        <ul className="flex flex-col gap-2 list-none p-0">
                                            {survey.questions && survey.questions.map((question, index) => (
                                                <li className="" key={question.id}>
                                                    <Link
                                                        href={`/surveys/${survey.id}/responses/${question.id}?surveyTitle=${encodeURIComponent(survey.title)}`}
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 hover:underline"
                                                        aria-label={`View results for question: ${question.id} in survey ${survey.id}`}
                                                    >
                                                        <span className="text-xs mr-1">📊</span> {`Question ${index + 1}`}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}