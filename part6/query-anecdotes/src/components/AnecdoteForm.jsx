import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/anecdotes'
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  const qc = useQueryClient()
  const { showNotification } = useNotification()

  const mutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => qc.invalidateQueries(['anecdotes']),
    onError: (error) => {
      const msg = error?.message || 'create failed'
      showNotification(msg, 5)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value.trim()
    if (!content) return
    mutation.mutate(content, {
      onSuccess: () => {
        showNotification(`you created '${content}'`, 5)
        e.target.anecdote.value = ''
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
