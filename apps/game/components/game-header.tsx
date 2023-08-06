// Q: Why is this file here? and not in the UI package?
// A: Because it's a component that is specific to the game app,
// with data that is specific to the game app.

'use client'

import React from 'react'
import { Header } from '@brain-squiz/ui'
import { useGameplay } from '@brain-squiz/gameplay'

export const GameHeader = () => {
  const [{ player }] = useGameplay()

  if (!player) {
    return null
  }

  return (
    <Header
      playerName={player}
      title={'Game'}
      menuItems={[
        { label: 'Leaderboard', href: '/game' },
        { label: 'New Game', href: '/game/play' },
      ]}
    />
  )
}
