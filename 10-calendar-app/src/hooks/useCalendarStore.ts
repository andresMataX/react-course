import { parseISO } from 'date-fns'
import { calendarAPI } from '../api'
import { useAppDispatch, useAppSelector } from '../store'
import {
  EventCalendar,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store/calendar'

export const useCalendarStore = () => {
  const dispatch = useAppDispatch()

  const { events, activeEvent } = useAppSelector((state) => state.calendar)
  const { user } = useAppSelector((state) => state.auth)

  const setActiveEvent = (calendarEvent: EventCalendar) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent: EventCalendar) => {
    if (calendarEvent.id) {
      await calendarAPI.put(`/events/${calendarEvent.id}`, calendarEvent)

      dispatch(
        onUpdateEvent({
          ...calendarEvent,
          user: {
            _id: user?.uid || '',
            name: user?.name || '',
          },
        })
      )
    } else {
      const { data } = await calendarAPI.post('/events', calendarEvent)

      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          id: data.evento.id,
          user: { _id: user?.uid || '', name: user?.name || '' },
        })
      )
    }
  }

  const startDeletingEvent = async () => {
    await calendarAPI.delete(`/events/${activeEvent?.id}`)

    dispatch(onDeleteEvent())
  }

  const startLoadingEvents = async () => {
    const { data } = await calendarAPI.get('/events')

    const events = data.eventos.map((event: any) => {
      event.start = parseISO(event.start)
      event.end = parseISO(event.end)

      return event
    })

    dispatch(onLoadEvents(events))
  }

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  }
}
