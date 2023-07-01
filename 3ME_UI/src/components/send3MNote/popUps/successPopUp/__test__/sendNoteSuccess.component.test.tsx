import userEvent from "@testing-library/user-event";
import { SendNoteSuccess } from "../sendNoteSuccess.component";
import { cleanup, render, screen } from "@testing-library/react";

describe("Send Note Success Pop up component", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate title", () => {
    const backButtonAction = jest.fn();
    render(<SendNoteSuccess backButtonAction={backButtonAction} />);
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Note Confirmation");
  });

  it("Validate description", () => {
    const backButtonAction = jest.fn();
    render(<SendNoteSuccess backButtonAction={backButtonAction} />);
    const description = screen.getByTestId("description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "Thank you for submitting your request or comment. Requests and comments are processed Monday through Friday (except for Holidays) from 7 a.m. to 7 p.m. CST."
    );
  });

  it("Validate back to dashboard button", () => {
    const backButtonAction = jest.fn();
    render(<SendNoteSuccess backButtonAction={backButtonAction} />);
    const description = screen.getByTestId("back-button");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("Back to Dashboard");
    userEvent.click(description);
    expect(backButtonAction).toBeCalledTimes(1);
  });
});
