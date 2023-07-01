import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import UserConfirmationDialogue from "../userConfirmationDialogue.component";

describe("UserConfirmation component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("renders user confirmation popup", () => {
    const setOpen = jest.fn();
    const mockFn = jest.fn();
    const setModalVisible = jest.fn();
    const modalVisible = true;
    const openFlag = true;
    React.useState = setModalVisible.mockReturnValue([modalVisible, {}]);
    React.useState = setOpen.mockReturnValue([openFlag, {}]);
    render(
      <MemoryRouter initialEntries={["/orders/newOrder"]}>
        <UserConfirmationDialogue
          closeModal={mockFn}
          handleConfirmNavigationClick={mockFn}
          handleSaveExitNavigationClick={mockFn}
        />
      </MemoryRouter>
    );

    const title = screen.getByTestId("save-order-confirm-div-child");
    expect(title).toBeInTheDocument();
  });
  it("renders user confirmation popup content title", () => {
    const setOpen = jest.fn();
    const mockFn = jest.fn();
    const setModalVisible = jest.fn();
    const modalVisible = true;
    const openFlag = true;
    React.useState = setModalVisible.mockReturnValue([modalVisible, {}]);
    React.useState = setOpen.mockReturnValue([openFlag, {}]);
    render(
      <MemoryRouter initialEntries={["/orders/newOrder"]}>
        <UserConfirmationDialogue
          closeModal={mockFn}
          handleConfirmNavigationClick={mockFn}
          handleSaveExitNavigationClick={mockFn}
        />
      </MemoryRouter>
    );

    const title = screen.getByTestId("header-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("You haven't saved your order");
    const subtitle = screen.getByTestId("header-sub-title");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent(
      "If you exit without saving, any changes you have made to the order will be lost"
    );
  });

  it("renders user confirmation popup buttons exist", () => {
    const setOpen = jest.fn();
    const mockFn = jest.fn();
    const setModalVisible = jest.fn();
    const modalVisible = true;
    const openFlag = true;
    React.useState = setModalVisible.mockReturnValue([modalVisible, {}]);
    React.useState = setOpen.mockReturnValue([openFlag, {}]);
    render(
      <MemoryRouter initialEntries={["/orders/newOrder"]}>
        <UserConfirmationDialogue
          closeModal={mockFn}
          handleConfirmNavigationClick={mockFn}
          handleSaveExitNavigationClick={mockFn}
        />
      </MemoryRouter>
    );
    const button1 = screen.getByTestId("button-1");
    expect(button1).toBeInTheDocument();
    expect(button1).toHaveTextContent("Return to Order Entry");
    const button2 = screen.getByTestId("button-2");
    expect(button2).toBeInTheDocument();
    expect(button2).toHaveTextContent("Exit without Saving");
  });
});
