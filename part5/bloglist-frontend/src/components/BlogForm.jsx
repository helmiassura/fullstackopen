import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '5px' }}>
          <label>
            title:{' '}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title"  
            />
          </label>
        </div>
        <div style={{ marginBottom: '5px' }}>
          <label>
            author:{' '}
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="author"  
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            url:{' '}
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="url"  
            />
          </label>
        </div>
        <button type="submit">create</button>  
      </form>
    </div>
  )
}

export default BlogForm