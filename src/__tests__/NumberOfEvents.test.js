import { render, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

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
    const textbox = NumberOfEventsComponent.queryByRole(
      "textbox"
    );
    expect(textbox).toHaveValue("32");
  });

  test("Value of textbox changes accordingly when a user types", async () => {
    const textbox = NumberOfEventsComponent.queryByRole(
      "textbox"
    );
    const user = userEvent.setup();

    await user.type(textbox, "{backspace}{backspace}10");
    await waitFor(() => {
      expect(textbox).toHaveValue("10");
    });
  });
});
