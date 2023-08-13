import { useRef } from 'react'

interface Props {}

export const FocusScreen = ({}: Props) => {
  const inputName = useRef<HTMLInputElement>(null)

  return (
    <>
      <h1>Focus Screen</h1>
      <hr />

      <input
        type="text"
        placeholder="Ingrese su nombre"
        className="form-control"
        ref={inputName}
      />

      <button
        className="btn btn-outline-danger mt-3"
        onClick={() => inputName.current?.focus()}
      >
        Set Focus
      </button>
    </>
  )
}
