import { IPatient } from "../../../myPatients/patient.interface";
import { IPickUpRequest } from "../pickUpRequest.interface";
import { PickUpRequestValidator } from "../pickUpRequest.validator";

export interface IPickUpDetails {
  data: IPickUpRequest;
  setData: Function;
  patient: IPatient;
  Validator?: PickUpRequestValidator;
  isConfirmPickUpSummary?: boolean;
}
