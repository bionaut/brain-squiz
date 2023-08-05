import React from 'react'
import { twMerge } from 'tailwind-merge'

interface QuestionOptionProps {
  onSelect: (index: number) => void
  isSelected: boolean
  text: string
  index: number
}

export const QuestionOption = (props: QuestionOptionProps) => {
  const { index, text, isSelected, onSelect } = props

  const classes = twMerge(
    'flex flex-row space-x-2 items-center w-full px-4 py-2 my-2 rounded-lg cursor-pointer',
    'hover:bg-base-300',
    isSelected ? 'bg-blue-200 text-white' : 'bg-base-200',
  )

  return (
    <div onClick={() => onSelect(index)} className={classes}>
      <span className={'font-bold bg-base-300/50 rounded-lg p-4'}>{index}</span>
      <span>{text}</span>
    </div>
  )
}
