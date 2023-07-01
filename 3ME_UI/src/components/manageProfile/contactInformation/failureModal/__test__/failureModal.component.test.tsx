import userEvent from "@testing-library/user-event";
import { FailureModal } from "../failureModal.component";
import { cleanup, render, screen } from "@testing-library/react";

describe("Failure Modal ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Failure Modal validate title", () => {
    const mockReturn = jest.fn();
    render(<FailureModal message="" returnBtnAction={mockReturn} />);
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Failure!");
  });

  it("Failure Modal validate description", () => {
    const mockReturn = jest.fn();
    render(
      <FailureModal
        message="Oops something went wrong !"
        returnBtnAction={mockReturn}
      />
    );
    const description = screen.getByTestId("description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("Oops something went wrong !");
  });

  it("Failure Modal validate return button", () => {
    const mockReturn = jest.fn();
    render(
      <FailureModal
        message="Oops something went wrong !"
        returnBtnAction={mockReturn}
      />
    );
    const returnBtn = screen.getByTestId("return-btn");
    expect(returnBtn).toBeInTheDocument();
    expect(returnBtn).toHaveTextContent("Return to manage your profile");
    userEvent.click(returnBtn);
    expect(mockReturn).toBeCalledTimes(1);
  });
});
