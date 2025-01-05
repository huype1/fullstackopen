import { useState } from 'react'
import propTypes from 'prop-types'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'
const Blog = ({ blogs, currUser }) => {
  const blogMatch = useMatch('/blogs/:id')
  const dispatch = useDispatch()
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  // if (!blog) {
  //   return <p>Blog not found</p>
  // }
  // let buttonLabel = viewing ? 'hide' : 'view'
  let showDeletion = { display: 'none' }
  const navigate = useNavigate()

  // const showWhenView = { display: viewing ? '' : 'none' }
  if (blog.user) {
    showDeletion = {
      display: currUser.username === blog.user.username ? '' : 'none',
    }
  }
  // const toggleViewing = () => setViewing(!viewing)
  if (!blog) {
    return null
  }


  const likeBlog = async event => {
    event.preventDefault()
    try {
      const tempBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        userId: blog.user.id,
        id: blog.id,
      }
      dispatch(updateBlog(tempBlog))
    } catch (error) {
      console.log(error)
      dispatch(setNotification('Unable to like this blog', 'error', 3))
    }
  }

  const removeBlog = async event => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(deleteBlog(blog.id))
        navigate(-1)
      } catch (error) {
        dispatch(setNotification('Cannot delete blog', 'error', 3))
      }
    }
  }


  return (
    // <div style={blogStyle} className="blog" key={blog.id}>
    //   {blog.title} {blog.author}
    // <div>
    //   <button onClick={toggleViewing}>{buttonLabel}</button>
    //   <div style={showWhenView} className="showOnClick">
    <div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={likeBlog}>like</button>
      </div>
      <div>{blog.user ? blog.user.name : ''}</div>
      <button style={showDeletion} onClick={removeBlog} className="remove">
        remove
      </button>
    </div>
    // </div>
    // </div>
  )
}

export default Blog

// Blog.propTypes = {
//   blogs: propTypes.object.isRequired,
//   currUser: propTypes.object.isRequired,
// }
