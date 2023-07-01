import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DeletePopup } from "../deleteOrder.component";
import userEvent from "@testing-library/user-event";

describe("DeletePopup Popup component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Title of delete component present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DeletePopup doNotDeleteHandler={() => {}} deleteHandler={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("deleteOrderPopupTitleTest");
    expect(title).toBeInTheDocument();
  });

  it("delete component do not delete  button present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DeletePopup doNotDeleteHandler={() => {}} deleteHandler={() => {}} />
      </MemoryRouter>
    );
    const doNotDeleteBtn = screen.getByTestId("donNotDeleteTest");
    expect(doNotDeleteBtn).toBeInTheDocument();
  });
  it("delete component order button present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DeletePopup doNotDeleteHandler={() => {}} deleteHandler={() => {}} />
      </MemoryRouter>
    );
    const deleteBtn = screen.getByTestId("DeleteOrderTest");
    expect(deleteBtn).toBeInTheDocument();
  });
});
