'use client'

import Link from 'next/link'
import { Leaderboard } from '@brain-squiz/gameplay'
import { gql, useQuery, useSuspenseQuery } from '@apollo/client'

export default function Page() {
  const { data } = useSuspenseQuery<any>(
    gql`
      query {
        topPlayers(limit: 3) {
          name
          score
        }
      }
    `,
    {
      fetchPolicy: 'network-only',
    },
  )

  return (
    <div className={'flex flex-col flex-1 container mx-auto space-y-4'}>
      <Leaderboard items={data?.topPlayers} />
      <Link
        href={'/game/play'}
        className={'btn btn-primary btn-xl self-center w-full max-w-xl'}
      >
        Im ready to beat them!
      </Link>
    </div>
  )
}
