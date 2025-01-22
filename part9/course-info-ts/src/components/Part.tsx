import { CoursePart } from '../App.tsx'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}
const Part = (props: CoursePart) => {
  switch (props.kind) {
    case 'basic':
      return (
        <> <h4>{props.name} {props.exerciseCount}</h4>
          <p>{props.description}</p>
        </>
      )
    case 'group':
      return (
        <> <h4>{props.name} {props.exerciseCount}</h4>
          <p>project exercises {props.groupProjectCount}</p>
        </>
      )
    case 'background':
      return (
        <> <h4>{props.name} {props.exerciseCount}</h4>
          <p>{props.description}</p>
          <p>submit to <a>{props.backgroundMaterial}</a></p>
        </>
      )
    case 'special':
      return (
        <> <h4>{props.name} {props.exerciseCount}</h4>
          <p>{props.description}</p>
          <p>required skills: {props.requirements.map(skill => <b>{skill} </b>)}</p>
        </>
      )
    default:
      assertNever(props);
      break;
  }
}
export default Part