import { supabase } from './client'

export const signUpSupabaseWithEmail = async (
  email: string,
  password: string
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // emailRedirectTo: 'http://localhost:5173/'
      }
    })

    if (error) {
      console.error('회원가입 오류 :', error.message)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('회원가입 중 예상치 못한 오류가 발생하였습니다.', error)
  }
}

export const signinUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      console.error('로그인 오류 :', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('로그인 중 예상치 못한 오류가 발생하였습니다.', error)
    return { success: false, error }
  }
}

export const singOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('로그아웃 오류 :', error)
    }
  } catch (error) {
    console.error('로그아웃 중 예상치 못한 오류가 발생하였습니다.', error)
  }
}
