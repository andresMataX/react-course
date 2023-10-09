module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.cjs'],
  transform: {
    '^.+\\.(ts|tsx)?$': ['@swc/jest'],
  },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.ts',
  },
}
