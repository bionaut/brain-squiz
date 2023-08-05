export interface LeaderboardItem {
  player: string
  score: number
}

export interface LeaderboardProps {
  items: LeaderboardItem[]
}
