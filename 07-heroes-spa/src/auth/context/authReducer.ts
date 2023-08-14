import { AuthState } from './AuthContext'

export type AuthAction = { type: 'login'; payload: string } | { type: 'logout' }

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        logged: true,
        name: action.payload,
      }
    case 'logout':
      return {
        logged: false,
      }
    default:
      return state
  }
}
