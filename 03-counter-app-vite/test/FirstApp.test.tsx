/** @jest-environment jsdom */
import React from 'react'
import { describe, test, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { FirstApp } from '../src/FirstApp'

describe('Testing in <FirstApp.test />', () => {
  const title = 'Hola, pepe'
  const subtitle = 'Soy un subtítulo'

  test('should hacer match con el snapshot', () => {
    const { container } = render(<FirstApp title={title} />)
    expect(container).toMatchSnapshot()
  })

  test('should mostrar el mensaje "Hola, pepe"', () => {
    render(<FirstApp title={title} />)
    expect(screen.getByText(title)).toBeTruthy()
  })

  test('should mostrar el título en un h1', () => {
    render(<FirstApp title={title} />)
    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(title)
  })

  test('should mostrar el subtítulo pasado por props', () => {
    render(<FirstApp title={title} subtitle={subtitle} />)
    expect(screen.getAllByText(subtitle).length).toBe(2)
  })
})
