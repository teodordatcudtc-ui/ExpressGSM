import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  product_id: number
  product_name: string
  price: number
  image?: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items
        const existingItem = items.find(i => i.product_id === item.product_id)
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.product_id === item.product_id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          })
        } else {
          set({ items: [...items, item] })
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter(i => i.product_id !== productId) })
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
        } else {
          set({
            items: get().items.map(i =>
              i.product_id === productId ? { ...i, quantity } : i
            )
          })
        }
      },
      clearCart: () => {
        set({ items: [] })
      },
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

