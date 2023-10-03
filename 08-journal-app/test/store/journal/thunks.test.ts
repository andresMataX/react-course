import { startNewNote } from '../../../src/store/journal/thunks'
describe('Pruebas en Journal Thunks', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('debe de crear una nueva nota en blanco', async () => {
    const uid = 'TESTING'
    getState.mockReturnValue({ auth: { uid } })

    const callback = startNewNote()
    await callback(dispatch, getState)
  })
})
