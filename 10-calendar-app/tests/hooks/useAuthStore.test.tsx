import { describe, test } from '@jest/globals'
import { configureStore } from '@reduxjs/toolkit'
import { act, renderHook, waitFor } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { useAuthStore } from '../../src/hooks'
import { AuthState, authSlice } from '../../src/store/auth'
import { authInitialState, notAuthenticatedState } from '../fixtures/authStates'
import { testUserCredentials } from '../fixtures/testUser'

const getMockStore = (initialState: AuthState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  })
}

describe('Testing in useAuthStore', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('debe de regresar los valores por defecto', () => {
    const mockStore = getMockStore({ ...authInitialState })

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })

    expect(result.current).toEqual({
      status: authInitialState.status,
      user: authInitialState.user,
      errorMessage: authInitialState.errorMessage,
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      checkAuthToken: expect.any(Function),
    })
  })

  test('startLogin debe de realizar el login correctamente', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState })

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })

    await act(async () => {
      await result.current.startLogin(
        testUserCredentials.email,
        testUserCredentials.password
      )
    })

    const { errorMessage, status, user } = result.current

    expect({ errorMessage, status, user }).toEqual({
      status: 'authenticated',
      user: { name: 'test', uid: '651f25f37c027a22fc1ad596' },
      errorMessage: undefined,
    })

    expect(localStorage.getItem('token')).toEqual(expect.any(String))
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String))
  })

  test('startLogin debe de fallar al realizar el login', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState })

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })

    await act(async () => {
      await result.current.startLogin('poto', 'hamelgarete')
    })

    const { errorMessage, status, user } = result.current

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: 'Las credenciales no son válidas',
      status: 'not-authenticated',
      user: null,
    })
    expect(localStorage.getItem('token')).toBeNull()

    await waitFor(() => expect(result.current.errorMessage).toBe(undefined))
  })

  /** test('startRegister debe de crear un usuario', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState })

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })

    const spy = jest.spyOn(calendarAPI, 'post')

    spy.mockReturnValue(
      Promise.resolve({
        data: {
          ok: true,
          uid: '651f25f37c027a22fc1ad596',
          name: 'test',
          token: 'test-token',
        },
      })
    )

    await act(async () => {
      await result.current.startRegister(
        testUserCredentials.email,
        testUserCredentials.password,
        testUserCredentials.name
      )
    })

    expect(spy).toHaveBeenCalled()

    const { errorMessage, status, user } = result.current

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'test', uid: '651f25f37c027a22fc1ad596' },
    })

    spy.mockRestore()
  }) */

  test('checkAuthToken debe de fallar si no hay token', async () => {
    const mockStore = getMockStore({ ...authInitialState })

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    })

    await act(async () => {
      await result.current.checkAuthToken()
    })

    const { errorMessage, status, user } = result.current

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'not-authenticated',
      user: null,
    })
  })
})
