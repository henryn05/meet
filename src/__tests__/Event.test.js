import { render, fireEvent } from "@testing-library/react";
import Event from "../components/Event";
import getEvents from "../api";

describe("<Event /> component", () => {
  let EventComponent;
  const allEvents = getEvents();
  beforeEach(() => {
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test("Renders element for event's title", () => {
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  });

  test("Renders element for event's start time", () => {
    expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument();
  });

  test("Renders element for event's location", () => {
    expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
  });

  test("Renders event details with the title", () => {
    expect(EventComponent.queryByText("show details")).toBeInTheDocument();
  });

  test("By default, event's details are hidden", () => {
    expect(EventComponent.queryByText("show details")).toHaveStyle(
      "display: none"
    );
  });

  test("Shows details when user clicks on 'show details' button", async () => {
    const showDetailsButton = EventComponent.queryByText("show details");
    fireEvent.click(showDetailsButton);
    expect(EventComponent.queryByText("Event Details")).toBeInTheDocument(); // Assuming "Event Details" is part of the details content
  });

  test("Hides details when user clicks on 'hide details' button", async () => {
    const showDetailsButton = EventComponent.queryByText("show details");
    fireEvent.click(showDetailsButton);

    const hideDetailsButton = EventComponent.queryByText("hide details");
    fireEvent.click(hideDetailsButton);

    expect(EventComponent.queryByText("Event Details")).not.toBeInTheDocument();
  });
});
