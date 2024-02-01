import { useState } from 'react'
const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}
const Statistic = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const total = good + neutral + bad
  const average = (good + neutral*0 - 1*bad)/total
  const positive = good /(total)*100
  return (
    <div>
      <h1>statistic</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
} 
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={addGood} text="Good"/>
      <Button onClick={addNeutral} text="neutral"/>
      <Button onClick={addBad} text="Bad"/>
      <Statistic good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App