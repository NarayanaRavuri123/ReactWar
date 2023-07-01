import moment from "moment";
import "./pickUpRequest.css";
import { useHistory } from "react-router-dom";
import {
  PickUpRequestContext,
  PickUpRequestContextType,
} from "../../../context/PickUpRequestContext";
import { useContext, useEffect, useState } from "react";
import { IPickUpRequestProps } from "./pickUpRequest.interface";
import { PickUpRequestValidator } from "./pickUpRequest.validator";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { PickUpDetails } from "./pickUpDetails/pickUpDetails.component";
import { PickUpRequestPageSection } from "./pickUpRequestPageSection.enum";
import { PatientDetails } from "./patientDetails/patientDetails.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { Navigator } from "../../helpAndSupport/Navigator/navigator.component";
import { retrievePatientDetails } from "../../../util/pickUpOrDischargeService";
import { ReasonForDischarge } from "./reasonForDischarge/reasonForDischarge.component";
import { PickUpRequestFooterButtonGroup } from "./pickUpRequestFooterGroup/pickUpRequestFooterGroup.component";
import { DeviceInformation } from "./deviceInformation/deviceInformation.component";
import {
  DischargeRequestContext,
  DischargeRequestContextType,
} from "../../../context/DischargeRequestContext";
import PatientTransferDetails from "./patientTransferDetails/patientTransferDetails.component";
import { Popup } from "../../../core/popup/popup.component";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { send3MNote } from "../../../util/3meService";
import { SendNoteFailure } from "../../send3MNote/popUps/failurePopUp/sendNoteFailure.component";
import PickUpRequestConfirm from "./pickupRequestConfirm/pickupRequestConfirm.component";

export const PickUpRequest = ({
  Validator = new PickUpRequestValidator(),
}: IPickUpRequestProps) => {
  const history = useHistory();
  const [validator] = useState<PickUpRequestValidator>(Validator!);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [continueButtonDisbaled, setContinueButtonDisbaled] = useState(true);
  const [submitButtonDisbaled, setSubmitButtonDisbaled] = useState(true);
  const pickUpRequestObj = useContext<PickUpRequestContextType | null>(
    PickUpRequestContext
  );
  const DischargeReqObj = useContext<DischargeRequestContextType | null>(
    DischargeRequestContext
  );
  const transferPatientDetail = pickUpRequestObj!.transferPatientDetail;
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const data = pickUpRequestObj!.data;
  const setData = pickUpRequestObj!.setData;
  const patient = pickUpRequestObj!.patient;
  const [openLoaderPopUp, setOpenLoaderPopUp] = useState<boolean>(false);
  const [openSuccessPopUp, setOpenSuccessPopUp] = useState<boolean>(false);
  const [openFailurePopUp, setOpenFailurePopUp] = useState<boolean>(false);

  const loadPatientProductInfo = async (roNumber: string, dob: string) => {
    let reqParams = {
      RentalOrderNumber: roNumber,
      DOB: moment(dob).format("yyyy-MM-DD"),
    };
    setIsLoading(true);
    try {
      const data = await retrievePatientDetails(reqParams);
      setIsLoading(false);

      if (data.error) {
        setError(true);
      } else {
        pickUpRequestObj?.setPatient((dt: any) => ({
          ...dt,
          productName: data.productName,
          placementDate: data.placemetDate,
          productSerialNumber: data.productSerialNumber,
          workOrderNumber: data.workOrderNumber,
        }));
      }
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      setError(true);
    }
  };

  const continuePickUpRequest = () => {
    pickUpRequestObj?.setPickUpRequestPage(
      PickUpRequestPageSection.PICK_UP_REQUEST_SUBMIT_FORM
    );
    window.scrollTo(0, 0);
  };

  const cancelPickUpRequest = () => {
    pickUpRequestObj?.resetData();
    DischargeReqObj?.resetData();
    history.goBack();
  };

  const submitPickUpRequest = () => {
    transferPatient();
  };

  const previousPickUpRequest = () => {
    pickUpRequestObj?.setPickUpRequestPage(
      PickUpRequestPageSection.PICK_UP_REQUEST_START_FORM
    );
    updateContinueButton();
    window.scrollTo(0, 0);
  };

  const updateContinueButton = () => {
    if (
      pickUpRequestObj!.pickUpRequestPage ===
      PickUpRequestPageSection.PICK_UP_REQUEST_START_FORM
    ) {
      setContinueButtonDisbaled(
        data.reasonForDischarge.valid !== ValidationStatus.VALID
      );
    }
  };

  const pickUpRequestOnClick = (event: any) => {
    event.preventDefault();
    previousPickUpRequest();
  };

  const transferPatient = async () => {
    const roNumber = patient!.roNumber.toString();
    const loggedInUserSiteUseID = AuthObj?.registeredFaciltyAddress?.siteUseId!;
    let lastVisitDateString =
      transferPatientDetail.lastVisitDate.value !== ""
        ? moment(transferPatientDetail.lastVisitDate.value).format("YYYY-MM-DD")
        : null;
    let sendNoteRequest = {
      siteUseID: loggedInUserSiteUseID,
      RO: roNumber,
      ContactReason: 1,
      LastVisitDateForPatient: lastVisitDateString,
      NewFacilityName: transferPatientDetail.facilityName.value,
      CaregiverOrPhysicianNowResponsible:
        transferPatientDetail.careGiverName.value,
      FacilityPhoneNumber: transferPatientDetail.phone.value,
      Comments: transferPatientDetail.comment.value,
    };
    callSendNoteAPI(sendNoteRequest);
  };

  const callSendNoteAPI = async (params: any) => {
    setOpenLoaderPopUp(true);
    const sendNoteResult = await send3MNote(params);
    setOpenLoaderPopUp(false);
    if (sendNoteResult && sendNoteResult.succeeded) {
      setOpenSuccessPopUp(true);
    } else {
      setOpenFailurePopUp(true);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const selectedPatient = pickUpRequestObj!.patient;
    const roNumber = selectedPatient?.roNumber.toString();
    const dob = selectedPatient?.dob;
    const productName = selectedPatient?.productName;
    if (selectedPatient) {
      if (roNumber && roNumber !== "" && dob && dob !== "" && !productName) {
        loadPatientProductInfo(roNumber, dob);
      } else {
        setIsLoading(false);
      }
    } else {
      history.push("/home");
    }
  }, []);

  useEffect(() => {
    updateContinueButton();
  }, [data.reasonForDischarge]);

  useEffect(() => {
    if (data.reasonForDischarge.value === "yes") {
      const isValid = validator.validateAll(data, setData);
      setSubmitButtonDisbaled(!isValid);
    } else if (data.reasonForDischarge.value === "no") {
      const isValid = validator.validateAll(
        pickUpRequestObj?.transferPatientDetail,
        pickUpRequestObj?.setTransferPatientDetail!
      );
      setSubmitButtonDisbaled(!isValid);
    }
  }, [data, pickUpRequestObj?.transferPatientDetail]);
  const backButtonAction = () => {
    if (data.reasonForDischarge.value === "no") {
      history.push("/home");
    }
  };
  return (
    <div className="pick-up-main-component">
      <div className="pick-up-main-component-container">
        <div className="pickup-request-component">
          {isLoading && (
            <div className="pickup-request-loader">
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && error && (
            <>
              <Navigator
                array={[
                  {
                    route: "/home",
                    pageName: "My Patients",
                  },
                ]}
                className="pickup-request-route-section"
                title="Pickup/Discharge Request"
              />
              <div
                className="pickup-request-error-msg"
                data-testid="pickup-request-error-msg"
              >
                Oops something went wrong !
              </div>
            </>
          )}
          {!isLoading && !error && (
            <>
              {pickUpRequestObj!.pickUpRequestPage ===
                PickUpRequestPageSection.PICK_UP_REQUEST_START_FORM && (
                <Navigator
                  array={[
                    {
                      route: "/home",
                      pageName: "My Patients",
                    },
                  ]}
                  className="pickup-request-route-section"
                  title="Pickup/Discharge Request"
                />
              )}
              {pickUpRequestObj!.pickUpRequestPage ===
                PickUpRequestPageSection.PICK_UP_REQUEST_SUBMIT_FORM &&
                data.reasonForDischarge.value === "yes" && (
                  <Navigator
                    array={[
                      {
                        route: "/home",
                        pageName: "My Patients",
                      },
                      {
                        onLinkClick: pickUpRequestOnClick,
                        route: "/",
                        pageName: "Pickup/Discharge Request",
                      },
                    ]}
                    className="pickup-request-route-section"
                    title="Pickup"
                  />
                )}
              {pickUpRequestObj!.pickUpRequestPage ===
                PickUpRequestPageSection.PICK_UP_REQUEST_SUBMIT_FORM &&
                data.reasonForDischarge.value === "no" && (
                  <Navigator
                    array={[
                      {
                        route: "/home",
                        pageName: "My Patients",
                      },
                      {
                        onLinkClick: pickUpRequestOnClick,
                        route: "/",
                        pageName: "Pickup/Discharge Request",
                      },
                    ]}
                    className="pickup-request-route-section"
                    title="Transfer Patient"
                  />
                )}
              <div className="short-form">
                {pickUpRequestObj!.pickUpRequestPage !==
                  PickUpRequestPageSection.PICK_UP_REQUEST_CONFIRM_FORM && (
                  <>
                    <h2
                      className="pickup-request-component-header"
                      data-testid="pickup-request-component-header"
                    >
                      Pickup/Discharge Request
                    </h2>
                    <PatientDetails patient={patient!} />
                  </>
                )}
                {pickUpRequestObj!.pickUpRequestPage ===
                  PickUpRequestPageSection.PICK_UP_REQUEST_START_FORM && (
                  <ReasonForDischarge data={data} setData={setData} />
                )}
                {pickUpRequestObj!.pickUpRequestPage ===
                  PickUpRequestPageSection.PICK_UP_REQUEST_SUBMIT_FORM &&
                  data.reasonForDischarge.value === "yes" && (
                    <>
                      <PickUpDetails
                        data={data}
                        setData={setData}
                        patient={patient!}
                      />
                      <DeviceInformation data={data} setData={setData} />
                    </>
                  )}
              </div>
              {pickUpRequestObj!.pickUpRequestPage ===
                PickUpRequestPageSection.PICK_UP_REQUEST_CONFIRM_FORM && (
                <>
                  <PickUpRequestConfirm
                    data={data}
                    setData={setData}
                    patient={patient!}
                  />
                </>
              )}
              {pickUpRequestObj!.pickUpRequestPage ===
                PickUpRequestPageSection.PICK_UP_REQUEST_SUBMIT_FORM &&
                data.reasonForDischarge.value === "no" && (
                  <PatientTransferDetails />
                )}
              <div>
                {pickUpRequestObj!.pickUpRequestPage ===
                  PickUpRequestPageSection.PICK_UP_REQUEST_START_FORM && (
                  <PickUpRequestFooterButtonGroup
                    firstButtonTitle="Cancel"
                    firstButtonAction={cancelPickUpRequest}
                    secondButtonTitle=""
                    secondButtonAction={() => {}}
                    thirdButtonTitle="Continue"
                    thirdButtonAction={continuePickUpRequest}
                    thirdButtonDisabled={continueButtonDisbaled}
                  />
                )}
                {pickUpRequestObj!.pickUpRequestPage ===
                  PickUpRequestPageSection.PICK_UP_REQUEST_SUBMIT_FORM &&
                  data.reasonForDischarge.value === "yes" && (
                    <PickUpRequestFooterButtonGroup
                      firstButtonTitle="Cancel"
                      firstButtonAction={cancelPickUpRequest}
                      secondButtonTitle="Previous"
                      secondButtonAction={previousPickUpRequest}
                      thirdButtonTitle="Submit pickup"
                      thirdButtonAction={() => {
                        pickUpRequestObj?.setPickUpRequestPage(
                          PickUpRequestPageSection.PICK_UP_REQUEST_CONFIRM_FORM
                        );
                        window.scrollTo(0, 0);
                      }}
                      thirdButtonDisabled={submitButtonDisbaled}
                    />
                  )}
                {pickUpRequestObj!.pickUpRequestPage ===
                  PickUpRequestPageSection.PICK_UP_REQUEST_SUBMIT_FORM &&
                  data.reasonForDischarge.value === "no" && (
                    <PickUpRequestFooterButtonGroup
                      firstButtonTitle="Cancel"
                      firstButtonAction={cancelPickUpRequest}
                      secondButtonTitle="Previous"
                      secondButtonAction={previousPickUpRequest}
                      thirdButtonTitle="Submit transfer"
                      thirdButtonAction={submitPickUpRequest}
                      thirdButtonDisabled={submitButtonDisbaled}
                    />
                  )}
                {pickUpRequestObj!.pickUpRequestPage ===
                  PickUpRequestPageSection.PICK_UP_REQUEST_CONFIRM_FORM && (
                  <PickUpRequestFooterButtonGroup
                    firstButtonTitle=""
                    firstButtonAction={() => {}}
                    secondButtonTitle=""
                    secondButtonAction={() => {}}
                    thirdButtonTitle="Continue to Discharge"
                    thirdButtonAction={() => {
                      pickUpRequestObj?.setPickUpRequestPage(
                        PickUpRequestPageSection.DISCHARGE_REQUEST_START_FORM
                      );
                      history.push("/home/dischargeRequest");
                      window.scrollTo(0, 0);
                    }}
                    thirdButtonDisabled={false}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Popup
        openFlag={openSuccessPopUp}
        closeHandler={() => setOpenSuccessPopUp(false)}
        hideCloseButton={true}
      >
        <div className="confirmation-pop-up">
          <h2 className="title-main" data-testid="title">
            Note Confirmation
          </h2>
          <h4 className="title-desc" data-testid="description">
            Thank you for submitting your request or comment. Requests and
            comments are processed Monday through Friday (except for Holidays)
            from 7 a.m. to 7 p.m. CST.
          </h4>
          <ExpressButton
            clickHandler={() => {
              backButtonAction();
            }}
            parentClass="back-btn"
            testId="back-button"
            variant="contained"
          >
            Back to Dashboard
          </ExpressButton>
        </div>
      </Popup>
      <Popup
        openFlag={openFailurePopUp}
        closeHandler={() => {
          history.push("/home");
        }}
        dialogParentClass={"send-note-failure-pop-up"}
        data-testid="failure-pop-up"
      >
        <div>
          <SendNoteFailure
            message="Your request to send 3M a note has failed. Please try again or contact 3M for
            assistance with this order 1-800-275-4524"
            backButtonAction={() => {
              history.push("/home");
            }}
          />
        </div>
      </Popup>
      <Popup
        openFlag={openLoaderPopUp}
        closeHandler={() => setOpenLoaderPopUp(false)}
        dialogParentClass={"send-note-loader-pop-up"}
        data-testid="loader-pop-up"
        hideCloseButton={true}
      >
        <div className="send-note-loader">
          <LoadingSpinner />
        </div>
      </Popup>
    </div>
  );
};
