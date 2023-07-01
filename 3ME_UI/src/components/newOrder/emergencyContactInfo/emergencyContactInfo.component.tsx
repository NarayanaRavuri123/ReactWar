import "./emergencyContactInfo.css";
import React, { useContext, useState } from "react";
import InputMask from "react-input-mask";
import { Box, Grid, InputBase } from "@mui/material";
import { NewOrderValidator } from "../newOrder.validator";
import { IEmergencyContactInfo } from "./emergencyContactInfo.interface";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { EmergencyContactReviewOrder } from "./reviewOrder/emergencyContactReviewOrder.component";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";

export const EmergencyContactInfo = ({
  data,
  Validator = new NewOrderValidator(),
  setData,
  isReviewOrder = false,
  editButtonClicked,
  isOrderSummary = false,
}: IEmergencyContactInfo) => {
  const [validator] = React.useState<NewOrderValidator>(Validator!);
  const [focusClasses, setFocusClasses] = useState({
    emergencyContactPhoneNumber: "",
  });
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    let isValid = validator.validate(e.target.value, e.target.name);
    if (
      e.target.name === "emergencyContactPhoneNumber" &&
      data.emergencyContactPhoneNumber.value === "(___) ___-____" &&
      (e.target.value === "(___) ___-____" || e.target.value === "")
    ) {
      return;
    }
    setData(
      Object.assign({}, data, {
        [e.target.name]: { value: e.target.value, valid: isValid?.status },
      })
    );
  };

  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };

  return (
    <div
      className={
        isReviewOrder
          ? "emergencyContactInfo-review-order"
          : "emergencyContactInfo"
      }
      data-testid="emergencyContactInfo"
    >
      {!isReviewOrder && (
        <div>
          <h2
            className="emergencyContactInfo-title"
            data-testid="emergencyContactInfo-title"
          >
            Emergency Contact Info (recommended)
          </h2>
          <Box
            className="emergencyContactInfo-box-container"
            sx={{ flexGrow: 1 }}
          >
            <Grid
              classes={{ root: "emergencyContactInfo-grid-container" }}
              container
              spacing={2}
            >
              <Grid item xs={6} className="grid-item-width">
                <InputWithLabel
                  label="First Name"
                  isRequired={false}
                  error={
                    data?.emergencyContactFirstName.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="first-name-label"
                >
                  <InputBase
                    className="emergencyContactInfo-input"
                    inputProps={{
                      "data-testid": "first-name-value",
                    }}
                    name="emergencyContactFirstName"
                    onChange={validateAndSetData}
                    value={data?.emergencyContactFirstName.value}
                  />
                </InputWithLabel>
              </Grid>
              <Grid item xs={6} className="grid-item-width">
                <InputWithLabel
                  label="Last Name"
                  isRequired={false}
                  error={
                    data?.emergencyContactLastName.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="last-name-label"
                >
                  <InputBase
                    className="emergencyContactInfo-input"
                    inputProps={{
                      "data-testid": "last-name-value",
                    }}
                    name="emergencyContactLastName"
                    value={data?.emergencyContactLastName.value}
                    onChange={validateAndSetData}
                  />
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
          <Box
            className="emergencyContactInfo-box-container"
            sx={{ flexGrow: 1 }}
          >
            <Grid
              classes={{ root: "emergencyContactInfo-grid-container" }}
              container
              spacing={2}
            >
              <Grid item xs={6}>
                <InputWithLabel
                  label="Phone Number"
                  isRequired={false}
                  error={
                    data.emergencyContactPhoneNumber.valid ===
                    ValidationStatus.INVALID
                  }
                  labelClassName={focusClasses.emergencyContactPhoneNumber}
                  testId="phone-number-label"
                >
                  <InputMask
                    className="emergencyContactPhoneNumber"
                    data-testid="phone-number-value"
                    mask="(999) 999-9999"
                    name="emergencyContactPhoneNumber"
                    onBlur={(e) => setClasses(e, "")}
                    onChange={validateAndSetData}
                    onFocus={(e) => setClasses(e, "Mui-focused")}
                    placeholder="(___) ___-____"
                    value={data.emergencyContactPhoneNumber.value}
                  />
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
      {isReviewOrder && (
        <EmergencyContactReviewOrder
          data={data}
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
        />
      )}
    </div>
  );
};
