import React from "react";
// This is the Header component, it returns the title
const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

// part component to create many elements later on
const Part = ({ part }) => {
  // Takes in an object as the props
  console.log(part);
  return (
    <div>
      <p>
        {part["part"]} {part["exercises"]}
      </p>
    </div>
  );
};
// parent component to hold all the parts elements
const Content = ({ parts }) => {
  // This component receives an array as the PROP !!
  console.log(parts);
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  );
};

// Total component to hold the number of exercises
const Total = ({ parts }) => {
  // This component total receives an array of objects
  return (
    <>
      Number of exercises{" "}
      {parts[0]["exercises"] + parts[1]["exercises"] + parts[2]["exercises"]}
    </>
  );
};
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        part: "Fundamentals of React",
        exercises: 10,
      },
      {
        part: "Using props to pass data",
        exercises: 7,
      },
      {
        part: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header title={course["name"]} />
      <Content parts={course["parts"]} />
      <Total parts={course["parts"]} />
    </div>
  );
};

export default App;
