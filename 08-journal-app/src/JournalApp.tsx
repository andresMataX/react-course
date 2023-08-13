import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme/AppTheme'

interface Props {}

export const JournalApp = ({}: Props) => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  )
}
