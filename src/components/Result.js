import React from 'react';

export default ({ calories }) => {
  return (
    <h1 className="ui header" style={{ fontSize: '50px', marginTop: '70px' }}>
      Your calories: {calories}
    </h1>
  );
};
