import { create } from 'zustand'

interface AuthStore {
  userToken: string | null
  setUserToken: (token: string) => void
  clearUserToken: () => void
}
export const useAuthStore = create<AuthStore>(set => ({
  userToken: sessionStorage.getItem('userToken'),
  setUserToken: (token: string) => set({ userToken: token }),
  clearUserToken: () => set({ userToken: null })
}))
