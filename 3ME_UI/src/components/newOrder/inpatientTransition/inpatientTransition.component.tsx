import {
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import moment from "moment";
import "./inpatientTransition.css";
import { useContext, useEffect, useState } from "react";
import { NewOrderValidator } from "../newOrder.validator";
import { Popup } from "../../../core/popup/popup.component";
import { Validator } from "../../../util/order.validations";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { IInpatientTransition } from "./inpatientTransition.interface";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { ReactComponent as CalendarIcon } from "../../../assets/calendar.svg";
import { ReactComponent as RadioButtonIcon } from "../../../assets/radioButton.svg";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { IFacility } from "../../manageProfile/facilityInformation/facility.interface";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../assets/selectedRadioButton.svg";
import { InpatientTransitionReviewOrder } from "./reviewOrder/inpatientTransitionReviewOrder.component";
import { FacilityInfoDetail } from "../../manageProfile/facilityInformation/facilityInfoDetail.component";
import { AddFacilityContext } from "../../manageProfile/facilityInformation/addFacilityContainer/addFacilityContainer.context";
import { AddFacilityContainer } from "../../manageProfile/facilityInformation/addFacilityContainer/addFacilityContainer.component";
import { convertStringToDate } from "../../../util/utilityFunctions";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";

export const InpatientTransition = ({
  data,
  newValidator = new NewOrderValidator(),
  setData,
  isReviewOrder = false,
  editButtonClicked,
  isOrderSummary = false,
}: IInpatientTransition) => {
  const [focusClasses, setFocusClasses] = useState({ dateInitiated: "" });
  const [validator] = useState<NewOrderValidator>(newValidator!);
  const [facility, setFacility] = useState<IFacility>();
  const newOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const [active, setActive] = useState<boolean>(
    data!.wasNPWTInitiated.value === "yes" ? true : false
  );
  const [open, setOpen] = useState<boolean>(false);
  const AuthObj = useContext<AuthContextType | null>(AuthContext);

  useEffect(() => {
    if (
      data.inpatientFacilityAsDefault === false &&
      data.inpatientFacility !== null
    ) {
      setFacility(data.inpatientFacility!);
    } else if (
      AuthObj?.userProfile?.facilities.length !== 0 &&
      data.inpatientFacilityAsDefault !== false
    ) {
      if (AuthObj?.registeredFaciltyAddress) {
        const userFacility = AuthObj?.registeredFaciltyAddress!;
        data.inpatientFacility = userFacility;
        data.inpatientFacilityAsDefault = true;
        setFacility(userFacility);
      }
    }
  }, [AuthObj?.userProfile?.facilities, AuthObj?.registeredFaciltyAddress]);

  useEffect(() => {
    if (
      data.inpatientFacilityAsDefault === false &&
      data.inpatientFacility !== null &&
      data.inpatientFacility?.accountNumber !== null
    ) {
      setFacility(data.inpatientFacility!);
    }
  }, [data.inpatientFacility]);

  const validateAndSetData = (e: any) => {
    newOrderObj?.setIsHandleChangeTriggered(true);
    if (e.target.name === "wasNPWTInitiated") {
      if (e.target.value !== data.wasNPWTInitiated.value) {
        data.dateInitiated = { value: "", valid: ValidationStatus.UNTOUCHED };
      }
      if (e.target.value === "yes") {
        setActive(true);
      } else {
        setActive(false);
      }
    }
    const isValid = validator.validate(e.target.value, e.target.name);
    setData(
      Object.assign({}, data, {
        [e.target.name]: { value: e.target.value, valid: isValid?.status },
      })
    );
  };

  const validateAndSetDate = (date: string | null | undefined) => {
    const formatteddate = convertStringToDate(date);
    newOrderObj?.setIsHandleChangeTriggered(true);
    const isValid = validator.validate(formatteddate!, "dateInitiated");
    setData(
      Object.assign({}, data, {
        dateInitiated: {
          value: formatteddate,
          valid: isValid?.status,
        },
      })
    );
  };

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  const changeFacilityButtonClick = () => {
    setOpen(true);
  };

  const addNewFacility = (newFacility: IFacility) => {
    setFacility(newFacility);
    data.inpatientFacility = newFacility;
    data.inpatientFacilityAsDefault = false;
    setOpen(false);
  };

  return (
    <div className="inpatientTransition-component">
      {!isReviewOrder && (
        <div className="inpatientTransition">
          <h2
            className="inpatientTransition-title"
            data-testid="inpatientTransition-title"
          >
            Inpatient Transition
          </h2>
          <InputWithLabel
            label="Was Negative Pressure Wound Therapy (NPWT) initiated in an inpatient facility or has the patient been on NPWT anytime in the last 60 days?"
            isRequired={true}
            error={data?.wasNPWTInitiated.valid === ValidationStatus.INVALID}
            labelClassName="was-NPWT-initiated"
            testId="inpatientTransition-was-NPWT-initiated"
          >
            <Grid
              className="inpatientTransition-grid-container"
              container
              spacing={2}
            >
              <Grid className="inpatientTransition-grid-item" item xs={6}>
                <RadioGroup
                  name="wasNPWTInitiated"
                  classes={{ root: "radioRoot" }}
                  onChange={validateAndSetData}
                  value={data?.wasNPWTInitiated.value}
                >
                  <FormControlLabel
                    classes={{
                      root:
                        active === true ? "optionRoot-active" : "optionRoot",
                    }}
                    componentsProps={{
                      typography: {
                        classes: {
                          root:
                            active === true ? "optiontxtSelect" : "optiontxt",
                        },
                      },
                    }}
                    control={
                      <Radio
                        icon={<RadioButtonIcon />}
                        checkedIcon={<SelectedRadioButtonIcon />}
                      />
                    }
                    data-testid="inpatientTransition-was-NPWT-initiated-yes"
                    label="Yes"
                    value="yes"
                  />
                  <FormControlLabel
                    classes={{
                      root:
                        active === false ? "optionRoot-active" : "optionRoot",
                    }}
                    componentsProps={{
                      typography: {
                        classes: {
                          root:
                            active === false ? "optiontxtSelect" : "optiontxt",
                        },
                      },
                    }}
                    control={
                      <Radio
                        icon={<RadioButtonIcon />}
                        checkedIcon={<SelectedRadioButtonIcon />}
                      />
                    }
                    data-testid="inpatientTransition-was-NPWT-initiated-no"
                    label="No"
                    value="no"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </InputWithLabel>
          {data.wasNPWTInitiated.value === "yes" && (
            <Grid
              className="inpatientTransition-grid-container"
              container
              spacing={2}
            >
              <Grid className="inpatientTransition-grid-item-yes" item xs={4}>
                <InputWithLabel
                  label="Date Initiated"
                  isRequired={true}
                  labelClassName={focusClasses.dateInitiated}
                  error={data?.dateInitiated.valid === ValidationStatus.INVALID}
                  testId="inpatientTransition-date-initiated"
                >
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      components={{ OpenPickerIcon: CalendarIcon }}
                      InputAdornmentProps={{
                        classes: {
                          root: "adornedRoot",
                        },
                      }}
                      InputProps={{
                        classes: {
                          root: `dateInitiated ${
                            data?.dateInitiated.valid ===
                            ValidationStatus.INVALID
                              ? "showError"
                              : "noError"
                          }`,
                          input: "input",
                          notchedOutline: "outline",
                        },
                      }}
                      onChange={(value) => validateAndSetDate(value)}
                      renderInput={(params) => {
                        params.error = false;
                        params.inputProps!.placeholder = "__/__/____";
                        return (
                          <TextField
                            data-testid="inpatientTransition-date-initiated-value"
                            name="dateInitiated"
                            onFocus={(e) => setClasses(e, "Mui-focused")}
                            onBlur={(e) => setClasses(e, "")}
                            {...params}
                          />
                        );
                      }}
                      value={data?.dateInitiated.value}
                    />
                  </LocalizationProvider>
                </InputWithLabel>
              </Grid>
              <Grid className="inpatientTransition-grid-item" item xs={12}>
                <div className="facilityDetail">
                  {facility && (
                    <FacilityInfoDetail
                      facilityInfo={facility}
                      index={0}
                      key={0}
                      openConfirmationBox={null}
                      showTrash={false}
                    />
                  )}
                </div>
              </Grid>
              <Button
                classes={{ root: "button-change-facility" }}
                data-testid="button-change-facility"
                variant="outlined"
                onClick={changeFacilityButtonClick}
              >
                Change Facility
              </Button>
            </Grid>
          )}
          <AddFacilityContext.Provider
            value={{
              closePopup: () => setOpen(false),
              facilitySearchValidator: new Validator(),
              addFacilityToList: addNewFacility,
            }}
          >
            <Popup
              dialogParentClass="add-facility-popup"
              openFlag={open}
              closeHandler={() => setOpen(false)}
            >
              <AddFacilityContainer isForNewOrder={true} />
            </Popup>
          </AddFacilityContext.Provider>
        </div>
      )}
      {isReviewOrder && (
        <InpatientTransitionReviewOrder
          data={data}
          facility={data.inpatientFacility}
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
        />
      )}
    </div>
  );
};
