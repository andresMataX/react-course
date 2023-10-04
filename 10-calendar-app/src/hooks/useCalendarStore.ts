import { useAppDispatch, useAppSelector } from '../store'
import {
  EventCalendar,
  onAddNewEvent,
  onSetActiveEvent,
} from '../store/calendar'

export const useCalendarStore = () => {
  const dispatch = useAppDispatch()

  const { events, activeEvent } = useAppSelector((state) => state.calendar)

  const setActiveEvent = (calendarEvent: EventCalendar) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent: EventCalendar) => {
    if (!calendarEvent._id) {
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
    }
  }

  return {
    events,
    activeEvent,
    setActiveEvent,
    startSavingEvent,
  }
}
