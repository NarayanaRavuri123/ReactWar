import React from "react";
import { useEffect } from "react";
import { Button, Grid, InputBase } from "@mui/material";
import { ExpressButton } from "../expressButton/expressButton.component";
import { InputWithLabel } from "../inputWithLabel/inputWithLabel.component";
import {
  IFacilitySearch,
  IFacilitySearchProps,
} from "./caregiverFacilitySearchAndAdd.model";
import { ValidationStatus } from "../interfaces/input.interface";
import { CaregiverFacilitySearchValidator } from "./caregiverFacilitySearchAndAdd.validator";
import { CustomDropDown } from "../customDropdown/customDropdown.component";
import "./caregiverFacilitySearchAndAdd.css";

export const CaregiverFacilitySearch = ({
  data,
  setData,
  handleSearch,
  redirectToProviderSearch,
  statesText,
}: IFacilitySearchProps) => {
  const [search2Disabled, setSearch2Disabled] = React.useState<boolean>(true);
  const [search1Disabled, setSearch1Disabled] = React.useState<boolean>(true);
  const [validator] = React.useState(new CaregiverFacilitySearchValidator());

  const validateAndSetData = (e: any) => {
    const { value, name } = e.target;
    const isValid = validator.validate(value, name);
    if (name === "facilityID") {
      setData((dt: IFacilitySearch) => ({
        ...dt,
        facilityName: {
          valid: ValidationStatus.UNTOUCHED,
          value: "",
          required: true,
        },
        facilityState: {
          valid: ValidationStatus.UNTOUCHED,
          value: "",
          required: true,
        },
      }));
    } else {
      setData((dt: IFacilitySearch) => ({
        ...dt,
        facilityID: {
          valid: ValidationStatus.UNTOUCHED,
          value: "",
          required: true,
        },
      }));
    }
    setData((dt: IFacilitySearch) => ({
      ...dt,
      [name]: {
        value: value,
        valid: isValid?.status,
        required: true,
      },
    }));
  };

  useEffect(() => {
    if (data.facilityID.valid === ValidationStatus.VALID) {
      setSearch2Disabled(false);
    } else {
      setSearch2Disabled(true);
    }
  }, [data.facilityID.value]);

  useEffect(() => {
    if (
      data.facilityName.valid === ValidationStatus.VALID &&
      data.facilityState.valid === ValidationStatus.VALID
    ) {
      setSearch1Disabled(false);
    } else {
      setSearch1Disabled(true);
    }
  }, [data.facilityName.value, data.facilityState.value]);
  return (
    <Grid container className="facility-search-container">
      <div className="hc-provider-title">Home Care Provider Search</div>
      <Grid container className="fs-title-container">
        <Grid item className="fs-title">
          Search Facilities Database
        </Grid>
        <Grid item>
          <Button
            variant="text"
            onClick={redirectToProviderSearch}
            className="search-provider-btn"
            classes={{ root: "search-provider-root" }}
            data-testid="search-provider-btn"
          >
            Search My Provider List instead
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item className="fs-facility-name-container">
          <InputWithLabel
            isRequired={true}
            label="Facility Name"
            error={data.facilityName.valid === ValidationStatus.INVALID}
            sx={{ width: "100%", maxWidth: "346px" }}
            testId="facilityNameLabel"
          >
            <InputBase
              value={data.facilityName.value}
              className="fs-facility-name"
              name="facilityName"
              inputProps={{ "data-testid": "facilityName" }}
              onChange={validateAndSetData}
              autoFocus
            ></InputBase>
          </InputWithLabel>
        </Grid>
        <Grid item className="fs-facility-state-container">
          <InputWithLabel
            isRequired={true}
            label="State"
            error={data.facilityState.valid === ValidationStatus.INVALID}
            sx={{ width: "100%", maxWidth: "90px" }}
          >
            <CustomDropDown
              handleChange={validateAndSetData}
              menuItem={statesText}
              name="facilityState"
              selectpropsClassName={
                data.facilityState.value ? "patient-info-select" : "placeHolder"
              }
              placeHolder="Select State"
              selectClassName={
                data.facilityState.value ? "patient-info-input" : "placeHolder"
              }
              value={data.facilityState.value}
              testId="facility-state-dropdown"
            />
          </InputWithLabel>
        </Grid>
        <Grid item className="fs-search-btn-container">
          <ExpressButton
            variant="contained"
            parentClass="search-btn"
            clickHandler={handleSearch}
            disabled={search1Disabled}
            testId="search-btn1"
          >
            Search
          </ExpressButton>
        </Grid>
      </Grid>
      <div className="fs-separator">OR</div>
      <Grid container sx={{ marginBottom: "24px" }}>
        <Grid item className="fs-facility-id-container">
          <InputWithLabel
            isRequired={true}
            label="Facility ID"
            error={data.facilityID.valid === ValidationStatus.INVALID}
            sx={{ width: "100%", maxWidth: "452px" }}
          >
            <InputBase
              value={data.facilityID.value}
              className="fs-facility-id"
              name="facilityID"
              data-testid="facilityID"
              onChange={validateAndSetData}
            ></InputBase>
          </InputWithLabel>
        </Grid>
        <Grid item className="fs-search-btn-container">
          <ExpressButton
            variant="contained"
            parentClass="search-btn"
            clickHandler={handleSearch}
            disabled={search2Disabled}
            testId="search-btn2"
          >
            Search
          </ExpressButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
