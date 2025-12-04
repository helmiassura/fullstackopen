import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) { return action.payload },
    appendAnecdote(state, action) { state.push(action.payload) },
    updateAnecdote(state, action) {
      const upd = action.payload
      return state.map(a => a.id === upd.id ? upd : a)
    }
  }
})

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions

const baseUrl = 'http://localhost:3001/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    try {
      const res = await fetch(baseUrl)
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      dispatch(setAnecdotes(data))
    } catch (err) {
      console.error('initializeAnecdotes failed', err)
      dispatch(setAnecdotes([]))
    }
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    try {
      const newAnecdote = { content, votes: 0 }
      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnecdote)
      })
      if (!res.ok) throw new Error('create failed')
      const created = await res.json()
      dispatch(appendAnecdote(created))
      return created
    } catch (err) {
      console.error('createAnecdote failed', err)
      throw err
    }
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    try {
      const updated = { ...anecdote, votes: anecdote.votes + 1 }
      const res = await fetch(`${baseUrl}/${anecdote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      })
      if (!res.ok) throw new Error('vote failed')
      const returned = await res.json()
      dispatch(updateAnecdote(returned))
      return returned
    } catch (err) {
      console.error('voteAnecdote failed', err)
      throw err
    }
  }
}

export default anecdoteSlice.reducer
