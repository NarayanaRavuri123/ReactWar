import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExitDischargePopUp } from "../exitDischargePopUp.commonent";

describe("Exit discharge Component", () => {
  afterAll(() => {
    cleanup();
  });
  it("Exit discharge component validate title", () => {
    const mockFn = jest.fn();
    render(
      <ExitDischargePopUp cancelBtnAction={mockFn} returnBtnAction={mockFn} />
    );
    const title = screen.getByTestId("exit-discharge-pop-up-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Exit discharge completion");
  });

  it("Exit discharge component validate description", () => {
    const mockFn = jest.fn();
    render(
      <ExitDischargePopUp cancelBtnAction={mockFn} returnBtnAction={mockFn} />
    );
    const title = screen.getByTestId("exit-discharge-pop-up-description");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "You are about to exit this discharge order. Any changes on this screen will be lost. Click “Cancel” to proceed or click “Return” to return to the order."
    );
  });

  it("Exit discharge component validate description exit-discharge-pop-up-footer", () => {
    const mockFn = jest.fn();
    render(
      <ExitDischargePopUp cancelBtnAction={mockFn} returnBtnAction={mockFn} />
    );
    const description = screen.getByTestId("exit-discharge-pop-up-description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "You are about to exit this discharge order. Any changes on this screen will be lost. Click “Cancel” to proceed or click “Return” to return to the order."
    );
  });

  it("Exit discharge component validate footer div", () => {
    const mockFn = jest.fn();
    render(
      <ExitDischargePopUp cancelBtnAction={mockFn} returnBtnAction={mockFn} />
    );
    const div = screen.getByTestId("exit-discharge-pop-up-footer");
    expect(div).toBeInTheDocument();
  });

  it("Exit discharge component validate cancel button", () => {
    const mockFn = jest.fn();
    render(
      <ExitDischargePopUp
        cancelBtnAction={mockFn}
        returnBtnAction={jest.fn()}
      />
    );
    const cancelBtn = screen.getByTestId("cancel-exit-discharge-request");
    expect(cancelBtn).toBeInTheDocument();
    expect(cancelBtn).toHaveTextContent("Cancel");
    userEvent.click(cancelBtn);
    expect(mockFn).toBeCalledTimes(1);
  });

  it("Exit discharge component validate return button", () => {
    const mockFn = jest.fn();
    render(
      <ExitDischargePopUp
        cancelBtnAction={jest.fn()}
        returnBtnAction={mockFn}
      />
    );
    const cancelBtn = screen.getByTestId("return-exit-discharge-request");
    expect(cancelBtn).toBeInTheDocument();
    expect(cancelBtn).toHaveTextContent("Return");
    userEvent.click(cancelBtn);
    expect(mockFn).toBeCalledTimes(1);
  });
});
