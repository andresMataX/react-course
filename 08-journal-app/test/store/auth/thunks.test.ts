import { checkingCredentials } from '../../../src/store'
import { checkingAuthentication } from '../../../src/store/auth/thunks'

jest.mock('../../../src/firebase/providers')

describe('Pruebas en authThunks', () => {
  const dispatch = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('debe de invocar el checking credentials', async () => {
    const callback = checkingAuthentication()
    await callback(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  })
})
