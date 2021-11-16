import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Notification from "./components/Notification";
import phoneService from "./services/phones";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    phoneService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("persons:", persons);

  const notifyWith = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const existingPerson = persons.find((person) => person.name === newName);
    console.log("existingPerson:", existingPerson);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const id = existingPerson.id;
        phoneService
          .update(id, newPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : response.data
              )
            );
            notifyWith(`updated ${newName}`);
          })
          .catch((error) => {
            notifyWith({
              message: `Information of ${newName} has already been removed from server`,
              type: "error",
            });
          });
      }
    } else {
      phoneService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      notifyWith(`Added ${newName}`);
    }
    setNewName("");
    setNewNumber("");
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleDlete = (id) => {
    const person = persons.find((person) => person.id === id);
    console.log(person);
    if (window.confirm(`Delete ${person.name}?`)) {
      setPersons(persons.filter((person) => person.id !== id));
      notifyWith(`Deleted ${person.name}`);
      phoneService
        .remove(id)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filterName} onFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filterName.toLowerCase())
        )
        .map((person) => (
          <Person
            key={person.id}
            person={person}
            handleDlete={() => handleDlete(person.id)}
          />
        ))}
    </div>
  );
};

export default App;
