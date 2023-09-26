import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import {
  AuthContext,
  AuthContextProps,
} from '../../src/auth/context/AuthContext'
import { PublicRoutes } from '../../src/router/PublicRoutes'

describe('Pruebas en <PublicRoutes />', () => {
  test('debe de mostrar el children si no está autenticado', () => {
    const initialState: AuthContextProps = {
      logged: false,
      login: jest.fn(),
      logout: jest.fn(),
    }

    render(
      <AuthContext.Provider value={initialState}>
        <PublicRoutes>
          <h1>Ruta pública</h1>
        </PublicRoutes>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Ruta pública')).toBeTruthy()
  })

  test('debe de navegar si está autenticado', () => {
    const initialState: AuthContextProps = {
      logged: true,
      name: 'Juan',
      login: jest.fn(),
      logout: jest.fn(),
    }

    render(
      <AuthContext.Provider value={initialState}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route
              path="login"
              element={
                <PublicRoutes>
                  <h1>Ruta pública</h1>
                </PublicRoutes>
              }
            />

            <Route path="marvel" element={<h1>Página Marvel</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.queryByText('Página Marvel')).toBeTruthy()
  })
})
