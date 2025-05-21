import Link from "next/link"

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">Lightweight Survey Tool</h1>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link href="/surveys" className="text-blue-500 hover:underline mb-4 block text-2xl">
            Go to Surveys
          </Link>
        </div>
        <p>Read more: <a href="https://www.thewhitefoxdev.blog/blog/survey-tool-next" className="text-blue-500 hover:underline mb-4">From 500 Errors to UX Wins: API Debugging in a Real-World Next.js 14 App</a></p>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  )
}
