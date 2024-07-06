import { supabase } from './client'
import { CheckRade } from '../../types'

export const loadCheckRade = async (
  nickname: string
): Promise<CheckRade | null> => {
  try {
    const { data, error } = await supabase
      .from('bossRade')
      .select('*')
      .eq('userCharName', nickname)
      .single()

    if (error) {
      console.error('레이드 데이터 로딩 오류 :', error)
      return null
    }

    return data
  } catch (error) {
    console.error(
      '레이드 데이터를 불러오는 중 예상치 못한 오류가 발생하였습니다.',
      error
    )
    return null
  }
}

export const updateCheckRade = async (
  isChecked: boolean,
  characterName: string,
  bossName: string
) => {
  try {
    const { data, error } = await supabase
      .from('bossRade')
      .update({ [bossName]: !isChecked })
      .eq('userCharName', characterName)
      .select()

    if (error) {
      console.error('데이터 행 업데이트 오류:', error)
    }

    return data
  } catch (error) {
    console.error('데이터 행 업데이트 중 오류가 발생하였습니다.', error)
  }
}

export const insertRadeRowData = async (
  charNameToAdd: string
): Promise<'exists' | 'success' | 'error'> => {
  try {
    // 닉네임의 중복 여부를 확인합니다.
    const { data: existingChars, error: fetchError } = await supabase
      .from('bossRade')
      .select('userCharName')
      .eq('userCharName', charNameToAdd)

    if (fetchError) {
      console.error('데이터 조회 오류:', fetchError)
      return 'error'
    }

    if (existingChars && existingChars.length > 0) {
      return 'exists'
    }

    const { error: insertError } = await supabase
      .from('bossRade')
      .insert({ userCharName: charNameToAdd })

    if (insertError) {
      console.error('데이터 행 생성 오류:', insertError)
      return 'error'
    }

    return 'success'
  } catch (error) {
    console.error('데이터 행 생성 중 오류가 발생하였습니다.', error)
    return 'error'
  }
}
