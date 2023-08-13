import { ChangeEvent, useEffect, useState } from 'react'
import { Message } from './Message'

interface Props {}

export const SimpleForm = ({}: Props) => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
  })

  const { username, email } = formState

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target

    setFormState({
      ...formState,
      [name]: value,
    })
  }

  useEffect(() => {
    // console.log(formState)
  }, [formState])

  useEffect(() => {
    // console.log(email)
  }, [email])

  return (
    <>
      <h1>Formulario Simple</h1>
      <hr />

      <input
        type="text"
        className="form-control"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onInputChange}
      />

      <input
        type="email"
        className="form-control mt-3"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onInputChange}
      />

      {username === 'andrés' && <Message />}
    </>
  )
}
