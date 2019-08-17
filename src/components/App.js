import React from 'react';
import Form from './Form';

const App = () => {
  return (
    <div className="app">
      <div className="ui container">
        <h1 className="ui left floated header" style={{ paddingTop: '20px' }}>
          Calorik
        </h1>

        <div className="ui clearing divider" />

        <Form />

        <div className="ui horizontal divider">
          <button className="ui huge secondary button">Calculate</button>
        </div>

        <h1
          className="ui header"
          style={{ fontSize: '50px', marginTop: '70px' }}
        >
          Your calories: 0
        </h1>
      </div>
    </div>
  );
};

export default App;
