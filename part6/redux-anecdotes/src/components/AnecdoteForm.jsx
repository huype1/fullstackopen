import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()
  
  const vote = () => {
    dispatch(voteForAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
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