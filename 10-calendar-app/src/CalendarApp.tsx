import { Provider } from 'react-redux'
import { AppRouter } from './routes/'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'

interface Props {}

export const CalendarApp = ({}: Props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
