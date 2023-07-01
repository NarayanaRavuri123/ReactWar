import { PickUpRequestContextType } from "../../../../context/PickUpRequestContext";
import {
  IInputField,
  ValidationStatus,
} from "../../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { IPatient } from "../../../myPatients/patient.interface";
import { defaultTransferPatientData } from "../../../send3MNote/transferPatient/transferPatient.model";
import { DischargeRequestionPageSection } from "../../dischargeRequest/dischargeRequestPageSection.enum";
import { IPickUpRequest } from "../pickUpRequest.interface";
import { PickUpRequestPageSection } from "../pickUpRequestPageSection.enum";

const mockInputFields = (): IInputField => {
  return {
    valid: ValidationStatus.UNTOUCHED,
    value: "yes",
    required: true,
    errorMessage: "",
    isDefaultValid: false,
  };
};

const mockData = (): IPickUpRequest => ({
  reasonForDischarge: mockInputFields(),
  placementDate: mockInputFields(),
  therapyDischargeDate: mockInputFields(),
  stopBillDate: mockInputFields(),
  returnMethod: mockInputFields(),
  specialInstructions: mockInputFields(),
  // Device Information
  injuryCauseBy3MDevice: mockInputFields(),
  describeTheInjury: mockInputFields(),
  problemWith3MDevice: mockInputFields(),
  describeTheProblem: mockInputFields(),
});

const mockPatient = (): IPatient => ({
  roNumber: 123,
  firstName: "Rahul",
  lastName: "Patil",
  dob: "01/01/2000",
  facilityName: "Hospital",
  orderCreationDate: "01/01/2021",
  alerts: [],
  status: "On therapy",
  statusColor: null,
  productName: "Test",
  placementDate: "01/01/2022",
  productSerialNumber: "VRTM45059",
});

const mockPickUpRequestPageSection = (
  pageNumber: Number
): PickUpRequestPageSection => {
  switch (pageNumber) {
    case 0:
      return PickUpRequestPageSection.PICK_UP_REQUEST_START_FORM;
    case 1:
      return PickUpRequestPageSection.PICK_UP_REQUEST_SUBMIT_FORM;
    case 2:
      return PickUpRequestPageSection.DISCHARGE_REQUEST_START_FORM;
    default:
      return PickUpRequestPageSection.PICK_UP_REQUEST_START_FORM;
  }
};

export const getMockPickUpRequestContextData = (
  pageNumber?: Number,
  reSettingData?: any
): PickUpRequestContextType => {
  return {
    data: mockData(),
    setData: () => {},
    resetData: reSettingData,
    patient: mockPatient(),
    setPatient: () => {},
    pickUpRequestPage: mockPickUpRequestPageSection(pageNumber ?? 0),
    setPickUpRequestPage: () => {},
    transferPatientDetail: getDeepClone(defaultTransferPatientData),
    setTransferPatientDetail: () => {},
  };
};
