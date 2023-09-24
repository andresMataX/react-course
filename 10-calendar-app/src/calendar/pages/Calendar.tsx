import { addHours } from 'date-fns'
import { useState } from 'react'
import { Calendar, EventPropGetter, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getMessagesES, localizer } from '../../helpers'
import { CalendarEventBox, CalendarModal, Navbar } from '../components'

export interface EventCalendar {
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

const events: EventCalendar[] = [
  {
    title: 'Cumpleaños',
    notes: 'Comprar pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '1234',
      name: 'Fernando',
    },
  },
]

export const CalendarPage = () => {
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
  ) => void = (event) => {
    console.log({ double: event })
  }

  const onSelect: (
    event: EventCalendar,
    e: React.SyntheticEvent<HTMLElement, Event>
  ) => void = (event) => {
    console.log({ select: event })
  }

  const onViewChanged: (view: View) => void = (view) => {
    localStorage.setItem('lastView', view)
    setLastView(view)
  }

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
    </>
  )
}
