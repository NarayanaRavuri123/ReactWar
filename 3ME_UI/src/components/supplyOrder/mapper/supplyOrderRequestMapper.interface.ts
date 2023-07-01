export interface ISaveSupplyOrderRequest {
  rentalOrderNumber: string | null;
  vacUnit: number;
  replenishmentOption: number;
  isCurrentAddress: boolean;
  customer: Customer;
  requestor: Requestor;
  mainDressing: Product | null;
  additionalDressing: Product | null;
  canister: Product | null;
  accessories: Product;
  individualVacDressings: number;
  individualVacCanisters: number;
  dressingChangeFrequency: number;
  resupplyJustification: number;
  orderNotes: string;
  shippingAddress: Address | null;
}

export interface Product {
  quantity: number | null;
  sku: string;
}

export interface Customer {
  firstName: string;
  lastName: string;
  dob: string | null;
  currentAddress: Address;
}

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateCode: string;
  postalCode: string;
}

export interface Requestor {
  facilityName: string;
  siteUseID: string | null;
}

export enum VacUnit {
  ACTIVAC = 1,
  FREEDOM = 2,
}
