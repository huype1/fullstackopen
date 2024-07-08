import AnecdoteForm from './components/AnecdoteForm'
import NewAnecdote from './components/NewAnecdote'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteForm />
      <h2>create new</h2>
      <NewAnecdote />
      
    </div>
  )
}

export default App
