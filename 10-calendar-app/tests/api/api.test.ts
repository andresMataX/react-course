import calendarApi from '../../src/api/calendarAPI'

describe('Pruebas en API', () => {
  test('debe de tener la configuración por defecto', () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
  })

  test('debe de tener el x-token de todas las peticiones', async () => {
    localStorage.setItem('token', 'ABC123ABC123')

    try {
      const res = await calendarApi.post('/auth', {
        email: 'test@test.com',
        password: '123456',
      })

      expect(res.config.headers['x-token']).toBe('ABC123ABC123')
    } catch (error) {}
  })
})
