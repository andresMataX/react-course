import { calendarAPI } from '../api'
import { useAppDispatch, useAppSelector } from '../store'
import {
  EventCalendar,
  onAddNewEvent,
  onDeleteEvent,
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
      dispatch(onUpdateEvent({ ...calendarEvent }))
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

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent())
  }

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  }
}
