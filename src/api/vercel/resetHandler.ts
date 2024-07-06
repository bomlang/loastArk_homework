import { supabase } from '../supabase'

export default async function handler() {
  const { error } = await supabase
    .from('bossRade')
    .update({
      Valtan: false,
      Biackiss: false,
      Kouku_Saton: false,
      Abrelshud: false,
      Kayangel: false,
      Illiakan: false,
      Ivory_Tower: false,
      Kamen: false,
      Echidna: false
    })
    .eq('isChecked', true)

  if (error) {
    console.error(
      '<bossRade>테이블의 데이터를 초기화하는 작업에 실패하였습니다.',
      error
    )
  }
}
