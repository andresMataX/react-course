import { renderHook } from '@testing-library/react'
import { useCounter } from '../../src/hooks/useCounter'

describe('Pruebas en el useCounter', () => {
  test('debe de retonar los valores por defecto', () => {
    renderHook(() => useCounter())
  })
})
