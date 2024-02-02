import { useState } from 'react'
const Button = (props) => {
  return(
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}
const Statisticline = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tr>
      <td>{text}</td>
      <td> {value}%</td>
      </tr>
    )
  }
  else {
    return (
      <tr>
      <td>{text}</td>
      <td> {value}</td>
      </tr>
    )
  }
  
}
const Statistic = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const total = props.total
  const average = (good + neutral*0 - 1*bad)/total
  const positive = good /(total)*100
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <table>
      <Statisticline text="good" value={good}/>
      <Statisticline text="neutral" value={neutral}/>
      <Statisticline text="bad" value={bad}/>
      <Statisticline text="total" value={total}/>
      <Statisticline text="average" value={average}/>
      <Statisticline text="positive" value={positive}/>
      </table>
    
    </div>
  ) 
} 
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  //add all the component event handler
  //have to set newVar because after setVar(Var+1) it will not change imediately
  //the reason is because react usually form these State into batches that execute later on 
  const addGood = () => {
    const newgood = good + 1
    setGood(good + 1)
    setTotal(newgood + bad + neutral)
  }
  const addNeutral = () => {
    const newneutral = neutral + 1
    setNeutral(neutral + 1)
    setTotal(newneutral + bad + good)
  }
  const addBad = () => {
    const newbad = bad + 1
    setBad(bad + 1)
    setTotal(newbad + good + neutral)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={addGood} text="Good"/>
      <Button onClick={addNeutral} text="Neutral"/>
      <Button onClick={addBad} text="Bad"/>
      <h1>statistic</h1>
      <Statistic good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App