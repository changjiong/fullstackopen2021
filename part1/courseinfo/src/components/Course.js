import React from "react";

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Total = ({ course }) => {
  return (
    <p>
      <strong>
        Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)}
        exercises
      </strong>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
