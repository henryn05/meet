import { loadFeature, defineFeature } from "jest-cucumber";
import { screen, render, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import App from "../App";
import Event from "../components/Event";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("When the details of an event are hidden by default", ({
    given,
    when,
    then,
  }) => {
    given("the user is on the event details page", () => {
      render(<App />);
    });

    when("the app displays a list of events", async () => {
      const AppDOM = screen.getByTestId("App");
      const EventListDOM = within(AppDOM).getByTestId("event-list");
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });

    then("the details are hidden by default", () => {
      const eventDetails = screen.queryByTestId("event-info-dialogue");
      expect(eventDetails).not.toBeInTheDocument();
    });
  });
  test("When the user clicks on button to show the details", ({
    given,
    when,
    then,
  }) => {
    let allEvents;
    given("an event has its details hidden", async () => {
      allEvents = await getEvents();
      render(<Event event={allEvents[0]} />);
      expect(
        screen.queryByTestId("event-info-dialogue")
      ).not.toBeInTheDocument();
    });

    when("the user clicks on the details button", async () => {
      const showDetails = screen.queryByText("Show Details");
      const user = userEvent.setup();
      await user.click(showDetails);
    });

    then("the details are shown", () => {
      expect(screen.getByTestId("event-info-dialogue")).toBeInTheDocument();
      expect(screen.getByText("Hide Details")).toBeInTheDocument();
    });
  });
  test("When the user clicks on button to hide the details", ({
    given,
    when,
    then,
  }) => {
    let allEvents;
    given("an event has its details shown", async () => {
      allEvents = await getEvents();
      render(<Event event={allEvents[0]} />);
      const user = userEvent.setup();
      await user.click(screen.getByTestId("details-btn"));
      expect(screen.getByTestId("event-info-dialogue")).toBeInTheDocument();
    });

    when("the user clicks on the details button", async () => {
      const hideDetails = screen.getByText("Hide Details");
      const user = userEvent.setup();
      await user.click(hideDetails);
    });

    then("the details are hidden", () => {
      expect(
        screen.queryByTestId("event-info-dialogue")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Hide Details")).not.toBeInTheDocument();
    });
  });
});
