import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
const NewAnecdote = () => {
  const createAnecdotes = () => {
    const dispatch = useDispatch()
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
  }
  return (
    <form onSubmit={createAnecdotes}>
        <div>
          <input name="anecdote"/>
        </div>
        <button>create</button>
      </form>
  )
}
export default NewAnecdote