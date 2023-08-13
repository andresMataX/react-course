import { useEffect } from 'react'
import { getPokemons } from './store/slices/pokemon/thunks'
import { useAppDispatch, useAppSelector } from './store/store'

interface Props {}

export const PokemonApp = ({}: Props) => {
  const { isLoading, pokemons, page } = useAppSelector(
    (state) => state.pokemons
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPokemons(0))
  }, [])

  return (
    <>
      <h1>PokemonApp</h1>
      <hr />
      <span>Loading: {isLoading ? 'True' : 'False'}</span>

      <ul>
        {pokemons.map(({ name }, i) => (
          <li key={i}>{name}</li>
        ))}
      </ul>

      <button disabled={isLoading} onClick={() => dispatch(getPokemons(page))}>
        Next
      </button>
    </>
  )
}
