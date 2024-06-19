import { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, updateBlog, currUser, removeBlog }) => {
  const [viewing, setViewing] = useState(false)
  let showDeletion = { display: 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenView = { display: viewing ? 'none' : '' }
  const showWhenView = { display: viewing ? '' : 'none' }
  if (blog.user) {
    showDeletion = { display: (currUser.username === blog.user.username) ? '' : 'none' }
  }

  const likeBlog = (event) => {
    event.preventDefault()
    const newLike = blog.likes + 1
    const userId = blog.user.id
    updateBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLike,
      userId: userId,
      id: blog.id,
    })
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} key={blog.id}>
      <div style={hideWhenView}>
        {blog.title} {blog.author}
        <button onClick={() => setViewing(true)}>view</button>
      </div>

      <div style={showWhenView}>
        {blog.title} {blog.author}
        <button onClick={() => setViewing(false)}>hide</button><div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={likeBlog}>like</button></div>
          <div>{blog.user ? blog.user.name: ''}</div>
          <button style={showDeletion} onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog

Blog.PropTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  currUser: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired
}