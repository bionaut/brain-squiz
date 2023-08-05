import React from 'react'

interface PlayerCoinsProps {
  coins: number
}

export const PlayerCoins = (props: PlayerCoinsProps) => {
  const { coins } = props

  return (
    <div
      className={
        'font-bold rounded-full bg-amber-300 h-10 w-10 flex items-center justify-center ring ring-amber-400'
      }
    >
      {coins}
    </div>
  )
}
