import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { LandlineWarningModal } from "../landlineWarningModal.compnent";

describe("Landline Warning Modal ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Landline Warning Modal validate title", () => {
    const mockPopUp = jest.fn();
    const mockChangeEmail = jest.fn();
    const mockCancel = jest.fn();
    render(
      <LandlineWarningModal
        setOpenPopUp={mockPopUp}
        handleChangeEmail={mockChangeEmail}
        handleCancel={mockCancel}
      />
    );
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Confirm change to landline");
  });

  it("Landline Warning Modal validate description", () => {
    const mockPopUp = jest.fn();
    const mockChangeEmail = jest.fn();
    const mockCancel = jest.fn();
    render(
      <LandlineWarningModal
        setOpenPopUp={mockPopUp}
        handleChangeEmail={mockChangeEmail}
        handleCancel={mockCancel}
      />
    );
    const description = screen.getByTestId("description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "You currently have selected SMS as your only method for receiving communication from 3M. By changing your phone number to a landline, we will need to change your communication method to email.Would you like to make that change?"
    );
  });

  it("Landline Warning Modal validate leave button", () => {
    const mockPopUp = jest.fn();
    const mockChangeEmail = jest.fn();
    const mockCancel = jest.fn();
    render(
      <LandlineWarningModal
        setOpenPopUp={mockPopUp}
        handleChangeEmail={mockChangeEmail}
        handleCancel={mockCancel}
      />
    );
    const leaveBtn = screen.getByTestId("leave-btn");
    expect(leaveBtn).toBeInTheDocument();
    expect(leaveBtn).toHaveTextContent(
      "Yes, change my communication preference to email"
    );
    userEvent.click(leaveBtn);
    expect(mockChangeEmail).toBeCalledTimes(1);
  });

  it("Landline Warning Modal validate leave button", () => {
    const mockPopUp = jest.fn();
    const mockChangeEmail = jest.fn();
    const mockCancel = jest.fn();
    render(
      <LandlineWarningModal
        setOpenPopUp={mockPopUp}
        handleChangeEmail={mockChangeEmail}
        handleCancel={mockCancel}
      />
    );
    const continueBtn = screen.getByTestId("continue-btn");
    expect(continueBtn).toBeInTheDocument();
    expect(continueBtn).toHaveTextContent(
      "No, keep my phone as a mobile number"
    );
    userEvent.click(continueBtn);
    expect(mockCancel).toBeCalledTimes(1);
  });
});
