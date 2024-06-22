import { useState } from 'react'
const CreateBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <div className='formDiv'>
      <h2>create new</h2>
      <form onSubmit={addBlog} >

        <div>
          Title
          <input type="text" value={newTitle} placeholder='title' onChange={event => setNewTitle(event.target.value)}></input>
        </div>
        <div>
          Author
          <input type="text" value={newAuthor} placeholder='author' onChange={event => setNewAuthor(event.target.value)}></input>
        </div>
        <div>
          Url
          <input type="text" value={newUrl} placeholder='url' onChange={event => setNewUrl(event.target.value)}></input>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm
