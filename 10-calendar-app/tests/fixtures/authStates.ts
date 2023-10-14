import { AuthState } from '../../src/store/auth/authSlice'

export const authInitialState: AuthState = {
  status: 'checking',
  user: null,
}

export const authenticatedState: AuthState = {
  status: 'authenticated',
  user: {
    name: 'pepe',
    uid: '123456',
  },
}

export const notAuthenticatedState: AuthState = {
  status: 'not-authenticated',
  user: null,
}
