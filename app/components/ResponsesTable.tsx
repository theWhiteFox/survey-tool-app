'use client'

import Link from 'next/link'
import { QuestionResponse } from '@/app/lib/schemas'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { useSearchParams } from 'next/navigation'

interface ResponsesTableProps {
    questionResponse: QuestionResponse
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF0000', '#00BFFF']

const processChartData = (percentages: { [key: string]: number }, optionTotals: { [key: string]: number }, threshold = 5) => {
    const sortedOptions = Object.entries(percentages).sort(([, a], [, b]) => b - a)
    const mainOptions: { name: string; value: number; totalVotes: number }[] = []
    let otherPercentage = 0
    let otherVotes = 0

    sortedOptions.forEach(([option, percentage]) => {
        if (percentage > 0) {
            if (percentage >= threshold) {
                mainOptions.push({
                    name: option || "(No Answer)",
                    value: percentage,
                    totalVotes: optionTotals[option] || 0
                })
            } else {
                otherPercentage += percentage
                otherVotes += optionTotals[option] || 0
            }
        }
    })
    if (otherPercentage > 0) {
        mainOptions.push({
            name: "Other",
            value: parseFloat(otherPercentage.toFixed(2)),
            totalVotes: otherVotes
        })
    }

    return mainOptions
}

export default function ResponsesTable({ questionResponse }: ResponsesTableProps) {
    const searchParams = useSearchParams()
    const surveyTitle = searchParams.get('surveyTitle')


    if (!questionResponse || !questionResponse.question_id) {
        return (
            <div className="py-4 text-center">
                <p>No results found for this question.</p>
            </div>
        )
    }

    const chartDataForDisplay = processChartData(questionResponse.percentages, questionResponse.option_totals, 5)

    return (
        <div>
            <div className="mb-4 mt-4">
                <Link href="/surveys" className="text-blue-500 hover:underline">
                    Back to Surveys
                </Link>
            </div>
            <div className="inline-block align-middle">
                <div className="rounded-lg bg-gray-50 p-2 outline-1 md:pt-0">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 pt-4">
                        Results for:{' '}
                        {surveyTitle && (
                            <>
                                {surveyTitle} - {' '}
                            </>
                        )}
                        {questionResponse.question_id.replace('q', 'Question ').replace('_', ' - ')}
                    </h3>
                    <p className="text-gray-700 mb-6">Total Votes: {questionResponse.total_votes}</p>

                    {chartDataForDisplay.length > 0 ? (
                        <div className="h-140 w-full min-w-[320px] md:min-w-[500px] lg:min-w-[600px] rounded-md bg-white p-4 shadow">                            <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartDataForDisplay}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={140}
                                    labelLine={false}
                                    label={({ percent }) => {
                                        const displayPercent = Math.floor(percent * 100)
                                        return `${displayPercent}%`
                                    }}
                                >
                                    {chartDataForDisplay.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, _, props) => [`${value}%`, props.payload.name, `(${props.payload.totalVotes} votes)`]} />
                                <Legend align="center" />
                            </PieChart>
                        </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 mb-8">No data to display in chart.</p>
                    )}
                    <table className="min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-3 font-medium sm:pl-6">
                                    💡 Option
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    📝 Votes
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    📊 Percentage
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {Object.entries(questionResponse.percentages).map(([option, percentage]) => (
                                <tr
                                    key={option}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="py-3 pr-3 pl-6">
                                        <div className="flex items-center gap-3">
                                            {option || "(No Answer)"}
                                        </div>
                                    </td>
                                    <td className="px-3 py-3">
                                        {questionResponse.option_totals[option]}
                                    </td>
                                    <td className="px-3 py-3">
                                        {percentage}%
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