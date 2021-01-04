import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import PersonalDataForm from "../PersonalDataForm/PersonalDataForm";
import Result from "../Result/Result";

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
   * [x] Add semantic-react-ui
   */

  const [userData, setUserData] = useState({});

  return (
    <Container>
      <PersonalDataForm onSubmitData={setUserData} />
      <Result data={userData} />
    </Container>
  );
};

export default App;
