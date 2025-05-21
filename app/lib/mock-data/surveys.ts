import { SurveyResponse } from '../schemas'

export const surveysResponse: SurveyResponse = {
  surveys: [
    {
      "id": 1,
      "title": "Customer Satisfaction",
      "description": "Help us improve by sharing your experience.",
      "questions": [
        {
          "id": "q1_1",
          "type": "single_choice",
          "question": "How would you rate our service?",
          "options": [
            "Excellent",
            "Good",
            "Fair",
            "Poor"
          ]
        },
        {
          "id": "q1_2",
          "type": "single_choice",
          "question": "Would you recommend us?",
          "options": [
            "Yes",
            "No"
          ]
        }
      ]
    },
    {
      "id": 2,
      "title": "Employee Engagement",
      "description": "We want to understand how you feel at work.",
      "questions": [
        {
          "id": "q2_1",
          "type": "single_choice",
          "question": "Do you feel valued at work?",
          "options": [
            "Yes",
            "No",
            "Sometimes"
          ]
        },
        {
          "id": "q2_2",
          "type": "multiple_choice",
          "question": "What benefits do you value?",
          "options": [
            "Health Insurance",
            "Remote Work",
            "Flexible Hours",
            "Bonuses"
          ]
        }
      ]
    },
    {
      "id": 3,
      "title": "Website Feedback",
      "description": "We want to improve our website experience.",
      "questions": [
        {
          "id": "q3_1",
          "type": "single_choice",
          "question": "Was it easy to navigate?",
          "options": [
            "Yes",
            "No"
          ]
        },
        {
          "id": "q3_2",
          "type": "single_choice",
          "question": "How would you rate the design?",
          "options": [
            "Excellent",
            "Good",
            "Average",
            "Poor"
          ]
        },
        {
          "id": "q3_3",
          "type": "multiple_choice",
          "question": "What features do you use?",
          "options": [
            "Search",
            "Categories",
            "Filters",
            "Favorites"
          ]
        }
      ]
    },
    {
      "id": 4,
      "title": "Product Feedback",
      "description": "Let us know what you think of our new product.",
      "questions": [
        {
          "id": "q4_1",
          "type": "single_choice",
          "question": "How would you rate the product?",
          "options": [
            "5",
            "4",
            "3",
            "2",
            "1"
          ]
        },
        {
          "id": "q4_2",
          "type": "multiple_choice",
          "question": "Which features do you use?",
          "options": [
            "Dashboard",
            "Notifications",
            "Reports",
            "Integrations"
          ]
        },
        {
          "id": "q4_3",
          "type": "single_choice",
          "question": "Would you buy it again?",
          "options": [
            "Yes",
            "No",
            "Maybe"
          ]
        }
      ]
    },
    {
      "id": 5,
      "title": "Remote Work Check-In",
      "description": "Share how you’re coping with remote work.",
      "questions": [
        {
          "id": "q5_1",
          "type": "single_choice",
          "question": "Do you feel productive?",
          "options": [
            "Always",
            "Sometimes",
            "Rarely"
          ]
        },
        {
          "id": "q5_2",
          "type": "multiple_choice",
          "question": "What helps you stay productive?",
          "options": [
            "Quiet Space",
            "Routine",
            "Video Calls",
            "Breaks"
          ]
        }
      ]
    },
    {
      "id": 6,
      "title": "Onboarding Survey",
      "description": "Tell us how your onboarding process went.",
      "questions": [
        {
          "id": "q6_1",
          "type": "single_choice",
          "question": "Was onboarding clear and helpful?",
          "options": [
            "Yes",
            "No"
          ]
        },
        {
          "id": "q6_2",
          "type": "multiple_choice",
          "question": "What parts of onboarding helped most?",
          "options": [
            "Docs",
            "Mentor",
            "Kickoff Call",
            "Internal Tools"
          ]
        },
        {
          "id": "q6_3",
          "type": "single_choice",
          "question": "How long did onboarding take?",
          "options": [
            "<1 week",
            "1–2 weeks",
            "3+ weeks"
          ]
        }
      ]
    },
    {
      "id": 7,
      "title": "Health & Wellness",
      "description": "We’re assessing team wellbeing.",
      "questions": [
        {
          "id": "q7_1",
          "type": "single_choice",
          "question": "How do you rate your stress level?",
          "options": [
            "Low",
            "Moderate",
            "High"
          ]
        },
        {
          "id": "q7_2",
          "type": "multiple_choice",
          "question": "What wellness activities do you use?",
          "options": [
            "Gym",
            "Meditation",
            "Therapy",
            "Sleep Tracking"
          ]
        }
      ]
    },
    {
      "id": 8,
      "title": "Training Feedback",
      "description": "How was the recent training session?",
      "questions": [
        {
          "id": "q8_1",
          "type": "single_choice",
          "question": "Was the content relevant?",
          "options": [
            "Very",
            "Somewhat",
            "Not at all"
          ]
        },
        {
          "id": "q8_2",
          "type": "single_choice",
          "question": "How was the trainer's delivery?",
          "options": [
            "Excellent",
            "Good",
            "Okay",
            "Poor"
          ]
        }
      ]
    },
    {
      "id": 9,
      "title": "Feature Request",
      "description": "Help us decide what to build next.",
      "questions": [
        {
          "id": "q9_1",
          "type": "single_choice",
          "question": "Would you use a mobile app?",
          "options": [
            "Yes",
            "No"
          ]
        },
        {
          "id": "q9_2",
          "type": "multiple_choice",
          "question": "What features do you need?",
          "options": [
            "Offline Mode",
            "Push Notifications",
            "Dark Mode",
            "Sync"
          ]
        },
        {
          "id": "q9_3",
          "type": "single_choice",
          "question": "How important is speed?",
          "options": [
            "Very",
            "Somewhat",
            "Not important"
          ]
        }
      ]
    },
    {
      "id": 10,
      "title": "Event Feedback",
      "description": "How was your recent event experience?",
      "questions": [
        {
          "id": "q10_1",
          "type": "single_choice",
          "question": "Rate the event overall.",
          "options": [
            "5",
            "4",
            "3",
            "2",
            "1"
          ]
        },
        {
          "id": "q10_2",
          "type": "multiple_choice",
          "question": "What did you enjoy?",
          "options": [
            "Speakers",
            "Venue",
            "Food",
            "Networking"
          ]
        },
        {
          "id": "q10_3",
          "type": "single_choice",
          "question": "Would you attend again?",
          "options": [
            "Yes",
            "No",
            "Maybe"
          ]
        }
      ]
    },
    {
      "id": 11,
      "title": "Newsletter Feedback",
      "description": "Your thoughts on our monthly newsletter.",
      "questions": [
        {
          "id": "q11_1",
          "type": "single_choice",
          "question": "Do you read the newsletter?",
          "options": [
            "Every time",
            "Sometimes",
            "Rarely",
            "Never"
          ]
        },
        {
          "id": "q11_2",
          "type": "single_choice",
          "question": "Is the length right?",
          "options": [
            "Too long",
            "Just right",
            "Too short"
          ]
        },
        {
          "id": "q11_3",
          "type": "multiple_choice",
          "question": "What topics do you enjoy?",
          "options": [
            "Tech Updates",
            "Interviews",
            "Tips",
            "Events"
          ]
        },
        {
          "id": "q11_4",
          "type": "single_choice",
          "question": "Would you recommend it?",
          "options": [
            "Yes",
            "No"
          ]
        }
      ]
    }
  ]
}