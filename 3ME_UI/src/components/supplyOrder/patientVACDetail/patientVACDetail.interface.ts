import { ISupplyOrder } from "../supplyOrder.interface";
import { IPatient } from "../../myPatients/patient.interface";
import { SupplyOrderValidator } from "../supplyOrder.validator";

export interface IPatientVACDetail {
  data: ISupplyOrder;
  patient: IPatient;
  setData: any;
  vacProductInfo: IVACProductInfo;
  Validator?: SupplyOrderValidator;
  isReviewOrder: boolean;
}

export interface IVACProductInfo {
  imageLink: string;
  brandName: string;
}
