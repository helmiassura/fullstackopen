import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from "./reducers/userReducer";
import { setUser } from './reducers/loginReducer'
import blogService from './services/blogs'

import Navigation from './components/Navigation'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import BlogForm from './components/BlogForm'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  if (!user) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <Notification />
      
      <Routes>
        <Route path="/" element={
          <div className="container">
            <div className="page-header">
              <h2 className="page-title">Blog Posts</h2>
              <p className="page-subtitle">Explore and share amazing blog posts</p>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <BlogForm />
            </div>
            
            <BlogList />
          </div>
        } />
        
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App