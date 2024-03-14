import { render, screen } from "@testing-library/react";
import App from "../App";

describe("<App /> component", () => {
  test("Renders city search", () => {
    render(<App />);
    expect(screen.getByTestId("city-search")).toBeInTheDocument();
  });

  test("Renders list of events", () => {
    render(<App />);
    expect(screen.getByTestId("event-list")).toBeInTheDocument();
  });

  test("Renders correct number of events", () => {
    render(<App />);
    expect(screen.getByTestId("number-of-events")).toBeInTheDocument();
  });
});
