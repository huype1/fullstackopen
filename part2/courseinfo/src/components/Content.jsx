import Part from './Part'
const Content = (props) => {
    const {parts} = props.course
    //map the array parts with iterate variable = part
    return (
      <div>
        {parts.map((part) => 
        <Part part={part.name} exercises={part.exercises}/>)}
      </div>
    )
  }

  export default Content