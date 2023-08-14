import { useMemo } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { getHeroById } from '../helpers/getHeroById'

interface Props {}

export const HeroPage = ({}: Props) => {
  const { id } = useParams()

  const navigate = useNavigate()

  const hero = useMemo(() => getHeroById(id!), [id])

  const onReturn = () => {
    navigate(-1)
  }

  if (!hero) {
    return <Navigate to='/marvel' />
  }

  return (
    <div className='row mt-3'>
      <div className='col-4'>
        <img
          src={`/assets/heroes/${id}.jpg`}
          alt={hero.superhero}
          className='img-thumbnail'
        />
      </div>

      <div className='col-8'>
        <h3>{hero.superhero}</h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <b>Alter Ego:</b> {hero.alter_ego}
          </li>

          <li className='list-group-item'>
            <b>Publisher:</b> {hero.publisher}
          </li>

          <li className='list-group-item'>
            <b>First Appearance:</b> {hero.first_appearance}
          </li>
        </ul>

        <h5 className='mt-3'>Characters</h5>
        <p>{hero.characters}</p>

        <button className='btn btn-outline-info' onClick={onReturn}>
          Regresar
        </button>
      </div>
    </div>
  )
}
