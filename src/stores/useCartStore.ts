import { create } from 'zustand'

interface CartState {
    cart: ProductExtra[]
    setCart: (cartData: ProductExtra[]) => void
}

export const useCounterStore = create<CartState>((set) => ({
    cart: [],
    setCart: (cartData) => set({ cart: cartData })
}))
