import { describe, expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { useAuthStore } from '../../src/hooks/useAuthStore'
import { AppRouter } from '../../src/routes/AppRouter'

jest.mock('react-modal')
jest.mock('../../src/hooks/useAuthStore')
jest.mock('../../src/calendar/pages/Calendar', () => ({
  CalendarPage: () => <h1>CalendarPage</h1>,
}))

const useAuthStoreMocked = jest.mocked(useAuthStore)

describe('Testing in <AppRouter />', () => {
  const mockCheckAuthToken = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {
    useAuthStoreMocked.mockReturnValue({
      user: null,
      checkAuthToken: mockCheckAuthToken,
      errorMessage: undefined,
      startLogin: jest.fn(),
      status: 'checking',
      startLogout: jest.fn(),
    })

    render(<AppRouter />)

    expect(screen.getByText('Loading...')).toBeTruthy()
    expect(mockCheckAuthToken).toHaveBeenCalled()
  })

  test('debe de mostrar el login si no estoy autenticado', () => {
    useAuthStoreMocked.mockReturnValue({
      status: 'not-authenticated',
      user: null,
      checkAuthToken: mockCheckAuthToken,
      errorMessage: undefined,
      startLogin: jest.fn(),
      startLogout: jest.fn(),
    })

    const { container } = render(
      <MemoryRouter initialEntries={['/pepe/poto']}>
        <AppRouter />
      </MemoryRouter>
    )

    expect(screen.getByText('Ingreso')).toBeTruthy()
    expect(container).toMatchSnapshot()
  })

  test('debe de mostrar el calendarion si estamos autenticados', () => {
    useAuthStoreMocked.mockReturnValue({
      status: 'authenticated',
      user: null,
      checkAuthToken: mockCheckAuthToken,
      errorMessage: undefined,
      startLogin: jest.fn(),
      startLogout: jest.fn(),
    })

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    )

    expect(screen.getByText('CalendarPage')).toBeTruthy()
  })
})
