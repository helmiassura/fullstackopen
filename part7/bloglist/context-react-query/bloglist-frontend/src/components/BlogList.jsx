import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  if (blogs.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📝</div>
        <p className="empty-state-text">No blogs yet</p>
      </div>
    )
  }

  return (
    <div className="blog-list">
      {blogs.map(blog => (
        <div key={blog.id} className="blog-item">
          <div className="blog-item-header">
            <div>
              <Link to={`/blogs/${blog.id}`} className="blog-item-title">
                {blog.title}
              </Link>
              <div className="blog-item-author">
                by {blog.author}
              </div>
            </div>
          </div>
          
          <a 
            href={blog.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="blog-item-url"
            onClick={(e) => e.stopPropagation()}
          >
            {blog.url}
          </a>
          
          <div className="blog-item-meta">
            <div className="blog-item-likes">
              <span>❤️ {blog.likes} likes</span>
            </div>
            {blog.user && (
              <div className="blog-item-author">
                Added by {blog.user.name}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default BlogList