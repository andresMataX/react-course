import { useState } from 'react'
import { useCounter } from '../hooks/useCounter'
import { Small } from './Small'

interface Props {}

export const Memorize = ({}: Props) => {
  const { counter, increment } = useCounter(20)

  const [show, setShow] = useState(true)

  return (
    <>
      <h1>
        Counter: <Small value={counter} />
      </h1>
      <hr />

      <button className="btn btn-outline-danger" onClick={() => increment()}>
        +1
      </button>

      <button
        className="btn btn-outline-primary"
        onClick={() => setShow(!show)}
      >
        Show/Hide {JSON.stringify(show)}
      </button>
    </>
  )
}
