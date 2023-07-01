import { Grid, InputBase } from "@mui/material";
import InputMask from "react-input-mask";
import React, { useState, useContext, useEffect } from "react";
import { CustomDropDown } from "../../../../core/customDropdown/customDropdown.component";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { NewOrderValidator } from "../../newOrder.validator";
import "./addManualHomeCareProvider.css";
import {
  defaultAddManualHomeCareProvider,
  IAddManualHomeCareProvider,
} from "./addManualHomeCareProvider.interface";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../context/NewOrderContext";
import { SearchHomeCareProviderModal } from "../homeCareSearch/searchHomeCare.enum";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import {
  formatNumber,
  getCodeFromText,
  getTextFromCode,
} from "../../../../util/utilityFunctions";
import { getdropDownContent } from "../../../../util/dropDownService";
import { DD_PROVIDER_TYPE } from "../../../../util/staticText";
import { format } from "react-string-format";
import { ICaregiverFacility } from "../../../../core/caregiverSearchAndAdd/caregiverFacilitySearchAndAdd.model";
interface Props {
  states: [];
  statesText: [];
  handleFacilitySelect: Function;
}

const AddManualHomeCare = ({
  states,
  statesText,
  handleFacilitySelect,
}: Props) => {
  const [addManualHomeCare, setAddManualHomeCare] =
    useState<IAddManualHomeCareProvider>(defaultAddManualHomeCareProvider);
  const [focusClasses, setFocusClasses] = useState({
    emergencyContactPhoneNumber: "",
  });
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const [showSpinner, setshowSpinner] = useState(false);
  const [providerType, setProviderType] = useState([]);
  const [providerTypeText, setProviderTypeText] = useState([]);

  useEffect(() => {
    fetchDropDownContent();
  }, []);

  const validateAndSetData = (e: any) => {
    const validator = new NewOrderValidator();
    let { value, name } = e.target;
    let isvalid = validator.validate(value, name);
    if (name === "state") {
      value = getCodeFromText(states, value);
      isvalid = validator.validate(value, name);
    } else if (name === "providerType") {
      value = getCodeFromText(providerType, value);
      isvalid = validator.validate(value, name);
    }
    setAddManualHomeCare((addManualHomeCare) => ({
      ...addManualHomeCare,
      [e.target.name]: {
        value: value,
        valid: isvalid?.status,
      },
    }));
  };

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const handleBackToSearch = () => {
    NewOrderObj?.setHomecareproviderSearchAddPopUpSection(
      SearchHomeCareProviderModal.SEARCH_HOMECAREPROVIDER
    );
  };

  const validateFormAndEnable = () => {
    let temp = getDeepClone(addManualHomeCare);
    const ifAllValid = Object.keys(temp).every(
      (x: string) => temp[x].valid === ValidationStatus.VALID
    );
    return !ifAllValid;
  };

  const handleAddManualHomeCare = () => {
    setshowSpinner(true);
    // Remove setTimeout and call API
    setTimeout(() => {
      NewOrderObj?.setSearchHomeCareProviderPopup(false);
      let selectedHomeCareGiver: ICaregiverFacility = {
        customerName: addManualHomeCare.homeCareName.value,
        address1: addManualHomeCare.addressLine1.value,
        address2: addManualHomeCare.addressLine2.value,
        city: addManualHomeCare.city.value,
        state: addManualHomeCare.state.value.toUpperCase(),
        postalCode: addManualHomeCare.zipCode.value,
        phoneNo: formatNumber(addManualHomeCare.contactNumber.value),
        extension: addManualHomeCare.extension.value,
        marketingSegmentDescription: getTextFromCode(
          providerType,
          addManualHomeCare.providerType.value
        ),
        marketingSegmentCode: addManualHomeCare.providerType.value,
        siteUseId: "",
      };
      handleFacilitySelect(selectedHomeCareGiver);
    }, 3000);
  };

  const Spinner = () => {
    return (
      <div className="manualHomeCare-loading">
        <div className="manualHomeCare-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  const fetchDropDownContent = async () => {
    try {
      const ddContent = format("{0}", DD_PROVIDER_TYPE);
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const providerTypeObj = data.items.filter(
          (item: { name: string }) => item.name === DD_PROVIDER_TYPE
        );
        const providerTypeData = providerTypeObj[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setProviderType(providerTypeData);
        setProviderTypeText(
          providerTypeData.map((x: { text: string }) => x.text)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="manualHomeCare">
      {showSpinner ? (
        Spinner()
      ) : (
        <>
          <div
            className="manualHomeCare-header"
            data-testid="manualHomeCare-header"
          >
            Add Home Care Provider
          </div>
          <div className="manualHomeCare-Inputs">
            <InputWithLabel
              testId="homeCareName"
              label="Home Care Provider Name"
              isRequired={true}
              error={
                addManualHomeCare.homeCareName.valid ===
                ValidationStatus.INVALID
              }
            >
              <InputBase
                autoFocus={true}
                className="manualHomeCare-Input"
                name="homeCareName"
                onChange={validateAndSetData}
                value={addManualHomeCare.homeCareName.value}
              />
            </InputWithLabel>
            <Grid columnSpacing={2} container style={{ marginTop: "8px" }}>
              <Grid item xs={6}>
                <InputWithLabel
                  testId="homeCareAddress1"
                  label="Address Line 1 (No P.O. Boxes)"
                  isRequired={true}
                  error={
                    addManualHomeCare.addressLine1.valid ===
                    ValidationStatus.INVALID
                  }
                >
                  <InputBase
                    name="addressLine1"
                    className="manualHomeCare-Input"
                    onChange={validateAndSetData}
                    value={addManualHomeCare.addressLine1.value}
                  />
                </InputWithLabel>
              </Grid>
              <Grid item xs={6}>
                <InputWithLabel
                  testId="homeCareAddress2"
                  label="Address Line 2"
                  isRequired={false}
                  error={
                    addManualHomeCare.addressLine2.valid ===
                    ValidationStatus.INVALID
                  }
                >
                  <InputBase
                    name="addressLine2"
                    className="manualHomeCare-Input"
                    onChange={validateAndSetData}
                    value={addManualHomeCare.addressLine2.value}
                  />
                </InputWithLabel>
              </Grid>
            </Grid>
            <Grid columnSpacing={2} container style={{ marginTop: "8px" }}>
              <Grid item xs={6}>
                <InputWithLabel
                  testId="homeCareCity"
                  label="City"
                  isRequired={true}
                  error={
                    addManualHomeCare.city.valid === ValidationStatus.INVALID
                  }
                >
                  <InputBase
                    name="city"
                    required={addManualHomeCare.city.required}
                    className="manualHomeCare-Input"
                    onChange={validateAndSetData}
                    value={addManualHomeCare.city.value}
                  />
                </InputWithLabel>
              </Grid>
              <Grid item xs={3}>
                <InputWithLabel
                  testId="stateTestID"
                  label="State"
                  isRequired={true}
                  error={
                    addManualHomeCare.state.valid === ValidationStatus.INVALID
                  }
                >
                  <CustomDropDown
                    handleChange={validateAndSetData}
                    menuItem={statesText}
                    name="state"
                    selectpropsClassName={
                      addManualHomeCare.state.value
                        ? "homecare-info-select"
                        : "placeHolder"
                    }
                    placeHolder="Select State"
                    selectClassName={
                      addManualHomeCare.state.value
                        ? "homecare-info-input"
                        : "placeHolder"
                    }
                    value={
                      addManualHomeCare.state.value
                        ? getTextFromCode(states, addManualHomeCare.state.value)
                        : null
                    }
                  />
                </InputWithLabel>
              </Grid>
              <Grid item xs={3}>
                <InputWithLabel
                  testId="homeCareZipCode"
                  label="ZIP Code"
                  isRequired={true}
                  error={
                    addManualHomeCare.zipCode.valid === ValidationStatus.INVALID
                  }
                >
                  <InputBase
                    name="zipCode"
                    required={addManualHomeCare.zipCode.required}
                    className="manualHomeCare-Input"
                    onChange={validateAndSetData}
                    value={addManualHomeCare.zipCode.value}
                    inputProps={{
                      maxLength: 5,
                    }}
                  />
                </InputWithLabel>
              </Grid>
            </Grid>
            <Grid columnSpacing={2} container style={{ marginTop: "8px" }}>
              <Grid item xs={4}>
                <InputWithLabel
                  label="Provider Contact Number"
                  isRequired={true}
                  error={
                    addManualHomeCare.contactNumber.valid ===
                    ValidationStatus.INVALID
                  }
                  labelClassName={focusClasses.emergencyContactPhoneNumber}
                  testId="phone-number-label"
                >
                  <InputMask
                    className="contactNumber"
                    data-testid="phone-number-value"
                    mask="(999) 999-9999"
                    name="contactNumber"
                    onBlur={(e) => setClasses(e, "")}
                    onChange={validateAndSetData}
                    onFocus={(e) => setClasses(e, "Mui-focused")}
                    placeholder="(___) ___-____"
                    value={addManualHomeCare.contactNumber.value}
                  />
                </InputWithLabel>
              </Grid>
              <Grid item xs={2}>
                <InputWithLabel
                  testId="extension"
                  label="Extension"
                  isRequired={false}
                  error={
                    addManualHomeCare.extension.valid ===
                    ValidationStatus.INVALID
                  }
                >
                  <InputBase
                    className="manualHomeCare-Input"
                    name="extension"
                    onChange={validateAndSetData}
                    value={addManualHomeCare.extension.value}
                  />
                </InputWithLabel>
              </Grid>
              <Grid item xs={6}>
                <InputWithLabel
                  testId="providerType"
                  label="Provider Type"
                  isRequired={true}
                  error={
                    addManualHomeCare.providerType.valid ===
                    ValidationStatus.INVALID
                  }
                >
                  <CustomDropDown
                    handleChange={validateAndSetData}
                    menuItem={providerTypeText}
                    name="providerType"
                    selectpropsClassName={
                      addManualHomeCare.providerType.value
                        ? "homecare-info-select"
                        : "placeHolder"
                    }
                    placeHolder="Select a provider type"
                    selectClassName={
                      addManualHomeCare.providerType.value
                        ? "homecare-info-input"
                        : "placeHolder"
                    }
                    value={
                      addManualHomeCare.providerType.value
                        ? getTextFromCode(
                            providerType,
                            addManualHomeCare.providerType.value
                          )
                        : null
                    }
                  />
                </InputWithLabel>
              </Grid>
            </Grid>
          </div>

          <Grid container spacing={2} style={{ marginTop: "16px" }}>
            <Grid item xs={6}>
              <ExpressButton
                parentClass="manualHomeCare-Add"
                variant="outlined"
                clickHandler={handleBackToSearch}
              >
                Back to Search
              </ExpressButton>
            </Grid>
            <Grid item xs={6}>
              <ExpressButton
                parentClass="manualHomeCare-Add"
                variant="contained"
                clickHandler={handleAddManualHomeCare}
                disabled={validateFormAndEnable()}
              >
                Add Home Care Provider
              </ExpressButton>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default AddManualHomeCare;
