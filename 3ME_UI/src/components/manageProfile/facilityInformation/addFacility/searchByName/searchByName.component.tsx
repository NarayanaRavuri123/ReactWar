import { Grid, InputBase } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { format } from "react-string-format";
import { CustomDropDown } from "../../../../../core/customDropdown/customDropdown.component";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../../core/interfaces/input.interface";
import { getdropDownContent } from "../../../../../util/dropDownService";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { DD_US_STATES_CONTENT } from "../../../../../util/staticText";
import {
  getCodeFromText,
  getInvalidObj,
  getTextFromCode,
} from "../../../../../util/utilityFunctions";
import { AddFacilityContext } from "../../addFacilityContainer/addFacilityContainer.context";
import { ISearchFacilityByProps } from "../addFacility.inteface";
import { defaultSearchDataForID } from "../searchFacility.model";
import "./searchByName.css";

export const SearchByName = ({
  facilitySearchDataForID,
  facilitySearchDataForName,
  setfacilitySearchDataForID,
  setfacilitySearchDataForName,
  onSubmit,
  isComingFromSelectAFacility = false,
}: ISearchFacilityByProps) => {
  const { facilitySearchValidator } = useContext(AddFacilityContext);
  const [disabled, setDisabled] = useState(true);
  const [states, setStates] = useState([]);
  const [statesText, setStatesText] = useState([]);

  const validateAndSetData = (e: any) => {
    setfacilitySearchDataForID(getDeepClone(defaultSearchDataForID));
    let isValid = getInvalidObj(null);
    let value = e.target.value;
    if (e.target.name === "facilityName") {
      isValid = facilitySearchValidator.facilityNameValidation(e.target.value);
    } else {
      isValid = facilitySearchValidator.facilityStateValidation(e.target.value);
      value = getCodeFromText(states, e.target.value);
    }
    setfacilitySearchDataForName(
      Object.assign(
        {},
        facilitySearchDataForName,
        { [e.target.name]: { value: value, valid: isValid.status } },
        { search: { value: "true", valid: isValid.status } }
      )
    );
  };

  const fetchStates = async () => {
    //async and await
    try {
      const ddContent = format("{0},{1}", DD_US_STATES_CONTENT);
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
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    setDisabled(
      !(
        facilitySearchDataForName.facilityName.valid ===
          ValidationStatus.VALID &&
        facilitySearchDataForName.facilityState.valid === ValidationStatus.VALID
      )
    );
    fetchStates();
  }, [
    facilitySearchDataForName.facilityName.valid,
    facilitySearchDataForName.facilityState.valid,
  ]);

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
        item
        className="search-by-name-name"
        data-testid="facility-name-label"
      >
        <InputWithLabel
          isRequired={true}
          testId="facility-name"
          label="Facility Name"
          error={
            facilitySearchDataForName.facilityName.valid ===
            ValidationStatus.INVALID
          }
          sx={{ marginRight: "16px", width: "100%", maxWidth: "276px" }}
        >
          <InputBase
            value={facilitySearchDataForName.facilityName.value}
            className="facility-name"
            name="facilityName"
            inputProps={{ "data-testid": "facility-name-value" }}
            onChange={validateAndSetData}
            autoFocus
          ></InputBase>
        </InputWithLabel>
      </Grid>
      <Grid
        item
        className="search-by-name-zipcode"
        data-testid="facility-state-component"
      >
        <InputWithLabel
          isRequired={true}
          label="State"
          error={
            facilitySearchDataForName.facilityState.valid ===
            ValidationStatus.INVALID
          }
        >
          <CustomDropDown
            handleChange={validateAndSetData}
            menuItem={statesText}
            name="facilityState"
            placeHolder="Select State"
            selectpropsClassName={
              facilitySearchDataForName.facilityState.value
                ? "facility-state-select"
                : "placeHolder"
            }
            selectClassName={
              facilitySearchDataForName.facilityState.value
                ? "facility-search-manually-input"
                : "placeHolder"
            }
            testId="facility-state-select"
            value={
              facilitySearchDataForName.facilityState.value
                ? getTextFromCode(
                    states,
                    facilitySearchDataForName.facilityState.value
                  )
                : null
            }
          />
        </InputWithLabel>
      </Grid>
      <Grid item className="search-by-name-submit">
        <ExpressButton
          testId="facility-search-button"
          variant="contained"
          parentClass="search-button"
          clickHandler={onSubmit}
          disabled={disabled}
        >
          Search
        </ExpressButton>
      </Grid>
    </Grid>
  );
};
