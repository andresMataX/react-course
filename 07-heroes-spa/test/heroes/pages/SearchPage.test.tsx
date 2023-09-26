import { describe, expect, test } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { SearchPage } from '../../../src/heroes/pages/SearchPage'

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}))

describe('Testing in <SearchPage.test />', () => {
  beforeEach(() => jest.clearAllMocks())

  test('debe de mostrar correctamente el componente', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )
    expect(container).toMatchSnapshot()
  })

  test('debe de mostrar a batman y el input con el valor del queryString', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('batman')

    const img = screen.getByRole('img') as HTMLImageElement
    expect(img.src).toContain('/assets/heroes/dc-batman.jpg')

    const alertDiv = screen.getByLabelText('alert-danger') as HTMLDivElement
    expect(alertDiv.style.display).toBe('none')
  })

  test('debe de mostrar un error si no se encuentra el Hero', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman2']}>
        <SearchPage />
      </MemoryRouter>
    )

    const alertDiv = screen.getByLabelText('alert-danger') as HTMLDivElement
    expect(alertDiv.style.display).not.toBe('none')
  })

  test('debe de llamar el navigate a la pantalla nueva', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )

    const searchInput = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.change(searchInput, { target: { value: 'batman' } })

    const form = screen.getByRole('form') as HTMLFormElement
    fireEvent.submit(form)

    expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${searchInput.value}`)
  })
})
