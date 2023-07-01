export enum IAlertTypes {
  MISRX,
  MSDUE,
  PNDSO,
  SUPDE,
  SHODR,
  MSDOC,
  PODEL,
  CONPL,
  DISPEN,
}
export enum ISeverityTypes {
  LOW,
  MEDIUM,
  HIGH,
}
export type IPatientAlert = {
  alertID: string;
  alertName: string;
  alertSubLabel: string;
  alertDate: Date | null;
  alertType: IAlertTypes;
  severity: ISeverityTypes | null;
  sharedData?: ISharedOrderData | null;
  woundOrderID?: number | null;
  ropn?: string | null;
  statusDelayReason?: statusDelayReason | null;
  assessmentToDate?: Date | null;
  assessmentFromDate?: Date | null;
};

export type statusDelayReason = {
  RON: number;
  statusDelayReasons: Array<IMissingDocsAlert>;
};

export type IMissingDocsAlert = {
  delayReason: string;
  delayDetail: string;
};

export type ISharedOrderData = {
  OrderId: string;
  From: string;
  To: string;
  Notes: string;
  FromRecipientName: string;
  ToRecipientName: string;
  CreatedOn: string;
};

export type IMenuAction = {
  text: string;
  sequence: number;
};

export interface IPatient {
  roNumber: number;
  firstName: string;
  lastName: string;
  dob: string;
  facilityName: string;
  orderCreationDate: string;
  alerts: Array<IPatientAlert>;
  status?: string;
  color?: string;
  statusColor?: any;
  orderID?: string;
  productName?: string;
  placementDate?: string;
  productSerialNumber?: string;
  menuActions?: Array<IMenuAction>;
  sharedStatus?: string;
  woundOrderID?: number | null;
  workOrderNumber?: string | null;
  siteUseId?: string;
  careGiverId?: string;
}

export interface IStopSaringOrder {
  orderID: string | null;
  sharedBy: string | null;
  stopSharingOrder: boolean;
}
