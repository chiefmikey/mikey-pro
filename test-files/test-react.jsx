import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TestComponent = ({ name, age }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component mounted');
  }, []);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>
        Hello {name}, you are {age} years old
      </h1>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

TestComponent.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};

export default TestComponent;
