import React, { useState, useEffect } from "react";
import './index.css'
import noteService from "./services/notes";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='addPerson'>
      {message}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    noteService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

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

  const [addPerson, setAddPerson] = useState('Person added')

  //to be able to show all the text typed in the input
  //you'll need an event handler that called setNewName to change it's value
  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNumber(event.target.value);

  const addPeople = (event) => {
    //force the page to not reload
    event.preventDefault();
    //create a person with input data don't create id because json-server will do it automatically
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const used = persons.find((person) => person.name.toLowerCase() === newPerson.name.toLowerCase())
    //check if this name exist
    if ( used && newPerson.number) {
      if(window.confirm(`${newPerson.name} is already in the phonebook, replace the old number with a new one?`))
      {
        changeNumber(used.id, newPerson.number)
      }
      //reset the input as blank
      setNewName("");
      setNumber("");
    } else if (persons.find((person) => person.number === newPerson.number)) {
      window.alert(`${newPerson.name} already have this number`);
      //reset the input as blank
      setNewName("");
      setNumber("");
    } else {
      //add that person into persons object array
      //using concat so that the original array is not mutated
      noteService.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
        //reset the input as blank
        setNewName("");
        setNumber("");
      });
    }
  };
  

  const RemoveNumber = (personid) => {
    const Name = persons.find((person) => person.id === personid).name;
    if (window.confirm(`Delete ${Name} ?`)) {
      noteService
        .remove(personid)
        .then(() => {
          noteService
            .getAll()
            .then((response) => {
              console.log("Updated list of people:", response.data);
            })
            .catch((error) => {
              console.error("Error fetching updated list:", error);
            });
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
  }

  const changeNumber = (usedId, numberChanging) => {
    const numberPerson = persons.find(person => person.id === usedId)
    const changePerson = { ...numberPerson, number: numberChanging }
    noteService 
    .update(usedId, changePerson)
    .then(response => {
      setPersons(persons.map(person => person.id !== usedId ? person : response.data))
    })
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedPerson} />
      <Filter search={search} handleSearch={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm
        name={newName}
        handleName={handleNewName}
        number={newNumber}
        handleNumber={handleNewNumber}
        addPeople={addPeople}
      />

      <h2>Numbers</h2>
      <Person personToShow={personToShow} RemoveNumber={RemoveNumber} />
    </div>
  );
};

export default App;
