import { render, screen, waitFor, within } from "@testing-library/react";
import EventList from "../components/EventList";
import App from "../App";
import { getEvents } from "../api";

describe("<EventList /> component", () => {
  test("Renders event component", async () => {
    const allEvents = await getEvents();
    const event = allEvents[0];
    render(<EventList events={[event]} />);
    expect(screen.getByTestId(`event-${event.id}`)).toBeInTheDocument();
  });

  test("has element with 'list' role", () => {
    render(<EventList />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  test("Render correct # of events", async () => {
    const allEvents = await getEvents();
    render(<EventList events={allEvents} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });
});

describe("<EventList /> integration", () => {
  test("renders a list of 32 events when the app is mounted and rendered",
    async () => {
      render(<App />);
      const AppDOM = screen.getByTestId("App");
      const EventListDOM = within(AppDOM).getByTestId("event-list");
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });
});
