import moment from "moment";
import "./addFacilityManually.css";
import {
  IAddFacility,
  IAddFacilityManuallyInterface,
} from "./addFacilityManually.interface";
import { useEffect, useState } from "react";
import { format } from "react-string-format";
import { Grid, InputBase } from "@mui/material";
import { defaultFaciltyData } from "./addFacilityManually.model";
import {
  DD_MANUAL_FACILITY_TYPE,
  DD_US_STATES_CONTENT,
} from "../../../../util/staticText";
import { getdropDownContent } from "../../../../util/dropDownService";
import { AddFacilityManuallyValidator } from "./addFacilityManually.validator";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { SearchSection } from "../addFacilityContainer/addFacilityContainer.enum";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import {
  CustomDropDown,
  DropDownValue,
} from "../../../../core/customDropdown/customDropdown.component";
import React from "react";
import { FacilityMode } from "../facility.interface";

export const AddFacilityManually = ({
  redirectHandler,
  facilityData = defaultFaciltyData,
  addNewFacility,
  Validator = new AddFacilityManuallyValidator(),
}: IAddFacilityManuallyInterface) => {
  const [addFacilityData, setAddFacilityData] =
    useState<IAddFacility>(facilityData);
  const [validator] = useState<AddFacilityManuallyValidator>(Validator);
  const [isFormValid, setIsFormValid] = useState<ValidationStatus>(
    ValidationStatus.INVALID
  );
  const [states, setStates] = useState([]);
  const [statesText, setStatesText] = useState([]);

  const [facilityType, setFacilityType] = React.useState<DropDownValue[]>([]);
  useEffect(() => {
    validateAll();
  }, [addFacilityData]);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    //async and await
    try {
      const ddContent = format(
        "{0},{1}",
        DD_US_STATES_CONTENT,
        DD_MANUAL_FACILITY_TYPE
      );
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const statesObject = data.items.filter(
          (item: { name: string }) => item.name === DD_US_STATES_CONTENT
        );
        const statesData = statesObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setStates(statesData);
        setStatesText(statesData.map((x: { text: string }) => x.text));

        const facilityObject = data.items.filter(
          (item: { name: string }) => item.name === DD_MANUAL_FACILITY_TYPE
        );
        const facilityTypeData = facilityObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setFacilityType(facilityTypeData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCodeFromText = (array: never[], input: string): string => {
    return array
      .filter((item: { text: string; code: string }) => item.text === input)
      .map((x: { code: string }) => x.code)[0];
  };

  const getTextFromCode = (array: never[], code: string): string => {
    return array
      .filter((item: { text: string; code: string }) => item.code === code)
      .map((x: { text: string }) => x.text)[0];
  };

  const validateAll = () => {
    let isValid: ValidationStatus = ValidationStatus.INVALID;
    isValid = validator.validateAddFacilityForm(addFacilityData);
    setIsFormValid(isValid);
  };

  const validateAndSetData = (e: any) => {
    let value = e.target.value;
    let isValid = validator.validate(e.target.value, e.target.name);
    if (e.target.name === "state") {
      value = getCodeFromText(states, e.target.value);
      isValid = validator.validate(value, e.target.name);
    }
    setAddFacilityData(
      Object.assign({}, addFacilityData, {
        [e.target.name]: { value: value, valid: isValid?.status },
      })
    );
  };

  const validateAndSetDataWithKey = (e: any) => {
    const isValid = validator.validate(e.target.value, e.target.name);
    setAddFacilityData(
      Object.assign({}, addFacilityData, {
        [e.target.name]: { value: e.target.key, valid: isValid },
      })
    );
  };

  const addNewFacilityManually = () => {
    let typeObj = facilityType.find(
      (x) => x.text === addFacilityData.type.value
    );
    const facility = {
      accountId: moment().valueOf().toString(),
      accountName: addFacilityData.name.value,
      typeName: addFacilityData.type.value,
      typeCode: typeObj?.code,
      address1: addFacilityData.addressLine1.value,
      address2: addFacilityData.addressLine2.value,
      city: addFacilityData.city.value,
      state: addFacilityData.state.value,
      zip: addFacilityData.zipCode.value,
      accountNumber: null,
      facilityMode: FacilityMode.MANUAL,
      siteUseId: addFacilityData.siteUseId.value,
    };
    addNewFacility(facility);
  };

  return (
    <div className="add-facility-manually">
      <h2
        className="add-facility-manually-title"
        data-testid="add-facility-manually-title"
      >
        Add Facility Manually
      </h2>
      <div className="facility-manually-inputs">
        <div className="gird-div-for-extra-margin">
          <Grid
            container
            spacing={1}
            classes={{ root: "facility-manually-component" }}
          >
            <Grid item xs={6}>
              <InputWithLabel
                label="Facility Name"
                isRequired={true}
                error={addFacilityData.name.valid === ValidationStatus.INVALID}
                testId="facility-name-title-manual"
              >
                <InputBase
                  autoFocus
                  className="facility-manually-input"
                  inputProps={{ "data-testid": "facility-name-manual" }}
                  name="name"
                  onChange={validateAndSetData}
                  value={addFacilityData.name.value}
                />
              </InputWithLabel>
            </Grid>
            <Grid item xs={6}>
              <InputWithLabel
                label="Facility Type"
                isRequired={true}
                testId="facility-type-title-manual"
              >
                <CustomDropDown
                  handleChange={validateAndSetData}
                  menuItem={[]}
                  name="type"
                  selectClassName="facility-manually-input"
                  selectpropsClassName="facility-type-select"
                  value={addFacilityData.type.value}
                  dropDownMenuObj={facilityType}
                  hasBothCodeValue={true}
                />
              </InputWithLabel>
            </Grid>
          </Grid>
        </div>
        <div className="gird-div-for-extra-margin">
          <Grid
            container
            spacing={1}
            classes={{ root: "facility-manually-component" }}
          >
            <Grid item xs={6}>
              <InputWithLabel
                label="Address Line 1"
                isRequired={true}
                error={
                  addFacilityData.addressLine1.valid ===
                  ValidationStatus.INVALID
                }
                testId="facility-addressline1-title-manual"
              >
                <InputBase
                  className="facility-manually-input"
                  inputProps={{ "data-testid": "facility-addressline1-manual" }}
                  onChange={validateAndSetData}
                  name="addressLine1"
                  value={addFacilityData.addressLine1.value}
                />
              </InputWithLabel>
            </Grid>
            <Grid item xs={6}>
              <InputWithLabel
                label="Address Line 2"
                isRequired={false}
                error={
                  addFacilityData.addressLine2.valid ===
                  ValidationStatus.INVALID
                }
                testId="facility-addressline2-title-manual"
              >
                <InputBase
                  className="facility-manually-input"
                  inputProps={{ "data-testid": "facility-addressline2-manual" }}
                  name="addressLine2"
                  onChange={validateAndSetData}
                  value={addFacilityData.addressLine2.value}
                />
              </InputWithLabel>
            </Grid>
          </Grid>
        </div>
        <div className="gird-div-for-extra-margin">
          <Grid
            container
            spacing={1}
            classes={{ root: "facility-manually-component" }}
          >
            <Grid item xs={6}>
              <InputWithLabel
                label="City"
                isRequired={true}
                error={addFacilityData.city.valid === ValidationStatus.INVALID}
                testId="facility-city-title-manual"
              >
                <InputBase
                  className="facility-manually-input"
                  inputProps={{ "data-testid": "facility-city-manual" }}
                  name="city"
                  onChange={validateAndSetData}
                  value={addFacilityData.city.value}
                />
              </InputWithLabel>
            </Grid>
            <Grid item xs={3}>
              <InputWithLabel isRequired={true} label="State">
                <CustomDropDown
                  handleChange={validateAndSetData}
                  menuItem={statesText}
                  name="state"
                  selectpropsClassName={
                    addFacilityData.state.value
                      ? "facility-state-select"
                      : "placeHolder"
                  }
                  selectClassName={
                    addFacilityData.state.value
                      ? "facility-manually-input"
                      : "placeHolder"
                  }
                  testId="facility-state-select"
                  value={
                    addFacilityData.state.value
                      ? getTextFromCode(states, addFacilityData.state.value)
                      : null
                  }
                />
              </InputWithLabel>
            </Grid>
            <Grid item xs={3}>
              <InputWithLabel
                label="ZIP Code"
                isRequired={true}
                error={
                  addFacilityData.zipCode.valid === ValidationStatus.INVALID
                }
                testId="facility-zipcode-title-manual"
              >
                <InputBase
                  className="facility-manually-input"
                  inputProps={{ "data-testid": "facility-zipcode-manual" }}
                  name="zipCode"
                  onChange={validateAndSetData}
                  value={addFacilityData.zipCode.value}
                />
              </InputWithLabel>
            </Grid>
          </Grid>
        </div>
        <div className="footer-buttons">
          <Grid
            container
            spacing={1}
            classes={{ root: "facility-manually-component" }}
          >
            <Grid item xs={6}>
              <ExpressButton
                variant="outlined"
                clickHandler={() => redirectHandler(SearchSection.SEARCH_FORM)}
                parentClass="cancelBtn"
              >
                Back to Search
              </ExpressButton>
            </Grid>
            <Grid item xs={6}>
              <ExpressButton
                disabled={isFormValid === ValidationStatus.VALID ? false : true}
                variant="contained"
                clickHandler={addNewFacilityManually}
                parentClass="saveBtn"
                testId="enter-button"
              >
                Enter
              </ExpressButton>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
