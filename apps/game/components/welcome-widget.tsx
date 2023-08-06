'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/navigation'
import { useGameplay } from '@brain-squiz/gameplay'
import { gql, useMutation } from '@apollo/client'

const createPlayerMutation = gql`
  mutation CreatePlayer($name: String!) {
    createPlayer(name: $name) {
      name
      score
    }
  }
`

interface FormValues {
  player: string
}

export const WelcomeWidget = () => {
  const router = useRouter()
  const [, dispatch] = useGameplay()
  const [createPlayer, { loading }] = useMutation(createPlayerMutation)

  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      player: '',
    },
  })

  const submitHandler = async (data: FormValues) => {
    const { data: playerData } = await createPlayer({
      variables: { name: data.player },
    })

    if (playerData.createPlayer) {
      dispatch({ type: 'SET_PLAYER', payload: playerData.createPlayer.name })
      router.push('/game')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={'flex flex-col space-y-3'}
    >
      <div className={'form-control'}>
        <label className={'label'}>
          <span className={'label-text'}>Let's start with your nickname</span>
        </label>
        <input
          autoFocus
          title={'player name'}
          type={'text'}
          className={twMerge(
            'input',
            'input-bordered',
            'w-full',
            formState?.errors?.player ? 'input-error' : '',
          )}
          placeholder={'e.g. neuron'}
          {...register('player', { required: true })}
        />
      </div>
      <div className={'flex flex-1 space-x-2 justify-end'}>
        <button
          onClick={() => alert('Just have fun!')}
          title={'how to play'}
          type={'button'}
          className={'btn self-end btn-ghost'}
        >
          How to play?
        </button>
        <button
          disabled={loading}
          type={'submit'}
          title={'start game'}
          className={'btn btn-primary self-end'}
        >
          Let's go!
        </button>
      </div>
    </form>
  )
}

export default WelcomeWidget
