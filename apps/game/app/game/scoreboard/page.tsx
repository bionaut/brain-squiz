import Link from 'next/link'
import { Leaderboard } from '@brain-squiz/gameplay'

export default function Page() {
  return (
    <div className={'flex flex-col flex-1 container mx-auto space-y-4'}>
      <Leaderboard
        items={[
          {
            player: 'Player 1',
            score: 100,
          },
          {
            player: 'Player 2',
            score: 87,
          },
          {
            player: 'Player 3',
            score: 75,
          },
        ]}
      />
      <Link
        href={'/game/play'}
        className={'btn btn-primary btn-xl self-center w-full max-w-xl'}
      >
        Im ready to beat them!
      </Link>
    </div>
  )
}
