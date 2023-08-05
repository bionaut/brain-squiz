import { QuestionProps } from './question.types'
import { Card } from '@brain-squiz/ui'
import { QuestionOption } from './question-option'

export const Question = (props: QuestionProps) => {
  const { question, options } = props

  return (
    <Card className={'flex flex-col items-center'}>
      <div className={'text-2xl font-bold'}>{question}</div>
      <div className={'flex flex-col'}>
        {options?.map((option, index) => (
          <QuestionOption
            key={index}
            index={index + 1}
            isSelected={false}
            text={option}
          />
        ))}
      </div>
    </Card>
  )
}
