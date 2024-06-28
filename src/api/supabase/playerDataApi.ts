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

const getPlayerCharListData = async (username: string) => {
  const { data, error } = await supabase
    .from('player')
    .select('charList')
    .eq('username', username)
    .single()

  if (error) {
    console.error('플레이어 데이터를 불러오는 중 오류 발생:', error)
    return null
  }

  return data.charList
}

export const addCharFromPlaterData = async (
  charNameToAdd: string,
  username: string
) => {
  try {
    const latestCharList = await getPlayerCharListData(username)

    if (latestCharList.includes(charNameToAdd)) {
      console.error('중복된 캐릭터 닉네임입니다.')
      return { error: '이미 존재하는 캐릭터 닉네임입니다.' }
    }

    const { data, error } = await supabase
      .from('player')
      .update({
        charList: [...latestCharList, charNameToAdd]
      })
      .eq('username', username)
      .select('charList')
      .single()

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
