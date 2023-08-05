import { HeaderProps } from './header.types'

import { Logo } from '../logo'
import { PlayerScore } from './player-score'
import { HeaderMenuitem } from './header-menuitem'

export function Header(props: HeaderProps) {
  const { playerName, score, menuItems } = props

  return (
    <div className={'w-full shadow-lg bg-base-200 px-4'}>
      <div className={'flex py-2 justify-between items-center'}>
        <Logo href={'/game'} />
        <div className={'space-x-2 flex items-center'}>
          {menuItems.map((item) => (
            <HeaderMenuitem key={`header-menuitem-${item.href}`} {...item} />
          ))}
          <PlayerScore playerName={playerName} score={score} />
        </div>
      </div>
    </div>
  )
}
