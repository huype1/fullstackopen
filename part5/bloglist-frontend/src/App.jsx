import { useState, useEffect } from "react";
import './index.css'
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user);
      blogService.setToken(user.token)
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
       window.localStorage.setItem(
        'loggedBlogsUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setProblem('error');
      setErrorMessage("Wrong credential");
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  };

  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }
  const handleNewAuthor = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleNewUrl = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    await blogService.create(blogObject)
    setBlogs(blogs.concat(blogObject))
    setProblem('newBlogAdded');
    setErrorMessage(`a new blog ${newTitle} by ${newAuthor} added`);
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const loginform = () => {
    return (
      <>
        <h2>log in to application</h2>
      <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              type="text"
              onChange={({ target }) => {
                setUsername(target.value);
              }}
            ></input>
          </div>
          <div>
            Password
            <input
              type="text"
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            ></input>
          </div>

          <button type="submit">Login</button>
        </form>
      </>
    );
  };

  const blogform = () => { 
    return (
      <>
        <h2>blogs</h2>
        <Notification message={errorMessage} />
        <div>{user.name} logged in <button onClick={() => {
          window.localStorage.removeItem('loggedBlogsUser')
          window.location.reload();
          }}>logout</button> </div> 
        
        <h2>create new</h2>
        <form onSubmit={addBlog}>
        <div>
        Title
        <input type="text" value={newTitle} onChange={handleNewTitle}></input>
        </div>
        <div>
            Author
          <input type="text" value={newAuthor} onChange={handleNewAuthor}></input>
        </div>
        <div>
          Url
          <input type="text" value={newUrl} onChange={handleNewUrl}></input>
        </div>
        <button type="submit">Create</button>
        </form>

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    );

  }
      

  return (
    <div>
      {user === null ? loginform() : blogform()}
    </div>);
};

export default App;
