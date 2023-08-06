'use client'

import { LeaderboardProps } from './leaderboard.types'
import { Card } from '@brain-squiz/ui'

export const Leaderboard = (props: LeaderboardProps) => {
  const { items } = props

  return (
    <Card className={'flex flex-col items-center'}>
      <h2
        className={
          'font-extrabold text-transparent text-3xl md:text-5xl lg:text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'
        }
      >
        Leaderboard
      </h2>
      <div className={'flex w-full flex-1 flex-col space-y-2 items-center'}>
        {items?.map((item, index) => (
          <div
            key={item.name}
            className={'flex flex-row justify-between w-full max-w-xl'}
          >
            <span className={'text-2xl space-x-2'}>
              <span>{index + 1}.</span>
              <span>{item.name}</span>
            </span>
            <span>{item.score}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
