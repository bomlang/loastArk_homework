export interface PlayerData {
  id: number
  user_email: string
  username: string
  charList: string[]
  created_at: string
}

export type PartialPlayerData = Pick<PlayerData, 'username' | 'charList'>
