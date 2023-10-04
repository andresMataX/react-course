import { useAppDispatch, useAppSelector } from '../store'
import { EventCalendar, onSetActiveEvent } from '../store/calendar'

export const useCalendarStore = () => {
  const dispatch = useAppDispatch()

  const { events, activeEvent } = useAppSelector((state) => state.calendar)

  const setActiveEvent = (calendarEvent: EventCalendar) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  return {
    events,
    setActiveEvent,
    activeEvent,
  }
}
