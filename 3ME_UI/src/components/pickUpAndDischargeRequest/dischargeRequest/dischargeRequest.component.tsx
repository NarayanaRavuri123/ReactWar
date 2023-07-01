import moment from "moment";
import "./dischargeRequest.css";
import { useHistory } from "react-router-dom";
import {
  PickUpRequestContext,
  PickUpRequestContextType,
} from "../../../context/PickUpRequestContext";
import { useContext, useEffect, useState } from "react";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { IDischargeRequestProps } from "./dischargeRequest.interface";
import { DischargeRequestValidator } from "./dischargeRequest.validator";
import { Navigator } from "../../helpAndSupport/Navigator/navigator.component";
import {
  retrievePatientDetails,
  retrieveWoundList,
} from "../../../util/pickUpOrDischargeService";
import { PatientDetails } from "../pickUpRequest/patientDetails/patientDetails.component";
import { PickUpRequestPageSection } from "../pickUpRequest/pickUpRequestPageSection.enum";
import { PickUpRequestFooterButtonGroup } from "../pickUpRequest/pickUpRequestFooterGroup/pickUpRequestFooterGroup.component";
import SubmitterInformation from "./submitterInformation/submitterInformation.component";
import {
  DischargeRequestContext,
  DischargeRequestContextType,
} from "../../../context/DischargeRequestContext";
import { PatientAdmissionType } from "./patientAdmissionType/patientAdmissionType.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { Popup } from "../../../core/popup/popup.component";
import { ExitDischargePopUp } from "./exitDischargePopUp/exitDischargePopUp.commonent";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import { TherapyOutcomes } from "./therapyOutcomes/therapyOutcomes.component";
import DischargeReqUploadDoc from "./dischargeRequestUploadDocuments/dischargeReqUploadDoc.component";
import WoundInformationDischargeRequest from "./woundInformationDischargeRequest/woundInformationDischargeRequest.component";
import { DischargeRequestionPageSection } from "./dischargeRequestPageSection.enum";
import { ReviewDischargeRequest } from "./reviewDischargeRequest/reviewDischargeRequest.component";
import SummaryDischargeRequest from "./summaryDischargeRequest/summaryDischargeRequest.component";

export const DischargeRequest = ({
  Validator = new DischargeRequestValidator(),
}: IDischargeRequestProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const submitterInfo = authObj?.userProfile;
  const registeredFacility = authObj?.registeredFaciltyAddress;
  const pickUpRequestObj = useContext<PickUpRequestContextType | null>(
    PickUpRequestContext
  );
  const patient = pickUpRequestObj!.patient;
  const DischargeReqObj = useContext<DischargeRequestContextType | null>(
    DischargeRequestContext
  );
  const dischargeData = DischargeReqObj?.dischargeRequestData!;
  const dischargeRequestDocuments = DischargeReqObj?.dischargeRequestDocuments!;
  const setDischargeData = DischargeReqObj?.setDischargeRequestData!;
  const [validator] = useState<DischargeRequestValidator>(Validator);
  const [openPopUp, setOpenPopUp] = useState(false);

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

  const validateAll = () => {
    let isValid = "";
    isValid = validator.validateAll(dischargeData, setDischargeData!);
    if (isValid === ValidationStatus.VALID) {
      DischargeReqObj?.setDischargeRequestPageSection(
        DischargeRequestionPageSection.REVIEW_DISCHARGE_REQUEST_FORM
      );
    }
  };

  const reviewDischargeRequest = () => {
    DischargeReqObj?.setIsPreviousClicked(true);
    validateAll();
  };

  const openCancelDischargeRequestPopUp = () => {
    const isUserEditted = validator.validateUserEnteredAnyDataOrNot(
      dischargeData,
      submitterInfo,
      registeredFacility,
      dischargeRequestDocuments
    );
    if (isUserEditted) {
      setOpenPopUp(true);
    } else {
      cancelDischargeRequest();
    }
  };

  const cancelDischargeRequest = () => {
    pickUpRequestObj?.resetData();
    DischargeReqObj?.resetData();
    history.push("/home");
  };

  useEffect(() => {
    try {
      if (!DischargeReqObj?.isPreviousClicked) {
        DischargeReqObj?.setDischargeRequestPageSection(
          DischargeRequestionPageSection.DISCHARGE_REQUEST_FORM
        );
      }
      let reqParams = {
        RentalOrderNumber: pickUpRequestObj!.patient?.roNumber.toString(),
      };
      (async () => {
        const woundListData = await retrieveWoundList(reqParams);
        if (
          woundListData.item.wounds.length > 1 &&
          !DischargeReqObj?.isPreviousClicked
        ) {
          setDischargeData({
            ...dischargeData,
            woundFinalMeasurementDate2: {
              valid: ValidationStatus.UNTOUCHED,
              value: "",
              required: true,
            },
            woundMeasurementDepth2: {
              valid: ValidationStatus.UNTOUCHED,
              value: "",
              required: true,
            },
            woundMeasurementLenght2: {
              valid: ValidationStatus.UNTOUCHED,
              value: "",
              required: true,
            },
            woundMeasurementWidth2: {
              valid: ValidationStatus.UNTOUCHED,
              value: "",
              required: true,
            },
          });
        }
        DischargeReqObj?.setWoundInfoDetails(woundListData.item);
      })();
    } catch (error) {}
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
      history.goBack();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (
        DischargeReqObj &&
        DischargeReqObj.scrollableDischargeComponentClassName
      ) {
        let scrollableComponent = document.getElementsByClassName(
          DischargeReqObj.scrollableDischargeComponentClassName
        )[0];
        if (scrollableComponent) {
          scrollableComponent.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        }
        DischargeReqObj.setScrollableDischargeComponentClassName(undefined);
      }
    }, 300);
  }, [DischargeReqObj?.scrollableDischargeComponentClassName]);

  const displayDischargeSection = () => {
    if (
      DischargeReqObj?.dischargeRequestPageSection ===
      DischargeRequestionPageSection.DISCHARGE_REQUEST_FORM
    ) {
      return (
        <div
          className="discharge-main-component"
          data-testid="discharge-main-component"
        >
          <div
            className="discharge-main-component-container"
            data-testid="discharge-main-component-container"
          >
            <div
              className="discharge-request-component"
              data-testid="discharge-request-component"
            >
              {isLoading && (
                <div className="discharge-request-loader">
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
                    className="discharge-request-route-section"
                    title="Discharge Request"
                  />
                  <div
                    className="discharge-request-error-msg"
                    data-testid="discharge-request-error-msg"
                  >
                    Oops something went wrong !
                  </div>
                </>
              )}
              {!isLoading && !error && patient && (
                <>
                  {pickUpRequestObj!.pickUpRequestPage ===
                    PickUpRequestPageSection.DISCHARGE_REQUEST_START_FORM && (
                    <Navigator
                      array={[
                        {
                          route: "/home",
                          pageName: "My Patients",
                        },
                      ]}
                      className="discharge-request-route-section"
                      title="Discharge Request"
                    />
                  )}
                  <div className="short-form">
                    <h2
                      className="discharge-request-component-header"
                      data-testid="discharge-request-component-header"
                    >
                      Discharge Request
                    </h2>
                    <PatientDetails patient={patient} />
                    <SubmitterInformation
                      dischargeData={dischargeData}
                      setDischargeData={setDischargeData}
                    />
                    {DischargeReqObj?.woundInfoDetails && (
                      <WoundInformationDischargeRequest
                        dischargeData={dischargeData}
                        setDischargeData={setDischargeData}
                        woundInfoDetails={DischargeReqObj?.woundInfoDetails}
                      />
                    )}
                  </div>
                  <div>
                    <TherapyOutcomes
                      dischargeData={dischargeData}
                      setDischargeData={setDischargeData}
                    />
                  </div>
                  <div>
                    <PatientAdmissionType
                      dischargeData={dischargeData}
                      setDischargeData={setDischargeData}
                    />
                  </div>
                  <DischargeReqUploadDoc />
                  <div>
                    {pickUpRequestObj!.pickUpRequestPage ===
                      PickUpRequestPageSection.DISCHARGE_REQUEST_START_FORM && (
                      <>
                        <PickUpRequestFooterButtonGroup
                          firstButtonTitle="Cancel"
                          firstButtonAction={openCancelDischargeRequestPopUp}
                          secondButtonTitle=""
                          secondButtonAction={() => {}}
                          thirdButtonTitle="Review Discharge"
                          thirdButtonAction={reviewDischargeRequest}
                          thirdButtonDisabled={
                            DischargeReqObj
                              ? DischargeReqObj?.errorInUploadFiles
                              : false
                          }
                        />
                        <Popup
                          dialogParentClass="exit-discharge-pop-up-container"
                          openFlag={openPopUp}
                          closeHandler={() => setOpenPopUp(false)}
                        >
                          <ExitDischargePopUp
                            cancelBtnAction={cancelDischargeRequest}
                            returnBtnAction={() => setOpenPopUp(false)}
                          />
                        </Popup>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      );
    } else if (
      DischargeReqObj?.dischargeRequestPageSection ===
      DischargeRequestionPageSection.REVIEW_DISCHARGE_REQUEST_FORM
    ) {
      return (
        <ReviewDischargeRequest
          woundInfoDetails={DischargeReqObj?.woundInfoDetails}
        />
      );
    } else if (
      DischargeReqObj?.dischargeRequestPageSection ===
      DischargeRequestionPageSection.SUMMARY_DISCHARGE_REQUEST_FORM
    ) {
      window.scrollTo(0, 0);
      return (
        <SummaryDischargeRequest
          pdfUrls={DischargeReqObj.pdfUrls}
          patient={pickUpRequestObj?.patient!}
          woundInfoDetails={DischargeReqObj?.woundInfoDetails}
        />
      );
    }
  };

  return <>{displayDischargeSection()}</>;
};
