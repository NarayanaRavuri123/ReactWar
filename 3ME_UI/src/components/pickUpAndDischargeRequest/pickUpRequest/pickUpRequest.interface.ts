import { PickUpRequestValidator } from "./pickUpRequest.validator";
import { IInputField } from "../../../core/interfaces/input.interface";
import { ITransferPatient } from "../../send3MNote/transferPatient/transferPatient.interface";

export interface IPickUpRequestProps {
  Validator?: PickUpRequestValidator;
}

export interface IPickUpRequest {
  reasonForDischarge: IInputField;
  placementDate: IInputField;
  therapyDischargeDate: IInputField;
  stopBillDate: IInputField;
  returnMethod: IInputField;
  specialInstructions: IInputField;
  injuryCauseBy3MDevice: IInputField;
  describeTheInjury: IInputField;
  problemWith3MDevice: IInputField;
  describeTheProblem: IInputField;
}
