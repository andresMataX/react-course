import { HeroList } from '../components'

interface Props {}

export const DcPage = ({}: Props) => {
  return (
    <>
      <h1>DC Comics</h1>
      <hr />

      <HeroList publisher="DC Comics" />
    </>
  )
}
