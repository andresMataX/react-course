import { FormData } from '../../auth/pages'
import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from '../../firebase/providers'
import { clearNotesLogout } from '../journal'
import { AppDispatch } from '../store'
import { checkingCredentials, login, logout } from './authSlice'

export const checkingAuthentication = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())

    const result = await signInWithGoogle()

    if (!result.ok) return dispatch(logout())

    dispatch(
      login({
        displayName: result.displayName || null,
        email: result.email || null,
        photoURL: result.photoURL || null,
        uid: result.uid || null,
        errorMessage: null,
        status: 'not-authenticated',
      })
    )
  }
}

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}: FormData) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())

    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        displayName,
        email,
        password,
      })

    if (!ok) return dispatch(logout(errorMessage))

    dispatch(
      login({
        displayName,
        email,
        photoURL: photoURL || null,
        uid: uid || null,
        errorMessage,
        status: 'not-authenticated',
      })
    )
  }
}

export const startLoginWithEmailPassword = ({ email = '', password = '' }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())

    const result = await loginWithEmailPassword({ email, password })

    if (!result.ok) return dispatch(logout(result.errorMessage))

    dispatch(
      login({
        uid: result.uid || null,
        displayName: result.displayName || null,
        photoURL: result.photoURL || null,
        email,
        errorMessage: null,
        status: 'not-authenticated',
      })
    )
  }
}

export const startLogout = () => {
  return async (dispatch: AppDispatch) => {
    await logoutFirebase()

    dispatch(clearNotesLogout())
    dispatch(logout())
  }
}
