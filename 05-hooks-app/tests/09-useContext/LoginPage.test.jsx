import { fireEvent, render, screen } from '@testing-library/react'
import { LoginPage } from '../../src/09-useContext/LoginPage'
import { UserContext } from '../../src/09-useContext/context/UserContext'

describe('Pruebas en <LoginPage />', () => {
  test('debe de mostrar el componente sin el usuario', () => {
    render(
      <UserContext.Provider value={{ user: null }}>
        <LoginPage />
      </UserContext.Provider>
    )

    const preTagElement = screen.getByLabelText('pre')

    expect(preTagElement.innerHTML).toBe('null')
  })

  test('debe de llamar el setUser cuando se hace clic en el botón', () => {
    const user = { id: 123, name: 'Juan', email: 'juan@google.com' }

    const setUserMock = jest.fn()

    render(
      <UserContext.Provider value={{ user, setUser: setUserMock }}>
        <LoginPage />
      </UserContext.Provider>
    )

    const buttonElement = screen.getByRole('button')

    fireEvent.click(buttonElement)

    expect(setUserMock).toHaveBeenCalledWith(user)
  })
})
