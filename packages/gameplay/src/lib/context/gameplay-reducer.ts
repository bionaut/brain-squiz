import {
  GameplayContextAction,
  GameplayContextState,
} from './gameplay-context.types'

export const gameplayReducer = (
  state: GameplayContextState,
  action: GameplayContextAction,
): GameplayContextState => {
  switch (action.type) {
    case 'SET_PLAYER':
      return {
        ...state,
        player: action.payload,
      }
    default:
      return state
  }
}
