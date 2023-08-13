import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Pokemon, PokemonAction } from '../../interfaces/pokemon'

export interface PokeState {
  page: number
  pokemons: Pokemon[]
  isLoading: boolean
}

const initialState: PokeState = {
  page: 0,
  pokemons: [],
  isLoading: false,
}

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    startLoadingPokemons: (state) => {
      state.isLoading = true
    },
    setPokemons: (state, action: PayloadAction<PokemonAction>) => {
      state.page = action.payload.page
      state.isLoading = false
      state.pokemons = action.payload.pokemons
    },
  },
})

export const { startLoadingPokemons, setPokemons } = pokemonSlice.actions
