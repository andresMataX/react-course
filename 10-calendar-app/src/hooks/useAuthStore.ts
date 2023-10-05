import { calendarAPI } from '../api'
import { useAppDispatch, useAppSelector } from '../store'
import { onChecking, onLogin, onLogout } from '../store/auth'

export const useAuthStore = () => {
  const { status, user, errorMessage } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const startLogin = async (email = '', password = '') => {
    dispatch(onChecking())

    try {
      const { data } = await calendarAPI.post('/auth', { email, password })

      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime().toString())

      dispatch(onLogin({ name: data.name, uid: data.uid }))
    } catch (error) {
      dispatch(onLogout('Las credenciales no son válidas'))
    }
  }

  return {
    status,
    user,
    errorMessage,
    startLogin,
  }
}
