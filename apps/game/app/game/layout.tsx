import { PropsWithChildren } from 'react'
import { EnsurePlayer } from './ensure-player'
import { GameHeader } from '../../components/game-header'

export default function GameLayout(props: PropsWithChildren) {
  const { children } = props
  return (
    <EnsurePlayer>
      <div className={'container mx-auto flex flex-col flex-1 space-y-4'}>
        <GameHeader />
        <div className={'flex flex-1'}>{children}</div>
      </div>
    </EnsurePlayer>
  )
}
