import { renderHook } from '@testing-library/react'
import { useCounter } from '../../src/hooks/useCounter'

describe('Pruebas en el useCounter', () => {
  test('debe de retonar los valores por defecto', () => {
    const { result } = renderHook(() => useCounter())

    const { counter, decrement, increment, reset } = result.current

    expect(counter).toBe(10)
    expect(decrement).toEqual(expect.any(Function))
    expect(increment).toEqual(expect.any(Function))
    expect(reset).toEqual(expect.any(Function))
  })

  test('debe de generar el valor del counter a 100', () => {
    const { result } = renderHook(() => useCounter(100))

    const { counter } = result.current

    expect(counter).toBe(100)
  })
})
