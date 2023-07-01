import { IPickUpRequest } from "../pickUpRequest.interface";
import { PickUpRequestValidator } from "../pickUpRequest.validator";

export interface IDeviceInformation {
  data: IPickUpRequest;
  setData: Function;
  Validator?: PickUpRequestValidator;
  isConfirmPickUpSummary?: boolean;
}
