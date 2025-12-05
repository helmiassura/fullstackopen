import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div className="container">
      <div className="page-header">
        <h2 className="page-title">Users</h2>
        <p className="page-subtitle">All registered users and their blog statistics</p>
      </div>
      
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`} className="user-link">
                    {user.name}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users