import { Route, Routes, Navigate } from 'react-router-dom'
import { JournalPage } from '../pages/JournalPage'
interface Props {}

export const JournalRoutes = ({}: Props) => {
  return (
    <Routes>
      <Route path="/" element={<JournalPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
