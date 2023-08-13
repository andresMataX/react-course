import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Todos } from '../interfaces/todos'

export const todosApi = createApi({
  reducerPath: 'todos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todos[], any>({
      query: () => '/todos',
    }),
    getTodo: builder.query<Todos, number>({
      query: (todoId) => `/todos/${todoId}`,
    }),
  }),
})

export const { useGetTodosQuery, useGetTodoQuery } = todosApi
