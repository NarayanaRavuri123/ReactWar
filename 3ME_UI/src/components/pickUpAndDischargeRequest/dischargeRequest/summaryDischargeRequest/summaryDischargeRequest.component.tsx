import { Grid, Button } from "@mui/material";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import SnackBar from "../../../../core/snackBar/snackBar.component";
import { ReactComponent as DownloadIcon } from "../../../../assets/download.svg";
import { SummaryDischargeRequestHeader } from "./summaryDischargeRequestHeader.component";
import { useState, useContext } from "react";
import "./summaryDischargeRequest.css";
import { ReactComponent as PrintIcon } from "../../../../assets/print.svg";
import { ReactComponent as VectorIcon } from "../../../../assets/Vector.svg";
import { IPatient } from "../../../myPatients/patient.interface";
import { getShipmentLabelPdf } from "../../../../util/pickUpOrDischargeService";
import {
  getPdfUrlGif,
  makeCapitalEachOfWordInString,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import jsPDF from "jspdf";
import ErrorPopup from "../../../../core/errorPopup/errorPopup.component";
import { Popup } from "../../../../core/popup/popup.component";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { useHistory } from "react-router-dom";
import SubmitterInformation from "../submitterInformation/submitterInformation.component";
import {
  DischargeRequestContext,
  DischargeRequestContextType,
} from "../../../../context/DischargeRequestContext";
import WoundInformationDischargeRequest from "../woundInformationDischargeRequest/woundInformationDischargeRequest.component";
import DischargeReqUploadDoc from "../dischargeRequestUploadDocuments/dischargeReqUploadDoc.component";
import { PatientAdmissionType } from "../patientAdmissionType/patientAdmissionType.component";
import { TherapyOutcomes } from "../therapyOutcomes/therapyOutcomes.component";
import WoundTitleValue from "../../../myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import moment from "moment";
import AttestationAndSignature from "../../../../core/attestationAndSignature/attestationAndSignature.component";
import { MobileDisplayContext } from "../../../../context/MobileDisplayContext";

type Props = {
  pdfUrls: string[];
  patient: IPatient;
  woundInfoDetails?: any;
};
const SummaryDischargeRequest = ({
  pdfUrls,
  patient,
  woundInfoDetails,
}: Props) => {
  const { isMobileScreen } = useContext(MobileDisplayContext);
  const [reviewOrderToastFlag, setReviewOrderToastFlag] = useState(false);
  const [failedToPrintShipmentLabel, setFailedToPrintShipmentLabel] =
    useState(false);
  const [getShipmentLabelLoader, setGetShipmentLabelLoader] = useState(false);
  const history = useHistory();
  const DischargeReqObj = useContext<DischargeRequestContextType | null>(
    DischargeRequestContext
  );
  const dischargeData = DischargeReqObj?.dischargeRequestData;
  const setDischargeData = DischargeReqObj?.setDischargeRequestData;

  const handleClickPdfDownload = async () => {
    if (pdfUrls.length > 0) {
      pdfUrls.forEach((url: string, index: number) => {
        window.open(url, "_blank");
      });
    } else {
      setReviewOrderToastFlag(true);
      setTimeout(() => {
        setReviewOrderToastFlag(false);
      }, 5000);
    }
  };

  const getPickupLabel = async () => {
    setGetShipmentLabelLoader(true);
    let reqBody = {
      WorkOrderNumber: patient?.workOrderNumber!,
      serialnumber: patient?.productSerialNumber!,
    };
    const shipmentLabelResObj = await getShipmentLabelPdf(reqBody);
    if (shipmentLabelResObj) {
      if (shipmentLabelResObj.succeeded) {
        const pdf = new jsPDF("landscape", "px", "legal");
        const url: any = await getPdfUrlGif(
          shipmentLabelResObj.item.shippingLabel
        );
        pdf.addImage(url, "gif", 0, 5, 0, 0);
        window.open(pdf.output("bloburl"));
        setGetShipmentLabelLoader(false);
      }
    } else {
      setGetShipmentLabelLoader(false);
      setFailedToPrintShipmentLabel(true);
    }
  };

  const spinner = () => {
    return (
      <div>
        <div className="addWound-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  const openOrderDetail = () => {
    if (patient) {
      history.push({
        pathname: "/home/orderOverview",
        state: {
          stateData: patient,
        },
      });
    }
  };

  return (
    <div className="dischargeRequestSummary-container">
      <SnackBar
        toastStyle="reviewOrderToast"
        handleCloseAlert={() => {
          setReviewOrderToastFlag(false);
        }}
        msg="File does not yet exist. Please try again in a few minutes"
        openFlag={reviewOrderToastFlag}
      />
      <div className="discharge-request-summary-header">
        <Grid className="discharge-request-summary">
          <SummaryDischargeRequestHeader />
        </Grid>
        <Grid
          container
          className="mainContainer"
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: { md: "row", xs: "column" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: { md: "space-between", xs: "flex-start" },
          }}
        >
          <Grid item>
            <div className="summarypage-title" data-testId="summarypage-title">
              Discharge Summary
            </div>
          </Grid>
          <Grid
            item
            className="saveDiv"
            sx={{ marginLeft: isMobileScreen ? 4 : "0" }}
          >
            <ExpressButton
              clickHandler={() => {
                handleClickPdfDownload();
              }}
              parentClass="discharge-request-save-order-btn"
              testId="acc-cancel-test"
              variant="text"
              startIcon={<DownloadIcon />}
            >
              Save & Print Discharge Summary
            </ExpressButton>
          </Grid>
        </Grid>
        <div className="summary-dischargeReq-comp">
          <div className="dischargeSummary-patientInfo">
            Patient Information
          </div>
          <Grid
            container
            spacing={2}
            xs={12}
            classes={{ root: "dischargeSummary-patientInfo-grid" }}
          >
            <Grid item xs={6.1}>
              <WoundTitleValue
                formatValue={false}
                title="Patient Name"
                value={makeCapitalEachWordInString(
                  `${patient.firstName} ${patient.lastName}`
                )}
              />
            </Grid>
            <Grid item xs={5.9}>
              <WoundTitleValue
                title="Date of Birth"
                value={
                  patient.dob ? moment(patient.dob).format("MM/DD/YYYY") : ""
                }
              />
            </Grid>
          </Grid>
          <div className="dischargeSummary-productInfo">
            Product Information
          </div>
          <Grid
            container
            spacing={2}
            xs={12}
            classes={{ root: "dischargeSummary-productInfo-grid" }}
          >
            <Grid item xs={6.1} className="dischargeSummary-gridItem">
              <WoundTitleValue
                title="Product Name"
                value={patient?.productName!}
                formatValue={false}
              />
            </Grid>
            <Grid item xs={5.9} className="dischargeSummary-gridItem">
              <WoundTitleValue
                title="Product Serial #"
                value={patient?.productSerialNumber!}
                formatValue={false}
              />
            </Grid>
            <Grid item xs={6.1} className="dischargeSummary-gridItem">
              <WoundTitleValue
                title="Rental Order #"
                value={patient?.roNumber.toString()!}
                valueClassName="product-request-overview-value"
                onValueClick={openOrderDetail}
              />
            </Grid>
            <Grid item xs={5.9} className="dischargeSummary-gridItem">
              <WoundTitleValue
                title="Placement Date"
                value={moment(patient?.placementDate).format("MM/DD/YYYY")}
              />
            </Grid>
          </Grid>
          <SubmitterInformation
            dischargeData={dischargeData!}
            setDischargeData={setDischargeData!}
            isReviewDischargePage={true}
            isSummaryDischargePage={true}
          />
          <WoundInformationDischargeRequest
            dischargeData={dischargeData!}
            setDischargeData={setDischargeData!}
            isReviewDischargePage={true}
            woundInfoDetails={woundInfoDetails}
            isSummaryDischargePage={true}
          />
          <TherapyOutcomes
            dischargeData={dischargeData!}
            setDischargeData={setDischargeData!}
            isReviewDischargePage={true}
            isSummaryDischargePage={true}
          />
          <PatientAdmissionType
            dischargeData={dischargeData!}
            setDischargeData={setDischargeData!}
            isReviewDischargePage={true}
            isSummaryDischargePage={true}
          />
          <DischargeReqUploadDoc
            isReviewDischargePage={true}
            isSummaryDischargePage={true}
          />
        </div>
        <div className="dischargeSummary-Attestation">
          <AttestationAndSignature
            attestationData={DischargeReqObj?.dischargeReqAttestation!}
            setAttestationData={DischargeReqObj?.setDischargeReqAttestation!}
            isReviewAssessment={true}
          />
        </div>
      </div>
      <div className="dischargeSummaryContent">
        <div
          data-testid="button-print-label"
          className="dischargeSummaryDesp-labelPrintBtn"
        >
          Return Shipment Label
        </div>
        <Button
          classes={{ root: "button-print-label" }}
          data-testid="button-print-btn"
          variant="text"
          onClick={getPickupLabel}
          startIcon={<PrintIcon />}
        >
          Print Return Label
        </Button>
        <Button
          classes={{ root: "back-patient-btn" }}
          data-testid="button-back-MPD"
          variant="text"
          onClick={() => {
            history.push("/home");
          }}
          startIcon={<VectorIcon />}
        >
          Back to My Patients
        </Button>
      </div>
      <ErrorPopup
        popUpStyles="shipmentLabelErrorPopupDR"
        errorMessage=" Your request to print the shipping label has failed. Please try again
          or contact 3M for assistance with this order 1-800-275-4524"
        errorPopupFlag={failedToPrintShipmentLabel}
        handleBackButton={() => {
          setFailedToPrintShipmentLabel(false);
        }}
      />
      <Popup
        closeHandler={() => {}}
        openFlag={getShipmentLabelLoader}
        hideCloseButton={true}
      >
        {spinner()}
      </Popup>
    </div>
  );
};

export default SummaryDischargeRequest;
