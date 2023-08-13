import { describe, test, expect } from '@jest/globals'

describe('Pruebas en <DemoComponent />', () => {
  test('Esta prueba no debe de fallar', () => {
    // 1. Inicializar
    const message1 = 'Hola Mundo'

    // 2. Estimular
    const message2 = message1.trim()

    // 3. Observamos
    expect(message1).toBe(message2)
  })
})
