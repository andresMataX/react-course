import { AppDispatch, RootState } from '../../store'
import { setPokemons, startLoadingPokemons } from './pokemonSlice'
import { PokemonResp } from '../../interfaces/pokemon'
import { pokemonApi } from '../../../api/pokemonApi'

export const getPokemons = (page = 0) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(startLoadingPokemons())

    // const resp = await fetch(`/pokemon?limit=10&offset=${page * 10}`)
    // const data: PokemonResp = await resp.json()
    // console.log(data.results)

    const { data } = await pokemonApi.get<PokemonResp>(
      `/pokemon?limit=10&offset=${page * 10}`
    )

    dispatch(setPokemons({ pokemons: data.results, page: page + 1 }))
  }
}
