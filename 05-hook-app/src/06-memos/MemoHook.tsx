import { useMemo, useState } from 'react'
import { useCounter } from '../hooks/useCounter'

interface Props {}

const heavyStuff = (iterations = 100) => {
  for (let i = 0; i < iterations; i++) {
    console.log('VAMOSSSS')
  }

  return `${iterations} iteraciones realizadas`
}

export const MemoHook = ({}: Props) => {
  const { counter, increment } = useCounter(4000)

  const [show, setShow] = useState(true)

  const memoValue = useMemo(() => heavyStuff(counter), [counter])

  return (
    <>
      <h1>
        Counter: <small>{counter}</small>
      </h1>
      <hr />

      <h4>{memoValue}</h4>

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
