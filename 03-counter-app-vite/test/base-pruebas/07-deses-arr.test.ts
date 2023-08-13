import { describe, test, expect } from '@jest/globals'
import { retornaArreglo } from '../../src/base-pruebas/07-deses-arr'

describe('first', () => {
  test('should return a string and a number', () => {
    const [letters, numbers] = retornaArreglo()

    expect(letters).toBe('ABC')
    expect(numbers).toBe(123)

    expect(typeof letters).toBe('string')
    expect(typeof numbers).toBe('number')

    expect(letters).toEqual(expect.any(String))
    expect(numbers).toEqual(expect.any(Number))
  })
})
