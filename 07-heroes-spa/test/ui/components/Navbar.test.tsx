import { describe, expect, test } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext, AuthContextProps } from '../../../src/auth'
import { Navbar } from '../../../src/ui'

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}))

describe('Testing in <Navbar.test />', () => {
  const logoutMock = jest.fn()

  const initialState: AuthContextProps = {
    logged: true,
    name: 'Juan',
    login: jest.fn(),
    logout: logoutMock,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('debe de mostrar el nombre del usuario logeado', () => {
    render(
      <AuthContext.Provider value={initialState}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByText('Juan')).toBeTruthy()
  })

  test('debe de llamar el logout y navigate cuando se hace click en el botón', () => {
    render(
      <AuthContext.Provider value={initialState}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    const buttonElement = screen.getByRole('button')
    fireEvent.click(buttonElement)

    expect(logoutMock).toHaveBeenCalled()
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true })
  })
})
