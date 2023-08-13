import { useForm } from '../../hooks/useForm'
import { HeroCard } from '../components'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { getHeroesByName } from '../helpers/getHeroesByName'

interface Props {}

export const SearchPage = ({}: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { q } = queryString.parse(location.search)
  const heroes = getHeroesByName(q?.toString())

  const showSearch = q === undefined
  const showError = q !== undefined && heroes.length === 0

  const { searchText, onChange } = useForm({
    searchText: q?.toString() || '',
  })

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // if (searchText.trim().length < 2) return

    navigate(`?q=${searchText}`)
  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />

          <form onSubmit={(e) => onSearchSubmit(e)}>
            <input
              type="text"
              className="form-control"
              placeholder="Search a hero"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={({ target }) => onChange(target.value, 'searchText')}
            />
            <button className="btn btn-outline-warning mt-3">Search</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {/* {q === undefined ? (
            <div className="alert alert-primary">Search a Hero</div>
          ) : (
            heroes.length === 0 && (
              <div className="alert alert-danger">
                No Hero with <b>{q}</b>
              </div>
            )
          )} */}

          <div
            className="alert alert-primary animate__animated animate__fadeIn"
            style={{ display: showSearch ? '' : 'none' }}
          >
            Search a Hero
          </div>

          <div
            className="alert alert-danger animate__animated animate__fadeIn"
            style={{ display: showError ? '' : 'none' }}
          >
            No Hero with <b>{q}</b>
          </div>

          {heroes.map((h, i) => (
            <HeroCard key={i} {...h} />
          ))}
        </div>
      </div>
    </>
  )
}
