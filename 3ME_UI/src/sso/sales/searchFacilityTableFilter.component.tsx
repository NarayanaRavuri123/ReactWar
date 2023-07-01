import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { CustomDropDown } from "../../core/customDropdown/customDropdown.component";
import { format } from "react-string-format";
import { getdropDownContent } from "../../util/dropDownService";
import "./salesRoleFacility.css";
import { StyledInputBase } from "../../components/myPatients/myPatients.style";
import {
  DD_CARE_SETTING_CONTENT,
  DD_CLASSIFICATION_CONTENT,
} from "../../util/staticText";
import { ISalesRole } from "./salesRole.interface";
import Grid from "@mui/material/Grid";
import { defaultSalesRoleTestData } from "./salesRole.test.data";
import { getCodeFromText, getTextFromCode } from "../../util/utilityFunctions";
import { searchFacility } from "../../components/manageProfile/facilityInformation/addFacility/addFacility.service";

interface searchFacilityTablefilterInterface {
  validateAndSetData: any;
  classification: any;
  careSetting: any;
  classificationText: any;
  careSettingText: any;
  searchInput: any;
  salesRolesData: any;
  handleFacilitySearch: any;
  salesRole: boolean;
}
export const SearchFacilityTableFilter = ({
  validateAndSetData,
  classification,
  careSetting,
  classificationText,
  careSettingText,
  searchInput,
  salesRolesData,
  handleFacilitySearch,
  salesRole,
}: searchFacilityTablefilterInterface) => {
  return (
    <div className="salesRoleFacility" data-testid="salesRoleFacility">
      <div className="searchFacilityTable">
        <Grid container spacing={2} className="searchContainer">
          <Grid className={salesRole ? "searchBox" : ""} item xs={5.8}>
            {salesRole && (
              <>
                <SearchIcon className="searchIcon" />
                <StyledInputBase
                  className="searchHolder"
                  inputProps={{ "#76767a": "search" }}
                  placeholder="Filter by Facility Name or Number"
                  onChange={handleFacilitySearch}
                  value={searchInput}
                  autoFocus
                />
              </>
            )}
          </Grid>
          <Grid item xs={3.5} className="classification">
            <CustomDropDown
              name="FacilityClassification"
              menuItem={classificationText}
              handleChange={validateAndSetData}
              selectpropsClassName="classification-select"
              selectClassName="classification-dropdown"
              testId="classification-DropDown"
              value={
                salesRolesData.FacilityClassification.value
                  ? getTextFromCode(
                      classification,
                      salesRolesData.FacilityClassification.value
                    )
                  : ""
              }
              placeHolder="All classifications"
            />
          </Grid>
          <Grid item xs={2.4}>
            <CustomDropDown
              name="CareSetting"
              menuItem={careSettingText}
              handleChange={validateAndSetData}
              selectpropsClassName="careSetting-select"
              selectClassName="careSetting"
              testId="careSetting-DropDown"
              value={
                salesRolesData.CareSetting.value
                  ? getTextFromCode(
                      careSetting,
                      salesRolesData.CareSetting.value
                    )
                  : ""
              }
              placeHolder="All care settings"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
