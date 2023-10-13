import { describe, expect, test } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { FabDelete } from '../../../src/calendar/components/FabDelete'
import { store } from '../../../src/store'

describe('Testing in <FabDelete />', () => {
  test('should do ', () => {
    render(
      <Provider store={store}>
        <FabDelete />
      </Provider>
    )
    screen.debug()
    expect(true).toBeTruthy()
  })
})
