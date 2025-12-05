import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const id = useParams().id
  const user = useSelector(state => 
    state.users.find(u => u.id === id)
  )

  if (!user) {
    return null
  }

  return (
    <div className="container user-detail">
      <div className="user-detail-header">
        <h2 className="user-detail-name">{user.name}</h2>
      </div>
      
      <div className="user-blogs-section">
        <h3 className="user-blogs-title">Added Blogs</h3>
        {user.blogs.length === 0 ? (
          <p className="empty-state-text">No blogs added yet</p>
        ) : (
          <ul className="user-blogs-list">
            {user.blogs.map(blog => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default User