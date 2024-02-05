const Total = ({course}) => {
    let section = course.parts
    let totalex = section.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <><p><b>Total of {totalex} exercises</b></p></>
    ) 
  }

export default Total