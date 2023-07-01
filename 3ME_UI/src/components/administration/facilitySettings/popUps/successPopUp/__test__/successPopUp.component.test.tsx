import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { SuccessPopUp } from "../successPopUp.component";

describe("Success Pop up component", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate title", () => {
    const backButtonAction = jest.fn();
    render(
      <SuccessPopUp
        buttonAction={backButtonAction}
        buttonTitle="Done"
        description="description"
        title="title"
      />
    );
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("title");
  });

  it("Validate description", () => {
    const backButtonAction = jest.fn();
    render(
      <SuccessPopUp
        buttonAction={backButtonAction}
        buttonTitle="Done"
        description="description"
        title="title"
      />
    );
    const description = screen.getByTestId("description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("description");
  });

  it("Validate back to dashboard button", () => {
    const backButtonAction = jest.fn();
    render(
      <SuccessPopUp
        buttonAction={backButtonAction}
        buttonTitle="Done"
        description="description"
        title="title"
      />
    );
    const buttonTitle = screen.getByTestId("buttonTitle");
    expect(buttonTitle).toBeInTheDocument();
    expect(buttonTitle).toHaveTextContent("Done");
    userEvent.click(buttonTitle);
    expect(backButtonAction).toBeCalledTimes(1);
  });
});
