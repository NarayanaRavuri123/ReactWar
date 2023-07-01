import { Grid, InputBase } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { AddFacilityContext } from "../../addFacilityContainer/addFacilityContainer.context";
import { ISearchFacilityByProps } from "../addFacility.inteface";
import { defaultSearchDataForName } from "../searchFacility.model";
import "./searchByID.css";

export const SearchByID = ({
  facilitySearchDataForID,
  facilitySearchDataForName,
  setfacilitySearchDataForID,
  setfacilitySearchDataForName,
  onSubmit,
  isComingFromSelectAFacility = false,
}: ISearchFacilityByProps) => {
  const { facilitySearchValidator } = useContext(AddFacilityContext);
  const [disabled, setDisabled] = useState(true);
  const validateAndSetData = (e: any) => {
    setfacilitySearchDataForName(getDeepClone(defaultSearchDataForName));
    const isValid = facilitySearchValidator.facilityIDValidation(
      e.target.value
    );
    setfacilitySearchDataForID(
      Object.assign(
        {},
        facilitySearchDataForID,
        { [e.target.name]: { value: e.target.value, valid: isValid.status } },
        { search: { value: "true", valid: isValid.status } }
      )
    );
  };

  useEffect(() => {
    setDisabled(
      !(facilitySearchDataForID.facilityID.valid === ValidationStatus.VALID)
    );
  }, [facilitySearchDataForID.facilityID.valid]);
  return (
    <Grid
      container
      className={
        isComingFromSelectAFacility
          ? "selectFacilityContainer search-field-container"
          : "search-field-container"
      }
    >
      <Grid
        className={
          isComingFromSelectAFacility
            ? "selectFacilitySearch"
            : "search-by-facility-id"
        }
      >
        <InputWithLabel
          isRequired={true}
          label={
            isComingFromSelectAFacility
              ? "Customer Account Number"
              : "Facility ID"
          }
          error={
            facilitySearchDataForID.facilityID.valid ===
            ValidationStatus.INVALID
          }
        >
          <InputBase
            value={facilitySearchDataForID.facilityID.value}
            className="facility-id"
            name="facilityID"
            data-testid="facilityID"
            onChange={validateAndSetData}
          ></InputBase>
        </InputWithLabel>
      </Grid>
      <Grid className="search-by-facility-submit">
        <ExpressButton
          variant="contained"
          parentClass="search-button"
          clickHandler={onSubmit}
          disabled={disabled}
          data-testid="searchBtn1"
        >
          Search
        </ExpressButton>
      </Grid>
    </Grid>
  );
};
