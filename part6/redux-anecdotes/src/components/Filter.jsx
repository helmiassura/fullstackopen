import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(s => s.filter)

  const handleChange = (e) => dispatch(setFilter(e.target.value))

  const style = { marginBottom: 10 }

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} placeholder="ketik kata kunci..." />
    </div>
  )
}

export default Filter
