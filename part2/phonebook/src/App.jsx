import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [newName, setNewName] = useState('')

  const addPeople = (event) => {

    //force the page to not reload
    event.preventDefault() 
    //create a person with input data
    const newPerson = {
      name : newName
    }
    
    if (persons.find(person => person.name === newPerson.name )){
      window.alert(`${newPerson.name} is already added to phonebook`)
      //reset the input as blank
      setNewName('')
    }
    else {
      //add that person into persons object array
      //using concat so that the original array is not mutated
      setPersons(persons.concat(newPerson))

      //reset the input as blank
      setNewName('')
    }
    
  }
  //to be able to show all the text typed in the input 
  //you'll need an event handler that called setNewName to change it's value
  const handlenew = (event) => {
    setNewName(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPeople}>
        <div>
          name:{' '}
          <input
            value={newName}
            onChange={handlenew}
          />
        </div>
        
        <div><button type="submit">add</button></div>
      </form>
      
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li>{person.name}</li>)}
      </ul>

      
    </div>
  )
}

export default App