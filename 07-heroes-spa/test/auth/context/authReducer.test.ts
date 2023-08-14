import { AuthState } from '../../../src/auth/context/AuthContext'

describe('Pruebas en authReducer', () => {
  test('debe de retornar el estado por defecto', () => {
    const initialState: AuthState = {
      logged: false,
    }
  })

  test('debe de (login) llamar el login, autenticar y establecer el User', () => {})

  test('debe de (logout) borrar el name del usuario y logged en false', () => {})
})
