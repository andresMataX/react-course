import { renderHook, waitFor } from '@testing-library/react'
import { useFetchGifs } from '../../src/hooks/useFetchGifs'

describe('Pruebas en el hook useFetchGifs', () => {
  test('debe de regresar el estado inicial', () => {
    const { result } = renderHook(() => useFetchGifs('My chemical romance'))

    const { isLoading, images } = result.current

    expect(images.length).toBe(0)
    expect(isLoading).toBeTruthy()
  })

  test('debe de retornar un arreglo de imágenes e isLoading en false', async () => {
    const { result } = renderHook(() => useFetchGifs('My chemical romance'))

    await waitFor(() => expect(result.current.images.length).toBeGreaterThan(0))

    const { isLoading, images } = result.current

    expect(images.length).toBeGreaterThan(0)
    expect(isLoading).toBeFalsy()
  })
})
