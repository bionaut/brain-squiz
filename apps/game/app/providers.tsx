'use client'

import { PropsWithChildren } from 'react'
import { GameplayProvider } from '@brain-squiz/gameplay'
import { ApolloProvider } from '../gql/client-provider'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ApolloProvider>
      <GameplayProvider>{children}</GameplayProvider>
    </ApolloProvider>
  )
}
