/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({
  path: '.env.test',
})

jest.mock('./src/helpers/getEnvVariables', () => ({
  getEnvVariables: () => ({ ...process.env }),
}))
