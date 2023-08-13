import { useState } from 'react'
import { useGetTodoQuery, useGetTodosQuery } from './store/apis'

interface Props {}

export const TodoApp = ({}: Props) => {
  const [todoId, setTodoId] = useState(1)

  // const { data: todos, isLoading } = useGetTodosQuery('')
  const { data: todo, isLoading } = useGetTodoQuery(todoId)

  const nextTodo = () => {
    setTodoId(todoId + 1)
  }

  const prevTodo = () => {
    if (todoId === 1) return

    setTodoId(todoId - 1)
  }

  return (
    <>
      <h1>ToDo - RTK Query</h1>
      <hr />
      <h4>isLoading: {isLoading ? 'True' : 'False'}</h4>

      <pre>{JSON.stringify(todo)}</pre>

      <button onClick={prevTodo}>Prev ToDo</button>
      <button onClick={nextTodo}>Next ToDo</button>

      {/* <ul>
        {todos?.map(({ id, title, completed }) => (
          <li key={id}>
            <strong>{completed ? 'DONE' : 'PENDING'}</strong> {title}
          </li>
        ))}
      </ul> */}
    </>
  )
}
