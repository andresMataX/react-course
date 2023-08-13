import React from 'react'
import ReactDOM from 'react-dom/client'

import { CounterApp } from './CounterApp'
// import { FirstApp } from './FirstApp'

// Estilos globales de la aplicación
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CounterApp value={0} />
    {/* <FirstApp title="Momos" /> */}
  </React.StrictMode>
)
