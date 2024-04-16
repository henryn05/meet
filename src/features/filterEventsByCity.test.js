import { loadFeature, defineFeature } from "jest-cucumber";
import { screen, render, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "../App";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, test => {
  test("When user hasn't searched for a city, show upcoming events from all cities", ({
    given,
    when,
    then,
  }) => {
    given("user hasn't searched for any city", () => {});

    when("user opens the app", () => {
      render(<App />);
    });

    then("user should see the list of all upcoming events", async () => {
      const AppDOM = screen.getByTestId("App");
      const EventListDOM = within(AppDOM).getByTestId("event-list");

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test("User should see a list of suggestions when they search for a city", ({
    given,
    when,
    then,
  }) => {
    given("main page is open", () => {
      render(<App />);
    });

    let CitySearchDOM;
    when("user starts typing in the city textbox", async () => {
      const user = userEvent.setup();
      const AppDOM = screen.getByTestId("App");
      CitySearchDOM = within(AppDOM).getByTestId("city-search");
      const citySearchInput = within(CitySearchDOM).queryByRole("textbox");
      await user.type(citySearchInput, "Berlin");
    });

    then(
      "user should recieve a list of cities (suggestions) that match what they've typed",
      async () => {
        const suggestionListItems =
          within(CitySearchDOM).queryAllByRole("listitem");
        expect(suggestionListItems).toHaveLength(2);
      }
    );
  });

  test("User can select a city from the suggested list", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppDOM;
    let CitySearchDOM;
    let citySearchInput;
    given("user was typing 'Berlin' in the city textbox", async () => {
      render(<App />);
      const user = userEvent.setup();
      AppDOM = screen.getByTestId("App");
      CitySearchDOM = within(AppDOM).getByTestId("city-search");
      citySearchInput = within(CitySearchDOM).queryByRole("textbox");
      await user.type(citySearchInput, "Berlin");
    });

    let suggestionListItems;
    and("list of suggested cities is showing", () => {
      // within(CitySearchDOM).getByTestId("test-div");
      suggestionListItems = within(CitySearchDOM).queryAllByRole("listitem");
      expect(suggestionListItems).toHaveLength(2);
    });

    when(
      "user selects a city (e.g., 'Berlin, Germany') from the list",
      async () => {
        const user = userEvent.setup();
        await user.click(suggestionListItems[0]);
      }
    );

    then(
      "their city should be changed to that city (i.e., 'Berlin, Germany')",
      () => {
        expect(citySearchInput.value).toBe("Berlin, Germany");
      }
    );

    and("user should receive a list of upcoming events in that city", async () => {
      const EventListDOM = within(AppDOM).getByTestId("event-list");
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      const allEvents = await getEvents();
      const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value);
      expect(EventListItems).toHaveLength(berlinEvents.length);
    });
  });
});
