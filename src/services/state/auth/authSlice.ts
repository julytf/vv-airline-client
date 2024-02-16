import { IUser } from '@/interfaces/user.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import authService from '@/services/auth.service'

interface AuthState {
  isInitialized?: boolean
  isAuthenticated?: boolean
  tokenName?: string
  accessToken?: string | null
  user?: IUser | null
}
const initialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  tokenName: 'accessToken',
  accessToken: null,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<AuthState>) => {
      const { isAuthenticated, user, accessToken, tokenName } = action.payload
      localStorage.setItem(tokenName!, accessToken || '')

      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
        tokenName,
        accessToken,
      }
    },
    login: (state, action: PayloadAction<AuthState>) => {
      const { user, accessToken } = action.payload
      console.log(state.tokenName)
      localStorage.setItem(state.tokenName!, accessToken || '')

      return {
        ...state,
        isAuthenticated: true,
        user,
        accessToken,
      }
    },
    logout: (state) => {
      localStorage.removeItem(state.tokenName!)
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
      }
    },
  },
})

export const { initialize, login, logout } = authSlice.actions

export default authSlice.reducer
