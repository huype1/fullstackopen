import { useState } from 'react'
import reactLogo from './assets/react.svg'

const Header = (props) => {
  return (
      <h1>{props.course.name}</h1>
  )
}
const Part = (props) => {
  return (
    <div>
    <p>
      {props.part1} {props.exercises1}
    </p>
    <p>
      {props.part2} {props.exercises2}
    </p>
    <p>
      {props.part3} {props.exercises3}
    </p> 
    <p>
      {props.part4} {props.exercises4}
    </p> 
    </div>
  )
}
const Content = (props) => {
  console.log(props.course.parts[2].exercises)
  return (
    <div>
    <Part part1={props.course.parts[0].name} exercises1={props.course.parts[0].exercises}/>
    <Part part2={props.course.parts[1].name} exercises2={props.course.parts[1].exercises}/>
    <Part part3={props.course.parts[2].name} exercises3={props.course.parts[2].exercises}/>
    <Part part4={props.course.parts[3].name} exercises4={props.course.parts[3].exercises}/>
  </div>)
}
const Total = (props) => {
  return (
    <><p><b>Total of {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises + props.course.parts[3].exercises} exercises</b></p></>
  ) 
}
const Course = (props) => {
  return (
    <div>
      <Header course={props.course}/>
      <Content course={props.course}/>
      <Total course={props.course}/>
      </div>
  )
}
//you can only make a react component with a capitalize variable
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
      {
        name: 'Redux',
        exercises: 11
      }
    ]
  }

  return <Course course={course} />
}

export default App
