import React, { useContext, useState } from "react";
import { Button, Grid } from "@mui/material";
import moment from "moment";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { ReactComponent as DownloadIcon } from "../../../../assets/download.svg";
import "./pickupRequestConfirm.css";
import WoundTitleValue from "../../../myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundReviewAssessment/woundTitleValue/woundTitleValue.component";
import { IPickUpRequest } from "../pickUpRequest.interface";
import { IPatient } from "../../../myPatients/patient.interface";
import { PickUpDetails } from "../pickUpDetails/pickUpDetails.component";
import { DeviceInformation } from "../deviceInformation/deviceInformation.component";
import { ReactComponent as PrintIcon } from "../../../../assets/print.svg";
import { formatDate, getPdfUrlGif } from "../../../../util/utilityFunctions";
import { useHistory } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import jsPDF from "jspdf";
import {
  PickUpRequestContext,
  PickUpRequestContextType,
} from "../../../../context/PickUpRequestContext";
import ErrorPopup from "../../../../core/errorPopup/errorPopup.component";
import { getShipmentLabelPdf } from "../../../../util/pickUpOrDischargeService";
import { Popup } from "../../../../core/popup/popup.component";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";

type Props = { data: IPickUpRequest; patient: IPatient; setData: any };

const PickUpRequestConfirm = ({ data, patient, setData }: Props) => {
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const history = useHistory();
  const [failedToPrintShipmentLabel, setFailedToPrintShipmentLabel] =
    useState(false);
  const pickUpRequestObj = useContext<PickUpRequestContextType | null>(
    PickUpRequestContext
  );
  const [getShipmentLabelLoader, setGetShipmentLabelLoader] = useState(false);

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
  const handlePrint = () => {
    window.print();
  };

  const getPickupLabel = async () => {
    setGetShipmentLabelLoader(true);
    let reqBody = {
      WorkOrderNumber: pickUpRequestObj?.patient?.workOrderNumber!,
      serialnumber: pickUpRequestObj?.patient?.productSerialNumber!,
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

  return (
    <div className="pickupConfirm">
      <div>
        <Grid
          container
          display="flex"
          flexDirection="row"
          className="gridContainerRow"
        >
          <Grid item>
            <div
              className="pickupConfirmDesp-summarypage-title"
              data-testId="pickupConfirmDesp-summarypage-title"
            >
              Pickup Order Confirmation
            </div>
          </Grid>
          <Grid item className="pickupConfirmDesp-saveOrderDiv">
            <div>
              <ExpressButton
                clickHandler={() => handlePrint()}
                parentClass="pickupConfirmDesp-saveOrderBtn"
                testId="pickupConfirmDesp-saveOrderBtn"
                variant="text"
                startIcon={<DownloadIcon />}
              >
                Save & Print Confirmation
              </ExpressButton>
            </div>
          </Grid>
        </Grid>
        <div className="pickupConfirmDesp" data-testId="pickupConfirmDesp">
          Your invoice will reflect billing through{" "}
          {moment(Date()).format("MM/DD/YYYY")}. You will be receiving a
          confirmation email for your records shortly. You may also print the
          following Order Detail:
        </div>
        <div className="pickupConfirmDesp-short-form">
          <WoundTitleValue
            title={"Pickup Order Processed Date"}
            value={moment(Date()).format("MM/DD/YYYY")}
            testID="pickupConfirmDesp-processedDate"
          />
          <div className="pickupConfirmDesp-title">Customer</div>
          <div className="pickupConfirmDesp-rowDiv">
            <WoundTitleValue
              title={"Customer Name"}
              value={patient.facilityName}
              testID="pickupConfirmDesp-facilityName"
            />
            <WoundTitleValue
              title={"Customer Number"}
              value={AuthObj?.registeredFaciltyAddress?.siteUseId!}
              testID="pickupConfirmDesp-customerNumber"
            />
          </div>
          <div className="pickupConfirmDesp-title">Patient Information</div>
          <div className="pickupConfirmDesp-rowDiv">
            <WoundTitleValue
              title={"Patient Name"}
              value={`${patient.lastName} ${patient.firstName}`}
            />
            <WoundTitleValue
              title={"Date of Birth"}
              value={formatDate(patient.dob)}
            />
          </div>
          <div className="pickupConfirmDesp-title">Product Information</div>
          <div className="pickupConfirmDesp-rowDiv">
            <WoundTitleValue
              title={"Product Name"}
              value={patient.productName!}
              formatValue={false}
            />
            <WoundTitleValue
              title={"Product Serial #"}
              value={patient.productSerialNumber!}
              formatValue={false}
            />
          </div>
          <div className="pickupConfirmDesp-rowDiv">
            <WoundTitleValue
              title={"Rental Order #"}
              value={patient.roNumber.toString()}
              valueClassName="reviewpage-ro-no"
              onValueClick={openOrderDetail}
            />
            <WoundTitleValue
              title={"Placement Date"}
              value={formatDate(patient.placementDate!)}
            />
          </div>
          <PickUpDetails
            data={data}
            setData={setData}
            patient={patient!}
            isConfirmPickUpSummary={true}
          />
          <DeviceInformation
            data={data}
            setData={setData}
            isConfirmPickUpSummary={true}
          />
          <div className="pickupConfirmDesp-labelPrintBtn">
            Return Shipment Label
          </div>
          <Button
            classes={{ root: "button-print-label" }}
            data-testid="button-print-label"
            variant="outlined"
            onClick={getPickupLabel}
            startIcon={<PrintIcon />}
          >
            Print Shipment Label
          </Button>
        </div>
      </div>
      <ErrorPopup
        popUpStyles="shipmentLabelErrorPopup"
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

export default PickUpRequestConfirm;
