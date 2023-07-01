import { IPatient } from "../../patient.interface";

export interface ISuppliesDelivered {
  date?: Date;
  closePopUpAction?: any;
  data?: any;
  patient?: IPatient;
}
