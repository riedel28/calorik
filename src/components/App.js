import React, { useState } from 'react';
import Form from './Form';
import Header from './Header';
import Result from './Result';
import { calculateCalories } from './../helpers';

const App = () => {
  const [userData, setUserData] = useState({});

  return (
    <div className="app">
      <div className="ui container">
        <Header />

        <Form onCalculateCals={setUserData} />

        <Result calories={calculateCalories(userData)} />
      </div>
    </div>
  );
};

export default App;
