import { Characters } from '../../types'
import axios, { AxiosResponse } from 'axios'

const API_URL = 'https://developer-lostark.game.onstove.com'
const headers = {
  accept: 'application/json',
  authorization: `bearer ${import.meta.env.VITE_PUBLIC_LOASTARK_API_KEY}`
}

export const getLoastArkCharData = async (
  nickname: string
): Promise<Characters | null> => {
  try {
    const encodedNickname = encodeURI(nickname)
    const response: AxiosResponse<Characters> = await axios.get(
      `${API_URL}/armories/characters/${encodedNickname}/profiles`,
      { headers }
    )

    return response.data
  } catch (error) {
    console.error(
      "'LoastArk'에서 캐릭터의 데이터를 가져오는데 문제가 발생하였습니다.",
      error
    )
    return null
  }
}
