import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value.trim()
    if (content.length < 1) return
    try {
      await dispatch(createAnecdote(content))
      dispatch(setNotification(`You created '${content}'`, 5))
      e.target.anecdote.value = ''
    } catch (err) {
      dispatch(setNotification('Create failed', 5))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
