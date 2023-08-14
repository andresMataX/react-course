import { render, screen } from '@testing-library/react'
import { TodoApp } from '../../src/08-useReducer/TodoApp'
import { useTodos } from '../../src/hooks/useTodos'

jest.mock('../../src/hooks/useTodos')

describe('Pruebas en <TodoApp />', () => {
  useTodos.mockReturnValue({
    todos: [
      {
        id: 1,
        description: 'Demo Todo',
        done: false,
      },
      {
        id: 2,
        description: 'Pepe',
        done: false,
      },
    ],
    todosCount: 2,
    pendingTodosCount: 2,
    handleNewTodo: jest.fn(),
    handleDeleteTodo: jest.fn(),
    handleToggleTodo: jest.fn(),
  })

  test('debe de mostrar el componente correctamente', () => {
    render(<TodoApp />)

    expect(screen.getByText('Demo Todo')).toBeTruthy()
    expect(screen.getByText('Pepe')).toBeTruthy()
  })
})
