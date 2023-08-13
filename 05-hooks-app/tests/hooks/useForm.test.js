import { act, renderHook } from '@testing-library/react'
import { useForm } from '../../src/hooks/useForm'

describe('Pruebas en useForm', () => {
  const initialForm = {
    name: 'Andrés',
    email: 'andres@gmail.com',
  }

  test('debe de regresar los valores por defecto', () => {
    const { result } = renderHook(() => useForm(initialForm))

    expect(result.current).toEqual({
      name: initialForm.name,
      email: initialForm.email,
      formState: initialForm,
      onInputChange: expect.any(Function),
      onResetForm: expect.any(Function),
    })
  })

  test('debe de cambiar el nombre del formulario', () => {
    const newValue = 'Juan'

    const { result } = renderHook(() => useForm(initialForm))

    const { onInputChange } = result.current

    const event = {
      target: { name: 'name', value: newValue },
    }

    act(() => {
      onInputChange(event)
    })

    expect(result.current.name).toBe(newValue)
    expect(result.current.formState.name).toBe(newValue)
  })

  test('debe de resetear el formulario', () => {
    const newValue = 'Juan'

    const { result } = renderHook(() => useForm(initialForm))

    const { onInputChange, onResetForm } = result.current

    const event = {
      target: { name: 'name', value: newValue },
    }

    act(() => {
      onInputChange(event)
      onResetForm()
    })

    expect(result.current.name).toBe(initialForm.name)
    expect(result.current.formState.name).toBe(initialForm.name)
  })
})
