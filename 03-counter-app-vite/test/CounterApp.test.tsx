/** @jest-environment jsdom */
import React from 'react'
import { describe, test, expect } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import { CounterApp } from '../src/CounterApp'

describe('Testing in <CounterApp.test />', () => {
  const value = 100

  test('debe de hacer match con el snapshot', () => {
    const { container } = render(<CounterApp value={value} />)
    expect(container).toMatchSnapshot()
  })

  test('debe de mostrar el valor inicial de 100', () => {
    render(<CounterApp value={value} />)
    expect(screen.findByText(value)).toBeTruthy()
  })

  test('debe incrementar con el botón +1', () => {
    render(<CounterApp value={value} />)
    fireEvent.click(screen.getByText('+1'))
    expect(screen.getByText('101')).toBeTruthy()
  })

  test('debe incrementar con el botón -1', () => {
    render(<CounterApp value={value} />)
    fireEvent.click(screen.getByText('-1'))
    expect(screen.getByText('99')).toBeTruthy()
  })

  test('debe funcionar el botón de reset', () => {
    render(<CounterApp value={value} />)
    fireEvent.click(screen.getByText('+1'))
    fireEvent.click(screen.getByText('+1'))
    fireEvent.click(screen.getByText('+1'))
    // fireEvent.click(screen.getByText('Reset'))

    fireEvent.click(screen.getByRole('button', { name: 'btn-reset' }))

    expect(screen.getByText(value)).toBeTruthy()
  })
})
