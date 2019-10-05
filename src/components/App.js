import React, { useState } from 'react';
import Form from './Form';
import Header from './Header';
import Result from './Result';

const App = () => {
  /**
   * TODO:
   *
   * [ ] Store data to localStorage
   * [ ] Add tests
   * [ ] Internationalization
   * [ ] Change design
   * [x] Display calories from 0 to caloriesCount
   * [x] Add further formulas for calculating calories
   * [x] Add propTypes
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
