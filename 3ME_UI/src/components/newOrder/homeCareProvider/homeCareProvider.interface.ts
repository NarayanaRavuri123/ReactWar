import { INewOrder } from "../newOrder.interface";

export interface IHomeCareProvider {
  data: INewOrder;
  setData: Function;
  states: any;
  statesText: any;
  isReviewOrder?: boolean;
  editButtonClicked?: any;
  isOrderSummary?: boolean;
}

export interface IHomeCareProviderDetail {
  name: string;
  accountNumber: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  extension: string;
  facilityType: string;
  siteUseId?: string;
  marketingSegmentCode?: string;
  caregiverID?: string;
}
