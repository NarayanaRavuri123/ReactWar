import "./facilityFound.css";
import { useContext, useState } from "react";
import { FacilityMode, IFacility } from "../facility.interface";
import {
  ICheckPostAcuteFacility,
  IFacilityFound,
} from "./facilityFound.interface";
import { SearchSection } from "../addFacilityContainer/addFacilityContainer.enum";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { AddFacilityContext } from "../addFacilityContainer/addFacilityContainer.context";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";
import {
  caregiverFacilitySearch,
  checkPostAcuteFacility,
} from "../../../../util/3meService";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { useLocation } from "react-router-dom";

export const FacilityFound = ({
  facilities,
  redirectHandler,
}: IFacilityFound) => {
  const { closePopup, addFacilityToList } = useContext(AddFacilityContext);
  const [loadSpinner, setLoadSpinner] = useState<boolean>(false);
  const location = useLocation();

  const checkPostAcuteFacilityFound = async (typeCode: string) => {
    const reqBody = { FacilityTypeCode: typeCode };
    const response: ICheckPostAcuteFacility = await checkPostAcuteFacility(
      reqBody
    );
    return response;
  };

  const fetchCareGiverId = async (facility: IFacility) => {
    const reqBody = {
      customerAccountNumber: facility.accountNumber,
      customerName: facility.accountName,
      state: facility.state,
    };
    let response = await caregiverFacilitySearch(reqBody);
    return response;
  };

  const addFacilityHandler = async (e: any, facility: IFacility) => {
    if (
      location.pathname === "/registration" ||
      location.pathname === "/manageProfile"
    ) {
      setLoadSpinner(true);
      let response = await checkPostAcuteFacilityFound(facility.typeCode);
      if (response.facilityTypeCodeFound) {
        const response = await fetchCareGiverId(facility);
        let homeCareGiverDetails = response.items;
        if (homeCareGiverDetails.length > 0) {
          const homeCareGiverDetail = homeCareGiverDetails[0];
          facility.careGiverId = homeCareGiverDetail.origSystemReference;
        }
      }
      setLoadSpinner(false);
    }
    const newFacility = {
      accountId: facility.accountId,
      accountName: facility.accountName,
      typeName: facility.typeName,
      addressId: facility.addressId,
      address1: facility.address1,
      address2: facility.address2,
      city: facility.city,
      state: facility.state,
      zip: facility.zip,
      accountNumber: facility.accountNumber,
      typeCode: facility.typeCode,
      facilityMode: FacilityMode.LINKED,
      siteUseId: facility.siteUseId,
      careGiverId: facility.careGiverId ?? null,
    };
    addFacilityToList(newFacility);
    closePopup(e);
  };

  function renderFacilities() {
    return (
      Array.isArray(facilities) &&
      facilities.map((item, index) => {
        return (
          <div
            key={index}
            className={
              index % 2 === 0 ? "facility-card-even" : "facility-card-odd"
            }
          >
            <div
              className="select-facility"
              onClick={(e) => addFacilityHandler(e, item)}
            >
              Select
            </div>
            <div>
              <div className="facility-name" data-testid="facility-name">
                {makeCapitalEachWordInString(item.accountName)}
              </div>
              <div className="facility-details">
                {makeCapitalEachWordInString(item.address1)}
              </div>
              <div className="facility-details">
                {makeCapitalEachWordInString(item.address2)}
              </div>
              <div className="facility-details">
                {makeCapitalEachWordInString(item.city)} {item.state}
              </div>
              <div className="facility-details">{item.zip}</div>
            </div>
          </div>
        );
      })
    );
  }
  return (
    <>
      {loadSpinner && (
        <div className="loader">
          <LoadingSpinner />
        </div>
      )}
      {!loadSpinner && (
        <div className="search-list-component">
          <div className="search-results" data-testid="facility-found">
            Facility Results
          </div>
          {renderFacilities()}
          <div className="back-to-search-btn-container">
            <ExpressButton
              variant="outlined"
              parentClass="back-to-search-btn"
              clickHandler={() => redirectHandler(SearchSection.SEARCH_FORM)}
            >
              <div className="back-to-search-label">Back to Search</div>
            </ExpressButton>
          </div>
        </div>
      )}
    </>
  );
};
