export interface MenuItem {
  label: string
  href: string
}

export interface HeaderProps {
  title: string
  menuItems: MenuItem[]
  playerName: string
}
