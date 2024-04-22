import { loadFeature, defineFeature } from "jest-cucumber";
import { screen, render, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "../App";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user has specified number of events, change number of events to said number", ({
    given,
    when,
    then,
  }) => {
    given("the user is on the main page", () => {
      render(<App />);
    });

    when("they specify the number of events as 5", () => {});

    then("the app should display 5 events", () => {});
  });
  test("When user hasn't specified number of events, default to 32", ({
    given,
    when,
    then,
  }) => {
    given("the user is on the main page", () => {
    });

    when("they don't specify the number of events", () => {});

    then("the app should display 32 events", () => {
    });
  });
});