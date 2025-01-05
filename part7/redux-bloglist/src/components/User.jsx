import { useDispatch, useSelector } from 'react-redux'

import { useMatch, useNavigate } from 'react-router-dom'

const User = ({ users, blogs }) => {
  const userMatch = useMatch('/users/:id')
  if (!users || !blogs) {
    return null
  }
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null
  if (!user) {
    return <p>User not found.</p>
  }

  const userBlogs = blogs.filter(blog => blog.user.id === user.id)

  return (
    <div>
      <h2>{user.name}</h2>
      <div>
        <h4>added blogs</h4>
        <ul>
          {userBlogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default User
