import { AuthState } from '../../../src/auth/context/AuthContext'
import { AuthAction, authReducer } from '../../../src/auth/context/authReducer'

describe('Pruebas en authReducer', () => {
  const initialState: AuthState = {
    logged: false,
  }

  test('debe de retornar el estado por defecto', () => {
    const state = authReducer(initialState, { type: '' })

    expect(state).toBe(initialState)
  })

  test('debe de (login) llamar el login, autenticar y establecer el User', () => {
    const action: AuthAction = { type: 'login', payload: 'gatuto' }

    const newState = authReducer(initialState, action)

    expect(newState).toEqual({
      logged: true,
      name: action.payload,
    })
  })

  test('debe de (logout) borrar el name del usuario y logged en false', () => {
    const action: AuthAction = { type: 'logout' }

    const newState = authReducer(initialState, action)

    expect(newState).toEqual({
      logged: false,
    })
  })
})
