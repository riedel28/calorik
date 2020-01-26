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
   * [x] Add semantic-react-ui
   */

  const initialState = {
    age: 30,
    gender: "male",
    height: 180,
    weight: 80,
    activityLevel: "no-exercise",
    goal: "cut",
    formula: "harris-benedict"
  };

  const [userData, setUserData] = useState(initialState);

  return (
    <Container>
      <Header />

      <PersonalDataForm onSubmitData={setUserData} />

      <Result data={userData} />
    </Container>
  );
};

export default App;
