import { EventProps } from 'react-big-calendar'
import { EventCalendar } from '..'

export const CalendarEventBox = ({ event }: EventProps<EventCalendar>) => {
  const { title, user } = event

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  )
}
