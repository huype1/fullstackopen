import { useState } from 'react'
const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}
const Display = (props) => {
  return (
    <div>{props.good} {props.neutral} {props.bad}</div>
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
      <Display good={good} neutral={neutral} bad={bad}/>
      <Button onClick={addGood} text="Good"/>
      <Button onClick={addNeutral} text="neutral"/>
      <Button onClick={addBad} text="Bad"/>
    </div>
  )
}

export default App