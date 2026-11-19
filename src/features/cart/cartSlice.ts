import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { CartItem, Product } from '../../types'

interface CartState {
  items: CartItem[]
}

const initialState: CartState = { items: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.items.find(({ product }) => product.id === action.payload.id)
      if (item) item.quantity += 1
      else state.items.push({ product: action.payload, quantity: 1 })
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(({ product }) => product.id !== action.payload)
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) => {
      const item = state.items.find(({ product }) => product.id === action.payload.productId)
      if (!item) return
      if (action.payload.quantity <= 0) {
        state.items = state.items.filter(({ product }) => product.id !== action.payload.productId)
      } else {
        item.quantity = action.payload.quantity
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

const selectCartItems = (state: RootState) => state.cart.items

export const selectCartQuantity = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
)

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.product.price * item.quantity, 0),
)

export default cartSlice.reducer
