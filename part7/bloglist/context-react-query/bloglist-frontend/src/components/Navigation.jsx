import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const Navigation = () => {
  const user = useSelector(state => state.login)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())
    dispatch(setNotification('Logged out successfully', 'success', 3))
    navigate('/')
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Blog App
        </Link>
        
        {user && (
          <>
            <ul className="nav-links">
              <li>
                <Link to="/" className="nav-link">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/users" className="nav-link">
                  Users
                </Link>
              </li>
            </ul>

            <div className="nav-user-info">
              <span className="nav-username">{user.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary btn-small">
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navigation