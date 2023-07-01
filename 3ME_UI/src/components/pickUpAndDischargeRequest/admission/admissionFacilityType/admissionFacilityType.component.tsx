import { useEffect, useState } from "react";
import { format } from "react-string-format";
import { Grid, InputBase } from "@mui/material";
import { getdropDownContent } from "../../../../util/dropDownService";
import "./admissionFacilityType.css";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { CustomDropDown } from "../../../../core/customDropdown/customDropdown.component";
import { DD_FACILITY_TYPE_CONTENT } from "../../../../util/staticText";
import { IDischargeRequest } from "../../dischargeRequest/dischargeRequest.interface";
import { DischargeRequestValidator } from "../../dischargeRequest/dischargeRequest.validator";

interface Props {
  dischargeData: IDischargeRequest;
  setDischargeData: Function;
}
export const AdmissionFacilityType = ({
  dischargeData,
  setDischargeData,
}: Props) => {
  const [facilityType, setFacilityType] = useState([]);
  const [facilityTypeText, setFacilityTypeText] = useState([]);
  useEffect(() => {
    fetchDropDownContent();
  }, []);

  const fetchDropDownContent = async () => {
    //async and await
    try {
      const ddContent = format("{0}", DD_FACILITY_TYPE_CONTENT ?? "");
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const facilityTypeObject = data.items.filter(
          (item: { name: string }) => item.name === DD_FACILITY_TYPE_CONTENT
        );
        const facilityTypeData = facilityTypeObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setFacilityType(facilityTypeData);
        setFacilityTypeText(
          facilityTypeData.map((x: { text: string }) => x.text)
        );
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
    if (code !== "" && array.length === 0) {
      return code;
    }
    if (Array.isArray(array)) {
      return array
        .filter((item: { text: string; code: string }) => item.code === code)
        .map((x: { text: string }) => x.text)[0];
    }
    return code;
  };

  const validateAndSetData = (e: any) => {
    const validator = new DischargeRequestValidator();
    let { value, name } = e.target;
    if (e.target.name === "TypeOfFacility") {
      value = getCodeFromText(facilityType, value);
    }
    let isValid = validator.validate(value, name);
    setDischargeData((dischargeData: IDischargeRequest) => ({
      ...dischargeData,
      [e.target.name]: {
        value: value,
        valid: isValid?.status,
        required: true,
      },
    }));
  };
  return (
    <div>
      <div className="facilityinfo">
        <Grid container spacing={2}>
          <Grid item xs={2.5} className="facilitytypeadmit">
            <InputWithLabel
              label="Facility type admitted to"
              isRequired={true}
              error={
                dischargeData.TypeOfFacility.valid === ValidationStatus.INVALID
              }
              testId={"test-facilitytype"}
            >
              <CustomDropDown
                name="TypeOfFacility"
                menuItem={facilityTypeText}
                handleChange={validateAndSetData}
                placeHolder="Select facility type"
                selectpropsClassName={
                  dischargeData.TypeOfFacility
                    ? "facilitytypeadmit-select"
                    : "placeHolder"
                }
                selectClassName={
                  dischargeData.TypeOfFacility
                    ? "facilitytypeadmit-input"
                    : "placeHolder"
                }
                testId="facilitytype-DropDown"
                value={
                  dischargeData.TypeOfFacility.value
                    ? getTextFromCode(
                        facilityType,
                        dischargeData.TypeOfFacility.value
                      )
                    : null
                }
              />
            </InputWithLabel>
          </Grid>

          <Grid item xs={6} className="facilitytyname">
            <InputWithLabel
              label="Facility name"
              isRequired={false}
              testId="facility-name-label"
              error={
                dischargeData.facilityname.valid === ValidationStatus.INVALID
              }
            >
              <InputBase
                className="facilityname-input"
                inputProps={{
                  "data-testid": "facility-name-value",
                }}
                name="facilityname"
                value={dischargeData.facilityname.value}
                onChange={validateAndSetData}
              />
            </InputWithLabel>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
