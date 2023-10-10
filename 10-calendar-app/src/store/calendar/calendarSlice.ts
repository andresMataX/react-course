import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface EventCalendar {
  id?: number
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

export interface CalendarState {
  events: EventCalendar[]
  activeEvent: EventCalendar | null
  isLoading: boolean
}

const initialState: CalendarState = {
  events: [],
  activeEvent: null,
  isLoading: true,
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
        event.id === payload.id ? payload : event
      )
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent?.id
        )
        state.activeEvent = null
      }
    },
    onLoadEvents: (state, { payload }: PayloadAction<EventCalendar[]>) => {
      state.events = payload
      state.isLoading = false
    },
    onLogoutCalendar: (state) => {
      state.events = []
      state.activeEvent = null
      state.isLoading = true
    },
  },
})

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions
