import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = () => {
    handleLike(blog)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleDelete(blog.id)
    }
  }

  const showDelete = blog.user && currentUser && blog.user.username === currentUser.username

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-title-author">
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div className="blog-details">
          <div className="blog-url">{blog.url}</div>
          <div className="blog-likes">
            likes {blog.likes}{' '}
            <button onClick={likeBlog}>like</button>
          </div>
          <div>{blog.user ? blog.user.name : 'Unknown'}</div>
          {showDelete && (
            <button onClick={removeBlog} style={{ backgroundColor: '#5555ff', color: 'white' }}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog