import dynamic from 'next/dynamic'
import { Card, Logo } from '@brain-squiz/ui'

const Form = dynamic(() => import('../components/welcome-widget'), {
  loading: () => <div className={'h-36 animate-pulse bg-base-100'} />,
})

export default function Page() {
  return (
    <div className={'flex flex-col flex-1 items-center justify-center'}>
      <Logo href={'/'} />
      <Card className={'w-full max-w-md'}>
        <h1 className={'text-2xl'}>👋 Hey there!</h1>
        <Form />
      </Card>
    </div>
  )
}
