import { useState } from 'react'
import reactLogo from './assets/react.svg'

const Header = (props) => {
console.log(props)
  return (
      <h2>{props.course.name}</h2>
  )
}
const Part = (props) => {
  return (
    <div>
    <p>
      {props.part} {props.exercises}
    </p>
    </div>
  )
}
const Content = (props) => {
  const {parts} = props.course
  //map the array parts with iterate variable = part
  return (
    <div>
      {parts.map(part => <Part part={part.name} exercises={part.exercises}/>)}
    </div>
  )
}

const Total = ({course}) => {
  let section = course.parts
  let totalex = section.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <><p><b>Total of {totalex} exercises</b></p></>
  ) 
}

const Course = ({ course }) => {
  return (
     <>
       {
        course.map((section, index) => 
         <div key={index}>
           <Header course={section} />
           <Content course={section} />
           <Total course={section} />
         </div>
        )
       }
     </>
  )
}
 

//you can only make a react component with a capitalize variable
const App = () => {
  const course = [
    {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }, 
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course course={course} />
    </div>
  )
}

export default App
