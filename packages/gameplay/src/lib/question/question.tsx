'use client'

import { QuestionProps } from './question.types'
import { Card } from '@brain-squiz/ui'
import { QuestionOption } from './question-option'

export const Question = (props: QuestionProps) => {
  const {
    question,
    options,
    snippet,
    onAnswer,
    selectedAnswerIndex,
    correctAnswerIndex,
  } = props

  return (
    <Card className={'flex flex-col'}>
      <div className={'text-2xl font-bold'}>{question}</div>
      {snippet && (
        <div className={'flex flex-1 rounded-md bg-base-300 p-4'}>
          <code className={'text-black dark:text-white'}>{snippet}</code>
        </div>
      )}

      <div className={'flex flex-1 flex-col'}>
        {options?.map((option, index) => (
          <QuestionOption
            key={index}
            index={index + 1}
            isSelected={false}
            text={option}
            onClick={() => onAnswer(index)}
            isCorrect={index === correctAnswerIndex}
            isIncorrect={
              selectedAnswerIndex === index && index !== correctAnswerIndex
            }
          />
        ))}
      </div>
    </Card>
  )
}
