import { render, userEvent } from "@testing-library/react";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />)
  });

  test("Correctly renders text box", () => {
    const textbox = NumberOfEventsComponent.queryByRole(
      "textbox"
    );
    expect(textbox).toBeInTheDocument();
  });

  test("Renders default value of input field to be 32", () => {
    const inputField = NumberOfEventsComponent.queryByRole(
      "textbox"
    );
    expect(inputField).toHaveValue("32");
  });

  test("Value of textbox changes accordingly when a user types", async () => {
    const inputField = NumberOfEventsComponent.queryByRole(
      "textbox"
    );
    const user = userEvent.setUp();
    await user.type(inputField, "{backspace}{backspace}10");
    expect(inputField).toBe("10");
  });
});
