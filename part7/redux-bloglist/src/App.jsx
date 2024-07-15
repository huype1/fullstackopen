import { useState, useEffect, useRef } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'


import { setNotification } from './reducers/notificationReducer'
import { initializeBlog, createNewBlog, deleteBlog } from './reducers/blogReducer'
import { setSignedIn } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  const [notificationStyle, setNotificationStyle] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlog())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setSignedIn(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setSignedIn(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationStyle('error')
      dispatch(setNotification('Wrong credential', 3))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    window.location.reload()
  }

  //this is also called createBlog
  const createBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    dispatch(createNewBlog(blogObject))
    setNotificationStyle('newBlogAdded')
    dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 3))
  }

  const likeBlog = async changedBlog => {
    try {
      const tempBlog = {
        title: changedBlog.title,
        author: changedBlog.author,
        url: changedBlog.url,
        likes: changedBlog.likes,
        userId: changedBlog.user.id,
        id: changedBlog.id,
      }
      dispatch(likeBlog(tempBlog))

    } catch (error) {
      dispatch(setNotification('Unable to like this blog', 3))
      setNotificationStyle('error')
    }
  }

  const removeBlog = async blogid => {
    try {
      dispatch(deleteBlog(blogid))
    } catch (error) {
      setNotificationStyle('error')
      dispatch(setNotification('Cannot delete blog', 3))
    }
  }

  const loginform = () => {
    return (
      <>
        <h2>log in to application</h2>
        <Notification notificationStyle={notificationStyle} />
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              type="text"
              data-testid="username"
              onChange={({ target }) => {
                setUsername(target.value)
              }}></input>
          </div>
          <div>
            Password
            <input
              type="text"
              data-testid="password"
              onChange={({ target }) => {
                setPassword(target.value)
              }}></input>
          </div>

          <button type="submit">Login</button>
        </form>
      </>
    )
  }

  const blogform = () => {
    return (
      <>
        <h2>blogs</h2>
        <Notification notificationStyle={notificationStyle} />
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>

        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <CreateBlogForm createBlog={createBlog} />
        </Togglable>

        {blogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={likeBlog}
            currUser={user}
            removeBlog={removeBlog}
          />
        ))}
      </>
    )
  }

  return <div>{user === null ? loginform() : blogform()}</div>
}

export default App
