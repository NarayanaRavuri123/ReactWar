import "./woundInformation.review.css";
import { Button } from "@mui/material";
import { IDischargeRequest } from "../../dischargeRequest.interface";
import WoundTitleValue from "../../../../myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import {
  formatDate,
  handleEmptyValue,
} from "../../../../../util/utilityFunctions";
import moment from "moment";
type Props = {
  dischargeData?: IDischargeRequest;
  setDischargeData?: Function;
  woundInfoDetails?: any;
  dischargeRequestEditBtnClick?: () => void;
  isSummaryDischargePage?: boolean;
};
const WoundInformationReview = ({
  dischargeData,
  woundInfoDetails,
  dischargeRequestEditBtnClick,
  isSummaryDischargePage,
}: Props) => {
  return (
    <>
      <div className="review-wound-title" data-testId="woundInfo-title">
        <>
          Wound Information
          {!isSummaryDischargePage && (
            <Button
              classes={{ root: "wound-button-edit" }}
              data-testId="wound-button-edit-test"
              onClick={dischargeRequestEditBtnClick}
            >
              Edit
            </Button>
          )}
        </>
      </div>
      <div
        className="wound-therapy-info-div"
        data-testId="wound-therapy-info-div"
      >
        <WoundTitleValue
          title="Therapy Discontinued Date"
          value={formatDate(moment().toString())}
          formatValue={false}
        />
      </div>
      <div className="review-wound-title-one" data-testId="wound-subtitle">
        Wound #1
      </div>
      <div className="wound-info-div" data-testId="wound-info-div">
        <WoundTitleValue
          title="Wound Location"
          value={woundInfoDetails.wounds[0].location}
          formatValue={false}
        />
        <WoundTitleValue
          title="Last Measurement provided Date"
          value={handleEmptyValue(
            formatDate(woundInfoDetails.wounds[0].evaluationDate)
          )}
          formatValue={false}
        />
        <WoundTitleValue
          title="Final Measurement Date"
          value={dischargeData?.woundFinalMeasurementDate1?.value!}
          formatValue={false}
        />
        <WoundTitleValue
          title="Wound Type"
          value={woundInfoDetails.wounds[0].type}
          formatValue={false}
        />
        <WoundTitleValue
          title="Last measurements Provided"
          value={`L ${handleEmptyValue(
            woundInfoDetails.wounds[0].length
          )} cm x W ${handleEmptyValue(
            woundInfoDetails.wounds[0].width
          )} cm x D ${handleEmptyValue(woundInfoDetails.wounds[0].depth)} cm`}
          formatValue={false}
        />
        <WoundTitleValue
          title="Final measurements Provided"
          value={`L ${handleEmptyValue(
            dischargeData?.woundMeasurementLenght1.value!
          )} cm x W ${handleEmptyValue(
            dischargeData?.woundMeasurementWidth1.value!
          )} cm x D ${handleEmptyValue(
            dischargeData?.woundMeasurementDepth1.value!
          )} cm`}
          formatValue={false}
        />
      </div>
      {woundInfoDetails.wounds.length > 1 && (
        <>
          <div className="review-wound-title-two" data-testId="wound-second">
            Wound #2
          </div>
          <div
            className="woundsecond-info-div"
            data-testId="woundsecond-info-div"
          >
            <WoundTitleValue
              title="Wound Location"
              value={woundInfoDetails.wounds[1].location}
              formatValue={false}
            />
            <WoundTitleValue
              title="Last Measurement provided Date"
              value={handleEmptyValue(
                formatDate(woundInfoDetails.wounds[1].evaluationDate)
              )}
              formatValue={false}
            />
            <WoundTitleValue
              title="Final Measurement Date"
              value={dischargeData?.woundFinalMeasurementDate2?.value!}
              formatValue={false}
            />
            <WoundTitleValue
              title="Wound Type"
              value={woundInfoDetails.wounds[1].type}
              formatValue={false}
            />
            <WoundTitleValue
              title="Last measurements Provided"
              value={`L ${handleEmptyValue(
                woundInfoDetails.wounds[1].length
              )} cm x W ${handleEmptyValue(
                woundInfoDetails.wounds[1].width
              )} cm x D ${handleEmptyValue(
                woundInfoDetails.wounds[1].depth
              )} cm`}
              formatValue={false}
            />
            <WoundTitleValue
              title="Final measurements Provided"
              value={`L ${handleEmptyValue(
                dischargeData?.woundMeasurementLenght2.value!
              )} cm x W ${handleEmptyValue(
                dischargeData?.woundMeasurementWidth2.value!
              )} cm x D ${handleEmptyValue(
                dischargeData?.woundMeasurementDepth2.value!
              )} cm`}
              formatValue={false}
            />
          </div>
        </>
      )}
    </>
  );
};

export default WoundInformationReview;
