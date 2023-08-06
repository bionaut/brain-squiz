import Link from 'next/link'
import { Leaderboard } from '@brain-squiz/gameplay'
import { gql } from '@apollo/client'

import { gqlServerClient } from '../../../gql/server'

const getData = async () => {
  const { data } = await gqlServerClient.query({
    query: gql`
      query {
        topPlayers(limit: 3) {
          name
          score
        }
      }
    `,
  })

  return data.topPlayers as { name: string; score: number }[]
}

export default async function Page() {
  const items = await getData()

  return (
    <div className={'flex flex-col flex-1 container mx-auto space-y-4'}>
      <Leaderboard items={items} />
      <Link
        href={'/game/play'}
        className={'btn btn-primary btn-xl self-center w-full max-w-xl'}
      >
        Im ready to beat them!
      </Link>
    </div>
  )
}
