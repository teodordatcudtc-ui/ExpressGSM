import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  phone: string
  country: string
  county: string
  city: string
  address: string
}

interface UserStore {
  user: User | null
  userId: number | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: {
    email: string
    password: string
    first_name: string
    last_name: string
    phone: string
    country: string
    county: string
    city: string
    address: string
  }) => Promise<boolean>
  logout: () => void
  fetchUserData: () => Promise<void>
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      userId: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
          
          if (!response.ok) {
            return false
          }
          
          const data = await response.json()
          set({ 
            user: data.user, 
            userId: data.user.id,
            isAuthenticated: true 
          })
          return true
        } catch (error) {
          console.error('Login error:', error)
          return false
        }
      },
      
      register: async (userData) => {
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          })
          
          if (!response.ok) {
            return false
          }
          
          const data = await response.json()
          set({ 
            user: data.user, 
            userId: data.user.id,
            isAuthenticated: true 
          })
          return true
        } catch (error) {
          console.error('Register error:', error)
          return false
        }
      },
      
      logout: () => {
        set({ user: null, userId: null, isAuthenticated: false })
      },
      
      fetchUserData: async () => {
        const state = get()
        if (!state.userId) {
          set({ user: null, isAuthenticated: false })
          return
        }
        
        try {
          const response = await fetch(`/api/auth/me?userId=${state.userId}`)
          if (response.ok) {
            const data = await response.json()
            set({ 
              user: data.user, 
              userId: data.user.id,
              isAuthenticated: true 
            })
          } else {
            set({ user: null, userId: null, isAuthenticated: false })
          }
        } catch (error) {
          console.error('Fetch user data error:', error)
          set({ user: null, userId: null, isAuthenticated: false })
        }
      },
    }),
    {
      name: 'user-storage',
    }
  )
)
