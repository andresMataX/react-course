// Generated by https://quicktype.io

export interface PokemonAction {
  page: number
  pokemons: Pokemon[]
}

export interface PokemonResp {
  count: number
  next: string
  previous: null
  results: Pokemon[]
}

export interface Pokemon {
  name: string
  url: string
}
