import {
  CalendarState,
  EventCalendar,
} from '../../src/store/calendar/calendarSlice'

export const events: EventCalendar[] = [
  {
    id: 1,
    title: 'Cumpleaños del jefe',
    notes: 'Comprar el pastel',
    start: new Date('2020-05-18 13:00:00'),
    end: new Date('2020-05-18 15:00:00'),
    bgColor: '#fafafa',
    user: {
      _id: '123456',
      name: 'pepe',
    },
  },
  {
    id: 2,
    title: 'Hacer tarea',
    notes: 'Pototillo',
    start: new Date('2016-05-25 12:30:00'),
    end: new Date('2016-05-25 14:30:00'),
    bgColor: '#fafafa',
    user: {
      _id: '123456',
      name: 'pepe',
    },
  },
]

export const initialState: CalendarState = {
  events: [],
  activeEvent: null,
  isLoading: true,
}

export const calendarWithEventsState: CalendarState = {
  events: [...events],
  activeEvent: null,
  isLoading: false,
}

export const calendarWithActiveEventState: CalendarState = {
  events: [...events],
  activeEvent: { ...events[0] },
  isLoading: false,
}
