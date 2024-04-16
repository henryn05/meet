import { loadFeature, defineFeature } from "jest-cucumber";
import { screen, render, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "../App";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, test => {});