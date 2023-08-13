import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { FirebaseAuth } from '../firebase/config'
import { useAppSelector, useAppDispatch, logout, login } from '../store'
import { startLoadingNotes } from '../store/journal/thunks'

export const useCheckAuth = () => {
  const { status } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout())

      const { uid, email, displayName, photoURL } = user

      dispatch(login({ uid, email, displayName, photoURL }))
      dispatch(startLoadingNotes())
    })
  }, [])

  return status
}
