import React from 'react'
import { describe, test, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { GifItem } from '../../src/components/GifItem'

describe('Testing in <GifItem.test />', () => {
  const title = 'Hola pepe'
  const url = 'http://l.com/elpepe.jpg'

  test('should hacer match con el snapshot', () => {
    const { container } = render(<GifItem title={title} url={url} />)
    expect(container).toMatchSnapshot()
  })

  test('should mostrar la imagen con el URL y el ALT indiciado', () => {
    render(<GifItem title={title} url={url} />)
    // screen.debug()
    // expect(screen.getByRole('img').src).toBe(url)
    // expect(screen.getByRole('img').alt).toBe(title)

    const { src, alt } = screen.getByRole('img')

    expect(src).toBe(url)
    expect(alt).toBe(alt)
  })

  test('should mostrar el título en el componente', () => {
    render(<GifItem title={title} url={url} />)
    expect(screen.getByText(title)).toBeTruthy()
  })
})
