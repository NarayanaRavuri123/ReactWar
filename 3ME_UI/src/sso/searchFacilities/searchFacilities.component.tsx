import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
  Validation,
  ValidationStatus,
} from "../../core/interfaces/input.interface";
import { getDeepClone } from "../../util/ObjectFunctions";
import { AddFacilityContext } from "../../components/manageProfile/facilityInformation/addFacilityContainer/addFacilityContainer.context";

import { SearchByID } from "../../components/manageProfile/facilityInformation/addFacility/searchByID/searchByID.component";
import { SearchByName } from "../../components/manageProfile/facilityInformation/addFacility/searchByName/searchByName.component";
import {
  IFacilitySearchRequest,
  ISearchFacilityByID,
  ISearchFacilityByName,
} from "../../components/manageProfile/facilityInformation/addFacility/searchFacility.interface";
import {
  defaultSearchDataForID,
  defaultSearchDataForName,
} from "../../components/manageProfile/facilityInformation/addFacility/searchFacility.model";
import { getInvalidObj, useSortableTable } from "../../util/utilityFunctions";
import "./searchFacilities.css";
import { getFacilitySearchResult } from "../../util/userService";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import FavoriteFacility from "../favouriteFacilityDisplay/favoriteFacilityDisplay.component";
import SearchFacilityResult from "./searchFacilityResult/searchFacilityResult.component";
import { ExpressButton } from "../../core/expressButton/expressButton.component";
import { ReactComponent as VectorIcon } from "../../assets/Vector.svg";

export const SearchFacilityDataBase = ({ salesRole }: any) => {
  const { facilitySearchValidator } = useContext(AddFacilityContext);
  const [facilitySearchForName, setFacilitySearchForName] =
    useState<ISearchFacilityByName>(getDeepClone(defaultSearchDataForName));
  const [facilitySearchForID, setFacilitySearchForID] =
    useState<ISearchFacilityByID>(getDeepClone(defaultSearchDataForID));
  const [isFormValid, setIsFormValid] = useState<ValidationStatus>(
    ValidationStatus.INVALID
  );

  const [isLoading, setIsLoading] = useState(false);

  const [isSearchSelected, setIsSearchSelected] = useState(false);

  const [data, setData] = useState([]);

  const AuthObj = useContext<AuthContextType | null>(AuthContext);

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

  const columns = [
    { label: "", accessor: "select", sortable: false },
    {
      label: "Facility Site Name",
      accessor: "accountName",
      sortable: true,
    },
    { label: "Favorite", accessor: "isFavourite", sortable: true },
    { label: "Facility No.", accessor: "accountNumber", sortable: true },
    {
      label: "Classification",
      accessor: "typeName",
      sortable: true,
    },
    { label: "Setting", accessor: "careSetting", sortable: true },
  ];
  const [sortedData, setSortedData, handleSorting] = useSortableTable(
    [],
    columns
  );

  const handleSubmit = async () => {
    setIsSearchSelected(true);
    setSortedData([]);
    setIsLoading(true);

    const facilitySearchRequest = {
      userName: AuthObj?.userProfile?.userName,
      customerNumber: facilitySearchForID.facilityID.value,
      customerName: facilitySearchForName.facilityName.value,
      state: facilitySearchForName.facilityState.value,
    };
    const searchResult = await getFacilitySearchResult(facilitySearchRequest);
    if (searchResult && searchResult.data !== null) {
      setData(searchResult.result);
      setSortedData(searchResult.result);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.log("No data Available");
    }
  };

  useEffect(() => {
    validate();
  }, [facilitySearchForName, facilitySearchForID]);

  return (
    <>
      <div className="searchFacilityMain">
        <div className="searcFacilitySub">
          <div
            className="search-facility-title"
            data-testid="search-facility-title-test"
          >
            Search Facilities DataBase
          </div>
          <div className="selectFacility-search-container">
            <div
              className="selectFacility-searchByName"
              data-testid="selectFacility-searchByName-test"
            >
              {" "}
              <SearchByName
                facilitySearchDataForID={facilitySearchForID}
                facilitySearchDataForName={facilitySearchForName}
                setfacilitySearchDataForID={setFacilitySearchForID}
                setfacilitySearchDataForName={setFacilitySearchForName}
                onSubmit={handleSubmit}
                isComingFromSelectAFacility={true}
              />
            </div>
            <div
              className="selectFacility-Or"
              data-testid="selectFacility-Or-test"
            >
              <p className="selectFacility-or-div">OR</p>
            </div>
            <div
              className="selectFacility-serachById"
              data-testid="selectFacility-serachById-test"
            >
              <SearchByID
                facilitySearchDataForID={facilitySearchForID}
                facilitySearchDataForName={facilitySearchForName}
                setfacilitySearchDataForID={setFacilitySearchForID}
                setfacilitySearchDataForName={setFacilitySearchForName}
                onSubmit={handleSubmit}
                isComingFromSelectAFacility={true}
              />
            </div>
          </div>
        </div>
      </div>
      {isSearchSelected ? (
        <div className="facilityResult-subMain">
          <ExpressButton
            clickHandler={() => {
              setIsSearchSelected(false);
              setFacilitySearchForName(defaultSearchDataForName);
              setFacilitySearchForID(defaultSearchDataForID);
            }}
            parentClass="returnToFavourite"
            variant="text"
            startIcon={<VectorIcon />}
          >
            Return to Favourites
          </ExpressButton>{" "}
          <SearchFacilityResult
            sortedData={sortedData}
            setSortedData={setSortedData}
            handleSorting={handleSorting}
            columns={columns}
            isLoading={isLoading}
            data={data}
            salesRole={salesRole}
            isSearchSelected={isSearchSelected}
            setIsSearchSelected={setIsSearchSelected}
            setData={setData}
          />
        </div>
      ) : (
        <>
          {" "}
          <FavoriteFacility />{" "}
        </>
      )}
    </>
  );
};
