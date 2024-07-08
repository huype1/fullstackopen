import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
const NewAnecdote = () => {
  const dispatch = useDispatch()
  const createNew = () => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(createAnecdote(anecdote))
    event.target.anecdote.value = ''
    dispatch(setNotification(`Anecdote ${anecdote} have been created`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)  
  }
  return (
    <form onSubmit={createNew}>
        <div>
          <input name="anecdote"/>
        </div>
        <button>create</button>
      </form>
  )
}
export default NewAnecdote