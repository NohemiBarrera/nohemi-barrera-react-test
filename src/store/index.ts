import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import productsReducer from './slices/productsSlice'
import { logout } from './slices/authSlice'

const rootReducer = {
  auth: authReducer,
  products: productsReducer,
}

export const store = configureStore({
  reducer: (state, action) => {
    // Clear all state when logging out
    if (action.type === logout.type) {
      // Clear localStorage
      localStorage.clear()

      // Return initial state for all reducers
      return Object.keys(rootReducer).reduce((acc, key) => {
        acc[key] = rootReducer[key](undefined, action)
        return acc
      }, {})
    }

    return Object.keys(rootReducer).reduce((acc, key) => {
      acc[key] = rootReducer[key](state?.[key], action)
      return acc
    }, {})
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch