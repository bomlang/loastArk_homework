// import { getUser, getPlayerUsername, getPlayerData, getLoastArkCharData, loadCheckRade } from '../api';

import { getUser, loadCheckRade } from '../api/supabase'
import { getLoastArkCharData } from '../api/loastArkAPI/getCharDataAPI'
import { getPlayerData, getPlayerUsername } from '../api/supabase/playerDataApi'

export const fetchCharacterData = async (token: string | null) => {
  const userData = await getUser(token)
  if (!userData) {
    throw new Error('사용자의 데이터가 존재하지 않습니다.')
  }

  const username = await getPlayerUsername(userData.email as string)
  const playerData = await getPlayerData(username)

  if (playerData) {
    const characterDataPromises = await Promise.all(
      playerData.charList.map(async charName => {
        const charactorsData = await getLoastArkCharData(charName)
        const bossData = await loadCheckRade(charName)

        return { ...charactorsData, bossData }
      })
    )
    return characterDataPromises
  } else {
    throw new Error('플레이어 데이터가 존재하지 않습니다.')
  }
}
