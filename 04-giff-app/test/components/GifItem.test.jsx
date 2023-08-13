/** @jest-environment jsdom */
import React from 'react'
import { describe, test, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { GifItem } from '../../src/components/GifItem'

describe('Testing in <GifItem.test />', () => {
  const title = 'Hola pepe'
  const url = 'http://l.com'

  test('should hacer match con el snapshot', () => {
    const { container } = render(<GifItem title={title} url={url} />)
    expect(container).toMatchSnapshot()
  })
})
