import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Product } from '../../types'

interface ProductsState {
  items: Product[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
}

function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false
  const product = value as Record<string, unknown>
  return (
    typeof product.id === 'number' &&
    typeof product.title === 'string' &&
    typeof product.price === 'number' &&
    typeof product.description === 'string' &&
    typeof product.category === 'string' &&
    typeof product.image === 'string'
  )
}

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    if (!response.ok) {
      return rejectWithValue(`Không thể tải sản phẩm (HTTP ${response.status}).`)
    }

    const data: unknown = await response.json()
    if (!Array.isArray(data) || !data.every(isProduct)) {
      return rejectWithValue('Dữ liệu sản phẩm từ máy chủ không hợp lệ.')
    }
    return data
  } catch (error) {
    if (error instanceof Error) return rejectWithValue(error.message)
    return rejectWithValue('Đã xảy ra lỗi khi tải sản phẩm.')
  }
})

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message ?? 'Đã xảy ra lỗi.'
      })
  },
})

export default productsSlice.reducer
