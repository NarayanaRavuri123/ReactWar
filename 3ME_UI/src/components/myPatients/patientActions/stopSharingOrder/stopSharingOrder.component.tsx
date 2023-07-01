import React, { useEffect, useContext, useState } from "react";
import { Popup } from "../../../../core/popup/popup.component";
import { IStopSaringOrder } from "../../patient.interface";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import { cancelSharedOrder } from "../../../../util/alertService";
import "./stopSharingOrder.css";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import {
  MyPatientContext,
  MyPatientContextType,
} from "../../../../context/MyPatientContext";

interface Props {
  cancelSharedOrderDetail: IStopSaringOrder;
  setCancelSharedOrderDetail: any;
}

const StopSharingOrder = ({
  cancelSharedOrderDetail,
  setCancelSharedOrderDetail,
}: Props) => {
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const MyPatientObj = useContext<MyPatientContextType | null>(
    MyPatientContext
  );
  const [loader, setLoader] = useState(true);
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [errorPopUp, setErrorPopUp] = useState(false);

  const callCancelSharedOrder = async (reqBody: any) => {
    try {
      const result = await cancelSharedOrder(reqBody);
      if (!result || !result.succeeded) {
        setLoader(false);
        setErrorPopUp(true);
      } else {
        setSuccessPopUp(true);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const stopShareOrderSpinner = () => {
    return (
      <div>
        <div className="cancelShare-header"></div>
        <div className="cancelShare-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };
  const successCancelContent = () => {
    return (
      <div className="successStopShare">
        <div className="successStopShareTitle">
          {cancelSharedOrderDetail.sharedBy === "From"
            ? `Success! The order is no longer shared`
            : `Success! The order is no longer shared with you`}
        </div>
        <div className="successStopShareDesp">
          {cancelSharedOrderDetail.sharedBy === "From"
            ? `Any edits others have made and saved will remain in the order. If you wish to share the order again, you can now do so.`
            : `Any edits you have made and saved will remain in the order. You can
                  also re-add the order to your list using the Add Patient option from
                  the My Patients dashboard.`}
        </div>
        <div className="successStopShareClosebtn">
          <ExpressButton
            parentClass="successStopShareButton"
            variant="contained"
            clickHandler={handleReloadMPD}
          >
            Close
          </ExpressButton>
        </div>
      </div>
    );
  };
  const errorCancelContent = () => {
    return (
      <div className="successStopShare">
        <div className="successStopShareTitle">Error</div>
        <div className="successStopShareDesp">Something went wrong.</div>
        <div className="successStopShareClosebtn">
          <ExpressButton
            parentClass="successStopShareButton"
            variant="contained"
            clickHandler={handleReloadMPD}
          >
            Close
          </ExpressButton>
        </div>
      </div>
    );
  };

  const handleReloadMPD = () => {
    MyPatientObj?.setReloadMyPatient(true);
    setCancelSharedOrderDetail(
      (cancelSharedOrderDetail.stopSharingOrder = false)
    );
  };

  useEffect(() => {
    if (cancelSharedOrderDetail.stopSharingOrder) {
      const reqParam = {
        OrderId: cancelSharedOrderDetail.orderID,
        FacilityName: AuthObj?.registeredFaciltyAddress?.accountName,
      };
      callCancelSharedOrder(reqParam);
    }
  }, []);

  return (
    <div>
      <Popup hideCloseButton={true} openFlag={loader} closeHandler={() => {}}>
        {stopShareOrderSpinner()}
      </Popup>
      <Popup openFlag={successPopUp} closeHandler={handleReloadMPD}>
        {successCancelContent()}
      </Popup>
      <Popup openFlag={errorPopUp} closeHandler={handleReloadMPD}>
        {errorCancelContent()}
      </Popup>
    </div>
  );
};

export default StopSharingOrder;
