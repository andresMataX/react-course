import { useCallback, useEffect, useState } from 'react'
import { ShouIncrement } from './ShouIncrement'

interface Props {}

export const CallbackHook = ({}: Props) => {
  const [counter, setCounter] = useState(10)

  const increment = useCallback((incrementBy: number) => {
    setCounter((value) => value + incrementBy)
  }, [])

  useEffect(() => {
    // increment(5)
  }, [increment])

  // const increment = () => {
  //   setCounter(counter + 1)
  // }

  return (
    <>
      <h1>Use Callback Hook: {counter}</h1>
      <hr />

      <ShouIncrement increment={increment} />
    </>
  )
}
