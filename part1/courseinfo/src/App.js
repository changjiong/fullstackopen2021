import React, { useState } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  const increaseByone = () => {
    setCounter(counter + 1);
  };
  const setToZero = () => {
    setCounter(0);
  };

  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByone}>plus</button>
      <button onClick={setToZero}>zero</button>
    </div>
  );
};
export default App;
