import { QuestionResponse } from '../schemas'

export interface MockQuestionResponseLookup extends QuestionResponse {
  survey_id: number
}

export const ALL_MOCK_QUESTIONS_RESPONSES: MockQuestionResponseLookup[] = [
  {
    "question_id": "q1_1",
    "survey_id": 1,
    "total_votes": 35,
    "option_totals": {
      "Excellent": 20,
      "Good": 8,
      "Fair": 2,
      "Poor": 3,
      "Ok": 2
    },
    "percentages": {
      "Excellent": 57.14,
      "Good": 22.86,
      "Fair": 5.71,
      "Poor": 8.57,
      "Ok": 5.71
    }
  },
  {
    "question_id": "q1_2",
    "survey_id": 1,
    "total_votes": 97,
    "option_totals": { "Yes": 80, "No": 16, "": 1 },
    "percentages": { "Yes": 82.47, "No": 16.49, "": 1.03 }
  },
  {
    "question_id": "q2_1",
    "survey_id": 2,
    "total_votes": 56,
    "option_totals": { "Yes": 40, "No": 10, "Sometimes": 6 },
    "percentages": { "Yes": 71.43, "No": 17.86, "Sometimes": 10.71 }
  },
  {
    "question_id": "q2_2",
    "survey_id": 2,
    "total_votes": 100,
    "option_totals": {
      "Health Insurance": 2,
      "Remote Work": 80,
      "Flexible Hours": 75,
      "Bonuses": 90
    },
    "percentages": {
      "Health Insurance": 2.00,
      "Remote Work": 80.00,
      "Flexible Hours": 75.00,
      "Bonuses": 90.00
    }
  },
  {
    "question_id": "q3_1",
    "survey_id": 3,
    "total_votes": 85,
    "option_totals": { "Yes": 70, "No": 15 },
    "percentages": { "Yes": 82.35, "No": 17.65 }
  },
  {
    "question_id": "q3_2",
    "survey_id": 3,
    "total_votes": 78,
    "option_totals": { "Excellent": 45, "Good": 20, "Average": 10, "Poor": 3 },
    "percentages": { "Excellent": 57.69, "Good": 25.64, "Average": 12.82, "Poor": 3.85 }
  },
  {
    "question_id": "q3_3",
    "survey_id": 3,
    "total_votes": 90,
    "option_totals": { "Search": 70, "Categories": 65, "Filters": 50, "Favorites": 30 },
    "percentages": { "Search": 77.78, "Categories": 72.22, "Filters": 55.56, "Favorites": 33.33 }
  },
  {
    "question_id": "q4_1",
    "survey_id": 4,
    "total_votes": 120,
    "option_totals": { "5": 70, "4": 30, "3": 15, "2": 4, "1": 1 },
    "percentages": { "5": 58.33, "4": 25.00, "3": 12.50, "2": 3.33, "1": 0.83 }
  },
  {
    "question_id": "q4_2",
    "survey_id": 4,
    "total_votes": 110,
    "option_totals": { "Dashboard": 95, "Notifications": 80, "Reports": 60, "Integrations": 40 },
    "percentages": { "Dashboard": 86.36, "Notifications": 72.73, "Reports": 54.55, "Integrations": 36.36 }
  },
  {
    "question_id": "q4_3",
    "survey_id": 4,
    "total_votes": 105,
    "option_totals": { "Yes": 80, "No": 10, "Maybe": 15 },
    "percentages": { "Yes": 76.19, "No": 9.52, "Maybe": 14.29 }
  },
  {
    "question_id": "q5_1",
    "survey_id": 5,
    "total_votes": 65,
    "option_totals": { "Always": 40, "Sometimes": 20, "Rarely": 5 },
    "percentages": { "Always": 61.54, "Sometimes": 30.77, "Rarely": 7.69 }
  },
  {
    "question_id": "q5_2",
    "survey_id": 5,
    "total_votes": 70,
    "option_totals": { "Quiet Space": 55, "Routine": 45, "Video Calls": 20, "Breaks": 60 },
    "percentages": { "Quiet Space": 78.57, "Routine": 64.29, "Video Calls": 28.57, "Breaks": 85.71 }
  },
  {
    "question_id": "q6_1",
    "survey_id": 6,
    "total_votes": 110,
    "option_totals": { "Yes": 95, "No": 15 },
    "percentages": { "Yes": 86.36, "No": 13.64 }
  },
  {
    "question_id": "q6_2",
    "survey_id": 6,
    "total_votes": 105,
    "option_totals": { "Docs": 80, "Mentor": 70, "Kickoff Call": 50, "Internal Tools": 65 },
    "percentages": { "Docs": 76.19, "Mentor": 66.67, "Kickoff Call": 47.62, "Internal Tools": 61.90 }
  },
  {
    "question_id": "q6_3",
    "survey_id": 6,
    "total_votes": 98,
    "option_totals": { "<1 week": 30, "1–2 weeks": 55, "3+ weeks": 13 },
    "percentages": { "<1 week": 30.61, "1–2 weeks": 56.12, "3+ weeks": 13.27 }
  },
  {
    "question_id": "q7_1",
    "survey_id": 7,
    "total_votes": 75,
    "option_totals": { "Low": 40, "Moderate": 30, "High": 5 },
    "percentages": { "Low": 53.33, "Moderate": 40.00, "High": 6.67 }
  },
  {
    "question_id": "q7_2",
    "survey_id": 7,
    "total_votes": 80,
    "option_totals": { "Gym": 60, "Meditation": 35, "Therapy": 15, "Sleep Tracking": 40 },
    "percentages": { "Gym": 75.00, "Meditation": 43.75, "Therapy": 18.75, "Sleep Tracking": 50.00 }
  },
  {
    "question_id": "q8_1",
    "survey_id": 8,
    "total_votes": 100,
    "option_totals": { "Very": 70, "Somewhat": 25, "Not at all": 5 },
    "percentages": { "Very": 70.00, "Somewhat": 25.00, "Not at all": 5.00 }
  },
  {
    "question_id": "q8_2",
    "survey_id": 8,
    "total_votes": 95,
    "option_totals": { "Excellent": 60, "Good": 30, "Ok": 4, "Poor": 1 },
    "percentages": { "Excellent": 63.16, "Good": 31.58, "Ok": 4.21, "Poor": 1.05 }
  },
  {
    "question_id": "q9_1",
    "survey_id": 9,
    "total_votes": 150,
    "option_totals": { "Yes": 120, "No": 30 },
    "percentages": { "Yes": 80.00, "No": 20.00 }
  },
  {
    "question_id": "q9_2",
    "survey_id": 9,
    "total_votes": 140,
    "option_totals": { "Offline Mode": 90, "Push Notifications": 70, "Dark Mode": 110, "Sync": 85 },
    "percentages": { "Offline Mode": 64.29, "Push Notifications": 50.00, "Dark Mode": 78.57, "Sync": 60.71 }
  },
  {
    "question_id": "q9_3",
    "survey_id": 9,
    "total_votes": 130,
    "option_totals": { "Very": 100, "Somewhat": 25, "Not important": 5 },
    "percentages": { "Very": 76.92, "Somewhat": 19.23, "Not important": 3.85 }
  },
  {
    "question_id": "q10_1",
    "survey_id": 10,
    "total_votes": 180,
    "option_totals": { "5": 110, "4": 50, "3": 15, "2": 4, "1": 1 },
    "percentages": { "5": 61.11, "4": 27.78, "3": 8.33, "2": 2.22, "1": 0.56 }
  },
  {
    "question_id": "q10_2",
    "survey_id": 10,
    "total_votes": 170,
    "option_totals": { "Speakers": 130, "Venue": 100, "Food": 80, "Networking": 120 },
    "percentages": { "Speakers": 76.47, "Venue": 58.82, "Food": 47.06, "Networking": 70.59 }
  },
  {
    "question_id": "q10_3",
    "survey_id": 10,
    "total_votes": 160,
    "option_totals": { "Yes": 130, "No": 15, "Maybe": 15 },
    "percentages": { "Yes": 81.25, "No": 9.38, "Maybe": 9.38 }
  },
  {
    "question_id": "q11_1",
    "survey_id": 11,
    "total_votes": 200,
    "option_totals": { "Every time": 120, "Sometimes": 60, "Rarely": 15, "Never": 5 },
    "percentages": { "Every time": 60.00, "Sometimes": 30.00, "Rarely": 7.50, "Never": 2.50 }
  },
  {
    "question_id": "q11_2",
    "survey_id": 11,
    "total_votes": 190,
    "option_totals": { "Too long": 20, "Just right": 150, "Too short": 20 },
    "percentages": { "Too long": 10.53, "Just right": 78.95, "Too short": 10.53 }
  },
  {
    "question_id": "q11_3",
    "survey_id": 11,
    "total_votes": 180,
    "option_totals": { "Tech Updates": 120, "Interviews": 90, "Tips": 110, "Events": 70 },
    "percentages": { "Tech Updates": 66.67, "Interviews": 50.00, "Tips": 61.11, "Events": 38.89 }
  },
  {
    "question_id": "q11_4",
    "survey_id": 11,
    "total_votes": 175,
    "option_totals": { "Yes": 150, "No": 25 },
    "percentages": { "Yes": 85.71, "No": 14.29 }
  }
]