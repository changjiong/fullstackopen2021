import React, { useState } from "react";

const Display = ({ counter }) => <div>{counter}</div>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const App = () => {
  const [counter, setCounter] = useState(0);
  const increaseByone = () => {
    setCounter(counter + 1);
  };
  const minusByone = () => {
    setCounter(counter - 1);
  };
  const setToZero = () => {
    setCounter(0);
  };

  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByone} text="plus" />
      <Button onClick={minusByone} text="minus" />
      <Button onClick={setToZero} text="zero" />
    </div>
  );
};
export default App;
