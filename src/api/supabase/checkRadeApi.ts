import { supabase } from './client'

export const loadCheckRade = async (nickname: string) => {
  try {
    const { data: bossRade, error } = await supabase
      .from('bossRade')
      .select('*')
      .eq('userCharName', nickname)

    if (error) {
      console.error('레이드 데이터 로딩 오류 :', error)
    }

    return bossRade
  } catch (error) {
    console.error(
      '레이드 데이터를 불러오는 중 예상치 못한 오류가 발생하였습니다.',
      error
    )
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

// const rowData = {
//   userCharName: '기상',
//   Valtan: true,
//   Biackiss: false,
//   Kouku_Saton: true,
//   Abrelshud: false,
//   Kayangel: false,
//   Illiakan: true,
//   Ivory_Tower: true,
//   Kamen: false,
//   Echidna: true
// }

export const insertRadeRowData = async (charNameToAdd: string) => {
  try {
    const { error } = await supabase
      .from('bossRade')
      .insert({ userCharName: charNameToAdd })

    if (error) {
      console.error('데이터 행 생성 오류:', error)
    }
  } catch (error) {
    console.error('데이터 행 생성 중 오류가 발생하였습니다.', error)
  }
}
