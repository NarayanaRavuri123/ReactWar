import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { IChangeAddress, PatientAddress } from "../changeAddress.interface";

export let changeAddressTestData: IChangeAddress = {
  address1: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  address2: {
    valid: ValidationStatus.VALID,
    value: "",
  },
  city: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  phone: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  state: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  zip: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  addressType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
  comment: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
  },
};

export const patientMockAddress: PatientAddress = {
  addressLine1: "Test AddressLine1",
  addressLine2: "Test AddressLine2",
  city: "Bangalore",
  state: "Karnataka",
  zipCode: "12345-12345",
};
