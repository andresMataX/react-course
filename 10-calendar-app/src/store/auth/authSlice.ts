import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated'
  errorMessage?: string
  user: null | string
}

const initialState: AuthState = {
  status: 'checking',
  user: null,
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
    onLogin: (state, { payload }: PayloadAction<string>) => {
      state.status = 'authenticated'
      state.user = payload
      state.errorMessage = undefined
    },
  },
})

export const { onChecking, onLogin } = authSlice.actions
