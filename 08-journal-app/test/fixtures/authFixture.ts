import { AuthState } from '../../src/store/auth/authSlice'

export const initialState: AuthState = {
  status: 'checking',
  displayName: null,
  email: null,
  errorMessage: null,
  photoURL: null,
  uid: null,
}

export const authenticatedState: AuthState = {
  status: 'authenticated',
  displayName: 'Test User',
  email: 'test@gmail.com',
  errorMessage: null,
  photoURL: 'https://example.com/photo.jpg',
  uid: '1234567890',
}

export const notAuthenticatedState: AuthState = {
  status: 'not-authenticated',
  displayName: null,
  email: null,
  errorMessage: null,
  photoURL: null,
  uid: null,
}
