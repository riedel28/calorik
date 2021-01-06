import React from "react";
import { render, screen } from "@testing-library/react";

import Result from "./Result";

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
