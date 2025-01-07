import React, { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  AppBar,
  Toolbar,
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Paper,
  Link,
  Stack,
} from '@mui/material'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setSignedIn } from './reducers/userReducer'
import blogService from './services/blogs'
import loginService from './services/login'

import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => (
  <div>
    <form onSubmit={handleLogin}>
      <label htmlFor="username" style={{ display: 'block', marginBottom: 4 }}>
        Username
      </label>
      <input
        id="username"
        name="username"
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        style={{
          width: '100%',
          padding: '8px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <label htmlFor="password" style={{ display: 'block', marginBottom: 4 }}>
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{
          width: '100%',
          padding: '8px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Login
      </Button>
    </form>
  </div>
)

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

  const Navigation = () => (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{ textDecoration: 'none' }}>
            Home
          </Link>
          <Link
            component={RouterLink}
            to="/blogs"
            color="inherit"
            sx={{ textDecoration: 'none' }}>
            Blogs
          </Link>
          <Link
            component={RouterLink}
            to="/users"
            color="inherit"
            sx={{ textDecoration: 'none' }}>
            Users
          </Link>
        </Box>
        {user ? (
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>{user.name} logged in</Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        ) : (
          <Link
            component={RouterLink}
            to="/login"
            color="inherit"
            sx={{ textDecoration: 'none' }}>
            Login
          </Link>
        )}
      </Toolbar>
    </AppBar>
  )

  return (
    <Router>
      <Navigation />
      <Container sx={{ mt: 3 }}>
        <Notification />
        <Routes>
          <Route
            path="/login"
            element={
              !user && (
                <LoginForm
                  username={username}
                  password={password}
                  setUsername={setUsername}
                  setPassword={setPassword}
                  handleLogin={handleLogin}
                />
              )
            }
          />
          <Route path="/users" element={<Users users={users} />} />
          <Route
            path="/users/:id"
            element={<User users={users} blogs={blogs} />}
          />
          <Route
            path="/blogs"
            element={
              <Blogs blogFormRef={blogFormRef} user={user} blogs={blogs} />
            }
          />
          <Route
            path="/blogs/:id"
            element={<Blog blogs={blogs} currUser={user} />}
          />
          <Route
            path="/"
            element={
              <div>
                <Typography variant="h4" component="h1" gutterBottom>
                  Welcome to the Blog App
                </Typography>
              </div>
            }
          />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
