import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { SendNoteFailure } from "../sendNoteFailure.component";

describe("Send Note Failure Pop up component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Validate description", () => {
    const backButtonAction = jest.fn();
    render(
      <SendNoteFailure
        backButtonAction={backButtonAction}
        message="Your request to send 3M a note has failed. Please try again or contact 3M for assistance with this order 1-800-275-4524."
      />
    );
    const description = screen.getByTestId("description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "Your request to send 3M a note has failed. Please try again or contact 3M for assistance with this order 1-800-275-4524."
    );
  });

  it("Validate back to dashboard button", () => {
    const backButtonAction = jest.fn();
    render(<SendNoteFailure backButtonAction={backButtonAction} message="" />);
    const description = screen.getByTestId("back-button");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("Done");
    userEvent.click(description);
    expect(backButtonAction).toBeCalledTimes(1);
  });
});
