import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { VerifyAccount } from "../verifyAccount.component";
import userEvent from "@testing-library/user-event";
import { defaultAccountTestData } from "./defaultAccountTestData";

jest.mock("../../../../core/popup/popup.component");

jest.mock("@okta/okta-react", () => ({
  useOktaAuth: () => {
    return {
      authState: {},
      authService: {},
      oktaAuth: {},
    };
  },
}));

describe("Manage Account", () => {
  afterAll(() => {
    cleanup();
  });
  beforeEach(() => {
    cleanup();
  });

  it("Verify component renders", () => {
    render(<VerifyAccount type="sms" data={defaultAccountTestData} />);
    const verifyComponent = screen.getByTestId("verify-container");
    expect(verifyComponent).toBeInTheDocument();
  });
  it("Verify component renders header text", () => {
    render(<VerifyAccount type="sms" data={defaultAccountTestData} />);
    const headerTitle = screen.getByTestId("manage-acc-title-test");
    expect(headerTitle).toBeInTheDocument();
    const headerDesc = screen.getByTestId("accountDesTest");
    expect(headerDesc).toBeInTheDocument();
  });
  it("Instruction text for SMS method is rendered", () => {
    render(<VerifyAccount type="SMS" data={defaultAccountTestData} />);
    const instruction = screen.getByTestId("instruction");
    expect(instruction).toBeInTheDocument();
    expect(instruction).toHaveTextContent(
      "Please enter the 6-digit code sent to your mobile phone."
    );
  });
  it("Instruction text for email method is rendered", () => {
    render(<VerifyAccount type="email" data={defaultAccountTestData} />);
    const instruction = screen.getByTestId("instruction");
    expect(instruction).toBeInTheDocument();
    expect(instruction).toHaveTextContent(
      "Please enter the 6-digit code sent to your email."
    );
  });
  it("Code input is rendered", () => {
    render(<VerifyAccount type="SMS" data={defaultAccountTestData} />);
    const codeInput = screen.getByTestId("code-input-value");
    expect(codeInput).toBeInTheDocument();
  });
  it("Invalid code shows error", () => {
    render(<VerifyAccount type="SMS" data={defaultAccountTestData} />);
    const codeInput = screen.getByTestId("code-input-value") as HTMLElement;
    userEvent.type(codeInput, "abc");
    expect(codeInput).toHaveAttribute("aria-invalid", "true");
  });
  it("Valid code shows no error", () => {
    render(<VerifyAccount type="SMS" data={defaultAccountTestData} />);
    const codeInput = screen.getByTestId("code-input-value") as HTMLElement;
    userEvent.type(codeInput, "123456");
    expect(codeInput).toHaveAttribute("aria-invalid", "false");
  });
  it("Max length 6 can be entered in code input", () => {
    render(<VerifyAccount type="SMS" data={defaultAccountTestData} />);
    const codeInput = screen.getByTestId("code-input-value");
    expect(codeInput).toHaveAttribute("maxlength", "6");
  });
  it("Back button click takes back", () => {
    const mockFn = jest.fn();
    React.useState = jest.fn().mockReturnValue([false, mockFn]);
    render(<VerifyAccount type="SMS" data={defaultAccountTestData} />);
    const backBtn = screen.getByTestId("bck-btn") as HTMLElement;
    expect(backBtn).toBeInTheDocument();
    userEvent.click(backBtn);
    expect(mockFn).toHaveBeenCalled();
  });
  it("Rensend button click clears code input", () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();
    const mockFn3 = jest.fn();
    const mockFn4 = jest.fn();
    const mockFn5 = jest.fn();
    const mockFn6 = jest.fn();
    React.useState = jest
      .fn()
      .mockReturnValueOnce([false, mockFn1])
      .mockReturnValueOnce([false, mockFn2])
      .mockReturnValueOnce(["", mockFn3])
      .mockReturnValueOnce(["", mockFn4])
      .mockReturnValueOnce(["", mockFn5])
      .mockReturnValueOnce(["", mockFn6])
      .mockReturnValueOnce(["", {}]);
    render(<VerifyAccount type="SMS" data={defaultAccountTestData} />);
    const resendBtn = screen.getByTestId("resend-btn") as HTMLElement;
    expect(resendBtn).toBeInTheDocument();
    userEvent.click(resendBtn);
    expect(mockFn4).toHaveBeenCalled();
  });
  it("Submit button renders", () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();
    const mockFn3 = jest.fn();
    const mockFn4 = jest.fn();
    const mockFn5 = jest.fn();
    const mockFn6 = jest.fn();
    React.useState = jest
      .fn()
      .mockReturnValueOnce([false, mockFn1])
      .mockReturnValueOnce([false, mockFn2])
      .mockReturnValueOnce(["123456", mockFn3])
      .mockReturnValueOnce(["", mockFn4])
      .mockReturnValueOnce(["", mockFn5])
      .mockReturnValueOnce(["", mockFn6])
      .mockReturnValueOnce(["", {}]);
    render(<VerifyAccount type="SMS" data={defaultAccountTestData} />);
    const submitBtn = screen.getByTestId("submit-btn") as HTMLElement;
    expect(submitBtn).toBeInTheDocument();
  });
});
