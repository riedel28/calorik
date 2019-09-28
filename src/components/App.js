import React, { useState } from 'react';
import Form from './Form';
import Header from './Header';
import Result from './Result';
import { calculateCalories } from './../helpers';

const App = () => {
  /**
   * TODO:
   *
   * [ ] Add further formulas for calculating calories
   * [ ] Storing data to localStorage
   * [ ] Internationalization
   * [ ] Add tests
   * [ ] Change design
   * [x] Display calories from 0 to caloriesCount
   */
  const [userData, setUserData] = useState({});

  console.table(userData);

  return (
    <div className="app">
      <div className="ui container">
        <Header />

        <Form onSubmitData={setUserData} />

        <Result calories={calculateCalories(userData)} />
      </div>
    </div>
  );
};

export default App;
