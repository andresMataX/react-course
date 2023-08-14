import { HeroList } from '../components'

interface Props {}

export const MarvelPage = ({}: Props) => {
  return (
    <>
      <h1>Marvel Comics</h1>
      <hr />

      <HeroList publisher='Marvel Comics' />
    </>
  )
}
