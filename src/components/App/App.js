import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import Header from "../Header/Header";
import PersonalDataForm from "../PersonalDataForm/PersonalDataForm";
import Result from "../Result/Result";

const App = () => {
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
