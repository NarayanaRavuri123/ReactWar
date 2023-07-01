import { IAddFacilityRedirect } from "../addFacilityContainer/addFacilityContainer.interface";
import { FacilityMode, IFacility } from "../facility.interface";

export interface IFacilityFound extends IAddFacilityRedirect {
  facilities: IFacility[];
}

export const facilityMockData: IFacility = {
  accountId: "90875123456",
  accountName: "Abbott Northwestern",
  typeName: "Home Health Agency",
  addressId: "90875123456",
  address1: "1800 17th Ave SE",
  address2: "",
  city: "Minneapolis",
  state: "MN",
  zip: 100001,
  accountNumber: 123456,
  typeCode: "20",
  facilityMode: FacilityMode.LINKED,
  siteUseId: "987654",
  isFavourite: true
};

export const newOrderFacilityMockData: IFacility = {
  accountId: "90875123477",
  accountName: "Hope Home Health",
  typeName: "Hope Home Health",
  addressId: "90875123477",
  address1: "1800 17th Ave SE",
  address2: "",
  city: "San Antonio",
  state: "TX",
  zip: 66554,
  accountNumber: 100000,
  typeCode: "20",
  facilityMode: FacilityMode.LINKED,
  siteUseId: "987654",
};

export interface ICheckPostAcuteFacility {
  facilityTypeCodeFound: boolean;
  postAcuteFound: boolean;
}
