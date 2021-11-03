import React from "react";

const Header = () => {
  return (
    <div>
      <h1>Full Stack Web Development</h1>
    </div>
  );
};

const Content = () => {
  return (
    <div>
      <Part part={"Fundamentals of React"} exercises={10} />
      <Part part={"Using props to pass data"} exercises={7} />
      <Part part={"State of a component"} exercises={14} />
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};

const Total = () => {
  return (
    <div>
      <h1>Total of exercises: {10 + 7 + 14}</h1>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Header />
      <Content />
      <Total />
    </div>
  );
};

export default App;
