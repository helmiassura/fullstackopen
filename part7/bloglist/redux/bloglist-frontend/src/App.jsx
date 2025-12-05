import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { setUser, logout } from './reducers/loginReducer'
import { setNotification } from './reducers/notificationReducer'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())
  }

  const addBlog = async (blogObject) => {
    try {
      await dispatch(createBlog(blogObject))
      dispatch(setNotification(
        `A new blog ${blogObject.title} by ${blogObject.author} added`,
        'success',
        5
      ))
    } catch (exception) {
      dispatch(setNotification('Failed to create blog', 'error', 5))
    }
  }

  const handleLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog))
      dispatch(setNotification(`You liked '${blog.title}'`, 'success', 3))
    } catch (exception) {
      dispatch(setNotification('Failed to update blog', 'error', 5))
    }
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await dispatch(deleteBlog(blog.id))
        dispatch(setNotification(`Blog '${blog.title}' removed`, 'success', 5))
      } catch (exception) {
        dispatch(setNotification('Failed to delete blog', 'error', 5))
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <BlogForm createBlog={addBlog} />
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          user={user}
        />
      )}
    </div>
  )
}

export default App