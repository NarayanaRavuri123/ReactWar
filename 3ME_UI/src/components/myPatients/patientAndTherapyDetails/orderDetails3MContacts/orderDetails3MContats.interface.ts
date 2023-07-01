import { IOrderDetailResponse } from "../orderDetailsTracking/orderDetailsTracking.interface";

export interface IOrderDetails3MContacts {
  orderDetailsTrackingData: IOrderDetailResponse;
  error?: boolean;
}
