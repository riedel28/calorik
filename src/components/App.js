import React from 'react';
import Form from './Form';
import Header from './Header';
import Result from './Result';

const App = () => {
  return (
    <div className="app">
      <div className="ui container">
        <Header />

        <Form />

        <Result calories={1700} />
      </div>
    </div>
  );
};

export default App;
