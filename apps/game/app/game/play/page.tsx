import { Question } from '@brain-squiz/gameplay'

export default function Page() {
  return (
    <div className={'flex flex-col flex-1'}>
      <Question
        question={'What is the optional chaining?'}
        options={[
          'In Javascript, the optional chaining is a new feature that allows you to access deeply nested object properties without worrying if the property exists or not.',
          'In Typescript, the optional chaining is a new feature that allows you to access deeply nested object properties without worrying if the property exists or not.',
          'In Python, the optional chaining is a new feature that allows you to access deeply nested object properties without worrying if the property exists or not.',
          'All of the above',
        ]}
      />
    </div>
  )
}
