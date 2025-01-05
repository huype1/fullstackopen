import { useState, useEffect, useRef } from 'react'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link, useMatch } from 'react-router-dom'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import blogService from './services/blogs'
import loginService from './services/login'

import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'

import { setSignedIn } from './reducers/userReducer'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlog())
    dispatch(initializeUsers())
  }, [dispatch])



  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)



  useEffect(() => {
    //use for login
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
      dispatch(setNotification('Wrong credential', 'error', 3))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    window.location.reload()
  }

  const loginform = () => {
    return (
      <>
        <h2>log in to application</h2>
        <Notification />
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

  const titleSection = () => {
    return (
      <>
        <h2>blogs</h2>
        <Notification />
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
      </>
    )
  }

  return (
    <Router>
      {user === null ? loginform() : titleSection()}
      <Routes>
        <Route path="/users" element={<Users users={users}/>} />
        <Route path="/users/:id" element={<User users={users} blogs={blogs} />} />
        <Route
          path="/"
          element={
            <Blogs blogFormRef={blogFormRef} user={user} blogs={blogs} />
          }
        />
        <Route path="/blogs/:id" element={<Blog blogs={blogs} currUser={user}/>} />
      </Routes>
    </Router>
  )
}

export default App
