import { cleanup, fireEvent, render } from "@testing-library/react";
import {
  IInputField,
  ValidationStatus,
} from "../../../../core/interfaces/input.interface";
import { ContactUs } from "../contactUs.component";
import { IContactUs } from "../contactUs.interface";
import { defaultContactData } from "../contactUs.model";

describe("Contact Us component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("initial render shows Contact us Label", () => {
    render(<ContactUs />);
    const val = document.querySelector("h2");
    expect(val?.textContent).toBe("Contact Us");
  });
  it("Contact us form has 8 inputs", () => {
    render(<ContactUs />);
    const val = document.querySelectorAll(
      ".MuiFormControl-root:not(.MuiTextField-root)"
    );
    expect(val.length).toBe(9);
  });
  it("on submitting form with empty values 7 mandatory fields should show error", () => {
    render(<ContactUs />);
    fireEvent.click(document.querySelector(".submitBtn")!);
    expect(
      document.querySelectorAll("label.Mui-error.MuiInputLabel-root").length
    ).toBe(7);
  });
  it("on submitting form with 1 valid value, 6 mandatory fields should show error", () => {
    defaultContactData.firstName = {
      valid: ValidationStatus.VALID,
      value: "",
    };
    render(<ContactUs DefaultContactData={defaultContactData} />);
    fireEvent.click(document.querySelector(".submitBtn")!);
    expect(
      document.querySelectorAll("label.Mui-error.MuiInputLabel-root").length
    ).toBe(6);
  });
  it("first name should match the value provided", () => {
    defaultContactData.firstName = {
      value: "testName",
      valid: ValidationStatus.VALID,
    };
    render(<ContactUs DefaultContactData={defaultContactData} />);
    const firstNameInput = document.querySelector(
      'input[name="firstName"]'
    ) as HTMLInputElement;
    expect(firstNameInput.value).toBe("testName");
  });
  it("on valid values, validate all should be called", () => {
    let mockInputValues: IInputField = {
      value: "test",
      valid: ValidationStatus.VALID,
    };
    let localCopy: IContactUs = {
      firstName: mockInputValues,
      email: mockInputValues,
      lastName: mockInputValues,
      message: mockInputValues,
      phone: mockInputValues,
      extension: mockInputValues,
      shouldContact: mockInputValues,
      subject: mockInputValues,
      country: mockInputValues,
    };
    const spyFn = jest.fn().mockReturnValue({
      status: ValidationStatus,
      message: null,
    });
    let validator = {
      validateAll: spyFn,
    };
    // @ts-ignore
    render(<ContactUs DefaultContactData={localCopy} Validator={validator} />);
    fireEvent.click(document.querySelector(".submitBtn")!);
    expect(spyFn).toHaveBeenCalled();
  });
  it("on valid values, with message more than 70 chars, validate all should be called", () => {
    let mockInputValues: IInputField = {
      value: "test",
      valid: ValidationStatus.VALID,
    };
    let mockMessageInputValues: IInputField = {
      value:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      valid: ValidationStatus.VALID,
    };
    let localCopy: IContactUs = {
      firstName: mockInputValues,
      email: mockInputValues,
      lastName: mockInputValues,
      message: mockMessageInputValues,
      phone: mockInputValues,
      extension: mockInputValues,
      shouldContact: mockInputValues,
      subject: mockInputValues,
      country: mockInputValues,
    };
    const spyFn = jest.fn().mockReturnValue({
      status: ValidationStatus,
      message: null,
    });
    let validator = {
      validateAll: spyFn,
    };
    // @ts-ignore
    render(<ContactUs DefaultContactData={localCopy} Validator={validator} />);
    fireEvent.click(document.querySelector(".submitBtn")!);
    expect(spyFn).toHaveBeenCalled();
  });
  it("on valid values, with message less than 70 chars (50 chars), validate all should be called", () => {
    let mockInputValues: IInputField = {
      value: "test",
      valid: ValidationStatus.VALID,
    };
    let mockMessageInputValues: IInputField = {
      value:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      valid: ValidationStatus.VALID,
    };
    let localCopy: IContactUs = {
      firstName: mockInputValues,
      email: mockInputValues,
      lastName: mockInputValues,
      message: mockMessageInputValues,
      phone: mockInputValues,
      extension: mockInputValues,
      shouldContact: mockInputValues,
      subject: mockInputValues,
      country: mockInputValues,
    };
    const spyFn = jest.fn().mockReturnValue({
      status: ValidationStatus,
      message: null,
    });
    let validator = {
      validateAll: spyFn,
    };
    // @ts-ignore
    render(<ContactUs DefaultContactData={localCopy} Validator={validator} />);
    fireEvent.click(document.querySelector(".submitBtn")!);
    expect(spyFn).toHaveBeenCalled();
  });
  it("on valid values expect message as empty and invalid, validate all should be called", () => {
    let mockInputValues: IInputField = {
      value: "test",
      valid: ValidationStatus.VALID,
    };
    let mockMessageInputValues: IInputField = {
      value: "",
      valid: ValidationStatus.INVALID,
    };
    let localCopy: IContactUs = {
      firstName: mockInputValues,
      email: mockInputValues,
      lastName: mockInputValues,
      message: mockMessageInputValues,
      phone: mockInputValues,
      extension: mockInputValues,
      shouldContact: mockInputValues,
      subject: mockInputValues,
      country: mockInputValues,
    };
    const spyFn = jest.fn().mockReturnValue({
      status: ValidationStatus,
      message: null,
    });
    let validator = {
      validateAll: spyFn,
    };
    // @ts-ignore
    render(<ContactUs DefaultContactData={localCopy} Validator={validator} />);
    fireEvent.click(document.querySelector(".submitBtn")!);
    expect(spyFn).toHaveBeenCalled();
    expect(
      document.querySelectorAll("label.Mui-error.MuiInputLabel-root").length
    ).toBe(1);
  });
});
