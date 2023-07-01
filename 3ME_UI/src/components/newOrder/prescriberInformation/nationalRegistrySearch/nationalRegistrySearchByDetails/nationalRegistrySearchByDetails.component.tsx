import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import {
  defaultNationalRegistrySearchBox,
  INationalRegistrySearchByDetails,
} from "../nationRegistrySearch.model";
import { Grid, InputBase } from "@mui/material";
import "./nationalRegistrySearchByDetails.css";
import { CustomDropDown } from "../../../../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../../core/interfaces/input.interface";
import { NewOrderValidator } from "../../../newOrder.validator";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { MouseEventHandler } from "react";

interface Props {
  states: never[];
  statesText: never[];
  nationRegistrySearchByDetails: INationalRegistrySearchByDetails;
  setNationRegistrySearchByDetails: Function;
  setNationalRegistrySearchInputs: Function;
  handleSearchNPI: MouseEventHandler<HTMLButtonElement>;
}

const NationalRegistrySearchByDetails = ({
  states,
  statesText,
  nationRegistrySearchByDetails,
  setNationRegistrySearchByDetails,
  setNationalRegistrySearchInputs,
  handleSearchNPI,
}: Props) => {
  const validateAndSetData = (e: any) => {
    setNationalRegistrySearchInputs(
      getDeepClone(defaultNationalRegistrySearchBox)
    );
    let value = e.target.value;
    const validator = new NewOrderValidator();
    let isValid = validator.validate(e.target.value, e.target.name);
    if (e.target.name === "state") {
      value = getCodeFromText(states, e.target.value);
      isValid = validator.validate(value, e.target.name);
    }
    setNationRegistrySearchByDetails(
      (nationRegistrySearchByDetails: INationalRegistrySearchByDetails) => ({
        ...nationRegistrySearchByDetails,
        [e.target.name]: { value: value, valid: isValid?.status },
      })
    );
  };
  const checkValidationStatus = () => {
    return nationRegistrySearchByDetails.state.valid !==
      ValidationStatus.VALID ||
      nationRegistrySearchByDetails.NPILastName.valid !== ValidationStatus.VALID
      ? true
      : false;
  };

  const getTextFromCode = (array: never[], code: string): string => {
    if (code !== "" && array.length === 0) {
      return code;
    }
    return array
      .filter((item: { text: string; code: string }) => item.code === code)
      .map((x: { text: string }) => x.text)[0];
  };

  const getCodeFromText = (array: never[], input: string): string => {
    return array
      .filter((item: { text: string; code: string }) => item.text === input)
      .map((x: { code: string }) => x.code)[0];
  };

  return (
    <div className="searchByDetails">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <InputWithLabel
            testId="stateTestID"
            label="State"
            isRequired={true}
            error={
              nationRegistrySearchByDetails.state.valid ===
              ValidationStatus.INVALID
            }
          >
            <CustomDropDown
              handleChange={validateAndSetData}
              menuItem={statesText}
              name="state"
              selectpropsClassName={
                nationRegistrySearchByDetails.state.value
                  ? "patient-info-select"
                  : "placeHolder"
              }
              placeHolder="Select State"
              selectClassName={
                nationRegistrySearchByDetails.state.value
                  ? "patient-info-input"
                  : "placeHolder"
              }
              value={
                nationRegistrySearchByDetails.state.value
                  ? getTextFromCode(
                      states,
                      nationRegistrySearchByDetails.state.value
                    )
                  : null
              }
            />
          </InputWithLabel>
        </Grid>
        <Grid item xs={4}>
          <InputWithLabel
            testId="NPILastName"
            label="Physician Last Name"
            isRequired={true}
            error={
              nationRegistrySearchByDetails.NPILastName.valid ===
              ValidationStatus.INVALID
            }
          >
            <InputBase
              name="NPILastName"
              onChange={validateAndSetData}
              value={nationRegistrySearchByDetails.NPILastName.value}
            />
          </InputWithLabel>
        </Grid>
        <Grid item xs={4}>
          <InputWithLabel
            testId="NPIFirstName"
            label="Physician First Name"
            isRequired={false}
            error={
              nationRegistrySearchByDetails.NPIFirstName.valid ===
              ValidationStatus.INVALID
            }
          >
            <InputBase
              name="NPIFirstName"
              onChange={validateAndSetData}
              value={nationRegistrySearchByDetails.NPIFirstName.value}
            />
          </InputWithLabel>
        </Grid>
      </Grid>
      <div className="searchButtonByDetails">
        <ExpressButton
          testId="searchNPIDetailsbutton"
          clickHandler={handleSearchNPI}
          parentClass="searchNRByDetails"
          variant="contained"
          disabled={checkValidationStatus()}
        >
          Search
        </ExpressButton>
      </div>
    </div>
  );
};

export default NationalRegistrySearchByDetails;
