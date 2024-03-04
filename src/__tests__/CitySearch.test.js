import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import { extractLocations, getEvents } from "../api";

describe("<CitySearch /> component", () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch />);
  });

  test("Renders text input", async () => {
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("Suggestion list is hidden by default", async () => {
    const suggestionList = CitySearchComponent.queryByRole("List");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("Renders list of suggestions when city textbox gains focus", async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.click(cityTextBox);
    await waitFor(() => {
      const suggestionList = CitySearchComponent.queryByRole("list");
      expect(suggestionList).toBeInTheDocument();
      expect(suggestionList).toHaveClass("suggestions");
    });
  });

  test("Updates list of suggestions correctly when user types in city text box", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    // User types Berlin in textbox
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

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
      const suggestionListItems =
        CitySearchComponent.queryAllByRole("listitem");
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
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    await waitFor(async () => {
      const BerlinGermanySuggestion =
        CitySearchComponent.queryAllByRole("listitem")[0];
      await user.click(BerlinGermanySuggestion);
      expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });
  });
});
