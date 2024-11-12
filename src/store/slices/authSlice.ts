import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import CryptoJS from 'crypto-js'
import { AuthState, User } from '../../types'

const ENCRYPTION_KEY = 'your-secret-key'

const encryptData = (data: User) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString()
}

const decryptData = (encryptedData: string): User | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  } catch (error) {
    return null
  }
};

// Get initial state from localStorage
const getInitialState = (): AuthState => {
  const encryptedUser = localStorage.getItem('user')
  const lastActivity = localStorage.getItem('lastActivity')
  
  if (encryptedUser && lastActivity) {
    const user = decryptData(encryptedUser)
    const lastActivityTime = parseInt(lastActivity, 10)
    const currentTime = Date.now()
    const inactivityTimeout = 300000; // 5 minutes

    if (user && currentTime - lastActivityTime < inactivityTimeout) {
      return {
        user,
        isAuthenticated: true,
        lastActivity: lastActivityTime,
      }
    }
  }

  // Clear localStorage if session is invalid or expired
  localStorage.removeItem('user')
  localStorage.removeItem('lastActivity')
  
  return {
    user: null,
    isAuthenticated: false,
    lastActivity: Date.now(),
  };
};

const initialState: AuthState = getInitialState()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      const encryptedUser = encryptData(action.payload)
      const currentTime = Date.now()
      
      localStorage.setItem('user', encryptedUser);
      localStorage.setItem('lastActivity', currentTime.toString())
      
      state.user = action.payload
      state.isAuthenticated = true
      state.lastActivity = currentTime
    },
    logout: (state) => {
      // localStorage.removeItem('user');
      // localStorage.removeItem('lastActivity');
      localStorage.clear()
      
      state.user = null
      state.isAuthenticated = false
    },
    updateLastActivity: (state) => {
      const currentTime = Date.now()
      localStorage.setItem('lastActivity', currentTime.toString())
      state.lastActivity = currentTime
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const encryptedUser = encryptData(action.payload)
      localStorage.setItem('user', encryptedUser)
      state.user = action.payload
    },
  },
});

export const { login, logout, updateLastActivity, updateUser } = authSlice.actions
export default authSlice.reducer