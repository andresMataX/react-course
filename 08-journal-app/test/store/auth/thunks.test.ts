import { signInWithGoogle } from '../../../src/firebase/providers'
import { checkingCredentials, login, logout } from '../../../src/store'
import {
  checkingAuthentication,
  startGoogleSignIn,
} from '../../../src/store/auth/thunks'
import { demoUser } from '../../fixtures/authFixture'

jest.mock('../../../src/firebase/providers')

describe('Pruebas en authThunks', () => {
  const dispatch = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('debe de invocar el checking credentials', async () => {
    const callback = checkingAuthentication()
    await callback(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  })

  test('startGoogleSignIn debe de llamar checkingCredentials y login - Éxito', async () => {
    const loginData = { ok: true, ...demoUser }

    await signInWithGoogle.mockResolvedValue(loginData)

    const callback = startGoogleSignIn()
    await callback(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(demoUser))
  })

  test('startGoogleSignIn debe de llamar checkingCredentials y login - Error', async () => {
    const loginData = { ok: false }

    await signInWithGoogle.mockResolvedValue(loginData)

    const callback = startGoogleSignIn()
    await callback(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout())
  })
})
