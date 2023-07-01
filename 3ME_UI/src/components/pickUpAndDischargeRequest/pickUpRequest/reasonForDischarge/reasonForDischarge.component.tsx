import { useState, useContext } from "react";
import "./reasonForDischarge.css";
import { IPickUpRequest } from "../pickUpRequest.interface";
import { PickUpRequestValidator } from "../pickUpRequest.validator";
import { IReasonForDischarge } from "./reasonForDischarge.interface";
import { FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { ReactComponent as RadioButtonIcon } from "../../../../assets/radioButton.svg";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../../assets/selectedRadioButton.svg";
import { setActiveValue } from "../../../../util/utilityFunctions";
import {
  PickUpRequestContext,
  PickUpRequestContextType,
} from "../../../../context/PickUpRequestContext";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { defaultTransferPatientData } from "../../../send3MNote/transferPatient/transferPatient.model";
import { defaultPickUpRequestData } from "../pickUpRequest.model";

export const ReasonForDischarge = ({
  data,
  setData,
  Validator = new PickUpRequestValidator(),
}: IReasonForDischarge) => {
  const [validator] = useState<PickUpRequestValidator>(Validator!);
  const [active, setActive] = useState<boolean | null>(
    setActiveValue(data.reasonForDischarge.value)
  );
  const pickUpRequestObj = useContext<PickUpRequestContextType | null>(
    PickUpRequestContext
  );

  const validateAndSetData = (e: any) => {
    if (e.target.name === "reasonForDischarge") {
      if (e.target.value === "yes") {
        setActive(true);
        pickUpRequestObj?.setData({
          ...getDeepClone(defaultPickUpRequestData),
          reasonForDischarge: {
            valid: ValidationStatus.VALID,
            value: "yes",
            required: true,
          },
        });
      } else if (e.target.value === "no") {
        pickUpRequestObj?.setTransferPatientDetail(
          getDeepClone(defaultTransferPatientData)
        );
        setActive(false);
      } else {
        setActive(null);
      }
    }
    const isValid = validator.validate(e.target.value, e.target.name);
    setData((dt: IPickUpRequest) => ({
      ...dt,
      [e.target.name]: {
        value: e.target.value,
        valid: isValid?.status,
        required: true,
      },
    }));
  };

  return (
    <div className="reason-for-discahrge" data-testid="reason-for-discahrge">
      <Grid className="pickup-request-grid-container" container spacing={2}>
        <Grid className="pickup-request-grid-item" item xs={12}>
          <InputWithLabel
            label="Reason for discharge"
            isRequired={true}
            error={data?.reasonForDischarge.valid === ValidationStatus.INVALID}
            testId="pickup-request-reason-for-discharge"
            labelClassName="pickup-request-reason-for-discharge"
          >
            <RadioGroup
              name="reasonForDischarge"
              classes={{ root: "radioRoot" }}
              onChange={validateAndSetData}
              value={data.reasonForDischarge.value}
            >
              <FormControlLabel
                classes={{
                  root: active === true ? "optionRoot-active" : "optionRoot",
                }}
                componentsProps={{
                  typography: {
                    classes: {
                      root: active === true ? "optiontxtSelect" : "optiontxt",
                    },
                  },
                }}
                control={
                  <Radio
                    icon={<RadioButtonIcon />}
                    checkedIcon={<SelectedRadioButtonIcon />}
                  />
                }
                data-testid="pickup-request-reason-for-discharge-yes"
                label="The patient has stopped using the product"
                value="yes"
              />
              <FormControlLabel
                classes={{
                  root: active === false ? "optionRoot-active" : "optionRoot",
                }}
                componentsProps={{
                  typography: {
                    classes: {
                      root: active === false ? "optiontxtSelect" : "optiontxt",
                    },
                  },
                }}
                control={
                  <Radio
                    icon={<RadioButtonIcon />}
                    checkedIcon={<SelectedRadioButtonIcon />}
                  />
                }
                data-testid="pickup-request-reason-for-discharge-no"
                label="This patient is being transferred to another caregiver but remaining on V.A.C.® Therapy"
                value="no"
              />
            </RadioGroup>
          </InputWithLabel>
        </Grid>
      </Grid>
    </div>
  );
};
