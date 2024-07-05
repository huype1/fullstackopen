import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'
const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>

          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
          
        </div>
      )
}
const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
  
    return (
            <div>
            {   anecdotes.sort((a, b) => a.votes - b.votes )
                .map((anecdote) => 
                    <Anecdote key={anecdote.id} anecdote={anecdote} 
                    handleClick={() => dispatch(voteForAnecdote(anecdote.id))}/>
                )
            }
            </div>
        )
}
export default AnecdoteForm