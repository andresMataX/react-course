import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/'
import './index.css'
import { PokemonApp } from './PokemonApp'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <PokemonApp />
      {/* <TodoApp /> */}
    </Provider>
  </React.StrictMode>
)
