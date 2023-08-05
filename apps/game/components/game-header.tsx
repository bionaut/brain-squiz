// Q: Why is this file here? and not in the UI package?
// A: Because it's a component that is specific to the game app,
// with data that is specific to the game app.

'use client'

import React from 'react'
import { Header } from '@brain-squiz/ui'
import { useGameplay } from '@brain-squiz/gameplay'

export const GameHeader = () => {
  const [{ player }] = useGameplay()
  // todo get score from gql

  if (!player) {
    return null
  }

  return (
    <Header
      playerName={player}
      score={0}
      title={'Game'}
      menuItems={[
        { label: 'Leaderboard', href: '/game' },
        { label: 'New Game', href: '/game/play' },
        // todo { label: 'Logout', href: '/logout' },
      ]}
    />
  )
}
