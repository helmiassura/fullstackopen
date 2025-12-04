import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../services/anecdotes'
import { useNotification } from '../NotificationContext'

const AnecdoteList = () => {
  const qc = useQueryClient()
  const { showNotification } = useNotification()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const mutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => qc.invalidateQueries(['anecdotes']),
    onError: () => showNotification('Voting failed', 5)
  })

  if (result.isLoading) return <div>loading...</div>
  if (result.isError) return <div><strong>anecdote service not available due to problems in server</strong></div>

  const anecdotes = result.data.sort((a, b) => b.votes - a.votes)

  const handleVote = (a) => {
    const updated = { ...a, votes: a.votes + 1 }
    mutation.mutate(updated, {
      onSuccess: () => showNotification(`anecdote '${a.content}' voted`, 5)
    })
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
