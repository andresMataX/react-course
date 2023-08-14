import { render, screen } from '@testing-library/react'
import { UserContext } from '../../src/09-useContext/context/UserContext'
import { HomePage } from '../../src/09-useContext/HomePage'

describe('Pruebas en <HomePage />', () => {
  const user = {
    id: 1,
    name: 'Andrés',
  }

  test('debe de renderizar el componente sin el usuario', () => {
    render(
      <UserContext.Provider value={{ user: null }}>
        <HomePage />
      </UserContext.Provider>
    )

    const preTagElement = screen.getByLabelText('pre')

    expect(preTagElement.innerHTML).toBe('null')
  })

  test('debe de renderizar el componente con el usuario', () => {
    render(
      <UserContext.Provider value={{ user }}>
        <HomePage />
      </UserContext.Provider>
    )

    const preTagElement = screen.getByLabelText('pre')

    expect(preTagElement.innerHTML).toContain(user.name)
    expect(preTagElement.innerHTML).toContain(`${user.id}`)
  })
})
