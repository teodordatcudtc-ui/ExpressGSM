import { create } from 'zustand'

interface AuthStore {
  isAuthenticated: boolean
  login: (password: string) => Promise<{ success: boolean; error?: string }>
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
        let message = 'Parolă incorectă'
        try {
          const data = await response.json()
          if (typeof data?.error === 'string' && data.error.trim()) {
            message = data.error
          }
        } catch {
          // Ignore parse errors and keep fallback message
        }
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After')
          const retrySeconds = retryAfter ? Number.parseInt(retryAfter, 10) : NaN
          if (Number.isFinite(retrySeconds) && retrySeconds > 0) {
            const retryMinutes = Math.ceil(retrySeconds / 60)
            message = `Prea multe încercări. Încearcă din nou în aproximativ ${retryMinutes} minute.`
          }
        }
        return { success: false, error: message }
      }
      set({ isAuthenticated: true })
      return { success: true }
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

