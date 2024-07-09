import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
const NewAnecdote = () => {

  const dispatch = useDispatch()

  const createNew = async () => {
    event.preventDefault()
    //create
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
    
    
    //notification for 5 second
    dispatch(setNotification(`Anecdote ${anecdote} have been created`), 3)

    
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