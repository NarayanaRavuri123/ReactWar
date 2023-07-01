import {
  FacilityMode,
  IFacility,
} from "../components/manageProfile/facilityInformation/facility.interface";

export const facilityForRegistration: IFacility[] = [];

export const facilityList: IFacility[] = [
  {
    accountId: "1435657867",
    accountName: "Hope Home Health",
    typeName: "Home Health Agency",
    addressId: "1435657867",
    address1: "1800 17th Ave SE",
    address2: "",
    city: "San Antonio",
    state: "TX",
    zip: 66554,
    accountNumber: 100000,
    typeCode: "20",
    facilityMode: FacilityMode.LINKED,
  },
  {
    accountId: "2657678289",
    accountName: "Abbott Home Health",
    typeName: "Home Health Agency",
    addressId: "2657678289",
    address1: "1800 17th Ave SE",
    address2: "",
    city: "San Antonio",
    state: "TX",
    zip: 66554,
    accountNumber: 232302,
    typeCode: "20",
    facilityMode: FacilityMode.LINKED,
  },
];
