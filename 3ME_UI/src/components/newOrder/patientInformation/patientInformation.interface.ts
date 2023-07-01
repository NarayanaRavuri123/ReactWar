import { INewOrder } from "../newOrder.interface";
import { NewOrderValidator } from "../newOrder.validator";
import { IVacTherapyInformation } from "../woundBed/vacTherapyInformation.interface";

export interface IPatientInformation {
  data: INewOrder;
  Validator?: NewOrderValidator;
  setData: Function;
  phoneTypes: never[];
  states: never[];
  statesText: never[];
  vacTherapyInformationData?: IVacTherapyInformation;
  isReviewOrder?: boolean;
  editButtonClicked?: any;
  isOrderSummary?: boolean;
}

export interface IAddress {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

export interface IValidateUPSAddressInfo {
  title: string;
  address: IAddress;
  loading: any;
  message: any;
  openAddress: any;
  setOpenAddress: any;
  noAddressFound: any;
  validateAddress: any;
  selectedUPSAddress: any;
  setSelectedUPSAddress: any;
  handleAddressConitnueButton: any;
}
