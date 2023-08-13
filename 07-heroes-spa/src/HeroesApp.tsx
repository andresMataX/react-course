import { AppRouter } from './router/AppRouter'
import { AuthProvider } from './auth/context/AuthProvider'

interface Props {}

export const HeroesApp = ({}: Props) => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
