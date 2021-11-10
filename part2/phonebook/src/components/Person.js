import React from "react";

const Person = ({ person, handleDlete }) => {
  return (
    <li key={person.name} className='person'>
      {person.name} {person.number}
      <button onClick={handleDlete}>delete</button>
    </li>
  );
};

export default Person;
