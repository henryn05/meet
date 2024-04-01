import { render, waitFor, screen, within, act } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import NumberOfEvents from "../components/NumberOfEvents";
import App from "../App";

describe("<NumberOfEvents /> component", () => {

  test("Correctly renders text box", () => {
    render(<NumberOfEvents />);
    const textbox = screen.queryByRole(
      "textbox"
    );
    expect(textbox).toBeInTheDocument();
  });

  test("Renders default value of input field to be 32", () => {
    render(<NumberOfEvents />);
    const textbox = screen.queryByRole(
      "textbox"
    );
    expect(textbox).toHaveValue("32");
  });

  test("Value of textbox changes accordingly when a user types", async () => {
    render(<NumberOfEvents />);
    const textbox = screen.queryByRole(
      "textbox"
    );
    const user = userEvent.setup();

    await user.type(textbox, "{backspace}{backspace}10");
    await waitFor(() => {
      expect(textbox).toHaveValue("10");
    });
  });
});

describe("<NumberOfEvents /> integration", () => {
  test("Number of events match number inputted by user", async () => {
    const user = userEvent.setup();
    render(<App />);

    const AppDOM = screen.getByTestId("App");
    const NumberOfEventsDOM = within(AppDOM).getByTestId("number-of-events");
    const NumberOfEventsInput = within(NumberOfEventsDOM).queryByRole("textbox");

    await act( async() => {
      await user.type(NumberOfEventsInput, "{backspace}{backspace}10");
    });

    expect(NumberOfEventsInput.value).toBe("10");
  });
});
