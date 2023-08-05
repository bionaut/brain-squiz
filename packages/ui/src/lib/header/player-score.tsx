'use client'

import { PlayerCoins } from './player-coins'

interface PlayerNameProps {
  playerName: string
  score: number
}

export const PlayerScore = (props: PlayerNameProps) => {
  const { playerName, score } = props

  return (
    <div
      data-tip={`Playing as "${playerName}"`}
      className={'tooltip tooltip-accent tooltip-bottom cursor-pointer'}
    >
      <PlayerCoins coins={score} />
    </div>
  )
}
