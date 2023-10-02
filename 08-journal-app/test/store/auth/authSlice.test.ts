import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from '../../../src/store/auth/authSlice'
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from '../../fixtures/authFixture'

describe('Pruebas en el authSlice', () => {
  test('debe de regresar el estado inicial y llamarse "Auth"', () => {
    expect(authSlice.name).toBe('auth')

    const state = authSlice.reducer(initialState, {
      type: 'test',
    })

    expect(state).toEqual(initialState)
  })

  test('debe de realizar la autenticación', () => {
    const state = authSlice.reducer(initialState, login(authenticatedState))

    expect(state).toEqual({
      uid: authenticatedState.uid,
      displayName: authenticatedState.displayName,
      email: authenticatedState.email,
      photoURL: authenticatedState.photoURL,
      errorMessage: null,
      status: 'authenticated',
    })
  })

  test('debe de realizar el logout', () => {
    const state = authSlice.reducer(authenticatedState, logout())

    expect(state).toEqual(notAuthenticatedState)
  })

  test('debe de cambiar el estado a checking', () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials())

    expect(state.status).toBe('checking')
  })
})
