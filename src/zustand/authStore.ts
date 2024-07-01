import { create } from 'zustand'

interface AuthStore {
  userToken: string | null
  setUserToken: (token: string) => void
  clearUserToken: () => void
}

export const useAuthStore = create<AuthStore>(set => ({
  userToken: sessionStorage.getItem('userToken'),
  setUserToken: (token: string) => {
    sessionStorage.setItem('userToken', token)
    set({ userToken: token })
  },
  clearUserToken: () => {
    sessionStorage.removeItem('userToken')
    sessionStorage.removeItem('refreshToken')
    set({ userToken: null })
  }
}))
