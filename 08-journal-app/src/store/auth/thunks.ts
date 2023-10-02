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
        displayName: result.displayName!,
        email: result.email!,
        photoURL: result.photoURL!,
        uid: result.uid!,
        errorMessage: null,
        status: 'authenticated',
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

    if (!ok) return dispatch(logout())

    dispatch(
      login({
        displayName,
        email,
        photoURL: photoURL!,
        uid: uid!,
        errorMessage: errorMessage,
        status: 'authenticated',
      })
    )
  }
}

export const startLoginWithEmailPassword = ({ email = '', password = '' }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())

    const result = await loginWithEmailPassword({ email, password })

    if (!result.ok) return dispatch(logout())

    dispatch(
      login({
        uid: result.uid!,
        displayName: result.displayName!,
        photoURL: result.photoURL!,
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
