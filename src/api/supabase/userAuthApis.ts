import axios from 'axios'
import { supabase } from './client'
// import { insertPlayer } from './playerDataApi'

export const signUpSupabaseWithEmail = async (
  // username: string,
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
    }

    return { success: true, data }
  } catch (error) {
    console.error('회원가입 중 예상치 못한 오류가 발생하였습니다.', error)
  }
}

export const getUser = async (accessToken: string) => {
  try {
    const response = await axios.get(
      'https://ukvtwsfrzgcxhfkuqjan.supabase.co/auth/v1/user',
      {
        headers: {
          'Content-Type': 'application/json',
          apikey: import.meta.env.VITE_SUPABASE_API_KEY,
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    return response
  } catch (error) {
    console.error('사용자 정보를 가져오는데 실패하였습니다.:', error)
    return null
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
