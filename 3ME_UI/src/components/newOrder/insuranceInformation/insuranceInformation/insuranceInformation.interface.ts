import { MouseEventHandler } from "react";
import { INewOrder } from "../../newOrder.interface";
import { NewOrderValidator } from "../../newOrder.validator";
import { IInputField } from "../../../../core/interfaces/input.interface";
import { InsuranceInformationValidator } from "./insuranceInformation.validator";
import { IVacTherapyInformation } from "../../woundBed/vacTherapyInformation.interface";
import { ShowAdditionalFields } from "./insuranceInformation.model";

export interface IInsuranceInformation {
  insuranceType: IInputField;
  insuranceTypeCode: IInputField;
  medicare: IPayerIDDetails;
  medicaid: IPayerIDDetails;
  medicareAdvantage: IPayerIDAllDetails;
  managedMedicaid: IPayerIDAllDetails;
  commercialInsurance: IPayerIDAllDetails;
  charityCare: IInputField;
  privatePay: IInputField;
  otherAdditionalDetails: IInputField;
  orderPayerDetails?: IPayerIDAllDetails;
}

export interface IPayerIDDetails {
  memberID: IInputField;
  relationShipInsured: IInputField;
}

export interface IPayerIDAllDetails {
  payerName: IInputField;
  memberID: IInputField;
  groupID: IInputField;
  payerContactNumber: IInputField;
  extension: IInputField;
  relationShipInsured: IInputField;
}

export interface IInsuranceInformationInterface {
  data: INewOrder;
  setData: Function;
  Validator?: InsuranceInformationValidator;
  isPrimaryComponent: boolean;
  dropDownDataArray: never[];
  dropDownTextArray: never[];
}

export interface IInsuranceMainInfo {
  data: INewOrder;
  setData: Function;
  hideAddButton: boolean;
  dropDownDataArray: never[];
  dropDownTextArray: never[];
  addOrRemoveButtonAction: MouseEventHandler<HTMLButtonElement>;
  vacTherapyInformationData: IVacTherapyInformation;
  isReviewOrder?: boolean;
  primaryEdiitButtonClicked?: any;
  secondaryEditButtonClicked?: any;
  isOrderSummary?: boolean;
  showAdditionalFields: ShowAdditionalFields;
}
