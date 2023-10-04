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

  const setActiveEvent = (calendarEvent: EventCalendar) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent: EventCalendar) => {
    calendarEvent._id
      ? dispatch(onUpdateEvent({ ...calendarEvent }))
      : dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
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
