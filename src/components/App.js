import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import PersonalDataForm from "./PersonalDataForm";
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
    <Container>
      <Header />

      <PersonalDataForm onSubmitData={setUserData} />

      <Result data={userData} />
    </Container>
  );
};

export default App;
