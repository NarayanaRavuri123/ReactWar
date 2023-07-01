export interface ISupplyOrderInfoMapper {
  productList: ISupplyOrderProduct[];
  orderedDate: string;
  shippedDate: string | null;
  deliveredDate: string | null;
  orderedFlag: string | null;
  shippedFlag: string | null;
  deliveredFlag: string | null;
  trackingNumber: string | null;
  trackingLink: string;
  dressingChangeFrequency: string | null;
  reSupplyJustification: string | null;
  shipAddress1: string | null;
  shipAddress2: string | null;
  shipCity: string | null;
  shipState: string | null;
  shipZipCode: string | null;
}
export interface ISupplyOrderProduct {
  productType: string;
  productNumber: string;
  productSize: string;
  productDescription: string;
  quantity: string;
  remainingQuantity: string;
}
export interface ISupplyOrderAccessory {
  accessory: ISupplyOrderProduct[];
}
export interface ISupplyOrderDressingKit {
  dressing: ISupplyOrderProduct[];
}
export interface ISupplyOrderCanister {
  canister: ISupplyOrderProduct[];
}
