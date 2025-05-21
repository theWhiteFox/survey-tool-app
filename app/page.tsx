import Link from "next/link"

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Problem Statement: Lightweight Survey Tool</h1>
        <p>We want to evaluate your ability to build an elegant, maintainable, and user-friendly frontend that interacts with a real API.</p>
        <p>The goal is to implement a lightweight survey tool that allows users to browse surveys, take one, and view results with thoughtful UX and best practices.</p>
        <p className="note"><strong>Important Note:</strong> This is not a test that will be scored out of correctness but rather how you can take data from an API and build a responsive UI with a nice User Experience. This task is designed to take around 8 hours.</p>
        <p>After completion, you’ll present your solution to the team and walk us through your design decisions, code and answer some questions.</p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link href="/surveys" className="text-blue-500 hover:underline mb-4 block">
            Go to Surveys
          </Link>
        </div>
        <h2>Task Breakdown:</h2>
        <ol>
          <li>
            <strong>Survey List Page</strong>
            <ul>
              <li>Fetch a list of surveys from the provided API.</li>
              <li>Display the survey titles and basic info.</li>
            </ul>
          </li>
          <li>
            <strong>View &amp; Take a Survey</strong>
            <ul>
              <li>Click into a survey to view all its questions.</li>
              <li>Provide a form for answering and submitting the survey.</li>
              <li>Dynamically render questions based on type.
                <ul>
                  <li>The question types will be <code>single_choice</code> or <code>multiple_choice</code>.</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <strong>Submit Survey Response</strong>
            <ul>
              <li>Send the user&apos;s submitted responses back to the API.</li>
              <li>Handle successful requests gracefully.</li>
            </ul>
          </li>
          <li>
            <strong>View Response Summary</strong>
            <ul>
              <li>After submission, show a simple summary of the submitted answers.</li>
              <li><strong>Note:</strong> there will be multiple submissions allowed for a single survey, we would like to see an elegant summary of all responses over seeing a list of all responses.</li>
            </ul>
          </li>
        </ol>
        <div className="api-details">
          <h2>API Details:</h2>
          <ul>
            <li>You’ll receive a Swagger doc with full endpoint documentation.</li>
            <li>There are two modes:
              <ul>
                <li><strong>Test API:</strong> Returns 11 surveys (for development).</li>
                <li><strong>Demo API:</strong> Returns 200 surveys (to be used in your demo).</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="looking-for">
          <h2>What We’re Looking For:</h2>
          <ul>
            <li>A clean, intuitive, responsive UI</li>
            <li>Sensible state management</li>
            <li>Clear, readable and reusable code</li>
            <li>Error handling and loading states</li>
          </ul>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  )
}
