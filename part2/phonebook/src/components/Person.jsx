import PersonForm from './PersonForm'
const Person = ({ personToShow, RemoveNumber }) => {
    return (
        <div>
            <ul>
                {personToShow.map(person => <li key={person.id}>{person.name} {person.number} <button onClick={() => {RemoveNumber(person.id)}}>Delete</button></li> )}

            </ul>
            
        </div>
    )
}
export default Person
