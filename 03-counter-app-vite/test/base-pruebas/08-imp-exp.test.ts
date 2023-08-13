import { describe, test, expect } from '@jest/globals'
import {
  getHeroeById,
  getHeroesByOwner,
} from '../../src/base-pruebas/08-imp-exp'

describe('Pruebas en 08-imp-exp', () => {
  test('getHeroeById debe de retornar un héroe por ID', () => {
    const id = 1

    const hero = getHeroeById(id)

    expect(hero).toEqual({ id: 1, name: 'Batman', owner: 'DC' })
  })

  test('getHeroeById debe de retornar undedined si no existe', () => {
    const id = 100

    const hero = getHeroeById(id)

    expect(hero).toBeFalsy()
  })

  test('getHeroesByOwner debe de retonar los hérores de DC', () => {
    const owner = 'DC'

    const heroes = getHeroesByOwner(owner)

    expect(heroes.length).toBe(3)

    expect(heroes).toEqual([
      { id: 1, name: 'Batman', owner: 'DC' },
      { id: 3, name: 'Superman', owner: 'DC' },
      { id: 4, name: 'Flash', owner: 'DC' },
    ])
  })

  test('getHeroesByOwner debe de retonar los hérores de Marvel', () => {
    const owner = 'Marvel'

    const heroes = getHeroesByOwner(owner)

    expect(heroes.length).toBe(2)

    expect(heroes).toEqual([
      { id: 2, name: 'Spiderman', owner: 'Marvel' },
      { id: 5, name: 'Wolverine', owner: 'Marvel' },
    ])
  })
})
