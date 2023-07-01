export interface IConfirmPlacementAlert {
  data: string;
}

export interface IStatusDelayReasons {
  StatusName: string;
  DelayReason: string;
  DelayDate: string;
  DelayType: string;
  DelayDetail: string;
}

export interface IMissingDocumentAlert {
  StatusDelayReasons: Array<IStatusDelayReasons>;
}

export interface IMissinRxAlert {
  statusDelayReasons: Array<IStatusDelayReasons>;
}

export interface IAlertResponse {
  ron: string;
  orderId: string;
  confirmPlacementAlert: IConfirmPlacementAlert;
  DischargePendingAlert: any;
  MeasurementDueAlert: any;
  MissingDocumentAlert: IMissingDocumentAlert;
  MissinRxAlert: IMissinRxAlert;
  ProofOfDeliveryAlert: any;
  SharedOrderAlert: any;
  SupplyOrderAlert: any;
}

export interface IWounds {
  Id: number;
  PendingCycles: Array<ICycle>;
}
export interface IWoundsForRO {
  id: number;
  pendingCycles: Array<ICycleForRO>;
}
export interface ICycleForRO {
  from: string;
  to: string;
}

export interface ICycle {
  From: string;
  To: string;
}

export interface ISuppyOrderAlertData {
  ROPN: string;
  DeliveredOn: string;
  Type: string;
  OrderStatusDescription: string;
}
export interface ISuppyOrderAlertDataForRO {
  ropn: string;
  deliveredOn: string;
  type: string;
  orderStatusDescription: string;
}

export interface IAlertRequest {
  rentalOrderNumber: string;
  dob: string;
  orderID: string;
}

export interface IAlertsRequest {
  alerts: Array<IAlertRequest>;
}
