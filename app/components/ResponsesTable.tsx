'use client'

import Link from 'next/link'
import { QuestionResult } from '../lib/definitions'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface ResponsesTableProps {
    questionResult: QuestionResult
}


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF0000', '#00BFFF']

export default function ResponsesTable({ questionResult }: ResponsesTableProps) {
    if (!questionResult || !questionResult.question_id) {
        return (
            <div className="py-4 text-center">
                <p>No results found for this question.</p>
            </div>
        )
    }

    const chartData = Object.entries(questionResult.percentages).map(([option, percentage]) => ({
        name: option || "(No Answer)",
        value: percentage,
        totalVotes: questionResult.option_totals[option]
    }))

    const filteredChartData = chartData.filter(item => item.value > 0)

    return (
        <>
            <Link href="/surveys" className="text-blue-500 hover:underline mb-4 block">
                Back to Surveys
            </Link>
            <div className="mt-6">
                <div className="inline-block align-middle">
                    <div className="rounded-lg bg-gray-50 p-2 outline-1 md:pt-0">
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 pt-4">
                            Results for: Question ID {questionResult.question_id}
                        </h3>
                        <p className="text-gray-700 mb-6">Total Votes: {questionResult.total_votes}</p>

                        {filteredChartData.length > 0 ? (
                            <div className="mb-8 h-80 w-full min-w-[340px] md:min-w-[480px] lg:min-w-[700px] rounded-md bg-white p-4 shadow">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={filteredChartData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {filteredChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value, name, props) => [`${value}%`, props.payload.name, `(${props.payload.totalVotes} votes)`]} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <p className="text-center text-gray-600 mb-8">No data to display in chart.</p>
                        )}
                        <div className="md:hidden">
                            <div className="mb-2 w-full rounded-md bg-white p-4">
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="mb-2 flex items-center text-gray-500">
                                            🔗 Question ID: {questionResult.question_id}
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            📝 Total Votes: {questionResult.total_votes}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            📊 **Detailed Results:**
                                            {Object.entries(questionResult.percentages).map(([option, percentage]) => (
                                                <span key={option} className="block ml-4">
                                                    {option || "(No Answer)"}: {percentage}% ({questionResult.option_totals[option]} votes)
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className="hidden min-w-full text-gray-900 md:table">
                            <thead className="rounded-lg text-left text-sm font-normal">
                                <tr>
                                    <th scope="col" className="px-4 py-3 font-medium sm:pl-6">
                                        🔗 Option
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
                                {Object.entries(questionResult.percentages).map(([option, percentage]) => (
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
                                            {questionResult.option_totals[option]}
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
        </>
    )
}