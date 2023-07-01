import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { profileTestData } from "../../../__test__/manageProfile.test.data";
import { AuthenticateViaEmailModal } from "../authenticateViaEmailModal.component";
import { defaultAuthProfile } from "../../../../authenticateProfile/saveProfile/authProfile.model";

describe("Authenticate Via Email Modal ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Authenticate Via Email Modal Validate title", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaEmailModal
        code={code}
        data={data}
        setCode={mockSetCode}
      />
    );
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Authenticate your email");
  });

  it("Authenticate Via Email Modal Validate loader", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaEmailModal
        code={code}
        data={data}
        setCode={mockSetCode}
        showLoader={true}
      />
    );
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
    const text1 = screen.getByTestId("loading-text-large");
    expect(text1).toBeInTheDocument();
    expect(text1).toHaveTextContent("Loading");
    const text2 = screen.getByTestId("loading-text-small");
    expect(text2).toBeInTheDocument();
    expect(text2).toHaveTextContent("Processing your request...");
  });

  it("Authenticate Via Email Modal Validate description", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaEmailModal
        code={code}
        data={data}
        setCode={mockSetCode}
        showLoader={false}
      />
    );
    const description = screen.getByTestId("description");
    expect(description).toBeInTheDocument();
    const description1 = screen.getByTestId("description-one");
    expect(description1).toBeInTheDocument();
    expect(description1).toHaveTextContent(
      "A verification code has been sent to your email. Allow up to 5 minutes to receive the email."
    );
    const description2 = screen.getByTestId("description-two");
    expect(description2).toBeInTheDocument();
    expect(description2).toHaveTextContent(
      "Please enter the 6-digit code to confirm you are the account holder."
    );
  });

  it("Authenticate Via Email Modal Validate Email Verification Code Input text with valid code", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaEmailModal
        code={code}
        data={data}
        setCode={mockSetCode}
        showLoader={false}
      />
    );
    const label = screen.getByTestId("email-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Email Verification Code");
    const value = screen.getByTestId(
      "email-verification-code-value"
    ) as HTMLBaseElement;
    userEvent.type(value, "123456");
    expect(value).toBeInTheDocument();
    expect(mockSetCode).toBeCalledTimes(6);
  });

  it("Authenticate Via Email Modal Validate Email Verification Code Input text with invalid code", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaEmailModal
        code={code}
        data={data}
        setCode={mockSetCode}
      />
    );
    const label = screen.getByTestId("email-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Email Verification Code");
    const value = screen.getByTestId(
      "email-verification-code-value"
    ) as HTMLBaseElement;
    userEvent.type(value, "12345");
    expect(value).toBeInTheDocument();
    expect(mockSetCode).toBeCalledTimes(5);
  });

  it("Authenticate Via Email Modal Validate Email Verification Code Input text with invalid code as letters", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaEmailModal
        code={code}
        data={data}
        setCode={mockSetCode}
      />
    );
    const label = screen.getByTestId("email-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Email Verification Code");
    const value = screen.getByTestId(
      "email-verification-code-value"
    ) as HTMLBaseElement;
    userEvent.type(value, "abcdef");
    expect(value).toBeInTheDocument();
    expect(mockSetCode).toBeCalledTimes(6);
  });

  it("Authenticate Via Email Modal Validate Email Verification Code Input text with invalid code as alphanumeric", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaEmailModal
        code={code}
        data={data}
        setCode={mockSetCode}
      />
    );
    const label = screen.getByTestId("email-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Email Verification Code");
    const value = screen.getByTestId(
      "email-verification-code-value"
    ) as HTMLBaseElement;
    userEvent.type(value, "abc123");
    expect(value).toBeInTheDocument();
    expect(mockSetCode).toBeCalledTimes(6);
  });

  it("Authenticate Via Email Modal Validate Email Verification Code Input text with invalid code as alphanumeric and special characters", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaEmailModal
        code={code}
        data={data}
        setCode={mockSetCode}
      />
    );
    const label = screen.getByTestId("email-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Email Verification Code");
    const value = screen.getByTestId(
      "email-verification-code-value"
    ) as HTMLBaseElement;
    userEvent.type(value, "ab@123");
    expect(value).toBeInTheDocument();
    expect(mockSetCode).toBeCalledTimes(6);
  });

  it("Authenticate Via Email Modal Validate Submit Button with valid code", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaEmailModal
        code={code}
        data={data}
        setCode={mockSetCode}
      />
    );
    const label = screen.getByTestId("email-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Email Verification Code");
    const value = screen.getByTestId(
      "email-verification-code-value"
    ) as HTMLBaseElement;
    expect(value).toBeInTheDocument();
    userEvent.type(value, "123456");
    expect(mockSetCode).toBeCalledTimes(6);
    const submitButton = screen.getByTestId("submit-btn") as HTMLBaseElement;
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("Authenticate Via Email Modal Validate Submit Button with invalid code as letters", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaEmailModal
        code={code}
        data={data}
        setCode={mockSetCode}
      />
    );
    const label = screen.getByTestId("email-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Email Verification Code");
    const value = screen.getByTestId(
      "email-verification-code-value"
    ) as HTMLBaseElement;
    expect(value).toBeInTheDocument();
    userEvent.type(value, "abcdef");
    expect(mockSetCode).toBeCalledTimes(6);
    const submitButton = screen.getByTestId("submit-btn") as HTMLBaseElement;
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("Authenticate Via Email Modal Validate Submit Button with invalid code as alphanumeric", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaEmailModal
        code={code}
        data={data}
        setCode={mockSetCode}
      />
    );
    const label = screen.getByTestId("email-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Email Verification Code");
    const value = screen.getByTestId(
      "email-verification-code-value"
    ) as HTMLBaseElement;
    expect(value).toBeInTheDocument();
    userEvent.type(value, "abc123");
    const submitButton = screen.getByTestId("submit-btn") as HTMLBaseElement;
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("Authenticate Via Email Modal Validate Submit Button with invalid code as alphanumeric and special characters", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaEmailModal
        code={code}
        data={data}
        setCode={mockSetCode}
      />
    );
    const label = screen.getByTestId("email-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Email Verification Code");
    const value = screen.getByTestId(
      "email-verification-code-value"
    ) as HTMLBaseElement;
    expect(value).toBeInTheDocument();
    userEvent.type(value, "ab@123");
    const submitButton = screen.getByTestId("submit-btn") as HTMLBaseElement;
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("Authenticate Via Email Modal Validate Submit Button and its Action", () => {
    const codeprop = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    const mockSubmitButtonAction = jest.fn();
    render(
      <AuthenticateViaEmailModal
        code={codeprop}
        data={data}
        setCode={mockSetCode}
        submitBtnAction={mockSubmitButtonAction}
      />
    );
    const code = screen.getByTestId(
      "email-verification-code-value"
    ) as HTMLBaseElement;
    expect(code).toBeInTheDocument();
    userEvent.type(code, "123456");
    const submitButton = screen.getByTestId("submit-btn") as HTMLBaseElement;
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("Submit email verification");
  });

  it("Authenticate Via Email Modal Validate Resend Button and its action", () => {
    const codeprop = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    const mockResendButtonAction = jest.fn();
    render(
      <AuthenticateViaEmailModal
        code={codeprop}
        data={data}
        resendBtnAction={mockResendButtonAction}
        setCode={mockSetCode}
      />
    );
    const resendButton = screen.getByTestId("resend-btn");
    expect(resendButton).toBeInTheDocument();
    expect(resendButton).toHaveTextContent("Resend code to email");
    expect(resendButton).not.toBeDisabled();
    userEvent.click(resendButton);
    expect(mockResendButtonAction).toHaveBeenCalled();
    expect(mockResendButtonAction).toHaveBeenCalledTimes(1);
  });
});
