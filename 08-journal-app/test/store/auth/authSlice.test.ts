import { authSlice } from '../../../src/store/auth/authSlice';

describe('Pruebas en el authSlice', () => {
  test('debe de regresar el estado inicial y llamarse "Auth"', () => {
    expect(authSlice.name).toBe('auth');
  });
});
