import { Grid } from "@mui/material";
import moment from "moment";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import {
  MyPatientContext,
  MyPatientContextType,
} from "../../../../context/MyPatientContext";
import { CustomDropDown } from "../../../../core/customDropdown/customDropdown.component";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { Popup } from "../../../../core/popup/popup.component";
import { cancelReadyCarePatientOrder } from "../../../../util/3meService";
import { getdropDownContent } from "../../../../util/dropDownService";
import {
  CANCEL_READY_CARE_ORDER_FAILED,
  DD_READYCARE_PATIENT_CANCEL_ORDER,
} from "../../../../util/staticText";
import {
  getCodeFromText,
  getTextFromCode,
} from "../../../../util/utilityFunctions";
import { SendNoteFailure } from "../../../send3MNote/popUps/failurePopUp/sendNoteFailure.component";
import { IPatient } from "../../patient.interface";
import { CancellationConfirmationPopup } from "./cancellationConfirmationPopup/cancellationConfirmationPopup.component";
import "./cancelPatientOrder.css";

interface Props {
  patient: IPatient;
  isPatientCancelOrder: Function;
}

export const CancelPatientOrder = ({
  isPatientCancelOrder,
  patient,
}: Props) => {
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const [openConfirmationPopup, setopenConfirmationPopup] =
    useState<boolean>(false);
  const [openCancelOrderPopUp, setopenCancelOrderPopUp] =
    useState<boolean>(true);
  const [openLoaderPopUp, setOpenLoaderPopUp] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const [cancellationReasoncode, setcancellationReasoncode] = React.useState(
    []
  );
  const [cancellationReasonText, setcancellationReasonText] = React.useState(
    []
  );
  const [dropdownValue, setDropdownValue] = useState("");
  const MyPatientObj = useContext<MyPatientContextType | null>(
    MyPatientContext
  );

  const fetchDropdownContents = async () => {
    try {
      const data = await getdropDownContent(DD_READYCARE_PATIENT_CANCEL_ORDER);
      if (data.items.length > 0) {
        const cancellationReasonobject = data.items.filter(
          (item: { name: string }) =>
            item.name === DD_READYCARE_PATIENT_CANCEL_ORDER
        );
        const cancellationReasontext = cancellationReasonobject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setcancellationReasoncode(cancellationReasontext);
        setcancellationReasonText(
          cancellationReasontext.map((x: { text: string }) => x.text)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const validateAndSetData = (e: any) => {
    setDropdownValue(getCodeFromText(cancellationReasoncode, e.target.value));
  };
  const openCancelOrderconfirmationPopup = () => {
    setopenConfirmationPopup(true);
    setopenCancelOrderPopUp(false);
  };
  const closeCancelOrderconfirmationPopup = () => {
    setopenConfirmationPopup(false);
    setopenCancelOrderPopUp(true);
    isPatientCancelOrder();
  };
  const closeCancelOrdermainPopup = () => {
    setopenCancelOrderPopUp(false);
    setopenConfirmationPopup(false);
    isPatientCancelOrder();
  };
  const cancelReadyCareOrder = async () => {
    const currentUserName = authObj?.userProfile?.userName;
    const roNumber = patient!.roNumber.toString();
    const dateOfBirth = moment(patient!.dob).format("YYYY-MM-DD");
    const selectedCancellationCode = dropdownValue;
    let reqParams = {
      username: currentUserName,
      ron: roNumber,
      dob: dateOfBirth,
      cancellationCode: selectedCancellationCode,
    };
    setOpenLoaderPopUp(true);
    setopenCancelOrderPopUp(false);
    setopenConfirmationPopup(false);
    try {
      const response = await cancelReadyCarePatientOrder(reqParams);
      if (!response || response.error) {
        setOpenLoaderPopUp(false);
        setError(true);
        return false;
      } else {
        closeAllPopups();
        MyPatientObj?.setReloadMyPatient(true);
        return true;
      }
    } catch (error) {
      console.log("error", error);
      setOpenLoaderPopUp(false);
      setError(true);
      return false;
    }
  };
  const closeAllPopups = () => {
    setopenCancelOrderPopUp(false);
    setopenConfirmationPopup(false);
    setOpenLoaderPopUp(false);
    isPatientCancelOrder();
    setError(false);
  };
  useEffect(() => {
    fetchDropdownContents();
  }, []);
  return (
    <>
      {openCancelOrderPopUp && isPatientCancelOrder && (
        <div className="cancelPatientOrder">
          <div className="cancelPatientOrder-header">
            <h5
              className="cancelPatientOrder-title"
              data-testid="cancelPatientOrder-title"
            >
              Cancel Patient Order
            </h5>
          </div>
          <div className="resason-for-cancel-input-fields">
            <Grid
              className="cancellationReason-grid-container"
              container
              spacing={2}
            >
              <Grid className="cancellationReason-grid-item" item xs={12}>
                <div className="cancellationReasonDropdown">
                  <InputWithLabel
                    label="Reason for cancellation"
                    labelClassName="cancellationReason"
                    isRequired={true}
                    error={false}
                    testId="cancellationReason-label-Test"
                  >
                    <CustomDropDown
                      name="cancelPatientOrderReason"
                      value={
                        dropdownValue !== ""
                          ? getTextFromCode(
                              cancellationReasoncode,
                              dropdownValue
                            )
                          : ""
                      }
                      handleChange={validateAndSetData}
                      selectpropsClassName={
                        dropdownValue !== ""
                          ? "cancellationReason-select"
                          : "placeHolder"
                      }
                      selectClassName={
                        dropdownValue !== ""
                          ? "cancellationReason-input"
                          : "placeHolder"
                      }
                      testId="cancellationReason-type"
                      menuItem={cancellationReasonText}
                      placeHolder="Select type"
                    />
                  </InputWithLabel>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className="cancellationReason-footer">
            <Grid
              className="cancellationReason-grid-container"
              container
              spacing={2}
            >
              <Grid className="cancellationReason-grid-item" item xs={6}>
                <ExpressButton
                  clickHandler={() => closeCancelOrdermainPopup()}
                  parentClass="cancelBtn"
                  testId="backBtnTest"
                  variant="outlined"
                >
                  Back
                </ExpressButton>
              </Grid>
              <Grid className="cancellationReason-grid-item" item xs={6}>
                <ExpressButton
                  disabled={dropdownValue === ""}
                  clickHandler={() => openCancelOrderconfirmationPopup()}
                  parentClass="submitBtn"
                  testId="cancelBtnTest"
                  variant="contained"
                >
                  Cancel Order
                </ExpressButton>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
      {!openCancelOrderPopUp && (
        <Popup
          openFlag={openConfirmationPopup}
          closeHandler={() => closeAllPopups()}
        >
          <CancellationConfirmationPopup
            closeCancelOrderconfirmationPopup={
              closeCancelOrderconfirmationPopup
            }
            cancelReadyCareOrder={cancelReadyCareOrder}
          />
        </Popup>
      )}
      {openLoaderPopUp && (
        <div className="myPatientListSpinner" data-testid="hold-therapy-loader">
          <LoadingSpinner />
        </div>
      )}
      {error && (
        <SendNoteFailure
          rootClass="error-pop-up"
          message={CANCEL_READY_CARE_ORDER_FAILED}
          backButtonAction={closeAllPopups}
        />
      )}
    </>
  );
};
