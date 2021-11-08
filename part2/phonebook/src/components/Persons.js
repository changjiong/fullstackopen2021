import React from "react";

const Persons = ({ persons, filter }) => {
  const filteredPersons = persons.filter((person) => person.name.match(filter));

  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
