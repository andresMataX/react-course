import { useEffect, useState } from 'react'
import { Calendar, EventPropGetter, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getMessagesES, localizer } from '../../helpers'
import { useCalendarStore, useUiStore } from '../../hooks'
import { EventCalendar } from '../../store/calendar'
import {
  CalendarEventBox,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from '../components'

export const CalendarPage = () => {
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
  const { openDateModal } = useUiStore()

  const [lastView, setLastView] = useState<View>(
    (localStorage.getItem('lastView') as View) || 'week'
  )

  const eventStyleGetter: EventPropGetter<EventCalendar> = () => {
    const style = {
      backgroundColor: '#347FC7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return {
      style,
    }
  }

  const onDoubleClick: (
    event: EventCalendar,
    e: React.SyntheticEvent<HTMLElement, Event>
  ) => void = () => {
    openDateModal()
  }

  const onSelect: (
    event: EventCalendar,
    e: React.SyntheticEvent<HTMLElement, Event>
  ) => void = (event) => {
    setActiveEvent(event)
  }

  const onViewChanged: (view: View) => void = (view) => {
    localStorage.setItem('lastView', view)
    setLastView(view)
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />

      <FabAddNew />
      <FabDelete />
    </>
  )
}
