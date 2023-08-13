import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { mainTheme } from './mainTheme'

interface Props {
  children: JSX.Element
}

export const AppTheme = ({ children }: Props) => {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  )
}
