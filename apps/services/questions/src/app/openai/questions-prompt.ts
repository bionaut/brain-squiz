import { ChatCompletionRequestMessage } from 'openai/api'

export const generateQuestions = (
  count: number,
): Array<ChatCompletionRequestMessage> => [
  {
    role: 'system',
    content: `
    Generate ${count} entry-level programming questions with 4 possible answers and the index of the correct answer.
    Output Question[] JSON:

    interface Question {
      question: string;
      snippet?: string;
      answers: string[];
      correctAnswerIndex: number;
    }

    Example output: [{
      "question": "What is optional chaining?",
      "answers": [
        "A way to access properties on an object that may not exist",
        "A way to access properties on an object that may not exist, and if it doesn't exist, return undefined",
        "A way to access properties on an object that may not exist, and if it doesn't exist, return null",
        "A way to access properties on an object that may not exist, and if it doesn't exist, return an empty string"
      }, {
      "question": "What would this code return?",
      "snippet": "1 + \"1\"",
      "answers": [
        "\"11\"",
        "2",
        "\"2\"",
        "11"
      ],
      "correctAnswerIndex": 0
      }]

    Output JSON:

    `,
  },
]
