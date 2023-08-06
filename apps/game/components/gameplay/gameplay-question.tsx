'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import { Question } from '@brain-squiz/gameplay'
import { useState } from 'react'

interface GameplayQuestionProps {
  questionId: string
  onAnswer: (isCorrect: boolean) => void
}

const query = gql`
  query GetQuestion($id: String!) {
    question(id: $id) {
      id
      question
      answers
      correctAnswerIndex
      snippet
    }
  }
`

export const GameplayQuestion = (props: GameplayQuestionProps) => {
  const { questionId, onAnswer } = props

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>()
  const [isAnswered, setIsAnswered] = useState(false)

  const { data } = useSuspenseQuery<any>(query, {
    variables: {
      id: questionId,
    },
  })

  const question = data?.question ?? {}

  const onAnswerHandler = (index: number) => {
    if (isAnswered) return
    setIsAnswered(true)
    onAnswer(question.correctAnswerIndex === index)
    setSelectedAnswerIndex(index)
  }

  return (
    <Question
      question={question.question}
      options={[...question.answers]}
      snippet={question.snippet}
      selectedAnswerIndex={selectedAnswerIndex}
      correctAnswerIndex={
        selectedAnswerIndex !== undefined && question.correctAnswerIndex
      }
      onAnswer={onAnswerHandler}
    />
  )
}
