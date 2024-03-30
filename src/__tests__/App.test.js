import { render, screen } from "@testing-library/react";
import CitySearch from "../components/CitySearch";
import EventList from "../components/EventList";
import NumberOfEvents from "../components/NumberOfEvents";
import App from "../App";

describe("<App /> component", () => {
  test("Renders city search", () => {
    render(<CitySearch />);
    expect(screen.getByTestId("city-search")).toBeInTheDocument();
  });

  test("Renders list of events", () => {
    render(<EventList />);
    expect(screen.getByTestId("event-list")).toBeInTheDocument();
  });

  test("Renders correct number of events", () => {
    render(<NumberOfEvents />);
    expect(screen.getByTestId("number-of-events")).toBeInTheDocument();
  });
});
