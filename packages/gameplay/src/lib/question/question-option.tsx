import React from 'react'
import { twMerge } from 'tailwind-merge'

interface QuestionOptionProps {
  isSelected: boolean
  text: string
  index: number
  isCorrect?: boolean
  isIncorrect?: boolean
  onClick: () => void
}

export const QuestionOption = (props: QuestionOptionProps) => {
  const { index, text, isIncorrect, isCorrect, onClick } = props

  const classes = twMerge(
    'flex flex-row space-x-2 items-center w-full px-4 py-2 my-2 rounded-lg cursor-pointer',
    !isCorrect && !isIncorrect && 'hover:bg-base-300',
    isCorrect && 'bg-green-500 text-white',
    isIncorrect && 'bg-red-500 text-white',
  )

  return (
    <div className={classes} onClick={onClick}>
      <span className={'font-bold bg-base-300/50 rounded-lg p-4'}>{index}</span>
      <span>{text}</span>
    </div>
  )
}
