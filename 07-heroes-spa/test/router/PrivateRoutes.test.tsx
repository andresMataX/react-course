import { describe, expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import {
  AuthContext,
  AuthContextProps,
} from '../../src/auth/context/AuthContext'
import { PrivateRoutes } from '../../src/router/PrivateRoutes'

describe('Testing in <PrivateRoutes.test />', () => {
  test('debe de mostrar el children si está autenticado', () => {
    Storage.prototype.setItem = jest.fn()

    const initialState: AuthContextProps = {
      logged: true,
      name: 'Juan',
      login: jest.fn(),
      logout: jest.fn(),
    }

    render(
      <AuthContext.Provider value={initialState}>
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRoutes>
            <h1>Ruta privada</h1>
          </PrivateRoutes>
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Ruta privada')).toBeTruthy()
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'lastPath',
      '/search?q=batman'
    )
  })
})
