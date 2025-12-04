import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(s => s.filter || '')
  const anecdotes = useSelector(s => s.anecdotes)
    .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    .sort((a,b) => b.votes - a.votes)

  const handleVote = async (a) => {
    try {
      await dispatch(voteAnecdote(a))
      dispatch(setNotification(`You voted '${a.content}'`, 5))
    } catch (err) {
      dispatch(setNotification('Voting failed', 5))
    }
  }

  return (
    <div>
      {anecdotes.map(a => (
        <div key={a.id} style={{ marginBottom: 8 }}>
          <div>{a.content}</div>
          <div>
            has {a.votes}
            <button onClick={() => handleVote(a)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
