import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { SendNoteCancel } from "../sendNoteCancelPopUp.component";

describe("Send Note Cancel Pop up component", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate title", () => {
    const backButtonAction = jest.fn();
    const closeButtonAction = jest.fn();
    render(
      <SendNoteCancel
        backButtonAction={backButtonAction}
        closeButtonAction={closeButtonAction}
      />
    );
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Are you sure you want to leave?");
  });

  it("Validate description", () => {
    const backButtonAction = jest.fn();
    const closeButtonAction = jest.fn();
    render(
      <SendNoteCancel
        backButtonAction={backButtonAction}
        closeButtonAction={closeButtonAction}
      />
    );
    const description = screen.getByTestId("description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("All changes will be lost");
  });

  it("Validate back button", () => {
    const backButtonAction = jest.fn();
    const closeButtonAction = jest.fn();
    render(
      <SendNoteCancel
        backButtonAction={backButtonAction}
        closeButtonAction={closeButtonAction}
      />
    );
    const description = screen.getByTestId("back-button");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("Back");
    userEvent.click(description);
    expect(closeButtonAction).toBeCalledTimes(1);
  });

  it("Validate leave button", () => {
    const backButtonAction = jest.fn();
    const closeButtonAction = jest.fn();
    render(
      <SendNoteCancel
        backButtonAction={backButtonAction}
        closeButtonAction={closeButtonAction}
      />
    );
    const description = screen.getByTestId("leave-button");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("Leave");
    userEvent.click(description);
    expect(backButtonAction).toBeCalledTimes(1);
  });
});
