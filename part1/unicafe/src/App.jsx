import { useState } from "react";
import React from "react";

// Use one component to create many other objects
const StatisticalLine = ({ text, value, symbol }) => {
  return (
    <>
      <td>{text}</td>
      <td>
        {value} {symbol}
      </td>
    </>
  );
};
//statistics component
const Statistics = ({
  good,
  neutral,
  bad,
  total,
  average,
  positiveFeedBack,
}) => {
  // conditional rendering, if the total is zero, display, no feedback given
  if (total === 0) return <p> No feedback given </p>;
  return (
    <table>
      <tbody>
        <tr>
          <StatisticalLine text="good" value={good} />
        </tr>
        <tr>
          <StatisticalLine text="neutral" value={neutral} />
        </tr>
        <tr>
          <StatisticalLine text="bad" value={bad} />
        </tr>
        {/* The real statistics now that contains the total and percentage*/}
        <tr>
          <StatisticalLine text="total" value={total} />
        </tr>
        <tr>
          <StatisticalLine text="average" value={average} />
        </tr>
        <tr>
          <StatisticalLine
            text="positive"
            value={positiveFeedBack}
            symbol="%"
          />
        </tr>
      </tbody>
    </table>
  );
};

const Header = ({ text }) => {
  return <h2>{text}</h2>;
};

const App = () => {
  // save clicks of each button to its own state
  // Thats what we want to keep
  // keeps track of the number of  good reviews
  const [good, setGood] = useState(0);
  //keeps track of the number of neutral reviews
  const [neutral, setNeutral] = useState(0);
  //keeps track of the number of bad reviews
  const [bad, setBad] = useState(0);

  // handler functions
  //for good reviews
  const handleGood = () => {
    // use the update one state, first update then pass it in the set function
    // const updatedGood = good + 1;
    console.log(" value of good before click", good);
    setGood(good + 1);
    console.log(" value of good after click", good);
  };
  //for neutral reviews
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  // for bad reviews
  const handleBad = () => {
    setBad(bad + 1);
  };

  // calculate the average
  const feedbackValues = good * 1 + neutral * 0 + bad * -1;
  console.log(feedbackValues);
  const total = good + neutral + bad;
  const average = feedbackValues / total;
  const positiveFeedBack = Math.round((good / total) * 100 * 10) / 10;
  return (
    <div>
      {/* BUTTONS  */}
      <Header text="Give Feedback" />
      <div>
        <button onClick={handleGood}> good </button>
        <button onClick={handleNeutral}> neutral </button>
        <button onClick={handleBad}> bad </button>
      </div>

      {/* STATISTICS */}
      <div>
        <Header text="Statistics" />
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positiveFeedBack={positiveFeedBack}
        />
      </div>
    </div>
  );
};

export default App;
