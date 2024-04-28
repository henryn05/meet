import { loadFeature, defineFeature } from "jest-cucumber";
import { screen, render, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import App from "../App";
import Event from "../components/Event";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, test => {
  test("When the details of an event are hidden by default", ({
    given,
    when,
    then,
  }) => {
    given("the user is on the event details page", () => {
      render(<App />);
    });

    when("the app displays a list of events", async() => {
      const AppDOM = screen.getByTestId("App");
      const EventListDOM = within(AppDOM).getByTestId("event-list");
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });

    then("details are hidden by default", () => {
      const AppDOM = screen.getByTestId("App");
      const eventDetails = within(AppDOM).getByClass("details");
      expect(eventDetails).not.toBeInTheDocument();
    });
  });
  test("When user clicks on button to show details", ({
    given,
    when,
    then,
  }) => {
    let allEvents;
    let EventComponent;
    given("an event has its details hidden", async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event = {allEvents[0]} />);
      expect(EventComponent.container.queryByClass("details")).not.toBeInTheDocument();
    });

    when("the user clicks on the details button", async () => {
      const showDetails = within(EventComponent).queryByText("Show Details");
      const user = userEvent.setup();
      await user.click(showDetails);
    });

    then("details are shown", () => {
      expect(EventComponent.getByClass("details")).toBeInTheDocument();
      expect(within(EventComponent).getByText("Hide Details")).toBeInTheDocument();
    });
  });
  test("When user clicks on button to hide event details", ({
    given,
    when,
    then,
  }) => {
    let EventComponent;
    let allEvents;
    given("an event has its details shown", async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />);
      const user = userEvent.setup();
      await user.click(within(EventComponent).getByText("Show Details"));
      expect(within(EventComponent).getByClass("details")).toBeInTheDocument();
    });

    when("the user clicks on the details button", async () => {
      const hideDetails = within(EventComponent).getByText("Hide Details");
      const user = userEvent.setup();
      await user.click(hideDetails);
    });

    then("details are hidden", () => {
      expect(within(EventComponent).queryByClass("details")).not.toBeInTheDocument();
      expect(within(EventComponent).queryByText("Hide Details")).not.toBeInTheDocument();
    });
  });
});