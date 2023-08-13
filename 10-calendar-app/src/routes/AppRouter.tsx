import { Route, Routes, Navigate } from 'react-router-dom'
import { Login } from '../auth/'
import { CalendarPage } from '../calendar'

interface Props {}

export const AppRouter = ({}: Props) => {
  const authStatus = 'authenticated'

  return (
    <Routes>
      {authStatus === 'not-authenticated' ? (
        <Route path="/auth/*" element={<Login />} />
      ) : (
        <Route path="/*" element={<CalendarPage />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
