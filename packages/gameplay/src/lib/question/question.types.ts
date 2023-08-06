export interface QuestionProps {
  onAnswer: (index: number) => void
  question: string
  options: string[]
  snippet?: string
  correctAnswerIndex?: number
  selectedAnswerIndex?: number
}
