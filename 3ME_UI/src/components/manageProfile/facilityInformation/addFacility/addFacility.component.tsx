import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  Validation,
  ValidationStatus,
} from "../../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { AddFacilityContext } from "../addFacilityContainer/addFacilityContainer.context";
import { SearchSection } from "../addFacilityContainer/addFacilityContainer.enum";
import { IAddFacility } from "./addFacility.inteface";
import { searchFacility } from "./addFacility.service";
import { SearchByID } from "./searchByID/searchByID.component";
import { SearchByName } from "./searchByName/searchByName.component";
import "./addFacility.css";
import {
  IFacilitySearchRequest,
  ISearchFacilityByID,
  ISearchFacilityByName,
} from "./searchFacility.interface";
import {
  defaultSearchDataForID,
  defaultSearchDataForName,
} from "./searchFacility.model";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { getInvalidObj } from "../../../../util/utilityFunctions";
import { facilityMockData } from "../facilityFound/facilityFound.interface";

export const AddFacility = ({
  redirectHandler,
  addNewFacility,
  isForAdminFlow = false,
}: IAddFacility) => {
  const { facilitySearchValidator } = useContext(AddFacilityContext);
  const [facilitySearchForName, setFacilitySearchForName] =
    useState<ISearchFacilityByName>(getDeepClone(defaultSearchDataForName));
  const [facilitySearchForID, setFacilitySearchForID] =
    useState<ISearchFacilityByID>(getDeepClone(defaultSearchDataForID));
  const [isFormValid, setIsFormValid] = useState<ValidationStatus>(
    ValidationStatus.INVALID
  );
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let isValid: Validation = getInvalidObj(null);
    if (facilitySearchForID.search.value === "true") {
      isValid =
        facilitySearchValidator.validateAllSearchFields(facilitySearchForID);
    } else if (facilitySearchForName.search.value === "true") {
      isValid = facilitySearchValidator.validateAllSearchFields(
        facilitySearchForName
      );
    }
    setIsFormValid(isValid.status);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    var facilitySearchRequest: IFacilitySearchRequest = {
      customerNumber: facilitySearchForID.facilityID.value,
      customerName: facilitySearchForName.facilityName.value,
      state: facilitySearchForName.facilityState.value,
    };
    searchFacility(facilitySearchRequest)
      .then((value) => {
        if (value.length > 0) {
          setIsLoading(false);
          if (isForAdminFlow) addNewFacility(value);
          else redirectHandler(SearchSection.FOUND, value);
        } else {
          setIsLoading(false);
          redirectHandler(SearchSection.NOT_FOUND);
        }
      })
      .catch((reason) => {
        setIsLoading(false);
        redirectHandler(SearchSection.NOT_FOUND);
      });
  };

  useEffect(() => {
    validate();
  }, [facilitySearchForName, facilitySearchForID]);

  return (
    <Grid className="search-facility-container">
      <div className="search-facility-title" data-testid="facility-search">
        Facility Search
      </div>
      {isLoading ? (
        <div className="search-facility-loader">
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          <SearchByName
            facilitySearchDataForID={facilitySearchForID}
            facilitySearchDataForName={facilitySearchForName}
            setfacilitySearchDataForID={setFacilitySearchForID}
            setfacilitySearchDataForName={setFacilitySearchForName}
            onSubmit={handleSubmit}
          />
          <div className="name-id-separator">OR</div>
          <SearchByID
            facilitySearchDataForID={facilitySearchForID}
            facilitySearchDataForName={facilitySearchForName}
            setfacilitySearchDataForID={setFacilitySearchForID}
            setfacilitySearchDataForName={setFacilitySearchForName}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </Grid>
  );
};
