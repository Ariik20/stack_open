const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  );
};

const Parts = ({ parts }) => {
  return (
    <div>
      <ul>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </ul>
    </div>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        // Getting the sum of something from different objects
        const total = course["parts"].reduce(
          (sum, part) => sum + part.exercises,
          0
        );

        return (
          <div key={course.id}>
            <h1>{course.name}</h1>
            <Parts parts={course["parts"]} />
            <h3>Total of {total} exercises</h3>
          </div>
        );
      })}
    </div>
  );
};
const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Course courses={courses} />;
};

export default App;
