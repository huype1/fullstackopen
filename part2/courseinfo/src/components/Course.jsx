import Header from './Header'
import Content from './Content'
import Total from './Total'
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

export default Course