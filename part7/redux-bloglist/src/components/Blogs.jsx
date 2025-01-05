import CreateBlogForm from './CreateBlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import {
  createNewBlog,
  updateBlog,
  deleteBlog,
} from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const Blogs = ({ blogFormRef, blogs }) => {
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  if (!blogs) {
    return null
  }
  const createBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createNewBlog(blogObject))
    } catch {
      dispatch(
        setNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`,
          'success',
          3,
        ),
      )
    }
  }

  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateBlogForm createBlog={createBlog} />
      </Togglable>

      {blogs.map(blog => (
        <div style={blogStyle} className="blog" key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      ))}
    </>
  )
}
export default Blogs
