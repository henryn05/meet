import { render } from "@testing-library/react";
import App from "../App";

describe("<App /> component", () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App/>).container.firstChild;
  });

  test("Renders list of events", () => {
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  test("Renders city search", () => {
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });
});
