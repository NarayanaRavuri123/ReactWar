import userEvent from "@testing-library/user-event";
import { SuccessModal } from "../successModal.component";
import { cleanup, render, screen } from "@testing-library/react";

describe("Success Modal ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Success Modal validate title", () => {
    const mockReturnBtn = jest.fn();
    render(<SuccessModal returnBtnAction={mockReturnBtn} />);
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Success!");
  });

  it("Success Modal validate description", () => {
    const mockReturnBtn = jest.fn();
    render(<SuccessModal returnBtnAction={mockReturnBtn} />);
    const description = screen.getByTestId("description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "Your phone number has been successfully updated"
    );
  });

  it("Success Modal validate Return Button and its action", () => {
    const mockReturnBtn = jest.fn();
    render(<SuccessModal returnBtnAction={mockReturnBtn} />);
    const returnButton = screen.getByTestId("return-btn");
    expect(returnButton).toBeInTheDocument();
    expect(returnButton).toHaveTextContent("Return to manage your profile");
    expect(returnButton).not.toBeDisabled();
    userEvent.click(returnButton);
    expect(mockReturnBtn).toHaveBeenCalled();
    expect(mockReturnBtn).toHaveBeenCalledTimes(1);
  });
});
