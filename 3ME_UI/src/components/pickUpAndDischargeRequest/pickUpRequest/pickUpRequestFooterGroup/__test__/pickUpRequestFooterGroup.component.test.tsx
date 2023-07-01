import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PickUpRequestContext } from "../../../../../context/PickUpRequestContext";
import { getMockPickUpRequestContextData } from "../../__test__/mockPickUpRequestContext";
import { PickUpRequestFooterButtonGroup } from "../pickUpRequestFooterGroup.component";

describe("Reason For Discharge component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Check first button", () => {
    const firstButtonAction = jest.fn();
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <PickUpRequestFooterButtonGroup
          firstButtonTitle="Cancel"
          firstButtonAction={firstButtonAction}
          secondButtonTitle=""
          secondButtonAction={() => {}}
          thirdButtonTitle=""
          thirdButtonAction={() => {}}
        />
      </PickUpRequestContext.Provider>
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
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <PickUpRequestFooterButtonGroup
          firstButtonTitle="Cancel"
          firstButtonAction={firstButtonAction}
          firstButtonDisabled={true}
          secondButtonTitle=""
          secondButtonAction={() => {}}
          thirdButtonTitle=""
          thirdButtonAction={() => {}}
        />
      </PickUpRequestContext.Provider>
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
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <PickUpRequestFooterButtonGroup
          firstButtonTitle=""
          firstButtonAction={() => {}}
          secondButtonTitle="Test"
          secondButtonAction={secondButtonAction}
          thirdButtonTitle=""
          thirdButtonAction={() => {}}
        />
      </PickUpRequestContext.Provider>
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
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <PickUpRequestFooterButtonGroup
          firstButtonTitle=""
          firstButtonAction={() => {}}
          secondButtonTitle="Test"
          secondButtonAction={secondButtonAction}
          secondButtonDisabled={true}
          thirdButtonTitle=""
          thirdButtonAction={() => {}}
        />
      </PickUpRequestContext.Provider>
    );
    const secondButton = screen.getByTestId("secondButton-test");
    expect(secondButton).toBeInTheDocument();
    expect(secondButton).toHaveTextContent("Test");
    expect(secondButton).not.toBeEnabled();
    expect(secondButtonAction).toHaveBeenCalledTimes(0);
  });

  it("Check third button", () => {
    const thirdButtonAction = jest.fn();
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <PickUpRequestFooterButtonGroup
          firstButtonTitle=""
          firstButtonAction={() => {}}
          secondButtonTitle=""
          secondButtonAction={() => {}}
          thirdButtonTitle="Test"
          thirdButtonAction={thirdButtonAction}
        />
      </PickUpRequestContext.Provider>
    );
    const thirdButton = screen.getByTestId("thirdButton-test");
    expect(thirdButton).toBeInTheDocument();
    expect(thirdButton).toHaveTextContent("Test");
    expect(thirdButton).toBeEnabled();
    userEvent.click(thirdButton);
    expect(thirdButtonAction).toHaveBeenCalledTimes(1);
  });

  it("Check third button", () => {
    const thirdButtonAction = jest.fn();
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <PickUpRequestFooterButtonGroup
          firstButtonTitle=""
          firstButtonAction={() => {}}
          secondButtonTitle=""
          secondButtonAction={() => {}}
          thirdButtonTitle="Test"
          thirdButtonAction={thirdButtonAction}
          thirdButtonDisabled={true}
        />
      </PickUpRequestContext.Provider>
    );
    const thirdButton = screen.getByTestId("thirdButton-test");
    expect(thirdButton).toBeInTheDocument();
    expect(thirdButton).toHaveTextContent("Test");
    expect(thirdButton).not.toBeEnabled();
    expect(thirdButtonAction).toHaveBeenCalledTimes(0);
  });
});
