import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} from '../../../src/store/calendar/calendarSlice'
import {
  calendarWithActiveEventState,
  events,
  initialState,
} from '../../fixtures/calendarStates'

describe('Pruebas en calendarSlice', () => {
  test('debe de regresar el estado por defecto', () => {
    const state = calendarSlice.getInitialState()

    expect(state).toEqual(initialState)
  })

  test('onSetActiveEvent debe de activar el evento', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onSetActiveEvent(events[0])
    )

    expect(state.activeEvent).toEqual(events[0])
  })

  test('onAddNewEvent debe de agregar el evento', () => {
    const newEvent = {
      id: 3,
      title: 'Cumpleaños del jefe Ö',
      notes: 'Comprar el pastel aaa',
      start: new Date('2021-05-18 13:00:00'),
      end: new Date('2021-05-18 15:00:00'),
      bgColor: '#fafafa',
      user: {
        _id: '123456',
        name: 'pepe',
      },
    }

    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onAddNewEvent(newEvent)
    )

    expect(state.events).toEqual([...events, newEvent])
  })

  test('onUpdateEvent debe de actualizar el evento', () => {
    const updatedEvent = {
      id: 1,
      title: 'Cumpleaños del jefe Ö',
      notes: 'Comprar el pastel aaa',
      start: new Date('2021-05-18 13:00:00'),
      end: new Date('2021-05-18 15:00:00'),
      bgColor: '#fafafa',
      user: {
        _id: '123456',
        name: 'pepe',
      },
    }

    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onUpdateEvent(updatedEvent)
    )

    expect(state.events).toContain(updatedEvent)
  })

  test('onDeleteEvent debe de borrar el evento activo', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    )

    expect(state.activeEvent).toBeNull()
    expect(state.events).not.toContain(events[0])
  })

  test('onLoadEvents debe de establecer los eventos', () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events))

    expect(state.events).toEqual(events)
  })

  test('onLogoutCalendar debe de limpiar el estado', () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    )

    expect(state).toEqual(initialState)
  })
})
