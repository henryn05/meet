import { render, waitFor } from "@testing-library/react";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";

describe("<Event /> component", () => {
  let EventComponent;
  let allEvents;

  beforeEach(async () => {
    allEvents = await getEvents();
  });

  beforeEach(() => {
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test("Renders element for event's title", () => {
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  test("Renders element for event's start time", () => {
    expect(
      EventComponent.queryByText(allEvents[0].created)
    ).toBeInTheDocument();
  });

  test("Renders element for event's location", () => {
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  test("By default, event's details are hidden", () => {
    expect(EventComponent.queryByText(".details")).not.toBeInTheDocument();
  });

  test("Shows details when user clicks on 'show details' button", async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByRole("button");

    await user.click(button, "Show Details");
    await waitFor(() => {
      expect(
        EventComponent.container.querySelector(".details")
      ).toBeInTheDocument();
    });
  });

  test("Hides details when user clicks on 'hide details' button", async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByRole("button");

    await user.click(button, "Hide Details");
    await waitFor(() => {
      expect(
        EventComponent.container.querySelector(".details")
      ).not.toBeInTheDocument();
    });
  });
});
