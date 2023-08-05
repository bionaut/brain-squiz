export interface GameplayContextState {
  player?: string
}

export type GameplayContextAction = { type: 'SET_PLAYER'; payload: string }
