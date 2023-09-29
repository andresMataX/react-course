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
  errorMessage: 'No autenticado',
  photoURL: null,
  uid: null,
}

export const demoUser: AuthState = {
  uid: '1234567890',
  displayName: 'Test User',
  email: 'test@gmail.com',
  photoURL: 'https://example.com/photo.jpg',
  errorMessage: null,
  status: 'not-authenticated',
}
