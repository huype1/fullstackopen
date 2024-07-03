import { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [problem, setProblem] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogsUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setProblem('error')
      setErrorMessage('Wrong credential')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    window.location.reload()
  }


  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const blogAdded = await blogService.create(blogObject)
    setBlogs(blogs.concat(blogAdded))
    setProblem('newBlogAdded')
    setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const likeBlog = async (changedBlog) => {
    try {
      const tempBlog = {
        title: changedBlog.title,
        author: changedBlog.author,
        url: changedBlog.url,
        likes: changedBlog.likes,
        userId: changedBlog.user.id,
        id: changedBlog.id,
      }
      const newBlog = await blogService.update(tempBlog)
      //you need to set it with newBlog which was returned from server
      //because the changed blog only have an id collumn
      setBlogs(blogs.map(blog => blog.id === newBlog.id ? newBlog : blog).sort((a,b) => a.likes - b.likes))
    }
    catch (error) {
      setProblem('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogid) => {
    try {
      setBlogs(blogs.filter(blog => blog.id !== blogid))
      await blogService.remove(blogid)
    } catch (error) {
      setProblem('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginform = () => {
    return (
      <>
        <h2>log in to application</h2>
        <Notification message={errorMessage} problem={problem}/>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              type="text" data-testid='username'
              onChange={({ target }) => {
                setUsername(target.value)
              }}
            ></input>
          </div>
          <div>
            Password
            <input
              type="text" data-testid='password'
              onChange={({ target }) => {
                setPassword(target.value)
              }}
            ></input>
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
        <Notification message={errorMessage} problem={problem} />
        <div>{user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>

        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <CreateBlogForm createBlog={addBlog}/>
        </Togglable>

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} updateBlog={likeBlog} currUser={user} removeBlog={deleteBlog}/>
        ))}
      </>
    )

  }


  return (
    <div>
      {user === null ? loginform() : blogform()}
    </div>)
}

export default App
