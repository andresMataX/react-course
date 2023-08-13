import { render, screen, fireEvent } from '@testing-library/react'
import { GifExpertApp } from '../src/GifExpertApp'

describe('Pruebas en <GifExpertApp />', () => {
  test('debe de agregarse una nueva categoría', () => {
    const inputValue = 'My chemical romance'

    render(<GifExpertApp />)

    const input = screen.getByRole('textbox')
    const form = screen.getByRole('form')

    fireEvent.input(input, {
      target: { value: inputValue },
    })
    fireEvent.submit(form)

    expect(screen.getByText(inputValue)).toBeTruthy()
  })
})
