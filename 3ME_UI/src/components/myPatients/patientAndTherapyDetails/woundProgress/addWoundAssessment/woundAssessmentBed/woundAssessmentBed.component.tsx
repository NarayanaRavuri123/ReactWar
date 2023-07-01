import React, { useEffect } from "react";
import "./woundAssessmentBed.css";
import { IVacTherapyInformation } from "../../../../../newOrder/woundBed/vacTherapyInformation.interface";
import { IAddWoundAssessment } from "../addWoundAssessment.interface";
import { AddWoundAssessmentValidator } from "../addWoundAssessment.validator";
import { Tooltip } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CMS_VAC_THERAPY_INFORMATION_CONTENT } from "../../../../../../util/staticText";
import { getCMSContent } from "../../../../../../util/cmsService";
import { WoundBedToggleButton } from "../../../../../newOrder/woundBed/woundBedToggleGroup/woundBed.toggleButton";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import {
  Epthilization,
  Eschar,
  Granulation,
  Slough,
} from "../../../../../newOrder/woundBed/woundBed.Data";
import { WoundAssessmentType } from "../woundAssessmentPageSection.enum";
import ReviewWoundAssessmentBed from "./reviewWoundAssessmentBed/reviewWoundAssessmentBed.component";

interface Props {
  data: IAddWoundAssessment;
  setData: React.Dispatch<React.SetStateAction<IAddWoundAssessment>>;
  Validator?: AddWoundAssessmentValidator;
  isReviewAssessment?: boolean;
  isWoundAssessmentSummary?: any;
  editButtonClicked?: any;
}

export const WoundAssessmentBed = ({
  data,
  setData,
  Validator = new AddWoundAssessmentValidator(),
  isReviewAssessment = false,
  isWoundAssessmentSummary,
  editButtonClicked,
}: Props) => {
  const [vacTherapyInformationData, setvacTherapyInformationData] =
    React.useState<IVacTherapyInformation>();
  const [granulation, setGranulation] = React.useState(Granulation);
  const [epthilization, setEpthilization] = React.useState(Epthilization);
  const [slough, setSlough] = React.useState(Slough);
  const [eschar, setEschar] = React.useState(Eschar);

  const fetchVACTherapyInformationData = async () => {
    //async and await
    try {
      const data = await getCMSContent(CMS_VAC_THERAPY_INFORMATION_CONTENT);
      if (data.item !== undefined) {
        setvacTherapyInformationData(data.item);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const selectHandleWoundBedChange = (e: any, newforamt: any, name: string) => {
    let value = newforamt;
    if (name === "granulationValue") {
      granulation.forEach((x: any) => {
        x.code === newforamt ? (x.selected = true) : (x.selected = false);
      });
      setGranulation(granulation);
    }
    if (name === "epthilizationValue") {
      epthilization.forEach((x: any) => {
        x.code === newforamt ? (x.selected = true) : (x.selected = false);
      });
      setEpthilization(epthilization);
    }
    if (name === "sloughValue") {
      slough.forEach((x: any) => {
        x.code === newforamt ? (x.selected = true) : (x.selected = false);
      });
      setSlough(slough);
    }
    if (name === "escharValue") {
      eschar.forEach((x: any) => {
        x.code === newforamt ? (x.selected = true) : (x.selected = false);
      });
      setEschar(eschar);
    }
    setData({
      ...data,
      [name]: {
        value: value === null ? "" : value,
        valid: ValidationStatus.VALID,
        required: false,
      },
    });
  };

  const getIntValue = (str: string) => {
    if (str) {
      return parseInt(str.substring(3, 6));
    }
    return 0;
  };

  const checkAnyValueSelected = (): boolean => {
    return (
      data?.granulationValue.value.length > 0 ||
      data?.epthilizationValue.value.length > 0 ||
      data?.sloughValue.value.length > 0 ||
      data?.escharValue.value.length > 0
    );
  };

  useEffect(() => {
    fetchVACTherapyInformationData();
  }, []);

  useEffect(() => {
    if (data?.assessmentType.value !== WoundAssessmentType.MWP) {
      const total = [
        getIntValue(data?.granulationValue.value),
        getIntValue(data?.epthilizationValue.value),
        getIntValue(data?.sloughValue.value),
        data?.woundEscharStatus.value === "yes"
          ? getIntValue(data?.escharValue.value)
          : 0,
      ];
      let totalBed = total.reduce((a, b) => a + b);
      let validStatus = ValidationStatus.INVALID;
      if (totalBed === 100) {
        validStatus = ValidationStatus.VALID;
      } else if (totalBed === 0 && !checkAnyValueSelected()) {
        validStatus = ValidationStatus.UNTOUCHED;
      } else {
        totalBed = totalBed;
      }
      setData({
        ...data,
        woundBedTotal: {
          value: totalBed.toString(),
          valid: validStatus,
          required: true,
        },
      });
    }
  }, [
    data?.granulationValue.value,
    data?.epthilizationValue.value,
    data?.sloughValue.value,
    data?.escharValue.value,
    data?.woundEscharStatus.value,
  ]);

  return (
    <div className="assess-woundbed-component">
      {!isReviewAssessment ? (
        <div className="assessWoundbed">
          <div
            className="assess-woundBedMainContainer"
            data-testid="assess-woundBedMainContainer"
          >
            <div className="assess-woundBedHeaderDiv">
              <h2
                className="assess-woundBedTitle"
                data-testid="assess-woundBedTitleTest"
              >
                {vacTherapyInformationData &&
                  vacTherapyInformationData?.bubbleInfo[1]?.section}
              </h2>
              <Tooltip
                classes={{ tooltip: "wndBedtooltip", popper: "wndBedpopper" }}
                title={
                  <>
                    <div className="tooltip-content">
                      <div className="tooltip-header">
                        {vacTherapyInformationData &&
                          vacTherapyInformationData?.bubbleInfo[1]
                            ?.sectionHeader}

                        <div className="tooltip-body">
                          {vacTherapyInformationData &&
                            vacTherapyInformationData?.bubbleInfo[1]
                              ?.sectionContent}
                        </div>
                      </div>
                    </div>
                  </>
                }
                data-testid="assess-woundBedTooltipTest"
              >
                <InfoOutlinedIcon
                  color="primary"
                  classes={{ root: "tooltipRoot" }}
                />
              </Tooltip>
            </div>
            <div className="assess-woundBedInfoDiv">
              <span className="assess-woundBedInfo">
                Percentages should add upto 100%
              </span>
            </div>
            <WoundBedToggleButton
              groupValue={data?.granulationValue.value}
              groupOnChange={(e: any, newformat: any) =>
                selectHandleWoundBedChange(e, newformat, "granulationValue")
              }
              buttonValue={granulation}
              label={vacTherapyInformationData?.beefyBrightRedTissue?.LabelText}
              imgLink={
                vacTherapyInformationData?.beefyBrightRedTissue?.FileLink
              }
            />
            <WoundBedToggleButton
              groupValue={data?.epthilizationValue.value}
              groupOnChange={(e: any, newformat: any) =>
                selectHandleWoundBedChange(e, newformat, "epthilizationValue")
              }
              buttonValue={epthilization}
              label={vacTherapyInformationData?.dullPinkRedTissue?.LabelText}
              imgLink={vacTherapyInformationData?.dullPinkRedTissue?.FileLink}
            />
            <WoundBedToggleButton
              groupValue={data?.sloughValue.value}
              groupOnChange={(e: any, newformat: any) =>
                selectHandleWoundBedChange(e, newformat, "sloughValue")
              }
              buttonValue={slough}
              label={
                vacTherapyInformationData?.whiteGreyYellowTissue?.LabelText
              }
              imgLink={
                vacTherapyInformationData?.whiteGreyYellowTissue?.FileLink
              }
            />
            {data.woundEscharStatus.value === "yes" && (
              <WoundBedToggleButton
                groupValue={data?.escharValue.value}
                groupOnChange={(e: any, newformat: any) =>
                  selectHandleWoundBedChange(e, newformat, "escharValue")
                }
                buttonValue={eschar}
                label={vacTherapyInformationData?.blackEscharTissue?.LabelText}
                imgLink={vacTherapyInformationData?.blackEscharTissue?.FileLink}
              />
            )}
            <div className="assess-woundBedPercentDiv">
              <span
                className="assess-woundBedPercent"
                data-testid="assess-woundBedPercentTest"
              >
                Percent of wound described:{" "}
                <b> {data?.woundBedTotal.value} %</b>
              </span>
            </div>

            {data?.woundBedTotal?.valid === ValidationStatus.INVALID && (
              <span className="assess-woundBedError">
                Above selected percentages should add up to 100%
              </span>
            )}
          </div>
        </div>
      ) : (
        <ReviewWoundAssessmentBed
          data={data}
          editButtonClicked={editButtonClicked}
          isWoundAssessmentSummary={isWoundAssessmentSummary}
        />
      )}
    </div>
  );
};
