import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { ConfirmLeaveModal } from "../confirmLeaveModal.component";

describe("Confirm Leave Modal ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Confirm Leave Modal Validate title", () => {
    const mockPopUp = jest.fn();
    render(<ConfirmLeaveModal updatePopUp={mockPopUp} />);
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Are you sure you want to leave without completing verification?"
    );
  });

  it("Confirm Leave Modal Validate description", () => {
    const mockPopUp = jest.fn();
    render(<ConfirmLeaveModal updatePopUp={mockPopUp} />);
    const description = screen.getByTestId("description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "Any changes you’ve made to your phone number will be cancelled."
    );
  });

  it("Confirm Leave Modal Validate Leave Button and its action", () => {
    const mockLeaveBtn = jest.fn();
    const mockPopUp = jest.fn();
    render(
      <ConfirmLeaveModal
        leaveBtnAction={mockLeaveBtn}
        updatePopUp={mockPopUp}
      />
    );
    const leaveButton = screen.getByTestId("leave-btn");
    expect(leaveButton).toBeInTheDocument();
    expect(leaveButton).toHaveTextContent("Leave and return to your profile");
    expect(leaveButton).not.toBeDisabled();
    userEvent.click(leaveButton);
    expect(mockLeaveBtn).toHaveBeenCalled();
    expect(mockLeaveBtn).toHaveBeenCalledTimes(1);
  });

  it("Confirm Leave Modal Validate Leave Button and its action without mock function for button action", () => {
    const mockPopUp = jest.fn();
    render(
      <ConfirmLeaveModal updatePopUp={() => {}} leaveBtnAction={mockPopUp} />
    );
    const leaveButton = screen.getByTestId("leave-btn");
    expect(leaveButton).toBeInTheDocument();
    expect(leaveButton).toHaveTextContent("Leave and return to your profile");
    expect(leaveButton).not.toBeDisabled();
    userEvent.click(leaveButton);
    expect(mockPopUp).toHaveBeenCalled();
    expect(mockPopUp).toHaveBeenCalledTimes(1);
  });

  it("Confirm Leave Modal Validate Continue Button and its action", () => {
    const mockContinueBtn = jest.fn();
    const mockPopUp = jest.fn();
    render(
      <ConfirmLeaveModal
        continueBtnAction={mockContinueBtn}
        updatePopUp={mockPopUp}
      />
    );
    const continueButton = screen.getByTestId("continue-btn");
    expect(continueButton).toBeInTheDocument();
    expect(continueButton).toHaveTextContent("Continue to verify");
    expect(continueButton).not.toBeDisabled();
    userEvent.click(continueButton);
    expect(mockContinueBtn).toHaveBeenCalled();
    expect(mockContinueBtn).toHaveBeenCalledTimes(1);
  });

  it("Confirm Leave Modal Validate Continue Button and its action without mock function for button action", () => {
    const mockPopUp = jest.fn();
    render(<ConfirmLeaveModal updatePopUp={mockPopUp} />);
    const continueButton = screen.getByTestId("continue-btn");
    expect(continueButton).toBeInTheDocument();
    expect(continueButton).toHaveTextContent("Continue to verify");
    expect(continueButton).not.toBeDisabled();
    userEvent.click(continueButton);
    expect(mockPopUp).toHaveBeenCalled();
    expect(mockPopUp).toHaveBeenCalledTimes(1);
  });
});
