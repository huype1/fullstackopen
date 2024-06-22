import { useState } from 'react'
import propTypes from 'prop-types'
const Blog = ({ blog, updateBlog, currUser, removeBlog }) => {
  const [viewing, setViewing] = useState(false)
  let buttonLabel = viewing ? 'hide' : 'view'
  let showDeletion = { display: 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenView = { display: viewing ? '' : 'none' }
 if (blog.user) {
    showDeletion = { display: (currUser.username === blog.user.username) ? '' : 'none' }
  } 
  const toggleViewing = () => setViewing(!viewing)

  const likeBlog = (event) => {
    event.preventDefault()
    const newLike = blog.likes + 1

    updateBlog({
      ...blog,
      likes: newLike,
    })
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className='blog' key={blog.id}>
      {blog.title} {blog.author}
      <button onClick={toggleViewing}>{buttonLabel}</button>

      <div style={showWhenView} className='showOnClick'>
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={likeBlog}>like</button></div>
          <div>{blog.user ? blog.user.name : ''}</div>
          <button style={showDeletion} onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog

Blog.propTypes = {
  blog: propTypes.object.isRequired,
  updateBlog: propTypes.func.isRequired,
  currUser: propTypes.object.isRequired,
  removeBlog: propTypes.func.isRequired
}