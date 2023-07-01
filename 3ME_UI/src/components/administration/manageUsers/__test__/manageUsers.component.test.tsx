import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { ManageUsers } from "../manageUsers.component";

describe("manage users component", () => {
  afterAll(() => {
    cleanup();
  });

  it("To check Manage Users Name header validation", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ManageUsers />
      </MemoryRouter>
    );
    const title = screen.getByTestId("manage-users-main-section-header");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Manage Users");
  });

  it("should render All status dropdown", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ManageUsers />
      </MemoryRouter>
    );
    const dropdown = screen.getByTestId("user-status");
    console.log(dropdown);
    expect(dropdown).toBeInTheDocument();
  });

  it("add new user Button Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ManageUsers />
      </MemoryRouter>
    );
    const button = screen.getByTestId("mng-add-usr-btn");
    fireEvent.click(button);
    const popup = screen.queryByText("popup");
    expect(popup).toBeNull();
  });
});
