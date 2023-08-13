/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react'
import { GifGrid } from '../../src/components/GifGrid'
import { useFetchGifs } from '../../src/hooks/useFetchGifs'

jest.mock('../../src/hooks/useFetchGifs')

describe('Pruebas en <GifGrid />', () => {
  const category = 'My chemical romance'

  test('debe de mostrar el loading inicialmente', () => {
    useFetchGifs.mockReturnValue({ images: [], isLoading: true })

    render(<GifGrid category={category} />)

    expect(screen.getByText('Cargando...'))
    expect(screen.getByText(category))
  })

  test('debe de mostrar items cuando se cargan las imágenes useFetchGifs', () => {
    const gifs = [
      {
        id: 'AB',
        title: 'elpepe',
        url: 'https://localhost/sa.jpg',
      },
      {
        id: 'ABC',
        title: 'elpepet',
        url: 'https://localhost/saaaaa.jpg',
      },
    ]

    useFetchGifs.mockReturnValue({ images: gifs, isLoading: false })

    render(<GifGrid category={category} />)

    expect(screen.getAllByRole('img').length).toBe(2)
  })
})
