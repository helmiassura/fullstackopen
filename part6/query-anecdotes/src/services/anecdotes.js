const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const res = await fetch(baseUrl)
  if (!res.ok) throw new Error('anecdote service not available due to problems in server')
  return res.json()
}

export const createAnecdote = async (content) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 })
  })
  if (!res.ok) {
    // try parse json error, fallback to text
    try {
      const json = await res.json()
      throw new Error(json.error || JSON.stringify(json))
    } catch {
      const errText = await res.text()
      throw new Error(errText || 'create failed')
    }
  }
  return res.json()
}

export const updateAnecdote = async (anecdote) => {
  const res = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
  })
  if (!res.ok) throw new Error('update failed')
  return res.json()
}
