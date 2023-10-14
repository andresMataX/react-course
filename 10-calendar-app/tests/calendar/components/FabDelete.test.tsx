import { describe, expect, test } from '@jest/globals'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { FabDelete } from '../../../src/calendar/components/FabDelete'
import { useCalendarStore } from '../../../src/hooks/useCalendarStore'

jest.mock('../../../src/hooks/useCalendarStore')

const useCalendarStoreMocked = jest.mocked(useCalendarStore)

describe('Pruebas en <FabDelete />', () => {
  const mockStartDeletingEvent = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('debe de mostrar el componente correctamente', () => {
    useCalendarStoreMocked.mockReturnValue({
      hasEventSelected: false,
      events: [],
      activeEvent: null,
      setActiveEvent: jest.fn(),
      startDeletingEvent: jest.fn(),
      startLoadingEvents: jest.fn(),
      startSavingEvent: jest.fn(),
    })

    render(<FabDelete />)

    const btn = screen.getByLabelText('btn-delete')
    expect(btn.classList).toContain('btn')
    expect(btn.classList).toContain('btn-danger')
    expect(btn.classList).toContain('fab-danger')
    expect(btn.style.display).toBe('none')
  })

  test('debe de mostrar el botón si hay evento activo', () => {
    useCalendarStoreMocked.mockReturnValue({
      hasEventSelected: true,
      events: [],
      activeEvent: null,
      setActiveEvent: jest.fn(),
      startDeletingEvent: jest.fn(),
      startLoadingEvents: jest.fn(),
      startSavingEvent: jest.fn(),
    })

    render(<FabDelete />)
    const btn = screen.getByLabelText('btn-delete')
    expect(btn.style.display).toBe('')
  })

  test('debe de llamar startDeletingEvent si hay evento activo', () => {
    useCalendarStoreMocked.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
      events: [],
      activeEvent: null,
      setActiveEvent: jest.fn(),
      startLoadingEvents: jest.fn(),
      startSavingEvent: jest.fn(),
    })

    render(<FabDelete />)

    const btn = screen.getByLabelText('btn-delete')
    fireEvent.click(btn)

    expect(mockStartDeletingEvent).toHaveBeenCalled()
  })
})
