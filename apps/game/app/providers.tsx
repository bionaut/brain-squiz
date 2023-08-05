'use client'

import { GameplayProvider } from '@brain-squiz/gameplay'
import { PropsWithChildren } from 'react'

export const Providers = ({ children }: PropsWithChildren) => {
  return <GameplayProvider>{children}</GameplayProvider>
}
