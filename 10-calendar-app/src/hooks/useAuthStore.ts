import { calendarAPI } from '../api'
import { useAppDispatch, useAppSelector } from '../store'
import { onChecking, onLogin, onLogout } from '../store/auth'
import { onLogoutCalendar } from '../store/calendar'

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

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token')

    if (!token) return dispatch(onLogout())

    try {
      const { data } = await calendarAPI.get('/auth/renew')

      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime().toString())

      dispatch(onLogin({ name: data.name, uid: data.uid }))
    } catch (error) {
      localStorage.clear()
      dispatch(onLogout())
    }
  }

  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogoutCalendar())
    dispatch(onLogout())
  }

  return {
    status,
    user,
    errorMessage,
    startLogin,
    checkAuthToken,
    startLogout,
  }
}
