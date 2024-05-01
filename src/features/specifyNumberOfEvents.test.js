import { loadFeature, defineFeature } from "jest-cucumber";
import { screen, render, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user hasn't specified number of events, default to 32", ({
    given,
    when,
    then,
  }) => {
    given("the user doesn't specify the number of events", () => {});

    when("the user is on the main page", () => {
      render(<App />);
      const AppDOM = screen.getByTestId("App");
      const EventListDOM = within(AppDOM).getByTestId("event-list");
      expect(EventListDOM).toBeInTheDocument();
    });

    then("the app should display 32 events", async () => {
      const AppDOM = screen.getByTestId("App");
      const EventListDOM = within(AppDOM).getByTestId("event-list");
      await waitFor(() => {
        const listItems = within(EventListDOM).queryAllByRole("listitem");
        expect(listItems.length).toBe(32);
      });
    });
  });
  test("When user has specified number of events, change number of events to said number", ({
    given,
    when,
    then,
  }) => {
    given("the user specifies the number of events", async () => {
      render(<App />);
      // const user = userEvent.setup();
      const AppDOM = screen.getByTestId("App");
      const NumberOfEventsDOM = within(AppDOM).getByTestId("numberOfEvents");
      const numberOfEventsInput = within(NumberOfEventsDOM).getByTestId("numberOfEventsInput");
      await userEvent.type(numberOfEventsInput, "{backspace}{backspace}10");
    });

    when("the user is on the main page", () => {
      const AppDOM = screen.getByTestId("App");
      const EventListDOM = within(AppDOM).getByTestId("event-list");
      expect(EventListDOM).toBeInTheDocument();
    });

    then("the app should display the specified number of events", () => {
      const AppDOM = screen.getByTestId("App");
      const EventListDOM = within(AppDOM).getByTestId("event-list");
      const renderedListItems = within(EventListDOM).queryAllByRole("listitem");
      expect(renderedListItems.length).toEqual(10);
    });
  });
});