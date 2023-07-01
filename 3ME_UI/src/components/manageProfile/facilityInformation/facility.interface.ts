export interface IFacility {
  accountId: string;
  accountName: string;
  typeName: string;
  addressId: string;
  address1: string;
  address2: string;
  careSetting?: string;
  city: string;
  isFavourite?: boolean;
  state: string;
  zip: number;
  accountNumber: number | null;
  typeCode: string;
  facilityMode?: FacilityMode;
  readyCareFlag?: string;
  facilityAddressID?: string;
  siteUseId?: string;
  careGiverId?: string | null;
}

export enum FacilityMode {
  LINKED = 0,
  MANUAL = 1,
}
