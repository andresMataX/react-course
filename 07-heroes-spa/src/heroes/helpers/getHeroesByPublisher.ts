import { heroes } from '../data/heroes'

export const getHeroesByPublisher = (
  publisher: 'DC Comics' | 'Marvel Comics'
) => {
  return heroes.filter((heroe) => heroe.publisher === publisher)
}
