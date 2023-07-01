import "./woundAssessmentUndermining.css";
import { useEffect, useState } from "react";
import { format } from "react-string-format";
import { resetWoundUndermining } from "../woundAssessment.utils";
import { getdropDownContent } from "../../../../../../util/dropDownService";
import { DD_UNDERMINING_POSITION } from "../../../../../../util/staticText";
import { Box, FormControlLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import { woundAssessmentUnderminingProps } from "./woundAssessmentUndermining.interface";
import { ReactComponent as RadioButtonIcon } from "../../../../../../assets/radioButton.svg";
import { InputWithLabel } from "../../../../../../core/inputWithLabel/inputWithLabel.component";
import { ReactComponent as SelectedRadioButtonIcon } from "../../../../../../assets/selectedRadioButton.svg";
import AssessmentUnderminingDetails from "./woundAssessmentUnderminingDetails/woundAssessmentUnderminingDetails.component";
import ReviewWoundUndermining from "./reviewWoundUndermining/reviewWoundUndermining.component";

const WoundAssessmentUndermining = ({
  isSecondaryWoundInfo,
  setData,
  data,
  isReviewAssessment = false,
  editButtonClicked,
  isWoundAssessmentSummary,
}: woundAssessmentUnderminingProps) => {
  const [underminingPositionOptions, setUnderminingPositionOptions] = useState(
    []
  );

  const validateAndSetData = (e: any) => {
    let { value, name } = e.target;
    if (name === "woundUndermining") {
      if (value === "yes") {
        resetWoundUndermining(data, setData, true, value);
      } else if (value === "no") {
        resetWoundUndermining(data, setData, false, value);
      }
    }
  };

  const fetchdropDownContent = async () => {
    try {
      const ddContent = format("{0}", DD_UNDERMINING_POSITION);
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const positionObject = data.items.filter(
          (item: { name: string }) => item.name === DD_UNDERMINING_POSITION
        );
        const positionData = positionObject[0].data
          .sort((a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
          )
          .map((x: { code: any }) => x.code);
        setUnderminingPositionOptions(positionData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchdropDownContent();
  }, []);

  return (
    <div className="wound-undermining-component">
      {!isReviewAssessment ? (
        <div
          className={
            isSecondaryWoundInfo
              ? "wound-undermining-main-container-sec"
              : "wound-undermining-main-container"
          }
        >
          <div className="undermining" data-testid="undermining">
            <h2 className="undermining-title" data-testid="undermining-title">
              Wound Undermining
            </h2>
            <Box className="undermining-box-container" sx={{ flexGrow: 1 }}>
              <Grid
                className="undermining-grid-container"
                container
                spacing={2}
              >
                <Grid className="undermining-grid-item" item xs={6}>
                  <InputWithLabel
                    label="Is undermining present in the wound?"
                    isRequired={data?.woundUndermining.required}
                    error={
                      data?.woundUndermining.valid === ValidationStatus.INVALID
                    }
                    testId="woundUndermining-desp"
                  >
                    <RadioGroup
                      name="woundUndermining"
                      classes={{ root: "radioRoot" }}
                      onChange={validateAndSetData}
                      value={data?.woundUndermining.value}
                    >
                      <FormControlLabel
                        classes={{
                          root:
                            data.woundUndermining.value === "yes"
                              ? "optionRoot-active"
                              : "optionRoot",
                        }}
                        componentsProps={{
                          typography: {
                            classes: {
                              root:
                                data.woundUndermining.value === "yes"
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
                        data-testid="woundUndermining-Yes"
                        label="Yes"
                        value="yes"
                      />
                      <FormControlLabel
                        classes={{
                          root:
                            data.woundUndermining.value === "no"
                              ? "optionRoot-active"
                              : "optionRoot",
                        }}
                        componentsProps={{
                          typography: {
                            classes: {
                              root:
                                data.woundUndermining.value === "no"
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
                        data-testid="woundUndermining-No"
                        label="No"
                        value="no"
                      />
                    </RadioGroup>
                  </InputWithLabel>
                </Grid>
              </Grid>
            </Box>
            {data.woundUndermining.value === "yes" && (
              <AssessmentUnderminingDetails
                data={data}
                setData={setData}
                positionDropDownData={underminingPositionOptions}
              />
            )}
          </div>
        </div>
      ) : (
        <ReviewWoundUndermining
          data={data}
          editButtonClicked={editButtonClicked}
          isWoundAssessmentSummary={isWoundAssessmentSummary}
        />
      )}
    </div>
  );
};

export default WoundAssessmentUndermining;
