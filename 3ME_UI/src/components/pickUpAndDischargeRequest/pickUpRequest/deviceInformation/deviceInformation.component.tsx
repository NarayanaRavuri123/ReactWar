import { useEffect, useRef, useState } from "react";
import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ReactComponent as RadioButtonIcon } from "../../../../assets/radioButton.svg";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../../assets/selectedRadioButton.svg";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { IPickUpRequest } from "../pickUpRequest.interface";
import { IDeviceInformation } from "./deviceInformation.interface";
import { PickUpRequestValidator } from "../pickUpRequest.validator";
import "./deviceInformation.css";
import DeviceInformationReview from "./deviceInformationReview/deviceInformationReview.component";

export const DeviceInformation = ({
  data,
  setData,
  Validator = new PickUpRequestValidator(),
  isConfirmPickUpSummary = false,
}: IDeviceInformation) => {
  const [validator] = useState<PickUpRequestValidator>(Validator!);
  const [focusClasses, setFocusClasses] = useState({
    describeTheInjury: "",
    describeTheProblem: "",
  });
  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };
  const initialRender1 = useRef(true);
  const initialRender2 = useRef(true);

  const validateAndSetData = (e: any) => {
    const isValid = validator.validate(e.target.value, e.target.name);
    setData((data: IPickUpRequest) => ({
      ...data,
      [e.target.name]: {
        value: e.target.value,
        valid: isValid?.status,
        required: e.target.required,
      },
    }));
  };

  useEffect(() => {
    if (initialRender1.current) {
      initialRender1.current = false;
    } else {
      setData((dt: IPickUpRequest) => ({
        ...dt,
        describeTheInjury: {
          valid: ValidationStatus.UNTOUCHED,
          value: "",
          required: data.injuryCauseBy3MDevice.value === "yes",
        },
      }));
    }
  }, [data.injuryCauseBy3MDevice.value]);

  useEffect(() => {
    if (initialRender2.current) {
      initialRender2.current = false;
    } else {
      setData((dt: IPickUpRequest) => ({
        ...dt,
        describeTheProblem: {
          valid: ValidationStatus.UNTOUCHED,
          value: "",
          required: data.problemWith3MDevice.value === "yes",
        },
      }));
    }
  }, [data.problemWith3MDevice.value]);

  return !isConfirmPickUpSummary ? (
    <div className="device-information">
      <h2 className="device-information-header">Device Information</h2>
      <div className="device-information-part-one">
        <Grid
          className="device-information-grid-container"
          container
          spacing={2}
        >
          <Grid className="device-information-grid-item" item xs={12}>
            <InputWithLabel
              error={
                data.injuryCauseBy3MDevice.valid === ValidationStatus.INVALID
              }
              isRequired={data.injuryCauseBy3MDevice.required}
              label="Did the 3M device potentially cause or contribute to an injury?"
              testId="device-information-injuryCauseBy3MDevice"
            >
              <RadioGroup
                name="injuryCauseBy3MDevice"
                classes={{ root: "radioRoot" }}
                onChange={validateAndSetData}
                value={data.injuryCauseBy3MDevice.value}
              >
                <FormControlLabel
                  classes={{
                    root:
                      data.injuryCauseBy3MDevice.value === "yes"
                        ? "optionRoot-active"
                        : "optionRoot",
                  }}
                  componentsProps={{
                    typography: {
                      classes: {
                        root:
                          data.injuryCauseBy3MDevice.value === "yes"
                            ? "optiontxtSelect"
                            : "optiontxt",
                      },
                    },
                  }}
                  control={
                    <Radio
                      icon={<RadioButtonIcon />}
                      checkedIcon={<SelectedRadioButtonIcon />}
                      required={data.injuryCauseBy3MDevice.required}
                    />
                  }
                  data-testid="device-information-injuryCauseBy3MDevice-yes"
                  label="Yes"
                  value="yes"
                />
                <FormControlLabel
                  classes={{
                    root:
                      data.injuryCauseBy3MDevice.value === "no"
                        ? "optionRoot-active"
                        : "optionRoot",
                  }}
                  componentsProps={{
                    typography: {
                      classes: {
                        root:
                          data.injuryCauseBy3MDevice.value === "no"
                            ? "optiontxtSelect"
                            : "optiontxt",
                      },
                    },
                  }}
                  control={
                    <Radio
                      icon={<RadioButtonIcon />}
                      checkedIcon={<SelectedRadioButtonIcon />}
                      required={data.injuryCauseBy3MDevice.required}
                    />
                  }
                  data-testid="device-information-injuryCauseBy3MDevice-no"
                  label="No"
                  value="no"
                />
                <FormControlLabel
                  classes={{
                    root:
                      data.injuryCauseBy3MDevice.value === "unknown"
                        ? "optionRoot-active"
                        : "optionRoot",
                  }}
                  componentsProps={{
                    typography: {
                      classes: {
                        root:
                          data.injuryCauseBy3MDevice.value === "unknown"
                            ? "optiontxtSelect"
                            : "optiontxt",
                      },
                    },
                  }}
                  control={
                    <Radio
                      icon={<RadioButtonIcon />}
                      checkedIcon={<SelectedRadioButtonIcon />}
                      required={data.injuryCauseBy3MDevice.required}
                    />
                  }
                  data-testid="device-information-injuryCauseBy3MDevice-unknown"
                  label="Unknown"
                  value="unknown"
                />
              </RadioGroup>
            </InputWithLabel>
          </Grid>
          {data.injuryCauseBy3MDevice.value === "yes" && (
            <Grid className="device-information-grid-item" item xs={12}>
              <InputWithLabel
                error={
                  data.describeTheInjury.valid === ValidationStatus.INVALID
                }
                isRequired={data.describeTheInjury.required}
                label="Describe the injury."
                labelClassName={focusClasses.describeTheInjury}
                testId="device-information-describe-the-injury"
              >
                <TextField
                  error={
                    data.describeTheInjury.valid === ValidationStatus.INVALID
                  }
                  FormHelperTextProps={{ classes: { root: "helperText" } }}
                  fullWidth
                  InputProps={{ classes: { root: "textarea-root" } }}
                  multiline
                  name="describeTheInjury"
                  onBlur={(e) => setClasses(e, "")}
                  onChange={validateAndSetData}
                  onFocus={(e) => setClasses(e, "Mui-focused")}
                  required={data.describeTheInjury.required}
                  rows={4}
                  value={data.describeTheInjury.value}
                />
              </InputWithLabel>
            </Grid>
          )}
        </Grid>
      </div>
      <div className="device-information-part-two">
        <Grid
          className="device-information-grid-container"
          container
          spacing={2}
        >
          <Grid className="device-information-grid-item" item xs={12}>
            <InputWithLabel
              error={
                data.problemWith3MDevice.valid === ValidationStatus.INVALID
              }
              isRequired={data.problemWith3MDevice.required}
              label="Is there a problem with the functionality of the 3M device?"
              testId="device-information-problemWith3MDevice"
            >
              <RadioGroup
                name="problemWith3MDevice"
                classes={{ root: "radioRoot" }}
                onChange={validateAndSetData}
                value={data.problemWith3MDevice.value}
              >
                <FormControlLabel
                  classes={{
                    root:
                      data.problemWith3MDevice.value === "yes"
                        ? "optionRoot-active"
                        : "optionRoot",
                  }}
                  componentsProps={{
                    typography: {
                      classes: {
                        root:
                          data.problemWith3MDevice.value === "yes"
                            ? "optiontxtSelect"
                            : "optiontxt",
                      },
                    },
                  }}
                  control={
                    <Radio
                      icon={<RadioButtonIcon />}
                      checkedIcon={<SelectedRadioButtonIcon />}
                      required={data.problemWith3MDevice.required}
                    />
                  }
                  data-testid="device-information-problemWith3MDevice-yes"
                  label="Yes"
                  value="yes"
                />
                <FormControlLabel
                  classes={{
                    root:
                      data.problemWith3MDevice.value === "no"
                        ? "optionRoot-active"
                        : "optionRoot",
                  }}
                  componentsProps={{
                    typography: {
                      classes: {
                        root:
                          data.problemWith3MDevice.value === "no"
                            ? "optiontxtSelect"
                            : "optiontxt",
                      },
                    },
                  }}
                  control={
                    <Radio
                      icon={<RadioButtonIcon />}
                      checkedIcon={<SelectedRadioButtonIcon />}
                      required={data.problemWith3MDevice.required}
                    />
                  }
                  data-testid="device-information-problemWith3MDevice-no"
                  label="No"
                  value="no"
                />
                <FormControlLabel
                  classes={{
                    root:
                      data.problemWith3MDevice.value === "unknown"
                        ? "optionRoot-active"
                        : "optionRoot",
                  }}
                  componentsProps={{
                    typography: {
                      classes: {
                        root:
                          data.problemWith3MDevice.value === "unknown"
                            ? "optiontxtSelect"
                            : "optiontxt",
                      },
                    },
                  }}
                  control={
                    <Radio
                      icon={<RadioButtonIcon />}
                      checkedIcon={<SelectedRadioButtonIcon />}
                      required={data.problemWith3MDevice.required}
                    />
                  }
                  data-testid="device-information-problemWith3MDevice-unknown"
                  label="Unknown"
                  value="unknown"
                />
              </RadioGroup>
            </InputWithLabel>
          </Grid>
          {data.problemWith3MDevice.value === "yes" && (
            <Grid className="device-information-grid-item" item xs={12}>
              <InputWithLabel
                error={
                  data.describeTheProblem.valid === ValidationStatus.INVALID
                }
                isRequired={data.describeTheProblem.required}
                label="Describe the problem with the 3M Device."
                labelClassName={focusClasses.describeTheProblem}
                testId="device-information-describe-the-problem"
              >
                <TextField
                  error={
                    data.describeTheProblem.valid === ValidationStatus.INVALID
                  }
                  FormHelperTextProps={{ classes: { root: "helperText" } }}
                  fullWidth
                  InputProps={{ classes: { root: "textarea-root" } }}
                  multiline
                  name="describeTheProblem"
                  onBlur={(e) => setClasses(e, "")}
                  onChange={validateAndSetData}
                  onFocus={(e) => setClasses(e, "Mui-focused")}
                  required={data.describeTheProblem.required}
                  rows={4}
                  value={data.describeTheProblem.value}
                />
              </InputWithLabel>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  ) : (
    <DeviceInformationReview data={data} />
  );
};
