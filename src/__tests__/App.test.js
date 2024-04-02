import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { getEvents } from "../api";
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

describe("<App /> integration", () => {
  test("Renders a list of events matching the city selected by the user", async () => {
    const user = userEvent.setup();
    render(<App />);
    const AppDOM = screen.getByTestId("App");
    const CitySearchDOM = within(AppDOM).getByTestId("city-search");
    const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

    /*
      Simulates user typing "Berlin" in textbox and then
      and then clicking on the "Berlin, Germany" list item
      */

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText("Berlin, Germany");
    await user.click(berlinSuggestionItem);

    /*
      Finds what is rendered inside "event-list" item
      */

    const EventListDOM = within(AppDOM).getByTestId("event-list");
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole("listitem");

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === "Berlin, Germany"
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    allRenderedEventItems.forEach((event) => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });

  test("Number of events match number inputted by user", async () => {
    // const user = userEvent.setup();
    render(<App />);
    const AppDOM = screen.getByTestId("App");

    const NumberOfEventsDOM = within(AppDOM).queryByTestId("number-of-events");
    const NumberOfEventsInput =
      within(NumberOfEventsDOM).queryByRole("textbox");

    await userEvent.type(NumberOfEventsInput, "{backspace}{backspace}10");

    const EventListDOM = within(AppDOM).getByTestId("event-list");
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole("listitem");
    expect(allRenderedEventItems.length).toEqual(10);
  });
});
