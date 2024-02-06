import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const personToShow = (showAll
  ? persons : persons.filter(person => person.name.toLowerCase() === search.toLowerCase()))
  const addPeople = (event) => {

  //force the page to not reload
  event.preventDefault() 
  //create a person with input data
  const newPerson = {
    name : newName,
    number: newNumber,
    id: persons.length + 1
  }
  
  if (persons.find(person => person.name === newPerson.name )){
    window.alert(`${newPerson.name} is already added to phonebook`)
    //reset the input as blank
    setNewName('')
    setNumber('')
  } 
  
  else {
    //add that person into persons object array
    //using concat so that the original array is not mutated
    setPersons(persons.concat(newPerson))
    //reset the input as blank
    setNewName('')
    setNumber('')
  }
    
  }
  //to be able to show all the text typed in the input 
  //you'll need an event handler that called setNewName to change it's value
  const handleNewName = event => setNewName(event.target.value)
  const handleNewNumber = event => setNumber(event.target.value)
  const handleSearch = (event) => {
    setSearch(event.target.value)
    if (event.target.value.length === 0) {
      setShowAll(true)
    }
    else {
      setShowAll(false)
    }
    
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={search} onChange={handleSearch}/></div>

      <h2>Add a new</h2>
      <form onSubmit={addPeople}>
        <div>
          name:
          <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        
        <div><button type="submit">add</button></div>
      </form>
      
      <h2>Numbers</h2>
      <ul>
        {personToShow.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
      </ul>
      
    </div>
  )
}

export default App