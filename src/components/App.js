import React, { useState } from "react";
import Form from "./Form";
import Header from "./Header";
import Result from "./Result";

const App = () => {
  /**
   * TODO:
   *
   * [ ] Add tests
   * [ ] Internationalization
   * [ ] Change design
   * [x] Display calories from 0 to caloriesCount
   * [x] Add further formulas for calculating calories
   * [x] Add propTypes
   * [x] Store data to localStorage
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
