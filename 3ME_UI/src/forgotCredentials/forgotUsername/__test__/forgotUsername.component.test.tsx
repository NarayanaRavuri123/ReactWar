import { MemoryRouter } from "react-router-dom";
import { ForgotUsername } from "../forgotUsername.component";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Username Component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Validate Express label", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ForgotUsername />
      </MemoryRouter>
    );
    const express = screen.getByText("Express");
    expect(express).toBeInTheDocument();
  });

  it("Validate Forgot username label", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ForgotUsername />
      </MemoryRouter>
    );
    const username = screen.getByTestId("forgot-username-title");
    expect(username).toBeInTheDocument();
    expect(username).toHaveTextContent("Forgot Username");
  });

  it("Validate email with valid data", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ForgotUsername />
      </MemoryRouter>
    );
    const emailTitle = screen.getByTestId("username-email-input-label");
    const email = screen.getByTestId("username-email-input") as HTMLBaseElement;
    expect(emailTitle).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(emailTitle).toHaveTextContent("Email*");
    userEvent.type(email, "rahul.p@healthasyst.com");
    expect(within(email).getByRole("textbox")).toHaveValue(
      "rahul.p@healthasyst.com"
    );
    expect(emailTitle).toHaveStyle("color: rgb(25, 118, 210)");
  });

  it("Validate email with invalid data", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ForgotUsername />
      </MemoryRouter>
    );
    const emailTitle = screen.getByTestId("username-email-input-label");
    const email = screen.getByTestId("username-email-input") as HTMLBaseElement;
    expect(emailTitle).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(emailTitle).toHaveTextContent("Email*");
    userEvent.type(email, "rahul.p.healthasyst.com");
    expect(within(email).getByRole("textbox")).toHaveValue(
      "rahul.p.healthasyst.com"
    );
    expect(emailTitle).toHaveStyle("color: rgb(211, 47, 47)");
  });

  it("Validate Submit button", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ForgotUsername />
      </MemoryRouter>
    );
    const submit = screen.getByTestId("forgot-username-submit");
    expect(submit).toBeInTheDocument();
    expect(submit).toHaveTextContent("Submit");
  });
});
