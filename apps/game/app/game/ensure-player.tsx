'use client'

import { PropsWithChildren } from 'react'
import { useGameplay } from '@brain-squiz/gameplay'

export const EnsurePlayer = (props: PropsWithChildren) => {
  const [{ player }] = useGameplay()

  if (!player && window) {
    // router.replace('/') not working - Next.js bug
    window.location.href = '/'
    return null
  }

  return <>{props.children}</>
}
