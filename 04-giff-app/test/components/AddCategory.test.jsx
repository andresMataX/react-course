/** @jest-environment jsdom */
import { fireEvent, render, screen } from '@testing-library/react'
import { AddCategory } from '../../src/components/AddCategory'

describe('Pruebas en <AddCategory />', () => {
  test('debe de cambiar el valor de la caja de texto', () => {
    render(<AddCategory onNewCategory={() => {}} />)
    // screen.debug()

    const input = screen.getByRole('textbox')
    fireEvent.input(input, {
      target: { value: 'Elpepe' },
    })

    expect(input.value).toBe('Elpepe')
  })
})
