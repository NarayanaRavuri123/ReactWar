import {
  ValidationStatus,
  Validation,
} from "../../core/interfaces/input.interface";
import { Validator } from "../order.validations";
import { getInvalidObj, getValidObj } from "../utilityFunctions";

describe("Order Validation", () => {
  const _service = new Validator();
  describe("Email Validation", () => {
    const validate = (email: string) => _service.emailValidation(email);
    const valScenarios: {
      context: string;
      email: string;
      result: ValidationStatus;
      message: string | null;
    }[] = [
      {
        context: "accepts alphabetic usernames",
        email: "abc@xyz.com",
        result: ValidationStatus.VALID,
        message: null,
      },
      {
        context: "'+','-','.','_' are acceptable in username",
        email: "+-._@xyz.com",
        result: ValidationStatus.VALID,
        message: null,
      },
    ];
    const invalScenarios: {
      context: string;
      email: string;
      result: ValidationStatus;
      message: string | null;
    }[] = [
      {
        context: "rejects second '@'",
        email: "ab@bc@xyz.com",
        result: ValidationStatus.INVALID,
        message: "Invalid email address",
      },
      {
        context: "'#' not acceptable in username",
        email: "a#bc@xyz.com",
        result: ValidationStatus.INVALID,
        message: "Invalid email address",
      },
    ];
    for (const scenario of valScenarios) {
      it(`${scenario.context}`, () => {
        expect(validate(scenario.email)).toStrictEqual(getValidObj());
      });
    }
    for (const scenario of invalScenarios) {
      it(`${scenario.context}`, () => {
        expect(validate(scenario.email)).toStrictEqual(
          getInvalidObj(scenario.message)
        );
      });
    }
  });
  describe("Address Validation", () => {
    const validate = (address: string) => _service.addressValidation(address);
    const valScenarios: {
      context: string;
      address: string;
      result: ValidationStatus;
      message: string | null;
    }[] = [
      {
        context: "accepts alphabetic numeric",
        address: "street 1",
        result: ValidationStatus.VALID,
        message: null,
      },
      {
        context: "accepts alphabetic numeric with number first",
        address: "2 cumberland",
        result: ValidationStatus.VALID,
        message: null,
      },
    ];
    const invalScenarios: {
      context: string;
      address: string;
      result: ValidationStatus;
      message: string | null;
    }[] = [
      {
        context: "rejects special characters like '#'",
        address: "street #",
        result: ValidationStatus.INVALID,
        message: null,
      },
      {
        context: "rejects special characters like '@'",
        address: "street @",
        result: ValidationStatus.INVALID,
        message: null,
      },
      {
        context: "empty address not acceptable",
        address: "",
        result: ValidationStatus.INVALID,
        message: null,
      },
    ];
    for (const scenario of valScenarios) {
      it(`${scenario.context}`, () =>
        expect(validate(scenario.address)).toStrictEqual(getValidObj()));
    }
    for (const scenario of invalScenarios) {
      it(`${scenario.context}`, () =>
        expect(validate(scenario.address)).toStrictEqual(
          getInvalidObj(scenario.message)
        ));
    }
  });
  describe("Address Validation with empty", () => {
    const validate = (address: string) =>
      _service.addressValidationWithEmpty(address);
    const valScenarios: {
      context: string;
      address: string;
      result: ValidationStatus;
      message: string | null;
    }[] = [
      {
        context: "accepts empty address",
        address: "",
        result: ValidationStatus.VALID,
        message: null,
      },
      {
        context: "accepts alphabetic numeric with number first",
        address: "2 cumberland",
        result: ValidationStatus.VALID,
        message: null,
      },
    ];
    const invalScenarios: {
      context: string;
      address: string;
      result: ValidationStatus;
      message: string | null;
    }[] = [
      {
        context: "rejects special characters like '#'",
        address: "street #",
        result: ValidationStatus.INVALID,
        message: null,
      },
      {
        context: "rejects special characters like '@'",
        address: "street @",
        result: ValidationStatus.INVALID,
        message: null,
      },
    ];
    for (const scenario of valScenarios) {
      it(`${scenario.context}`, () =>
        expect(validate(scenario.address)).toStrictEqual(getValidObj()));
    }
    for (const scenario of invalScenarios) {
      it(`${scenario.context}`, () =>
        expect(validate(scenario.address)).toStrictEqual(
          getInvalidObj(scenario.message)
        ));
    }
  });
  describe("DOB Validation", () => {
    const validate = (dob: string) => _service.dobValidation(dob);
    const valScenarios: {
      context: string;
      dob: string;
      result: ValidationStatus;
      message: string | null;
    }[] = [
      {
        context: "accepts dob between 1900 and tomorrow",
        dob: "03/15/1990",
        result: ValidationStatus.VALID,
        message: null,
      },
    ];
    const invalScenarios: {
      context: string;
      dob: string;
      result: ValidationStatus;
      message: string | null;
    }[] = [
      {
        context: "rejects future dates",
        dob: "03/15/9999",
        result: ValidationStatus.INVALID,
        message: null,
      },
      {
        context: "rejects dates before 1900",
        dob: "03/15/1800",
        result: ValidationStatus.INVALID,
        message: null,
      },
    ];
    for (const scenario of valScenarios) {
      it(`${scenario.context}`, () =>
        expect(validate(scenario.dob)).toStrictEqual(getValidObj()));
    }
    for (const scenario of invalScenarios) {
      it(`${scenario.context}`, () =>
        expect(validate(scenario.dob)).toStrictEqual(
          getInvalidObj(scenario.message)
        ));
    }
  });
  describe("Name Validation for allfields accept PatientInformation FN LN", () => {
    const validate = (name: string) => _service.nameValidation(name);
    const valScenarios: {
      context: string;
      name: string;
      result: ValidationStatus;
      message: string | null;
    }[] = [
      {
        context: "accepts alphabets",
        name: "adam",
        result: ValidationStatus.VALID,
        message: null,
      },
    ];
    const invalScenarios: {
      context: string;
      name: string;
      result: ValidationStatus;
      message: string | null;
    }[] = [
      {
        context: "rejects special characters like '#'",
        name: "adam #",
        result: ValidationStatus.INVALID,
        message: null,
      },
      {
        context: "rejects first and middle name",
        name: "adam west",
        result: ValidationStatus.INVALID,
        message: null,
      },
      {
        context: "rejects special characters like '-'",
        name: "adam -",
        result: ValidationStatus.INVALID,
        message: null,
      },
      {
        context: "rejects special characters like '@'",
        name: "adam @",
        result: ValidationStatus.INVALID,
        message: null,
      },
      {
        context: "shouldn't accept empty",
        name: "",
        result: ValidationStatus.INVALID,
        message: null,
      },
      {
        context: "rejects spaces in fn and ln",
        name: "adam struat",
        result: ValidationStatus.INVALID,
        message: null,
      },
    ];
    for (const scenario of valScenarios) {
      it(`${scenario.context}`, () =>
        expect(validate(scenario.name)).toStrictEqual(getValidObj()));
    }
    for (const scenario of invalScenarios) {
      it(`${scenario.context}`, () =>
        expect(validate(scenario.name)).toStrictEqual(
          getInvalidObj(scenario.message)
        ));
    }
  });
  describe("Name Validation for PatientInformation FN LN", () => {
    const validate = (name: string) => _service.patientInfonameValidation(name);
    const valScenarios: {
      context: string;
      name: string;
      result: ValidationStatus;
      message: string | null;
    }[] = [
      {
        context: "accepts alphabets",
        name: "adam",
        result: ValidationStatus.VALID,
        message: null,
      },
      {
        context: "accepts space between words in FN",
        name: "adam west",
        result: ValidationStatus.VALID,
        message: null,
      },
      {
        context: "accepts special characters like '-'",
        name: "adam -",
        result: ValidationStatus.VALID,
        message: null,
      },
    ];
    const invalScenarios: {
      context: string;
      name: string;
      result: ValidationStatus;
      message: string | null;
    }[] = [
      {
        context: "rejects special characters like '#'",
        name: "adam #",
        result: ValidationStatus.INVALID,
        message: null,
      },

      {
        context: "rejects special characters like '@'",
        name: "adam @",
        result: ValidationStatus.INVALID,
        message: null,
      },

      {
        context: "shouldn't accept empty",
        name: "",
        result: ValidationStatus.INVALID,
        message: null,
      },
    ];
    for (const scenario of valScenarios) {
      it(`${scenario.context}`, () =>
        expect(validate(scenario.name)).toStrictEqual(getValidObj()));
    }
    for (const scenario of invalScenarios) {
      it(`${scenario.context}`, () =>
        expect(validate(scenario.name)).toStrictEqual(
          getInvalidObj(scenario.message)
        ));
    }
  });
  describe("Name Validation with empty", () => {
    const validate = (name: string) => _service.nameValidationWithEmpty(name);
    const valScenarios: {
      context: string;
      name: string;
      result: ValidationStatus;
      message: string | null;
    }[] = [
      {
        context: "accepts empty",
        name: "",
        result: ValidationStatus.VALID,
        message: null,
      },
      {
        context: "accepts first and middle name",
        name: "adam west",
        result: ValidationStatus.VALID,
        message: null,
      },
    ];
    const invalScenarios: {
      context: string;
      name: string;
      result: ValidationStatus;
      message: string | null;
    }[] = [
      {
        context: "rejects special characters like '#'",
        name: "adam #",
        result: ValidationStatus.INVALID,
        message: null,
      },
      {
        context: "rejects special characters like '@'",
        name: "adam @",
        result: ValidationStatus.INVALID,
        message: null,
      },
    ];
    for (const scenario of valScenarios) {
      it(`${scenario.context}`, () =>
        expect(validate(scenario.name)).toStrictEqual(getValidObj()));
    }
    for (const scenario of invalScenarios) {
      it(`${scenario.context}`, () =>
        expect(validate(scenario.name)).toStrictEqual(
          getInvalidObj(scenario.message)
        ));
    }
  });
  describe("Phone Validation", () => {
    const validate = (phone: string) => _service.phoneValidation(phone);
    const valScenarios: {
      context: string;
      phone: string;
      result: ValidationStatus;
      message: string | null;
    }[] = [
      {
        context: "accepts numbers separated by _",
        phone: "99_99_99_99_99",
        result: ValidationStatus.VALID,
        message: null,
      },
    ];
    const invalScenarios: {
      context: string;
      phone: string;
      result: ValidationStatus;
      message: string | null;
    }[] = [
      {
        context: "rejects numbers with length smaller than 5",
        phone: "12345",
        result: ValidationStatus.INVALID,
        message: null,
      },
      {
        context: "rejects numbers with  '_' even though length is 10",
        phone: "12345_____",
        result: ValidationStatus.INVALID,
        message: null,
      },
    ];
    for (const scenario of valScenarios) {
      it(`${scenario.context}`, () =>
        expect(validate(scenario.phone)).toStrictEqual(getValidObj()));
    }
    for (const scenario of invalScenarios) {
      it(`${scenario.context}`, () =>
        expect(validate(scenario.phone)).toStrictEqual(
          getInvalidObj(scenario.message)
        ));
    }
  });
});
