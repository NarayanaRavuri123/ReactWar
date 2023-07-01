import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SuccessPopUp } from "../successPopUp.component";

describe("Success Pop Up component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Validate Success Pop Up component title", () => {
    const mockFn = jest.fn();
    render(
      <SuccessPopUp
        title="test"
        description1="test description 1"
        description2="test description 2"
        buttonTitle="done"
        btnAction={mockFn}
      />
    );
    const successPopUp = screen.getByTestId("success-pop-up");
    expect(successPopUp).toBeInTheDocument();
    const title = screen.getByTestId("success-pop-up-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("test");
  });

  it("Validate Success Pop Up component description", () => {
    const mockFn = jest.fn();
    render(
      <SuccessPopUp
        title="test"
        description1="test description 1"
        description2="test description 2"
        buttonTitle="done"
        btnAction={mockFn}
      />
    );
    const container = screen.getByTestId("success-pop-up-description");
    expect(container).toBeInTheDocument();
    const description1 = screen.getByTestId("success-pop-up-description1");
    expect(description1).toBeInTheDocument();
    expect(description1).toHaveTextContent("test description 1");
    const description2 = screen.getByTestId("success-pop-up-description2");
    expect(description2).toBeInTheDocument();
    expect(description2).toHaveTextContent("test description 2");
  });

  it("Validate Success Pop Up component button", () => {
    const mockFn = jest.fn();
    render(
      <SuccessPopUp
        title="test"
        description1="test description 1"
        description2="test description 2"
        buttonTitle="done"
        btnAction={mockFn}
      />
    );
    const buttonTitle = screen.getByTestId("buttonTitle");
    expect(buttonTitle).toBeInTheDocument();
    expect(buttonTitle).toHaveTextContent("done");
    userEvent.click(buttonTitle);
    expect(mockFn).toBeCalledTimes(1);
  });
});
