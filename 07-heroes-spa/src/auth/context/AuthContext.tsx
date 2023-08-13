import { createContext } from 'react'

export interface AuthState {
  logged: boolean
  name?: string
}

export interface AuthContextProps {
  logged: boolean
  name?: string
  login: (name: string) => void
  logout: () => void
}

export const AuthContext = createContext({} as AuthContextProps)
