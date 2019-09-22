import React from 'react';
import Form from './Form';
import Header from './Header';

const App = () => {
  return (
    <div className="app">
      <div className="ui container">
        <Header />

        <Form />

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
