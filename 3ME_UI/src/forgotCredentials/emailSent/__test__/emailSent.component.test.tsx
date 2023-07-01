import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { EmailSent } from "../emailSent.component";

describe("Email Sent component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Email Sent title", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <EmailSent />
      </MemoryRouter>
    );
    const title = screen.getByTestId("email-sent-title");
    expect(title).toHaveTextContent("Email sent");
  });

  it("Email Sent description", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <EmailSent />
      </MemoryRouter>
    );
    const description = screen.getByTestId("email-sent-description");
    expect(description).toHaveTextContent(
      "Your username will be emailed to you. If you do not receive an email within a few minutes, please be sure to check your junk mail folder to make sure it hasn't been captured by your network spam filter."
    );
  });

  it("Email Sent Back to sign in button", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <EmailSent />
      </MemoryRouter>
    );
    const button = screen.getByTestId("sign-in-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Back to sign in");
  });
});
