import React from "react";
import { render, screen } from "@testing-library/react";

import Result from "./Result";

jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe("Result", () => {
  test("should render Result component", () => {
    const data = {
      height: "177",
      weight: "80",
      age: "35",
      gender: "male",
      activityLevel: "no-exercise",
      goal: "cut",
      formula: "harris-benedict",
    };

    render(<Result data={data} />);
    expect(screen.getByText(/You will need/i)).toBeInTheDocument();
  });
});
