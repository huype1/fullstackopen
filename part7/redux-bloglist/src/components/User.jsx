import { useDispatch, useSelector } from 'react-redux'


const User = ({ user, blogs }) => {
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <div>
        <h4>added blogs</h4>
        <ul>
          {blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default User
