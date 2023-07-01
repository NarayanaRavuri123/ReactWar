import { useContext, useEffect, useState } from "react";
import "./submitProofOfDelivery.css";
import { Grid } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { PatientDetails } from "../../pickUpAndDischargeRequest/pickUpRequest/patientDetails/patientDetails.component";
import { TopDivStyle, PerButtonStyle } from "../../cmsContent/cmsContent.style";
import { ReactComponent as VectorIcon } from "../../../assets/Vector.svg";
import { retrievePatientDetails } from "../../../util/pickUpOrDischargeService";
import moment from "moment";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import {
  SubmitProofOfDeliveryContext,
  SubmitProofOfDeliveryContextType,
} from "../../../context/submitProofOfDeliveryContext";
import { IPatient } from "../patient.interface";

import { Popup } from "../../../core/popup/popup.component";
import { SendNoteFailure } from "../../send3MNote/popUps/failurePopUp/sendNoteFailure.component";
import { SuccessPopUp } from "../../administration/facilitySettings/popUps/successPopUp/successPopUp.component";
import { ProofOfDeliveryOptions } from "./proofOfDeliveryOptions/proofOfDeliveryOptions.component";
import { ProofOfDeliveryFax } from "./submitProofOfDeliveryFax/proofOfDeliveryFax.component";

export const SubmitProofOfDelivery = () => {
  const history = useHistory();
  const submitProofOfDeliveryObj =
    useContext<SubmitProofOfDeliveryContextType | null>(
      SubmitProofOfDeliveryContext
    );
  const location: any = useLocation();
  const patientStateData: any = location.state;
  const patient = submitProofOfDeliveryObj!.patient;
  const [patientData] = useState<IPatient>(patientStateData?.stateData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openSuccessPopUp, setOpenSuccessPopUp] = useState<boolean>(false);
  const [openFailurePopUp, setOpenFailurePopUp] = useState<boolean>(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const failureMessage =
    "Your request to upload the patient's POD/AOB has failed. Please try again or contact 3M for assistance with this order 1-800-275-4524.";
  const closeUploadDocButtonAction = (isSuccess: boolean) => {
    if (isSuccess) {
      setOpenSuccessPopUp(true);
    } else {
      setOpenFailurePopUp(true);
    }
    goBackToMyPatients();
  };
  const goBackToMyPatients = () => {
    history.push("/home");
  };
  useEffect(() => {
    if (isLoading === false && isUploadSuccess === true) {
      setOpenSuccessPopUp(true);
    } else {
      setOpenFailurePopUp(true);
    }
  }, [isLoading, isUploadSuccess]);

  useEffect(() => {
    if (submitProofOfDeliveryObj?.patient?.roNumber !== patientData?.roNumber) {
      loadPatientProductInfo();
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    }
    window.scroll(0, 0);
  }, [patientData?.roNumber]);

  const loadPatientProductInfo = async () => {
    let reqParams = {
      RentalOrderNumber: patientData?.roNumber,
      DOB: moment(patientData?.dob).format("yyyy-MM-DD"),
    };

    try {
      const data = await retrievePatientDetails(reqParams);
      setIsLoading(false);
      if (data) {
        const updatedPatient = {
          ...patientData,
          productName: data?.productName,
          placementDate: data?.placemetDate,
          productSerialNumber: data.productSerialNumber,
        };

        submitProofOfDeliveryObj?.setPatient(updatedPatient);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      setError(true);
    }
  };
  const options = [
    {
      optionTitle: "Document Upload",
      optionDescription:
        "Print, sign & upload Proof of Delivery & Acceptance of Benefits (POD/AOB)",
    },
    {
      optionTitle: "Fax to 3M",
      optionDescription:
        "Print, sign & fax Proof of Delivery & Acceptance of Benefits (POD/AOB)",
    },
  ];
  return (
    <div className="proofOfDelivery-main" data-testid="proofOfDelivery-main">
      {isLoading && (
        <div className="submit-pod-loader">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && !error && patient && (
        <>
          <Grid container className="proofOfDelivery-container-main">
            <Grid
              item
              xs={10}
              className="pod-heading"
              data-testid="pod-heading"
            >
              Complete & Submit Proof of Delivery (POD) & Acceptance of
              <span className="proof-heading"> Benefits (AOB)</span>
            </Grid>
            <Grid item xs={7.1} className="patient-details">
              {patient && <PatientDetails patient={patient!} />}
            </Grid>
            <Grid
              item
              xs={11}
              className="pod-alert-text"
              data-testid="pod-alert-text"
            >
              <p className="paragraph">
                POD/AOB must be completed with the patient signature and date
                and returned to 3M prior to or the same day as product delivery
                at bedside.
              </p>
            </Grid>

            <Grid
              item
              xs={12}
              className="pod-subTitle"
              data-testid="pod-subTitle"
            >
              <p className="subtitle">
                How would you like to provide the Proof of Delivery & Acceptance
                of Benefits to 3M?
              </p>
            </Grid>
            <Grid item xs={12}>
              <ProofOfDeliveryOptions
                options={options}
                setIsUploadSuccess={setIsUploadSuccess}
                setIsLoading={setIsLoading}
              />
            </Grid>
            <Grid
              item
              xs={7}
              className="pod-paragragh"
              data-testid="pod-paragragh"
            >
              <p className="pod-paragraph-mobile">
                Please remember that
                <span className="paragraph-bold">
                  failure to complete the Proof of Delivery (POD) prior to
                  placement
                </span>{" "}
                will cause patient to
                <span className="paragraph-bold">
                  not be covered for therapy by insurance
                </span>
                due to non-compliance with payor guidelines, including CMS.
              </p>
              <p className="pod-paragraph-response">
                Authorized agents include: Family Member, Designated Friend,
                Legal Guardian, Attending Nurse or other Caretaker/
                <span className="caretaker-space">Representative</span> of
                institution providing care (excluding prescribing physician)
              </p>
            </Grid>

            <Grid item xs={12}>
              <TopDivStyle>
                <PerButtonStyle
                  data-testid="previousButton-test"
                  startIcon={<VectorIcon />}
                  className="backToMyPatients-btn"
                  variant="text"
                  onClick={() => {
                    history.push("/home");
                  }}
                >
                  Back to My Patients
                </PerButtonStyle>
              </TopDivStyle>
            </Grid>
          </Grid>
          {!isLoading && isUploadSuccess && (
            <>
              <Popup
                closeHandler={() => closeUploadDocButtonAction(true)}
                dialogParentClass={"pod-success-pop-up"}
                openFlag={openSuccessPopUp}
              >
                <div className="pod-success-pop-up-div">
                  <SuccessPopUp
                    buttonAction={goBackToMyPatients}
                    buttonTitle="Done"
                    description="The POHD/AOB has been uploaded & will be reviewed."
                    title="Upload complete"
                  />
                </div>
              </Popup>
              <Popup
                closeHandler={() => closeUploadDocButtonAction(true)}
                dialogParentClass={"pod-failure-pop-up"}
                openFlag={openFailurePopUp}
              >
                <div className="pod-failure-pop-up-div">
                  <SendNoteFailure
                    rootClass="pod-failure-pop-up"
                    backButtonAction={goBackToMyPatients}
                    message={failureMessage}
                  />
                </div>
              </Popup>
            </>
          )}
        </>
      )}
    </div>
  );
};
