import React, { useEffect, useState } from 'react';

export default ({ calories }) => {
  const [counter, setCounter] = useState(1000);

  useEffect(() => {
    if (counter < calories) {
      setCounter(counter => counter + 1);
    }
  }, [counter, calories]);

  return (
    <h1 className="ui header" style={{ fontSize: '50px', marginTop: '70px' }}>
      Your calories: {calories ? (counter <= calories ? counter : calories) : 0}
    </h1>
  );
};
