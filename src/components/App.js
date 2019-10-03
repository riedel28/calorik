import React, { useState } from 'react';
import Form from './Form';
import Header from './Header';
import Result from './Result';
import { calculateCalories } from './../helpers';

const App = () => {
  /**
   * TODO:
   *
   
   * [ ] Store data to localStorage
   * [ ] Add propTypes
   * [ ] Internationalization
   * [ ] Add tests
   * [ ] Change design
   * [x] Display calories from 0 to caloriesCount
   * [x] Add further formulas for calculating calories
   */
  const [userData, setUserData] = useState({});

  return (
    <div className="app">
      <div className="ui container">
        <Header />

        <Form onSubmitData={setUserData} />

        <Result data={userData} />
      </div>
    </div>
  );
};

export default App;
