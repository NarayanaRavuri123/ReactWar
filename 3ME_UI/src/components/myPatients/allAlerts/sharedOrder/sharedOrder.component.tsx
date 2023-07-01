import Moment from "moment";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import {
  MyPatientContext,
  MyPatientContextType,
} from "../../../../context/MyPatientContext";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../context/NewOrderContext";
import AlertPopup from "../../../../core/alertButton/alertPopup/alertPopup.component";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { cancelSharedOrder } from "../../../../util/alertService";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";
import { IPatient, IPatientAlert } from "../../patient.interface";
import { MyPatientModalSection } from "../../patientOrdersDetails/patientOrdersDetails.component";
import { GetPatientLockedData } from "../../savedPatientLockDetails";
import "./sharedOrder.css";
import { SharedOrderStop } from "./sharedOrderStop.component";

type Props = {
  closePopUpAction: Function;
  alertData: IPatientAlert;
  patientData: IPatient;
};

const SharedOrder = ({ closePopUpAction, alertData, patientData }: Props) => {
  const history = useHistory();
  const [sharingStopped, setSharingStopped] = useState(false);
  const [stopSharingSpinner, setStopSharingSpinner] = useState(false);
  const [cancelShareError, setCancelShareError] = useState(false);
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const myPatientObj = useContext<MyPatientContextType | null>(
    MyPatientContext
  );
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);

  const [sharedByLoggedInUser, setSharedByLoggedInUser] = useState(false);
  let loggedInEmail = "";
  const AuthDetails = sessionStorage.getItem("okta-token-storage");
  if (AuthDetails) {
    const data = JSON.parse(AuthDetails ?? "");
    loggedInEmail = data.idToken.claims?.email;
  }
  const handleStopSharing = () => {
    setStopSharingSpinner(true);
    setSharingStopped(true);
  };

  const LoadSpinner = () => {
    return (
      <div className="stop-sharing-spinner">
        <div className="spinner-space">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  const onClickEditOrder = () => {
    if (patientData.status === MyPatientModalSection?.PATIENT_SAVED) {
      NewOrderObj?.resetNewOrderForm();
      GetPatientLockedData(
        alertData.sharedData?.OrderId,
        true,
        myPatientObj,
        history
      );
    } else {
      myPatientObj?.setOpenPatientOrderAndDetail(true);
      closePopUpAction();
      myPatientObj?.setMyPatientClickModalSection(
        MyPatientModalSection.PATIENT_EMPTY
      );
    }
  };

  const callCancelSharedOrder = async (reqBody: any) => {
    try {
      const result = await cancelSharedOrder(reqBody);
      if (!result || !result.succeeded) {
        setCancelShareError(true);
      }
      setStopSharingSpinner(false);
    } catch (error) {
      setStopSharingSpinner(false);
    }
  };

  const getSharedOrderDetailText = () => {
    if (!sharedByLoggedInUser) {
      return `${makeCapitalEachWordInString(
        alertData?.sharedData?.FromRecipientName
          ? alertData?.sharedData?.FromRecipientName.toLowerCase()
          : ""
      )} has shared an order with you.`;
    } else {
      return `You shared this order with ${makeCapitalEachWordInString(
        alertData?.sharedData?.ToRecipientName
          ? alertData?.sharedData?.ToRecipientName.toLowerCase()
          : ""
      )} on ${
        alertData?.sharedData?.CreatedOn
          ? Moment(alertData?.sharedData?.CreatedOn).format("L")
          : null
      }`;
    }
  };

  useEffect(() => {
    if (stopSharingSpinner) {
      const reqParam = {
        OrderId: alertData?.sharedData?.OrderId,
        FacilityName: authObj?.registeredFaciltyAddress?.accountName,
      };
      callCancelSharedOrder(reqParam);
    }
    if (
      loggedInEmail.toLowerCase() === alertData.sharedData?.From.toLowerCase()
    ) {
      setSharedByLoggedInUser(true);
    } else {
      setSharedByLoggedInUser(false);
    }
  }, [stopSharingSpinner]);

  return (
    <>
      {stopSharingSpinner ? (
        LoadSpinner()
      ) : !sharingStopped ? (
        <div>
          <AlertPopup
            title="Shared Order"
            titleClassName="shared-order-header-title"
          >
            <div className="shared-alert-body">
              <div className="sharedFromName">{getSharedOrderDetailText()}</div>
              <div className="your-note" data-testid="your-note">
                Your note
              </div>
              <div className="your-note-desp">
                {alertData?.sharedData?.Notes}
              </div>
              <div className="button-row-sharing">
                <ExpressButton
                  testId="stop-sharing"
                  clickHandler={handleStopSharing}
                  parentClass="stop-sharing"
                  variant="outlined"
                >
                  {sharedByLoggedInUser ? "Stop Sharing" : "Cancel Sharing"}
                </ExpressButton>
                <ExpressButton
                  testId="edit-order"
                  clickHandler={onClickEditOrder}
                  parentClass="edit-order"
                  variant="outlined"
                >
                  Edit Order
                </ExpressButton>
              </div>
            </div>
          </AlertPopup>
        </div>
      ) : (
        <SharedOrderStop
          sharedByLoggedInUser={sharedByLoggedInUser}
          cancelShareError={cancelShareError}
          closePopUpAction={closePopUpAction}
          sharingStopped={sharingStopped}
        />
      )}
    </>
  );
};

export default SharedOrder;
