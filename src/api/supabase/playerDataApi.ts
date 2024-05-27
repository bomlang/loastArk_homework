import { supabase } from './client'
import { PlayerData } from '../../types'

export const getPlayerData = async (): Promise<PlayerData[] | null> => {
  try {
    const { data: player, error } = await supabase.from('player').select('*')

    if (error) {
      console.error('플레이어의 데이터 오류', error)
      return null
    }

    return player
  } catch (error) {
    console.error(
      '플레이어의 데이터를 가져오는 중 예상치 못한 오류가 발생하였습니다.',
      error
    )
    return null
  }
}
