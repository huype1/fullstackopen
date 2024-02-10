import PersonForm from './PersonForm'
const Person = ({ personToShow }) => {
    return (
        <div>
            <ul>
                {personToShow.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
                <button onChange={RemoveNumber(personToShow.id)}>Delete</button>
            </ul>
        </div>
    )
}
export default Person
