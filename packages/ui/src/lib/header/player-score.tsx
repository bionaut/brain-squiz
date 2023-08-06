'use client'

import { PlayerName } from './player-name'

interface PlayerNameProps {
  playerName: string
}

export const PlayerScore = (props: PlayerNameProps) => {
  const { playerName } = props

  return (
    <div
      data-tip={`Playing as "${playerName}"`}
      className={'tooltip tooltip-accent tooltip-bottom cursor-pointer'}
    >
      <PlayerName playerName={playerName} />
    </div>
  )
}
