import moment from "moment";
import "./patientVACDetail.css";
import { Box } from "@mui/system";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../../context/SupplyOrderContext";
import { useContext, useEffect, useState } from "react";
import { SupplyOrderValidator } from "../supplyOrder.validator";
import { IPatientVACDetail } from "./patientVACDetail.interface";
import { FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { ReactComponent as RadioButtonIcon } from "../../../assets/radioButton.svg";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../assets/selectedRadioButton.svg";
import PatientDetailReviewOrder from "./patientVACDetailReviewOrder/patientDetailReviewOrder.component";

export const PatientVACDetail = ({
  data,
  patient,
  setData,
  vacProductInfo,
  Validator,
  isReviewOrder,
}: IPatientVACDetail) => {
  const [active, setActive] = useState<boolean>(true);
  const [validator] = useState<SupplyOrderValidator>(Validator!);
  const SupplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );

  const validateAndSetData = (e: any) => {
    if (e.target.name === "typeOfOrder") {
      SupplyOrderObj?.setIsBackFromReviewPage(false);
      SupplyOrderObj?.setIsSuppliesSelected(true);
      if (e.target.value === "Yes") {
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

  useEffect(() => {
    if (SupplyOrderObj && SupplyOrderObj.product) {
      data.typeOfOrder = {
        valid: ValidationStatus.VALID,
        value: "No",
      };
    }
    if (
      data &&
      (data.typeOfOrder.value === "Yes" || data.typeOfOrder.value === "No")
    ) {
      setActive(data.typeOfOrder.value === "Yes" ? true : false);
    }
  }, []);

  return (
    <>
      {!isReviewOrder && (
        <div className="patient-vac-details">
          <h3 className="patient-name" data-testid="patient-name">
            {`${patient.lastName}, ${patient.firstName}`}
          </h3>
          <h3 className="patient-dob" data-testid="patient-dob">
            {`DOB: ${moment(patient.dob).format("L")}`}
          </h3>
          <div className="device-details">
            <img
              className="device-image"
              data-testid="device-image"
              src={vacProductInfo.imageLink}
              alt=""
            />
            <h3
              className="device-descriptiopn"
              data-testid="device-descriptiopn"
            >
              {vacProductInfo.brandName}
            </h3>
          </div>
          <Box
            className="patient-vac-details-box-container"
            sx={{ flexGrow: 1 }}
          >
            <Grid
              className="patient-vac-details-grid-container"
              container
              spacing={2}
            >
              <Grid className="patient-vac-details-grid-item" item xs={12}>
                <InputWithLabel
                  error={data.typeOfOrder.valid === ValidationStatus.INVALID}
                  isRequired={false}
                  label="Type of Order"
                  labelClassName="patient-vac-details-type-of-order"
                  testId="patient-vac-details-type-of-order"
                >
                  <RadioGroup
                    name="typeOfOrder"
                    classes={{ root: "radioRoot" }}
                    onChange={validateAndSetData}
                    value={data.typeOfOrder.value}
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
                      data-testid="patient-vac-details-type-of-order-yes"
                      label="Replenish the Previous Supply Order"
                      value="Yes"
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
                              active === false
                                ? "optiontxtSelect"
                                : "optiontxt",
                          },
                        },
                      }}
                      control={
                        <Radio
                          icon={<RadioButtonIcon />}
                          checkedIcon={<SelectedRadioButtonIcon />}
                        />
                      }
                      data-testid="patient-vac-details-type-of-order-no"
                      label="Create a New Supply Order"
                      value="No"
                    />
                  </RadioGroup>
                </InputWithLabel>
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
      {isReviewOrder && (
        <PatientDetailReviewOrder
          patient={patient}
          vacProductInfo={vacProductInfo}
        />
      )}
    </>
  );
};
