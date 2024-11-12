import { configureStore, AnyAction } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import productsReducer from './slices/productsSlice'
import { logout } from './slices/authSlice'
import { AuthState, ProductsState } from '../types'

interface RootReducer {
  auth: AuthState
  products: ProductsState
}

const rootReducer = {
  auth: authReducer,
  products: productsReducer,
} as const

const createInitialState = (): RootReducer => ({
  auth: authReducer(undefined, { type: '' }),
  products: productsReducer(undefined, { type: '' }),
})

export const store = configureStore({
  reducer: (state: RootReducer | undefined, action: AnyAction): RootReducer => {
    if (action.type === logout.type) {
      localStorage.clear()
      return createInitialState()
    }

    const currentState = state ?? createInitialState()
    return {
      auth: authReducer(currentState.auth, action),
      products: productsReducer(currentState.products, action),
    }
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch