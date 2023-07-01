import { IPatient } from "../../../myPatients/patient.interface";
import { IPickUpRequest } from "../pickUpRequest.interface";
import { PickUpRequestValidator } from "../pickUpRequest.validator";

export interface IReasonForDischarge {
  data: IPickUpRequest;
  setData: Function;
  Validator?: PickUpRequestValidator;
}
