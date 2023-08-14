import { fireEvent, render, screen } from '@testing-library/react'
import { TodoItem } from '../../src/08-useReducer/TodoItem'

describe('Pruebas en <TodoItem />', () => {
  const todo = {
    id: 1,
    description: 'Demo Todo',
    done: false,
  }

  const onDeleteTodoMock = jest.fn()
  const onToggleTodoMock = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('debe de mostrar el TODO a completar', () => {
    render(
      <TodoItem
        todo={todo}
        onDeleteTodo={onDeleteTodoMock}
        onToggleTodo={onToggleTodoMock}
      />
    )

    const liElement = screen.getByRole('listitem')
    const spanElement = screen.getByLabelText('span')

    expect(liElement.className).toBe(
      'list-group-item d-flex justify-content-between'
    )

    expect(spanElement.className.trim()).toBe('align-self-center')
  })

  test('debe de mostrar el TODO completado', () => {
    todo.done = true

    render(
      <TodoItem
        todo={todo}
        onDeleteTodo={onDeleteTodoMock}
        onToggleTodo={onToggleTodoMock}
      />
    )

    const spanElement = screen.getByLabelText('span')

    expect(spanElement.className).toBe(
      'align-self-center text-decoration-line-through'
    )
  })

  test('debe de llamar el toggle TODO cuando se hace click', () => {
    render(
      <TodoItem
        todo={todo}
        onDeleteTodo={onDeleteTodoMock}
        onToggleTodo={onToggleTodoMock}
      />
    )

    const spanElement = screen.getByLabelText('span')

    fireEvent.click(spanElement)

    expect(onToggleTodoMock).toHaveBeenCalledWith(todo.id)
  })

  test('debe de llamar el delete TODO cuando se hace click', () => {
    render(
      <TodoItem
        todo={todo}
        onDeleteTodo={onDeleteTodoMock}
        onToggleTodo={onToggleTodoMock}
      />
    )

    const btnElement = screen.getByRole('button')

    fireEvent.click(btnElement)

    expect(onDeleteTodoMock).toHaveBeenCalledWith(todo.id)
  })
})
