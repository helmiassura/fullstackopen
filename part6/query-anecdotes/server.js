import jsonServer from 'json-server'
import fs from 'fs'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const PORT = process.env.PORT || 3001

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use((req, res, next) => setTimeout(next, 300))

server.post('/anecdotes', (req, res, next) => {
  const { content } = req.body || {}
  if (!content || content.trim().length < 5) {
    res.status(400).json({ error: 'too short anecdote, must have length 5 or more' })
  } else {
    next()
  }
})

server.use(router)
server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`)
})
