import { useCounter } from '../hooks/useCounter'
interface Props {}

export const CounterWithCustomHook = ({}: Props) => {
  const { counter, increment, decrement, reset } = useCounter(20)

  return (
    <>
      <h1>Counter With Hook: {counter}</h1>
      <hr />

      <button className="btn btn-outline-danger" onClick={() => increment(2)}>
        +1
      </button>
      <button className="btn btn-outline-danger" onClick={reset}>
        Reset
      </button>
      <button className="btn btn-outline-danger" onClick={() => decrement(2)}>
        -1
      </button>
    </>
  )
}
