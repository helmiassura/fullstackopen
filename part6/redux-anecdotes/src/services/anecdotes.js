// src/services/anecdotes.js
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const res = await fetch(baseUrl)
  if (!res.ok) {
    throw new Error('anecdote service not available due to problems in server')
  }
  return res.json()
}

export const createAnecdote = async (content) => {
  const newAnecdote = { content, votes: 0 }
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  })
  if (!res.ok) throw new Error('create failed')
  return res.json()
}

export const updateAnecdote = async (anecdote) => {
  const updated = { ...anecdote, votes: anecdote.votes }
  const res = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updated)
  })
  if (!res.ok) throw new Error('update failed')
  return res.json()
}
