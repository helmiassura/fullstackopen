import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    try {
      await dispatch(createBlog({
        title,
        author,
        url
      }))
      
      dispatch(setNotification(`A new blog ${title} by ${author} added`, 'success', 5))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      dispatch(setNotification('Failed to create blog', 'error', 5))
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Create New Blog</h2>
        <p className="card-subtitle">Share a new blog post with the community</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            className="form-input"
            placeholder="Enter blog title"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Author</label>
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            className="form-input"
            placeholder="Enter author name"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">URL</label>
          <input
            type="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            className="form-input"
            placeholder="https://example.com"
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          ✨ Create Blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm