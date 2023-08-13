import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementBy } from './store/slices/counter'
import './App.css'
import { RootState } from './store'

function App() {
  const { value } = useSelector((state: RootState) => state.counter)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank"></a>
        <a href="https://reactjs.org" target="_blank"></a>
      </div>
      <h1>Count is {value}</h1>
      <div className="card">
        <button
          style={{ marginRight: 10 }}
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>

        <button
          style={{ marginRight: 10 }}
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>

        <button
          style={{ marginRight: 10 }}
          onClick={() => dispatch(incrementBy(2))}
        >
          Increment by 2
        </button>
      </div>
    </div>
  )
}

export default App
