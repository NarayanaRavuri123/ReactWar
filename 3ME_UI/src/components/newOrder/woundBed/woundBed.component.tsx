import "./woundBed.css";
import { Tooltip } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { NewOrderValidator } from "../newOrder.validator";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { Epthilization, Granulation, Slough, Eschar } from "./woundBed.Data";
import { WoundBedToggleButton } from "./woundBedToggleGroup/woundBed.toggleButton";
import { INewOrderWoundInfo } from "../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { ISecondaryWoundInfo } from "../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";
import { IVacTherapyInformation } from "./vacTherapyInformation.interface";
import { WoundBedReviewOrder } from "./reviewOrder/woundBedReviewOrder.component";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";

interface Props {
  editButtonClicked?: any;
  isOrderSummary?: boolean;
  isReviewOrder?: boolean;
  isSecondaryWoundInfo?: boolean;
  positionDropDownData?: any;
  setWoundInfoData: Function;
  woundInfoData: INewOrderWoundInfo | ISecondaryWoundInfo;
  vacTherapyInformationData?: IVacTherapyInformation;
  Validator?: NewOrderValidator;
}

const WoundBed = ({
  editButtonClicked,
  isReviewOrder = false,
  isOrderSummary = false,
  isSecondaryWoundInfo,
  setWoundInfoData,
  woundInfoData,
  vacTherapyInformationData,
  Validator = new NewOrderValidator(),
}: Props) => {
  const [validator] = React.useState<NewOrderValidator>(Validator!);
  const [granulation, setGranulation] = React.useState(Granulation);
  const [epthilization, setEpthilization] = React.useState(Epthilization);
  const [slough, setSlough] = React.useState(Slough);
  const [eschar, setEschar] = React.useState(Eschar);
  const [woundBedContent, setWoundBedContent] =
    React.useState<IVacTherapyInformation>();
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const selectHandleWoundBedChange = (e: any, newforamt: any, name: string) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
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
    setWoundInfoData({
      ...woundInfoData,
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
      woundInfoData?.granulationValue.value.length > 0 ||
      woundInfoData?.epthilizationValue.value.length > 0 ||
      woundInfoData?.sloughValue.value.length > 0 ||
      woundInfoData?.escharValue.value.length > 0
    );
  };

  useEffect(() => {
    if (vacTherapyInformationData) {
      setWoundBedContent(vacTherapyInformationData);
    }
  }, []);

  useEffect(() => {
    const total = [
      getIntValue(woundInfoData?.granulationValue.value),
      getIntValue(woundInfoData?.epthilizationValue.value),
      getIntValue(woundInfoData?.sloughValue.value),
      getIntValue(woundInfoData?.escharValue.value),
    ];
    let totalBed = total.reduce((a, b) => a + b);
    let valid = ValidationStatus.INVALID;
    if (totalBed === 100) {
      valid = ValidationStatus.VALID;
    } else if (totalBed === 0 && !checkAnyValueSelected()) {
      valid = ValidationStatus.UNTOUCHED;
    } else {
      totalBed = totalBed;
    }
    setWoundInfoData({
      ...woundInfoData,
      woundBedTotal: {
        value: totalBed.toString(),
        valid: valid,
        required: true,
      },
    });
  }, [
    woundInfoData?.granulationValue.value,
    woundInfoData?.epthilizationValue.value,
    woundInfoData?.sloughValue.value,
    woundInfoData?.escharValue.value,
  ]);

  return (
    <div
      className={
        isSecondaryWoundInfo
          ? "wound-bed-main-container-sec"
          : "wound-bed-main-container"
      }
    >
      {!isReviewOrder && (
        <div
          className="woundBedMainContainer"
          data-testid="woundBedMainContainer"
        >
          <div className="woundBedHeaderDiv">
            <h2 className="woundBedTitle" data-testid="woundBedTitleTest">
              {" "}
              {vacTherapyInformationData &&
                vacTherapyInformationData?.bubbleInfo[1]?.section}{" "}
            </h2>
            <Tooltip
              classes={{ tooltip: "wndBedtooltip", popper: "wndBedpopper" }}
              title={
                <>
                  <div className="tooltip-content">
                    <div className="tooltip-header">
                      {vacTherapyInformationData &&
                        vacTherapyInformationData?.bubbleInfo[1]?.sectionHeader}

                      <div className="tooltip-body">
                        {vacTherapyInformationData &&
                          vacTherapyInformationData?.bubbleInfo[1]
                            ?.sectionContent}
                      </div>
                    </div>
                  </div>
                </>
              }
              data-testid="woundBedTooltipTest"
            >
              <InfoOutlinedIcon
                color="primary"
                classes={{ root: "tooltipRoot" }}
              />
            </Tooltip>
          </div>
          <div className="woundBedInfoDiv">
            <span className="woundBedInfo">
              {" "}
              Percentages should add upto 100%
            </span>
          </div>

          <WoundBedToggleButton
            groupValue={woundInfoData?.granulationValue.value}
            groupOnChange={(e: any, newformat: any) =>
              selectHandleWoundBedChange(e, newformat, "granulationValue")
            }
            buttonValue={granulation}
            label={woundBedContent?.beefyBrightRedTissue?.LabelText}
            imgLink={woundBedContent?.beefyBrightRedTissue?.FileLink}
          />
          <WoundBedToggleButton
            groupValue={woundInfoData?.epthilizationValue.value}
            groupOnChange={(e: any, newformat: any) =>
              selectHandleWoundBedChange(e, newformat, "epthilizationValue")
            }
            buttonValue={epthilization}
            label={woundBedContent?.dullPinkRedTissue?.LabelText}
            imgLink={woundBedContent?.dullPinkRedTissue?.FileLink}
          />
          <WoundBedToggleButton
            groupValue={woundInfoData?.sloughValue.value}
            groupOnChange={(e: any, newformat: any) =>
              selectHandleWoundBedChange(e, newformat, "sloughValue")
            }
            buttonValue={slough}
            label={woundBedContent?.whiteGreyYellowTissue?.LabelText}
            imgLink={woundBedContent?.whiteGreyYellowTissue?.FileLink}
          />
          <WoundBedToggleButton
            groupValue={woundInfoData?.escharValue.value}
            groupOnChange={(e: any, newformat: any) =>
              selectHandleWoundBedChange(e, newformat, "escharValue")
            }
            buttonValue={eschar}
            label={woundBedContent?.blackEscharTissue?.LabelText}
            imgLink={woundBedContent?.blackEscharTissue?.FileLink}
          />
          <div className="woundBedPercentDiv">
            <span className="woundBedPercent" data-testid="woundBedPercentTest">
              Percent of wound described:{" "}
              <b> {woundInfoData?.woundBedTotal.value} %</b>
            </span>
          </div>

          {woundInfoData?.woundBedTotal?.valid === ValidationStatus.INVALID && (
            <span className="woundBedError">
              {" "}
              Above selected percentages should add up to 100%
            </span>
          )}
        </div>
      )}
      {isReviewOrder && (
        <WoundBedReviewOrder
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
          woundInfoData={woundInfoData}
        />
      )}
    </div>
  );
};

export default WoundBed;
