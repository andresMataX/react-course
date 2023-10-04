import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

export interface EventCalendar {
  _id?: number
  title: string
  notes: string
  start: Date
  end: Date
  bgColor: string
  user: {
    _id: string
    name: string
  }
}

const event: EventCalendar = {
  _id: new Date().getTime(),
  title: 'Cumpleaños',
  notes: 'Comprar pastel',
  start: new Date(),
  end: addHours(new Date(), 4),
  bgColor: '#fafafa',
  user: {
    _id: '1234',
    name: 'Fernando',
  },
}

interface CalendarState {
  events: EventCalendar[]
  activeEvent: EventCalendar | null
}

const initialState: CalendarState = {
  events: [event],
  activeEvent: null,
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }: PayloadAction<EventCalendar>) => {
      state.activeEvent = payload
    },
    onAddNewEvent: (state, { payload }: PayloadAction<EventCalendar>) => {
      state.events.push(payload)
      state.activeEvent = null
    },
    onUpdateEvent: (state, { payload }: PayloadAction<EventCalendar>) => {
      state.events = state.events.map((event) =>
        event._id === payload._id ? payload : event
      )
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event._id !== state.activeEvent?._id
        )
        state.activeEvent = null
      }
    },
  },
})

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
  calendarSlice.actions
