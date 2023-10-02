import {
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from '../../../src/firebase/providers'
import { checkingCredentials, login, logout } from '../../../src/store'
import {
  checkingAuthentication,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLogout,
} from '../../../src/store/auth/thunks'
import { clearNotesLogout } from '../../../src/store/journal'
import { authenticatedState } from '../../fixtures/authFixture'

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
    const loginData = { ok: true, ...authenticatedState }

    await signInWithGoogle.mockResolvedValue(loginData)

    const callback = startGoogleSignIn()
    await callback(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(authenticatedState))
  })

  test('startGoogleSignIn debe de llamar checkingCredentials y login - Error', async () => {
    const loginData = { ok: false }

    await signInWithGoogle.mockResolvedValue(loginData)

    const callback = startGoogleSignIn()
    await callback(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout())
  })

  test('startCreatingUserWithEmailPassword debe de crear un usuario', async () => {
    const formData = {
      email: authenticatedState.email!,
      password: '123456',
      displayName: authenticatedState.displayName!,
    }

    const loginData = {
      ok: true,
      uid: '1234567890',
      photoURL: 'https://example.com/photo.jpg',
      errorMessage: null,
    }

    await registerUserWithEmailPassword.mockResolvedValue(loginData)

    const callback = startCreatingUserWithEmailPassword(formData)
    await callback(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(authenticatedState))
  })

  test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {
    const callback = startLogout()
    await callback(dispatch)

    expect(logoutFirebase).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
    expect(dispatch).toHaveBeenCalledWith(logout())
  })
})
