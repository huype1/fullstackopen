import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [search, setSearch] = useState("");
  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value.length === 0) {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  };
  const [showAll, setShowAll] = useState(true);
  const personToShow = showAll
    ? persons
    : persons.filter(
        (person) => person.name.toLowerCase() === search.toLowerCase()
      );
  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState("");

  const addPeople = (event) => {
    //force the page to not reload
    event.preventDefault();
    //create a person with input data
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    //check if this name exist
    if (persons.find((person) => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
      window.alert(`${newPerson.number} is already added to phonebook`);
      //reset the input as blank
      setNewName("");
      setNumber("");
      
    }
    else if (persons.find((person) => person.number === newPerson.number)) {
      window.alert(`${newPerson.name} already have this number`);
      //reset the input as blank
      setNewName("");
      setNumber("");
    }
    else {
      //add that person into persons object array
      //using concat so that the original array is not mutated
      setPersons(persons.concat(newPerson));
      //reset the input as blank
      setNewName("");
      setNumber("");
    }
  };
  //to be able to show all the text typed in the input
  //you'll need an event handler that called setNewName to change it's value
  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNumber(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm name={newName} handleName={handleNewName} 
      number={newNumber} handleNumber={handleNewNumber}
      addPeople={addPeople}/>

      <h2>Numbers</h2>
      <Person personToShow={personToShow} />
    </div>
  );
};

export default App;
