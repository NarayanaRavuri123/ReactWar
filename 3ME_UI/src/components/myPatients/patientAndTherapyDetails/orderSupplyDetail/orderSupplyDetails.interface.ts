export interface IOrderSupplies {
  rentalOrderNumber: string | null;
  supplyOrders: Array<ISupplyOrdersInfo>;
  therapyStartDate: string | null;
}

export interface ISupplyOrdersInfo {
  createdDate: string | null;
  deliveredDate: string | null;
  initiatedName: string | null;
  product: string | null;
  ropn: string | null;
  status: string | null;
  statusColor: string | null;
}

export interface IGetOrderSuppliesRequest {
  RentalOrderNumber: number;
  dob: string;
}
export interface IFinancialInfoRequest {
  RentalOrderNumber: number;
  dob: string;
}
export interface IFinancialInsurenceResponse {
  coPay: string;
  deductableAmount: string;
  estimatedRentalAmount: string;
  estimatedSuppliesAmount: string;
  outOfPocket: string;
  patientResponsibility: string;
  insuranceInfo: IFinancialInsurenceInfo;
  payerResponsibility: string;
}
export interface IFinancialResponse {
  coPay: string;
  deductableAmount: string;
  estimatedRentalAmount: string;
  estimatedSuppliesAmount: string;
  outOfPocket: string;
  patientResponsibility: string;
  payerResponsibility: string;
}
export interface IFinancialInsurenceInfo {
  primary: IInsurenceDetail;
  secondary: IInsurenceDetail;
}
export interface IInsurenceDetail {
  payor: string;
  policyId: string;
  groupId: string;
  relationship: string;
  deductible: string;
  patientPercent: string;
  coveragePercent: string;
  outOfPocket: string;
}
