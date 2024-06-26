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

export const addCharFromPlaterData = async () => {
  try {
    const { data, error } = await supabase
      .from('player')
      .update({
        charList: ['하오문여제', '기상술사하러왔어', '물몸이라약해요']
      })
      .eq('username', '호')
      .select()

    if (error) {
      console.error('플레이어의 캐릭터 추가 오류', error)
    }

    return data
  } catch (error) {
    console.error(
      '플레이어의 캐릭터를 추가하는데 예상치 못한 오류가 발생하였습니다.',
      error
    )
  }
}
