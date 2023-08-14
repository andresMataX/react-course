import { Link } from 'react-router-dom'

interface Props {
  id: string
  superhero: string
  publisher: string
  alter_ego: string
  first_appearance: string
  characters: string
}

export const HeroCard = ({
  id,
  superhero,
  alter_ego,
  first_appearance,
  characters,
}: Props) => {
  const heroImageUrl = `assets/heroes/${id}.jpg`

  return (
    <div className='col animate__animated animate__fadeIn'>
      <div className='card'>
        <div className='row no-gutters'>
          <div className='col-4'>
            <img src={heroImageUrl} className='card-img' alt={superhero} />
          </div>

          <div className='col-8'>
            <div className='card-body'>
              <h5 className='card-title'>{superhero}</h5>

              <p className='card-text'>{alter_ego}</p>

              {alter_ego !== characters && <p>{characters}</p>}

              <p className='card-text'>
                <small className='text-muted'>{first_appearance}</small>
              </p>

              <Link to={`/hero/${id}`}>Más...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
