import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  //make a max variable based on the amount of quotes in the object
  const max = anecdotes.length
  //makes an array of vote that is full of 0 so it will track the number of votes
  
  
  //get a random number as an index to access the quotes randomly
  const [selected, setSelected] = useState(0)
  const [mostvote, setVoted] = useState(0)

  let [points, setArr] = useState([])
  if (points.length === 0) {
    points = Array(max).fill(0)
  }
  
  //select with a random number component
  const newSelected = () => {
    const Selected = Math.floor(Math.random() * max)
    setSelected(Selected)
  }

  //if voting array dont have any data then fill it with 0
  const vote = () => {
    const copy = [...points]
    copy[selected] = copy[selected] + 1
    setArr(copy)
    for(let i = 0; i < max; i++) {
      if (copy[i] > copy[mostvote]) {
        setVoted(i)
      }
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={newSelected}>next anecdotes</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostvote]}</p>
    </div>
  )
}

export default App