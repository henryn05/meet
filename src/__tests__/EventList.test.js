import { render, screen } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from "../api";

describe("<EventList /> component", () => {
  test("Renders event component",  async () => {
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