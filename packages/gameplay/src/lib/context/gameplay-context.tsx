'use client'

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react'

import {
  GameplayContextAction,
  GameplayContextState,
} from './gameplay-context.types'

import { gameplayReducer } from './gameplay-reducer'

type GameplayContextValue = [
  GameplayContextState,
  Dispatch<GameplayContextAction>,
]

export const GameplayContext = createContext<GameplayContextValue>(
  undefined as any,
)

export const GameplayProvider = ({ children }: PropsWithChildren) => {
  const value = useReducer(gameplayReducer, {
    player: undefined,
  })

  return (
    <GameplayContext.Provider value={value}>
      {children}
    </GameplayContext.Provider>
  )
}

export const useGameplay = () => useContext(GameplayContext)
