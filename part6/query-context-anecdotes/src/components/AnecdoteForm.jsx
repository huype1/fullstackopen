import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      dispatch({
        type: 'SET',
        payload: 'too short anecdote, must have length 5 or more'
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR',
        })
      }, 5000)
    },
  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch({
      type: 'SET',
      payload: `Anecdote ${content} have been created`
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR',
      })
    }, 5000)
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})   
    
  }

 


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
