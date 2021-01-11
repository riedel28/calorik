import React from "react";
import { render } from "@testing-library/react";

import Header from "./Header";

describe("Header", () => {
  test("should render Header component", () => {
    const { getByText } = render(<Header />);

    expect(getByText(/en/i)).toBeInTheDocument();
    expect(getByText(/ru/i)).toBeInTheDocument();
    expect(getByText(/de/i)).toBeInTheDocument();
  });
});
