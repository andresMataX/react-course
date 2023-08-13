import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  status?: 'checking' | 'not-authenticated' | 'authenticated'
  email?: string | null
  displayName?: string | null
  photoURL?: string | null
  errorMessage?: string | null
  uid?: string | null
}

const initialState: AuthState = {
  status: 'checking',
  displayName: null,
  email: null,
  errorMessage: null,
  photoURL: null,
  uid: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.status = 'authenticated'
      state.uid = action.payload.uid
      state.email = action.payload.email
      state.displayName = action.payload.displayName
      state.photoURL = action.payload.photoURL
      state.errorMessage = action.payload.errorMessage
    },
    logout: (state) => {
      state.status = 'not-authenticated'
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
    },
    checkingCredentials: (state) => {
      state.status = 'checking'
    },
  },
})

export const { login, logout, checkingCredentials } = authSlice.actions
