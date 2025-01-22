import { CoursePart } from '../App.tsx'
import Part from './Part.tsx'

interface CourseProps {
  courseParts: CoursePart[];
}

const Content = (props: CourseProps) => {
  return (
    <>
      {props.courseParts.map((part) => {
        return (
          <Part key={part.name} {...part} />
        )
      })}
   </>
  )
}
export default Content;