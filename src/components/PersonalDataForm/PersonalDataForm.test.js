import React from "react";
import { render } from "@testing-library/react";

import PersonalDataForm from "./PersonalDataForm";

describe("PersonalDataForm", () => {
  test("should render PersonalDataForm component", () => {
    render(<PersonalDataForm onSubmitData={() => {}} />);
  });
});
