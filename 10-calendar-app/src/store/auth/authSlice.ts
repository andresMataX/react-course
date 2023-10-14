import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated'
  errorMessage?: string
  user: null | User
}

const initialState: AuthState = {
  status: 'checking',
  user: null,
}

interface User {
  name: string
  uid: string
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking'
      state.user = null
      state.errorMessage = undefined
    },
    onLogin: (state, { payload }: PayloadAction<User>) => {
      state.status = 'authenticated'
      state.user = payload
      state.errorMessage = undefined
    },
    onLogout: (state, { payload }: PayloadAction<string | undefined>) => {
      state.status = 'not-authenticated'
      state.user = null
      state.errorMessage = payload
    },
    onClearErrorMessage: (state) => {
      state.errorMessage = undefined
    },
  },
})

export const { onChecking, onLogin, onLogout, onClearErrorMessage } =
  authSlice.actions
