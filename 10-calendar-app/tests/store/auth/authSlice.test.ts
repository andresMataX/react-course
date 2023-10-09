import { authSlice, onLogin, onLogout } from '../../../src/store/auth/authSlice'
import { authenticatedState, initialState } from '../../fixtures/authStates'
import { testUserCredentials } from '../../fixtures/testUser'
describe('Pruebas en authSlice', () => {
  test('debe de regresar el estado inicial', () => {
    expect(authSlice.getInitialState()).toEqual(initialState)
  })

  test('debe de realizar el login', () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials))

    expect(state).toEqual({
      status: 'authenticated',
      user: testUserCredentials,
      errorMessage: undefined,
    })
  })

  test('debe de realizar el logout', () => {
    const state = authSlice.reducer(authenticatedState, onLogout())

    expect(state).toEqual({
      status: 'not-authenticated',
      user: null,
      errorMessage: undefined,
    })
  })

  test('debe de realizar el logout con mensaje', () => {
    const msg = 'Credenciales no válidas'

    const state = authSlice.reducer(authenticatedState, onLogout(msg))

    expect(state).toEqual({
      status: 'not-authenticated',
      user: null,
      errorMessage: msg,
    })
  })
})
