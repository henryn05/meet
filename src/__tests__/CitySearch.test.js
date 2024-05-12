import { render, waitFor, screen, act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";
import CitySearch from "../components/CitySearch";
import { extractLocations, getEvents } from "../api";

describe("<CitySearch /> component", () => {
  test("Renders text input", async () => {
    const events = await getEvents();
    const allLocations = extractLocations(events);

    render(<CitySearch
      allLocations={allLocations}
      setInfoAlert={() => {}}
    />);
    const cityTextBox = screen.queryByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("Suggestion list is hidden by default", async () => {
    const events = await getEvents();
    const allLocations = extractLocations(events);

    render(<CitySearch
      allLocations={allLocations}
      setInfoAlert={() => {}}
    />);
    const suggestionList = screen.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("Renders list of suggestions when city textbox gains focus", async () => {
    const events = await getEvents();
    const allLocations = extractLocations(events);
    const user = userEvent.setup();

    render(<CitySearch
      allLocations={allLocations}
      setInfoAlert={() => {}}
    />);
    const cityTextBox = screen.queryByRole("textbox");
    await act(async () => {
      user.click(cityTextBox);
    });

    let suggestionList;
    await waitFor(() => {
      suggestionList = screen.queryByRole("list");
      expect(suggestionList).toBeInTheDocument();
    });
    expect(suggestionList).toHaveClass("suggestions");
  });

  test("Updates list of suggestions correctly when user types in city text box", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch
      allLocations={allLocations}
      setInfoAlert={() => {}}
    />);

    // User types Berlin in textbox
    const cityTextBox = screen.queryByRole("textbox");
    await act(async () => {
      await user.type(cityTextBox, "Berlin");
    });
    await waitFor(() => {
      // Filter allLocations to locations matching Berlin
      const suggestions = allLocations
        ? allLocations.filter(
            (location) =>
              location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) >
              -1
          )
        : [];

      // Get all <li> elements inside the suggestion list
      const suggestionListItems = screen.queryAllByRole("listitem");
      expect(suggestionListItems).toHaveLength(suggestions.length + 1);
      suggestions.forEach((suggestion, index) => {
        expect(suggestionListItems[index].textContent).toBe(suggestion);
      });
    });
  });

  test("Renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={() => {}}
        setInfoAlert={() => {}}
      />
    );

    const cityTextBox = screen.queryByPlaceholderText("City");
    await user.type(cityTextBox, "Berlin");

    const BerlinSuggestion = screen.queryAllByRole("listitem")[0];
    await user.click(BerlinSuggestion);

    expect(cityTextBox).toHaveValue(BerlinSuggestion.textContent);
  });
});

describe("<CitySearch /> integration", () => {
  test("Renders suggestions list when the app is rendered", async () => {
    const user = userEvent.setup();
    render(<App />);

    const AppDOM = screen.getByTestId("App");
    const CitySearchDOM = within(AppDOM).getByTestId("city-search");
    const cityTextBox = within(CitySearchDOM).queryByRole("textbox");
    await act(async () => {
      await user.click(cityTextBox);
    });

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    const suggestionListItems =
      within(CitySearchDOM).queryAllByRole("listitem");
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });
});