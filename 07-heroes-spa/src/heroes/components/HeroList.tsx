import { useMemo } from 'react'
import { getHeroesByPublisher, HeroCard } from '..'

interface Props {
  publisher: 'DC Comics' | 'Marvel Comics'
}

export const HeroList = ({ publisher }: Props) => {
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher])

  return (
    <>
      <div className='row rows-cols-1 row-cols-md-3 g-3'>
        {heroes.map((h, i) => (
          <HeroCard key={i} {...h} />
        ))}
      </div>
    </>
  )
}
