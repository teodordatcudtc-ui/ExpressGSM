import { create } from 'zustand'

interface AuthStore {
  isAuthenticated: boolean
  login: (password: string) => Promise<boolean>
  logout: () => Promise<void>
  checkSession: () => Promise<boolean>
}

export const useAuthStore = create<AuthStore>()(
  (set) => ({
    isAuthenticated: false,
    login: async (password: string) => {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!response.ok) {
        set({ isAuthenticated: false })
        return false
      }
      set({ isAuthenticated: true })
      return true
    },
    logout: async () => {
      await fetch('/api/admin/logout', { method: 'POST' })
      set({ isAuthenticated: false })
    },
    checkSession: async () => {
      const response = await fetch('/api/admin/session', { method: 'GET' })
      if (!response.ok) {
        set({ isAuthenticated: false })
        return false
      }
      const data = await response.json()
      const authenticated = Boolean(data?.isAuthenticated)
      set({ isAuthenticated: authenticated })
      return authenticated
    },
  })
)

