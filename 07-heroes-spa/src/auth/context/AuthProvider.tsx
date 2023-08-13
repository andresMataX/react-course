import { useReducer } from 'react'
import { AuthContext, AuthState } from './AuthContext'
import { authReducer } from './authReducer'

interface Props {
  children: JSX.Element
}

export const authInitialState: AuthState = {
  logged: false,
}

const init = (): AuthState => {
  const username = localStorage.getItem('name') || undefined

  return {
    logged: !!username,
    name: username,
  }
}

export const AuthProvider = ({ children }: Props) => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState, init)

  const login = (name: string) => {
    localStorage.setItem('name', name)

    dispatch({ type: 'login', payload: name })
  }

  const logout = () => {
    localStorage.removeItem('name')

    dispatch({ type: 'logout' })
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
