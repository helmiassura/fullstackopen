import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  
  const blog = useSelector(state => 
    state.blogs.find(b => b.id === id)
  )

  const user = useSelector(state => state.login)

  if (!blog) {
    return null
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(`You liked '${blog.title}'`, 'success', 3))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(setNotification(`Blog '${blog.title}' removed`, 'success', 5))
      navigate('/')
    }
  }

  const handleAddComment = (event) => {
    event.preventDefault()
    if (comment.trim()) {
      dispatch(addComment(blog.id, comment))
      setComment('')
      dispatch(setNotification('Comment added', 'success', 3))
    }
  }

  const canDelete = user && blog.user && user.username === blog.user.username

  return (
    <div className="container blog-detail">
      <div className="blog-detail-header">
        <h2 className="blog-detail-title">{blog.title}</h2>
        <a 
          href={blog.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="blog-detail-url"
        >
          {blog.url}
        </a>
        
        <div className="blog-detail-meta">
          <div className="blog-item-likes">
            <span>{blog.likes} likes</span>
          </div>
          <div className="blog-detail-author">
            Added by <strong>{blog.user?.name || blog.author}</strong>
          </div>
        </div>

        <div className="blog-detail-actions">
          <button onClick={handleLike} className="btn btn-success">
            ❤️ Like
          </button>
          {canDelete && (
            <button onClick={handleDelete} className="btn btn-danger">
              🗑️ Remove
            </button>
          )}
        </div>
      </div>

      <div className="comments-section">
        <h3 className="comments-header">Comments</h3>
        
        <form onSubmit={handleAddComment} className="comment-form">
          <div className="form-group">
            <label className="form-label">Add a comment</label>
            <input
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              className="form-input"
              placeholder="Write your comment here..."
            />
          </div>
          <button type="submit" className="btn btn-primary">
            💬 Add Comment
          </button>
        </form>

        {blog.comments && blog.comments.length > 0 ? (
          <div className="comment-list">
            {blog.comments.map((c, i) => (
              <div key={i} className="comment-item">
                <p className="comment-text">{c}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="comment-empty">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  )
}

export default Blog