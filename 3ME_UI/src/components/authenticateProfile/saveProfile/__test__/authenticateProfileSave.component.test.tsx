import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AuthenticateProfileSave } from "../authenticateProfileSave.component";

describe("authenticate Profile update component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Open AuthenticateProfileSave Popup for SMS", () => {
    render(
      <AuthenticateProfileSave
        pathType="manageprofile"
        AuthType="SMS"
        data={{}}
        setOpenAuthVerifyDialog={() => { }}
        failureMessage={() => { }}
      />
    );
    const SMSPopup = screen.getByTestId("verifycode") as HTMLBaseElement;
    expect(SMSPopup).toBeInTheDocument();
  });
  it("Open AuthenticateProfileSave Popup for email", () => {
    render(
      <AuthenticateProfileSave
        pathType="manageprofile"
        AuthType="email"
        data={{}}
        setOpenAuthVerifyDialog={() => { }}
        failureMessage={() => { }}
      />
    );
    const EmailPopup = screen.getByTestId("verifycode") as HTMLBaseElement;
    expect(EmailPopup).toBeInTheDocument();
  });
  it("Verification Code with wrong input", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthenticateProfileSave
          pathType="manageprofile"
          data={{}}
          AuthType="email"
          setOpenAuthVerifyDialog={() => { }}
          failureMessage={() => { }}
        />
      </MemoryRouter>
    );
    const ele1 = screen.getByTestId("verifycode") as HTMLBaseElement;
    expect(ele1).toBeInTheDocument();
    userEvent.type(ele1, "invalidCode123");
    expect(ele1).toHaveValue("invalidCode123");
    const ele2 = screen.getByTestId("Verificationcode") as HTMLBaseElement;
    expect(ele2).toHaveStyle("color: rgb(211, 47, 47)");
  });
  it("Verification Code with right input", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthenticateProfileSave
          pathType="manageprofile"
          AuthType="email"
          data={{}}
          setOpenAuthVerifyDialog={() => { }}
          failureMessage={() => { }}
        />
      </MemoryRouter>
    );
    const ele1 = screen.getByTestId("verifycode") as HTMLBaseElement;
    expect(ele1).toBeInTheDocument();
    userEvent.type(ele1, "123456");
    expect(ele1).toHaveValue("123456");
    const ele2 = screen.getByTestId("Verificationcode") as HTMLBaseElement;
    expect(ele2).toHaveStyle("color: rgb(25, 118, 210)");
  });
  it("Validate on Verify Button Click with proper code", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AuthenticateProfileSave
          pathType="manageprofile"
          data={{}}
          AuthType="email"
          setOpenAuthVerifyDialog={() => { }}
          failureMessage={() => { }}
        />
      </MemoryRouter>
    );
    const ele1 = screen.getByTestId("verifycode") as HTMLBaseElement;
    expect(ele1).toBeInTheDocument();
    userEvent.type(ele1, "123456");
    expect(ele1).toHaveValue("123456");
    const ele3 = screen.getByTestId("Verificationcode") as HTMLBaseElement;
    expect(ele3).toHaveStyle("color: rgb(25, 118, 210)");
    const verifyButton = document.querySelector(".verify-code")!;
    expect(verifyButton).toBeEnabled();
  });
});
