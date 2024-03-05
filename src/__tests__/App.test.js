import { render } from "@testing-library/react";
import App from "../App";

describe("<App /> component", () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test("Renders city search", () => {
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });

  test("Renders event component", () => {
    expect(AppDOM.querySelector("#event")).toBeInTheDocument();
  });

  test("Renders list of events", () => {
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  test("Renders correct number of events", () => {
    expect(AppDOM.querySelector("#number-of-events")).toBeInTheDocument();
  });
});
