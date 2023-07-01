import { cleanup } from "@testing-library/react";
import { ValidationStatus } from "../../../../../core/interfaces/input.interface";
import * as facilitySearch from "../../../../../util/3meService";
import { FacilityMode, IFacility } from "../../facility.interface";
import { searchFacility } from "../addFacility.service";
import { IFacilitySearchRequest } from "../searchFacility.interface";

describe("Add facility Service ->", () => {
  afterAll(() => {
    cleanup();
  });
  var mockRequest: IFacilitySearchRequest = {
    customerNumber: "",
    customerName: "",
    postalCode: "",
  };

  var mockResponseData: IFacility[] = [
    {
      accountId: "123",
      accountName: "",
      typeName: "",
      addressId: "123",
      address1: "",
      address2: "",
      accountNumber: 123,
      zip: 12345,
      city: "",
      state: "",
      typeCode: "20",
      facilityMode: FacilityMode.LINKED,
    },
  ];

  var mockresponse = {
    data: mockResponseData,
    succeeded: true,
  };

  it("In case search returns facility data", async () => {
    jest.spyOn(facilitySearch, "facilitySearch").mockImplementation(() => {
      return Promise.resolve(mockresponse);
    });
    await searchFacility(mockRequest).then((response) =>
      expect(response).toBe(mockResponseData)
    );
  });

  it("In case search doesn't return facility data", async () => {
    jest
      .spyOn(facilitySearch, "facilitySearch")
      .mockImplementation((x: IFacilitySearchRequest) => {
        return Promise.reject();
      });
    await expect(searchFacility(mockRequest)).rejects.toEqual("not found");
  });
});
