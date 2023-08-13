import React from 'react'
interface Props {
  increment: (value: number) => void
}

export const ShouIncrement = React.memo(({ increment }: Props) => {
  console.log('Me volví a generar :0')

  return (
    <button
      className="btn btn-outline-dark"
      onClick={() => {
        increment(50)
      }}
    >
      Incrementar
    </button>
  )
})
