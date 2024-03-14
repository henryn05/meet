import { render, waitFor, screen } from "@testing-library/react";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";

describe("<Event /> component", () => {
  test("Renders element for event's title", async () => {
    const allEvents = await getEvents();
    render(<Event event={allEvents[0]} />);
    expect(screen.getByText(allEvents[0].summary)).toBeInTheDocument();
  });

  test("Renders element for event's start time", async () => {
    const allEvents = await getEvents();
    render(<Event event={allEvents[0]} />);
    expect(screen.getByText(allEvents[0].created)).toBeInTheDocument();
  });

  test("Renders element for event's location", async () => {
    const allEvents = await getEvents();
    render(<Event event={allEvents[0]} />);
    expect(screen.getByText(allEvents[0].location)).toBeInTheDocument();
  });

  test("By default, event's details are hidden", async () => {
    const allEvents = await getEvents();
    render(<Event event={allEvents[0]} />);
    expect(screen.queryByText(".details")).not.toBeInTheDocument();
  });

  test("Shows details when user clicks on 'show details' button", async () => {
    const allEvents = await getEvents();
    render(<Event event={allEvents[0]} />);
    const user = userEvent.setup();
    const button = screen.getByRole("button");

    await user.click(button, "Show Details");
    await waitFor(() => {
      expect(screen.getByTestId("event-info-dialogue")).toBeInTheDocument();
    });
  });

  test("Hides details when user clicks on 'hide details' button", async () => {
    const allEvents = await getEvents();
    render(<Event event={allEvents[0]} />);
    const user = userEvent.setup();
    const button = screen.queryByRole("button");

    await user.click(button, "Show Details");
    await user.click(button, "Hide Details");
    await waitFor(() => {
      expect(
        screen.queryByTestId("event-info-dialogue")
      ).not.toBeInTheDocument();
    });
  });
});
