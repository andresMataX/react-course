import { AppDispatch } from '../store'
import { checkingCredentials, login, logout } from './authSlice'
import {
  loginWithEmailPassword,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from '../../firebase/providers'
import { FormData } from '../../auth/pages'
import { logoutFirebase } from '../../firebase/providers'
import { clearNotesLogout } from '../journal'

export const checkingAuthentication = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())

    const result = await signInWithGoogle()

    if (!result.ok) return dispatch(logout(result.errorMessage))

    dispatch(
      login({
        displayName: result.displayName,
        email: result.email,
        photoURL: result.photoURL,
        uid: result.uid,
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

    dispatch(login({ displayName, email, photoURL, uid, errorMessage }))
  }
}

export const startLoginWithEmailPassword = ({ email = '', password = '' }) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())

    const result = await loginWithEmailPassword({ email, password })

    if (!result.ok) return dispatch(logout(result.errorMessage))

    dispatch(
      login({
        uid: result.uid,
        displayName: result.displayName,
        photoURL: result.photoURL,
        email,
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
