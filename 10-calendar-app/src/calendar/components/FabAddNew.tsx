import { addHours } from 'date-fns'
import { useCalendarStore, useUiStore } from '../../hooks'

export const FabAddNew = () => {
  const { openDateModal } = useUiStore()
  const { setActiveEvent } = useCalendarStore()

  const handleClickNew = () => {
    setActiveEvent({
      bgColor: '#347FC7',
      end: new Date(),
      notes: '',
      start: addHours(new Date(), 2),
      title: '',
      user: {
        _id: '',
        name: '',
      },
    })
    openDateModal()
  }

  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  )
}
