import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { profileTestData } from "../../../__test__/manageProfile.test.data";
import { AuthenticateViaSmsModal } from "../authenticateViaSmsModal.component";
import { defaultAuthProfile } from "../../../../authenticateProfile/saveProfile/authProfile.model";
import { ValidationStatus } from "../../../../../core/interfaces/input.interface";

describe("Authenticate Via Sms Modal ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Authenticate Via Sms Modal Validate title", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaSmsModal code={code} data={data} setCode={mockSetCode} />
    );
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Confirm the number change");
  });

  it("Authenticate Via Sms Modal Validate loader", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaSmsModal
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

  it("Authenticate Via Sms Modal Validate description", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaSmsModal code={code} data={data} setCode={mockSetCode} />
    );
    const description = screen.getByTestId("description");
    expect(description).toBeInTheDocument();
    const description1 = screen.getByTestId("description-one");
    expect(description1).toBeInTheDocument();
    expect(description1).toHaveTextContent("Success! You have been verified.");
    const description2 = screen.getByTestId("description-two");
    expect(description2).toBeInTheDocument();
    expect(description2).toHaveTextContent(
      "An SMS has now been sent to your new phone number. Please enter the 6-digit verification code to confirm."
    );
  });

  it("Authenticate Via Sms Modal Validate SMS Verification Code Input text with valid code", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaSmsModal code={code} data={data} setCode={mockSetCode} />
    );
    const label = screen.getByTestId("sms-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("SMS Verification Code");
    const value = screen.getByTestId(
      "sms-verification-code-value"
    ) as HTMLBaseElement;
    userEvent.type(value, "123456");
    expect(value).toBeInTheDocument();
    expect(mockSetCode).toBeCalledTimes(6);
  });

  it("Authenticate Via Sms Modal Validate SMS Verification Code Input text with invalid code", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaSmsModal code={code} data={data} setCode={mockSetCode} />
    );
    const label = screen.getByTestId("sms-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("SMS Verification Code");
    const value = screen.getByTestId(
      "sms-verification-code-value"
    ) as HTMLBaseElement;
    userEvent.type(value, "12345");
    expect(value).toBeInTheDocument();
    expect(mockSetCode).toBeCalledTimes(5);
  });

  it("Authenticate Via Sms Modal Validate SMS Verification Code Input text with invalid code as letters", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaSmsModal code={code} data={data} setCode={mockSetCode} />
    );
    const label = screen.getByTestId("sms-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("SMS Verification Code");
    const value = screen.getByTestId(
      "sms-verification-code-value"
    ) as HTMLBaseElement;
    userEvent.type(value, "abcdef");
    expect(value).toBeInTheDocument();
    expect(mockSetCode).toBeCalledTimes(6);
  });

  it("Authenticate Via Sms Modal Validate SMS Verification Code Input text with invalid code as alphanumeric", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaSmsModal code={code} data={data} setCode={mockSetCode} />
    );
    const label = screen.getByTestId("sms-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("SMS Verification Code");
    const value = screen.getByTestId(
      "sms-verification-code-value"
    ) as HTMLBaseElement;
    userEvent.type(value, "abc123");
    expect(value).toBeInTheDocument();
    expect(mockSetCode).toBeCalledTimes(6);
  });

  it("Authenticate Via Sms Modal Validate SMS Verification Code Input text with invalid code as alphanumeric and special characters", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaSmsModal code={code} data={data} setCode={mockSetCode} />
    );
    const label = screen.getByTestId("sms-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("SMS Verification Code");
    const value = screen.getByTestId(
      "sms-verification-code-value"
    ) as HTMLBaseElement;
    userEvent.type(value, "ab@123");
    expect(value).toBeInTheDocument();
    expect(mockSetCode).toBeCalledTimes(6);
  });

  it("Authenticate Via Sms Modal Validate Submit Button with valid code", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaSmsModal code={code} data={data} setCode={mockSetCode} />
    );
    const label = screen.getByTestId("sms-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("SMS Verification Code");
    const value = screen.getByTestId(
      "sms-verification-code-value"
    ) as HTMLBaseElement;
    expect(value).toBeInTheDocument();
    userEvent.type(value, "123456");
    const submitButton = screen.getByTestId("submit-btn") as HTMLBaseElement;
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("Authenticate Via Sms Modal Validate Submit Button with invalid code as letters", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaSmsModal code={code} data={data} setCode={mockSetCode} />
    );
    const label = screen.getByTestId("sms-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("SMS Verification Code");
    const value = screen.getByTestId(
      "sms-verification-code-value"
    ) as HTMLBaseElement;
    expect(value).toBeInTheDocument();
    userEvent.type(value, "abcdef");
    const submitButton = screen.getByTestId("submit-btn") as HTMLBaseElement;
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("Authenticate Via Sms Modal Validate Submit Button with invalid code as alphanumeric", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaSmsModal code={code} data={data} setCode={mockSetCode} />
    );
    const label = screen.getByTestId("sms-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("SMS Verification Code");
    const value = screen.getByTestId(
      "sms-verification-code-value"
    ) as HTMLBaseElement;
    expect(value).toBeInTheDocument();
    userEvent.type(value, "abc123");
    const submitButton = screen.getByTestId("submit-btn") as HTMLBaseElement;
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("Authenticate Via Sms Modal Validate Submit Button with invalid code as alphanumeric and special characters", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    render(
      <AuthenticateViaSmsModal code={code} data={data} setCode={mockSetCode} />
    );
    const label = screen.getByTestId("sms-verification-code-label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("SMS Verification Code");
    const value = screen.getByTestId(
      "sms-verification-code-value"
    ) as HTMLBaseElement;
    expect(value).toBeInTheDocument();
    userEvent.type(value, "ab@123");
    const submitButton = screen.getByTestId("submit-btn") as HTMLBaseElement;
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("Authenticate Via Sms Modal Validate Submit Button and its Action", () => {
    const code = getDeepClone(defaultAuthProfile);
    code.verifycode.value = "123456";
    code.verifycode.valid = ValidationStatus.VALID;
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    const mockSubmitButtonAction = jest.fn();
    render(
      <AuthenticateViaSmsModal
        code={code}
        data={data}
        setCode={mockSetCode}
        submitBtnAction={mockSubmitButtonAction}
      />
    );
    const codeValue = screen.getByTestId(
      "sms-verification-code-value"
    ) as HTMLBaseElement;
    expect(codeValue).toBeInTheDocument();
    userEvent.type(codeValue, "123456");
    const submitButton = screen.getByTestId("submit-btn") as HTMLBaseElement;
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("Submit SMS verification");
    userEvent.click(submitButton);
    expect(mockSubmitButtonAction).toHaveBeenCalled();
    expect(mockSubmitButtonAction).toHaveBeenCalledTimes(1);
  });

  it("Authenticate Via Sms Modal Validate Resend Button and its action", () => {
    const code = getDeepClone(defaultAuthProfile);
    const data = getDeepClone(profileTestData);
    const mockSetCode = jest.fn();
    const mockResendButtonAction = jest.fn();
    render(
      <AuthenticateViaSmsModal
        code={code}
        data={data}
        setCode={mockSetCode}
        resendBtnAction={mockResendButtonAction}
      />
    );
    const resendButton = screen.getByTestId("resend-btn");
    expect(resendButton).toBeInTheDocument();
    expect(resendButton).toHaveTextContent("Resend code to phone");
    expect(resendButton).not.toBeDisabled();
    userEvent.click(resendButton);
    expect(mockResendButtonAction).toHaveBeenCalled();
    expect(mockResendButtonAction).toHaveBeenCalledTimes(1);
  });
});
