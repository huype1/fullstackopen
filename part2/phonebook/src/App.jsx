import React, { useState, useEffect } from "react";
import './index.css'
import noteService from "./services/notes";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

const Notification = ({ message, problem }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={problem}>
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
  const [showAll, setShowAll] = useState(true);
  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value.length === 0) {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  };

  const personToShow = showAll
    ? persons
    : persons.filter(
        (person) => person.name.toLowerCase() === search.toLowerCase()
      );
  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState("");

  const [addPerson, setAddPerson] = useState(null)
  const [problem, setProblem] = useState(null)

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

    const repeatedname = persons.find((person) => person.number === newPerson.number)
    const used = persons.find((person) => person.name.toLowerCase() === newPerson.name.toLowerCase())
    //check if this name exist
    if ( used && newPerson.number) {
      if(window.confirm(`${newPerson.name} is already in the phonebook, replace the old number with a new one?`))
      {
        changeNumber(used.id, newPerson.number)
        //add data
        setPersons(persons.concat(response.data));

        //notification
        setAddPerson(
          `${newPerson.name} number changed`
        )
        setProblem("changeNumber")
        setTimeout(() => {
          setAddPerson(null)
        }, 5000)

      }
      //reset the input as blank
      setNewName("");
      setNumber("");
    } else if (repeatedname) {
      window.alert(`${repeatedname.name} already have this number`);
      //reset the input as blank
      setNewName("");
      setNumber("");
    } else {
      //add that person into persons object array
      //using concat so that the original array is not mutated
      noteService.create(newPerson).then((response) => {
        //add data
        setPersons(persons.concat(response.data));
        //notification
        setAddPerson(
          `Added ${newPerson.name} `
        )
        setProblem("addPerson")
        setTimeout(() => {
          setAddPerson(null)
        }, 5000)

        //reset the input as blank
        setNewName("");
        setNumber("");
      })
      .catch(error => {
        setAddPerson(error.response.data.error)
        setProblem("error")
        setTimeout(() => {
          setAddPerson(null)
        }, 5000)
      })
    }
  };
  

  const RemoveNumber = (personid) => {
    const Name = persons.find((person) => person.id === personid).name;
    if (window.confirm(`Delete ${Name} ?`)) {
      noteService
        .remove(personid)
        .then(() => {
            noteService.getAll().then((response) => {
              setPersons(response.data);
            });

        })

    }
  }

  const changeNumber = (usedId, numberChanging, event) => {
    const numberPerson = persons.find(person => person.id === usedId)
    const changePerson = { ...numberPerson, number: numberChanging }
    event.preventDefault();
    noteService 
    .update(usedId, changePerson)
    .then(response => {
      setPersons(persons.map(person => person.id !== usedId ? person : response.data))
    })
    .catch(error => {
      //notification
      setAddPerson(
        `${numberPerson.name} has been deleted from the server `
      )
      setProblem("error")
      setTimeout(() => {
        setAddPerson(null)
      }, 5000)
      setPersons(persons.filter(n => n.id !== usedId))
      //reset the input as blank
      setNewName("");
      setNumber("");
    })
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addPerson} problem={problem}/>
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
