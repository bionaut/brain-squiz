export interface LeaderboardItem {
  name: string
  score: number
}

export interface LeaderboardProps {
  items: LeaderboardItem[]
}
