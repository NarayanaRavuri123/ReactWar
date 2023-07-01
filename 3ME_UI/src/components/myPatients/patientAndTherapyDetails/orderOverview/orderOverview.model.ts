import { IDropZoneDocumentSelect } from "../../../../core/customDropZone/dropZoneDocumentSelect.interface";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { IOrderOverviewProductInfo } from "../orderSummary/orderDetailsProductInformation/orderDetailsProductInformation.interface";
import { ISeletedPatient } from "./orderOverview.interface";

export let defaultOrderOverviewData: ISeletedPatient = {
  dob: {
    valid: ValidationStatus.UNTOUCHED,
    value: "12/12/2023",
    minimumRequired: true,
  },

  firstName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "Pallavi",
    minimumRequired: true,
  },
  lastName: {
    valid: ValidationStatus.UNTOUCHED,
    value: "Nayek",
    minimumRequired: true,
  },
  dropDownMenuOption: [
    "Add Wound Information",
    "Upload Document",
    "Add Configuration",
  ],
};
export let defaultOrderOverviewProductInfo: IOrderOverviewProductInfo = {
  isReadyCare: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },
  productValue: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },
  serialNumber: {
    valid: ValidationStatus.VALID,
    value: "",
    isDefaultValid: true,
  },
};
export let defaultOrderUploadDocumentData: IDropZoneDocumentSelect[] = [
  {
    documentType: {
      value: "CN",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    documentName: "TestFile.png",
    documentBase64: "",
    succeeded: true,
    errorMessage: null,
    isFetchingBase64: false,
  },
  {
    documentType: {
      value: "CN",
      valid: ValidationStatus.UNTOUCHED,
      required: true,
    },
    documentName: "TestErrorFile.doc",
    documentBase64: "",
    succeeded: false,
    errorMessage: null,
    isFetchingBase64: false,
  },
];
