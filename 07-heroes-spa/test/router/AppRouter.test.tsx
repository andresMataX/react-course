import { describe, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext, AuthContextProps } from '../../src/auth'
import { AppRouter } from '../../src/router/AppRouter'

describe('Testing in <AppRouter.test />', () => {
  test('debe de mostrar el login si no está autenticado', () => {
    const initialState: AuthContextProps = {
      logged: false,
      login: jest.fn(),
      logout: jest.fn(),
    }

    render(
      <AuthContext.Provider value={initialState}>
        <MemoryRouter initialEntries={['/marvel']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getAllByText('Login').length).toBe(2)
  })

  test('debe de mostrar el componente de marvel si está autenticado', () => {
    const initialState: AuthContextProps = {
      logged: true,
      name: 'Juan',
      login: jest.fn(),
      logout: jest.fn(),
    }

    render(
      <AuthContext.Provider value={initialState}>
        <MemoryRouter initialEntries={['/login']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Marvel Comics')).toBeTruthy()
  })
})
