import { IFacilitySearchRequest } from "./searchFacility.interface";
import { facilitySearch } from "../../../../util/3meService";
import { IFacility } from "../facility.interface";

export const searchFacility = (request: IFacilitySearchRequest) => {
  return new Promise<IFacility[]>(async (resolve, reject) => {
    try {
      const serverResponse = await facilitySearch(request);
      if (serverResponse !== undefined) {
        const facilities = serverResponse.data;
        resolve(facilities);
      } else {
        const facilities: IFacility[] | PromiseLike<IFacility[]> = [];
        resolve(facilities);
      }
    } catch (error) {
      console.log("error", error);
    }
    reject("not found");
  });
};
