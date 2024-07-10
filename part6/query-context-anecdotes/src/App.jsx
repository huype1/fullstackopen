import { useQuery, useMutation, QueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'
import { useReducer } from 'react'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const dispatch = useNotificationDispatch()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    anecdote.votes = anecdote.votes + 1
    dispatch({
      type: 'SET',
      payload: `you voted '${anecdote.content}'`
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR',
      })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    //let it retry 1 time before it give up on connecting with server
    retry: 1
  })
  

  if (result.isPending) {
    return <div>loading...</div>
  }
  if (result.isError) {
    return <div>anecdote sercer is not available due to problems in server</div>
  }
  
  const anecdotes = result.data 
  

  return (
    <div>
      <h3>Anecdote app</h3>
    <Notification />
    <AnecdoteForm />
  
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>

  )
}

export default App
