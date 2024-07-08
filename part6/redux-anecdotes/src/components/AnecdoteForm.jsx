import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()
  const vote = () => {
    console.log(anecdote)
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`You've voted for ${anecdote.content}`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)  
  }

    return (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>

          <div>
            has {anecdote.votes}
            <button onClick={vote}>vote</button>
          </div>
          
        </div>
      )
}
const AnecdoteForm = () => {
    
    
    const anecdotes = useSelector(({ filter, anecdotes }) => {
  
      if (filter === '' ) {
        return anecdotes
      }
      return anecdotes.filter(particle => particle.content.includes(filter))
    })

    

    return (
            <div>
            {   [...anecdotes].sort().sort((a, b) => a.votes - b.votes )
                .map((anecdote) => 
                    <Anecdote key={anecdote.id} anecdote={anecdote} />
                )
            }
            </div>
        )
}
export default AnecdoteForm