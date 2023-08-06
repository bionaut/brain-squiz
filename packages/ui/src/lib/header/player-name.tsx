import React from 'react'

interface PlayerCoinsProps {
  playerName: string
}

export const PlayerName = (props: PlayerCoinsProps) => {
  const firstLetter = props.playerName[0].toUpperCase()

  return (
    <div
      className={
        'font-bold rounded-full bg-amber-300 h-10 w-10 flex items-center justify-center ring ring-amber-400'
      }
    >
      {firstLetter}
    </div>
  )
}
