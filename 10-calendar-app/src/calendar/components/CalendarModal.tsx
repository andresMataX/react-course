import { addHours, differenceInSeconds } from 'date-fns'
import es from 'date-fns/locale/es'
import { useMemo, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import Modal from 'react-modal'
import Swal from 'sweetalert2'

import 'react-datepicker/dist/react-datepicker.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore } from '../../hooks'

registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#root')

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore()

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formValues, setFormValues] = useState({
    title: 'Andrés',
    notes: 'lorem',
    start: new Date(),
    end: addHours(new Date(), 2),
  })

  const titleClass = useMemo(() => {
    if (!formSubmitted) return ''

    return formValues.title.length > 0 ? '' : 'is-invalid'
  }, [formValues.title, formSubmitted])

  const onInputChanged = ({ target }: any) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    })
  }

  const onDateChanged = (event: Date | null, changing: 'start' | 'end') => {
    setFormValues({
      ...formValues,
      [changing]: event,
    })
  }

  const onSubmit = (event: any) => {
    event.preventDefault()
    setFormSubmitted(true)

    const difference = differenceInSeconds(formValues.end, formValues.start)

    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
      return
    }

    if (formValues.title.length <= 0) return

    console.log(formValues)
  }

  return (
    <Modal
      isOpen={isDateModalOpen}
      style={customStyles}
      onRequestClose={closeDateModal}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <br />
          <DatePicker
            timeCaption="Hora"
            locale="es"
            showTimeSelect
            selected={formValues.start}
            className="form-control"
            onChange={(event) => onDateChanged(event, 'start')}
            dateFormat="Pp"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <br />
          <DatePicker
            timeCaption="Hora"
            locale="es"
            showTimeSelect
            minDate={formValues.start}
            selected={formValues.end}
            className="form-control"
            onChange={(event) => onDateChanged(event, 'end')}
            dateFormat="Pp"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  )
}
