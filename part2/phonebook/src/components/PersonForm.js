import React from "react";

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input value={newName} onChange={handleNameChange} placeholder="name" />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={handleNumberChange}
          placeholder="number"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
