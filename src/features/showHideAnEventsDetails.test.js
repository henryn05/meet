import { loadFeature, defineFeature } from "jest-cucumber";
import { screen, render, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "../App";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, test => {
  test("When the details of an event are hidden by default", ({
    given,
    when,
    then,
  }) => {
    given("the user is on the event details page", () => {});

    when("the user has not clicked the details button", () => {});

    then("no details are shown", () => {});
  });
  test("When user clicks on button to show details", ({
    given,
    when,
    then,
  }) => {
    given("an event has its details hidden", () => {});

    when("the user clicks on the details button", () => {});

    then("details are shown", () => {});
  });
  test("User clicks on button to hide event details", ({
    given,
    when,
    then,
  }) => {
    given("an event has its details shown", () => {});

    when("the user clicks on the details button", () => {});

    then("details are hidden", () => {});
  });
});