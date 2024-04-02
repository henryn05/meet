import { render, screen, act } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  test("Correctly renders text box", () => {
    render(<NumberOfEvents />);
    const textbox = screen.queryByRole("textbox");
    expect(textbox).toBeInTheDocument();
  });

  test("Renders default value of input field to be 32", () => {
    render(<NumberOfEvents
      setCurrentNOE={() => {}}
      currentNOE={32}
    />);
    const textbox = screen.queryByRole("textbox");
    expect(textbox).toHaveValue("32");
  });

  test("Value of textbox changes accordingly when a user types", async () => {
    render(<NumberOfEvents setCurrentNOE={() => {}} />);
    const textbox = screen.queryByRole("textbox");
    const user = userEvent.setup();

    await act(async () => {
      await user.type(textbox, "{backspace}{backspace}10");
    });
    expect(textbox).toHaveValue("10");
  });
});
