This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Learn More

# Lightweight Survey Tool

This project implements a lightweight survey tool frontend, designed to showcase a modern, responsive user interface interacting with a real API. It fulfills the requirements of the provided problem statement, allowing users to browse surveys, take them, and view submission confirmations.


## Problem Statement

_As provided by the challenge:_

"We want to evaluate your ability to build an elegant, maintainable, and user-friendly frontend that interacts with a real API. The goal is to implement a lightweight survey tool that allows users to browse surveys, take one, and view results with thoughtful UX and best practices. This is not a test that will be scored out of correctness but rather how you can take data from an API and build a responsive UI with a nice User Experience. This task is designed to take around 8 hours. After completion, you’ll present your solution to the team and walk us through your design decisions, code and answer some questions."

**Task Breakdown:**

1.  **Survey List Page**
    * Fetch a list of surveys from the provided API.
    * Display the survey titles and basic info.
2.  **View & Take a Survey**
    * Click into a survey to view all its questions.
    * Provide a form for answering and submitting the survey.
    * Dynamically render questions based on type (`single_choice`, `multiple_choice`).
3.  **Submit Survey Response**
    * Send the user's submitted responses back to the API.
    * Handle successful requests gracefully.
4.  **View Response Summary**
    * After submission, show a simple summary of the submitted answers.
    * (Note: multiple submissions are allowed; focus on an elegant summary over a raw list.)

## Technologies Used

* **Next.js 14+ (App Router):** For a robust React framework with server-side rendering (SSR) and routing.
* **TypeScript:** For type safety and improved code quality.
* **Tailwind CSS:** For rapid and consistent styling.
* **`Workspace` API:** For interacting with the backend API.
* **Environment Variables:** For secure API keys and base URLs.

## Features Implemented

* **Survey Listing:** Displays a list of available surveys fetched from the API.
* **Dynamic Survey Forms:**
    * Navigates to a dedicated page for each survey.
    * Dynamically renders questions based on their `type` (currently `single_choice` is specifically handled with a dropdown for controlled input).
    * Utilizes HTML forms and `FormData` for efficient data collection.
* **Survey Submission:**
    * Collects user responses and transforms them into the API's expected payload format (`{ responses: [{ question_id: "...", selected_option: "..." }] }`).
    * Communicates with the API using `POST` requests.
    * Provides visual feedback (loading/success/error messages) during submission.
* **Robust Error Handling & Loading States:**
    * Implemented `try-catch` blocks for API calls.
    * Displays user-friendly error messages for network issues or API failures.
    * Includes loading indicators (e.g., disabled submit button) during API requests.
    * Includes a fallback to mock data if the API is unreachable (for `WorkspaceAllSurveys`, `WorkspaceSurveyById`, `WorkspaceSurveyResponses`).

## Setup and Running Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://https://github.com/theWhiteFox/survey-tool-app.git](https://https://github.com/theWhiteFox/survey-tool-app.git)
    cd your-repo-name
    ```
2.  **Install dependencies:**
    ```bash
    bun install # or npm install or yarn install
    ```
3.  **Configure environment variables:**
    Create a `.env.local` file in the root of the project and add the following:
    ```
    # .env.local
    NEXT_PUBLIC_APP_BASE_URL=http://localhost:3000
    API_TOKEN=uNjuRUsFONzKnjOk
    ```
    *(Note: `uNjuRUsFONzKnjOk` is the token provided in the challenge. For production, ensure sensitive tokens are stored securely and not publicly exposed.)*
4.  **Run the development server:**
    ```bash
    bun dev # or npm run dev or yarn dev
    ```
5.  Open `http://localhost:3000` in your browser.

## Design Decisions & Best Practices

* **Next.js App Router:** Utilized for server-side rendering (SSR) of survey lists and detail pages, enhancing initial load performance and SEO (though not critical for this specific app, it demonstrates modern Next.js capabilities).
* **Server Components & Client Components:** API data fetching (`app/lib/data.ts`) primarily occurs in server-side functions (e.g., in `page.tsx` files) for better performance and security (API token is not exposed client-side). Interactive elements like the `SurveyForm` are Client Components.
* **Modular API Service (`app/lib/data.ts`):** Centralized API calls for reusability, maintainability, and consistent error handling/authentication.
* **Sensible State Management:**
    * `useState` for local component state (form data, submission status).
    * `loading` and `error` states are managed to provide clear user feedback.
* **Responsive UI:** Designed with Tailwind CSS to ensure a good experience across various screen sizes.
* **User Experience (UX) Considerations:**
    * Clear titles and descriptions.
    * Dynamic form elements (e.g., dropdown for `single_choice` questions to ensure valid input).
    * Immediate feedback after submission (success/error messages).

## Challenges Faced & Solutions

This project presented several real-world development challenges, particularly around API integration and environmental differences, which required careful debugging:

1.  **API Payload Mismatches (422 Unprocessable Content):**
    * **Challenge:** The API expected a very specific nested array structure for responses (`{"responses": [{"question_id": "...", "selected_option": "..."}]}`), which was initially different from a flat object collected directly from `FormData`.
    * **Solution:** Implemented a transformation step in `SurveyForm.tsx` to map raw form data into the API's required array of objects, correctly assigning `question_id` and using `selected_option` as the answer key.

2.  **Cross-Origin Resource Sharing (CORS) Issues (NetworkError):**
    * **Challenge:** Direct `Workspace` calls from `http://localhost:3000` to the remote API (`https://interview.staging.derilinx.com`) were blocked by browser security policies because the API's `Access-Control-Allow-Origin` header did not include `localhost`.
    * **Solution:** Configured `next.config.js` with `rewrites` to proxy API requests through the Next.js development server. This made browser requests appear to be same-origin, bypassing the CORS restriction.

3.  **Server-Side `Workspace` URL Parsing (`TypeError: Failed to parse URL`):**
    * **Challenge:** After implementing the proxy, `Workspace` calls made within Next.js Server Components failed because they require absolute URLs, not relative paths like `/api/...`.
    * **Solution:** Used `process.env.NEXT_PUBLIC_APP_BASE_URL` to dynamically construct full absolute URLs (e.g., `http://localhost:3000/api/...`), ensuring `Workspace` works correctly in both server and client environments.

4.  **Persistent `500 Internal Server Error` on Survey Submission:**
    * **Challenge:** Even after addressing all client-side issues (CORS, correct payload, correct `question_id` values, correct `selected_option` values via dropdowns), `POST /surveys/{id}/responses` consistently returns a `500 Internal Server Error` from the API, despite the *identical request payload successfully working via Swagger/Curl*. The API's error response provides no further details beyond "Internal Server Error."
    * **Investigation:** Meticulously confirmed payload structure, `question_id` values (from fetched survey data), and `selected_option` values (guaranteed by `<select>` dropdowns) match API expectations.
    * **Conclusion:** This indicates an **unhandled exception or configuration issue on the API provider's server**, which is beyond the scope of frontend code to resolve. In a production scenario, this would necessitate contacting the API team with the exact request details for their internal debugging.

## Future Improvements

* **Multiple Choice Handling:** Implement dedicated UI (e.g., checkboxes) and data collection logic for `multiple_choice` question types.
* **Response Summary Details:** Enhance the "View Response Summary" page to provide more meaningful aggregated insights (e.g., breakdown of chosen options for each question).
* **Form Validation:** Implement more robust client-side validation (e.g., `react-hook-form` or similar) beyond basic `required` attributes.
* **Accessibility:** Improve ARIA attributes and keyboard navigation.
* **UI Polish:** Further refine styling, transitions, and animations for a more polished user experience.
* **Loading Skeletons:** Implement skeleton loaders for better perceived performance during data fetching.

