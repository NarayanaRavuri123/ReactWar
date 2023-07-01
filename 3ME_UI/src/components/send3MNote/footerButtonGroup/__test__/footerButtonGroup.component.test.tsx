import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { FooterButtonGroup } from "../footerButtonGroup.component";

describe("Footer Button Group component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Check first button", () => {
    const firstButtonAction = jest.fn();
    render(
      <FooterButtonGroup
        firstButtonTitle="Cancel"
        firstButtonAction={firstButtonAction}
        secondButtonTitle=""
        secondButtonAction={() => {}}
      />
    );
    const firstButton = screen.getByTestId("firstButton-test");
    expect(firstButton).toBeInTheDocument();
    expect(firstButton).toHaveTextContent("Cancel");
    expect(firstButton).toBeEnabled();
    userEvent.click(firstButton);
    expect(firstButtonAction).toHaveBeenCalledTimes(1);
  });

  it("Check first button disable", () => {
    const firstButtonAction = jest.fn();
    render(
      <FooterButtonGroup
        firstButtonTitle="Cancel"
        firstButtonAction={firstButtonAction}
        firstButtonDisabled={true}
        secondButtonTitle=""
        secondButtonAction={() => {}}
      />
    );
    const firstButton = screen.getByTestId("firstButton-test");
    expect(firstButton).toBeInTheDocument();
    expect(firstButton).toHaveTextContent("Cancel");
    expect(firstButton).not.toBeEnabled();
    expect(firstButtonAction).toHaveBeenCalledTimes(0);
  });

  it("Check second button", () => {
    const secondButtonAction = jest.fn();
    render(
      <FooterButtonGroup
        firstButtonTitle=""
        firstButtonAction={() => {}}
        secondButtonTitle="Test"
        secondButtonAction={secondButtonAction}
      />
    );
    const secondButton = screen.getByTestId("secondButton-test");
    expect(secondButton).toBeInTheDocument();
    expect(secondButton).toHaveTextContent("Test");
    expect(secondButton).toBeEnabled();
    userEvent.click(secondButton);
    expect(secondButtonAction).toHaveBeenCalledTimes(1);
  });

  it("Check second button disabled", () => {
    const secondButtonAction = jest.fn();
    render(
      <FooterButtonGroup
        firstButtonTitle=""
        firstButtonAction={() => {}}
        secondButtonTitle="Test"
        secondButtonAction={secondButtonAction}
        secondButtonDisabled={true}
      />
    );
    const secondButton = screen.getByTestId("secondButton-test");
    expect(secondButton).toBeInTheDocument();
    expect(secondButton).toHaveTextContent("Test");
    expect(secondButton).not.toBeEnabled();
    expect(secondButtonAction).toHaveBeenCalledTimes(0);
  });
});
