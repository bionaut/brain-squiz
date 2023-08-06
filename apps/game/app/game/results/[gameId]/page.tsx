'use client'

import { gql, useQuery } from '@apollo/client'
import { useParams } from 'next/navigation'
import { Card } from '@brain-squiz/ui'

export default function Page() {
  const { gameId } = useParams()

  const { data } = useQuery(
    gql`
      query GetGame($gameId: String!) {
        game(id: $gameId) {
          score
          elapsedTime
        }
      }
    `,
    {
      variables: {
        gameId,
      },
    },
  )

  return (
    <Card className={'flex flex-col flex-1 space-y-2'}>
      <h1 className={'text-2xl'}>Results</h1>
      <div>Score: {data?.game.score}</div>
      <div>Duration: {data?.game.elapsedTime}s</div>
    </Card>
  )
}
