import { useEffect } from 'react'

interface Props {}

export const Message = ({}: Props) => {
  useEffect(() => {
    console.log('Mensaje montado')

    return () => {
      console.log('Mensaje desmontado')
    }
  }, [])

  return (
    <>
      <p className="text-center mt-3 alert alert-danger">Usuario ya existe</p>
    </>
  )
}
