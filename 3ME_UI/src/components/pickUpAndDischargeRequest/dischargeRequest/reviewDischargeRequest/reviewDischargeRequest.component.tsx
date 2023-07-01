import { Box, Grid } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import "./reviewRequest.css";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { IDischargeRequestProps } from "../../dischargeRequest/dischargeRequest.interface";
import { useHistory } from "react-router-dom";
import { Navigator } from "../../../helpAndSupport/Navigator/navigator.component";
import {
  PickUpRequestContext,
  PickUpRequestContextType,
} from "../../../../context/PickUpRequestContext";
import moment from "moment";

import { ProductInformationReview } from "./productInformationReview/productInformation.review.component";
import { PickUpRequestFooterButtonGroup } from "../../pickUpRequest/pickUpRequestFooterGroup/pickUpRequestFooterGroup.component";
import { PickUpRequestPageSection } from "../../pickUpRequest/pickUpRequestPageSection.enum";
import { Popup } from "../../../../core/popup/popup.component";
import { ExitDischargePopUp } from "../exitDischargePopUp/exitDischargePopUp.commonent";
import {
  DischargeRequestContext,
  DischargeRequestContextType,
} from "../../../../context/DischargeRequestContext";
import { DischargeRequestionPageSection } from "../dischargeRequestPageSection.enum";
import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import { DischargeRequestValidator } from "../dischargeRequest.validator";

import SubmitterInformation from "../submitterInformation/submitterInformation.component";
import { TherapyOutcomes } from "../therapyOutcomes/therapyOutcomes.component";
import { PatientAdmissionType } from "../patientAdmissionType/patientAdmissionType.component";
import DischargeReqUploadDoc from "../dischargeRequestUploadDocuments/dischargeReqUploadDoc.component";
import WoundInformationDischargeRequest from "../woundInformationDischargeRequest/woundInformationDischargeRequest.component";
import AttestationAndSignature from "../../../../core/attestationAndSignature/attestationAndSignature.component";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../../../context/RolesPermissionContext";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";
import { mapSaveDischargeRequest } from "./mapper/request/dischargeRequest";
import { uploadDocToIface } from "../../../../util/orderOverViewService";
import { IDropZoneDocumentSelect } from "../../../../core/customDropZone/dropZoneDocumentSelect.interface";
import { SendNoteFailure } from "../../../send3MNote/popUps/failurePopUp/sendNoteFailure.component";
import { ISaveDischargeRequest } from "./mapper/request/dischargeRequest.interface";
import {
  getPDFContent,
  saveDischargeRequest,
} from "../../../../util/dischargeService";
import { getPdfUrl } from "../../../../util/utilityFunctions";
import { SAVE_DISCHARGE_FAILED } from "../../../../util/staticText";

export const ReviewDischargeRequest = ({
  Validator = new DischargeRequestValidator(),
  woundInfoDetails,
}: IDischargeRequestProps) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openLoaderPopUp, setOpenLoaderPopUp] = useState<boolean>(false);
  const [showErrorPopUp, setShowErrorPopUp] = useState<boolean>(false);

  const pickUpRequestObj = useContext<PickUpRequestContextType | null>(
    PickUpRequestContext
  );
  const dischargeRequestObj = useContext<DischargeRequestContextType | null>(
    DischargeRequestContext
  );
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const [validator] = useState<DischargeRequestValidator>(Validator);
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const submitterInfo = authObj?.userProfile;
  const registeredFacility = authObj?.registeredFaciltyAddress;
  const dischargeData = dischargeRequestObj?.dischargeRequestData!;
  const patient = pickUpRequestObj!.patient;
  const dischargeRequestDocuments =
    dischargeRequestObj?.dischargeRequestDocuments!;
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const uploadDocuments = async () => {
    if (
      patient &&
      dischargeRequestObj &&
      dischargeRequestObj.dischargeRequestDocuments &&
      dischargeRequestObj.dischargeRequestDocuments.length > 0
    ) {
      let uploadedDocs: any[] = [];
      dischargeRequestObj.dischargeRequestDocuments.forEach((document) => {
        if (!document.documentId) {
          let uploadedDoc = {
            FileName: document.documentName,
            FileNetTypeCode: "DC",
            Base64Content: document.documentBase64,
          };
          uploadedDocs.push(uploadedDoc);
        }
      });
      if (uploadedDocs.length > 0) {
        let docRequest = {
          RentalOrderNumber: patient.roNumber,
          Files: uploadedDocs,
        };
        const response = await uploadDocToIface(docRequest);
        if (response && response.succeeded) {
          let updatedFiles: IDropZoneDocumentSelect[] =
            dischargeRequestObj.dischargeRequestDocuments.map((item) => {
              const matchedFiles = response.items.filter(
                (file: { fileName: any }) => file.fileName === item.documentName
              );
              const matchFile = matchedFiles[0];
              if (
                item.documentName === matchFile.fileName &&
                (matchFile.code === 1054 ||
                  matchFile.code === 1042 ||
                  matchFile.code === 1506)
              ) {
                const updatedItem: IDropZoneDocumentSelect = {
                  ...item,
                  succeeded: true,
                  documentId: matchFile.message,
                };
                return updatedItem;
              } else {
                const errorItem: IDropZoneDocumentSelect = {
                  ...item,
                  succeeded: false,
                  errorMessage: matchFile.message,
                };
                return errorItem;
              }
            })!;
          dischargeRequestObj.setDischargeRequestDocuments(updatedFiles);
          if (updatedFiles.every((file) => file.succeeded)) {
            return true;
          } else {
            setOpenLoaderPopUp(false);
            setShowErrorPopUp(true);
            return false;
          }
        } else {
          setOpenLoaderPopUp(false);
          setShowErrorPopUp(true);
          return false;
        }
      }
    }
  };

  const saveDischargeRequestAPI = async () => {
    const facilityName = authObj?.registeredFaciltyAddress?.accountName ?? "";
    const userName = authObj?.userProfile?.userName ?? "";
    const attestationData = dischargeRequestObj?.dischargeReqAttestation!;
    const woundInfoDetails = dischargeRequestObj?.woundInfoDetails;
    const isSalesRole: boolean =
      permissionObj?.mappedRolesPermissionData.IsSalesRole ||
      permissionObj?.mappedRolesPermissionData.IsSalesManagerRole
        ? true
        : false;

    const reqBody: ISaveDischargeRequest = await mapSaveDischargeRequest(
      attestationData,
      dischargeData,
      facilityName,
      isSalesRole,
      patient!,
      userName,
      woundInfoDetails
    );
    const response = await saveDischargeRequest(reqBody);
    if (response && response.succeeded) {
      return response.data;
    } else {
      setOpenLoaderPopUp(false);
      setShowErrorPopUp(true);
      return [];
    }
  };

  const getPDFContentAPI = async (orderId: string) => {
    const reqBody = {
      EntityID: orderId,
      EntityType: 1,
    };
    const response = await getPDFContent(reqBody);
    if (response && response.succeeded) {
      const url = getPdfUrl(response.data.file);
      return url;
    } else {
      setOpenLoaderPopUp(false);
      return null;
    }
  };

  const cancelDischargeRequest = () => {
    pickUpRequestObj?.resetData();
    dischargeRequestObj?.resetData();
    history.push("/home");
  };

  const summaryDischargeRequest = async () => {
    let isValid = validator.dischargeRequestValidateAttestation(
      dischargeRequestObj?.dischargeReqAttestation!,
      dischargeRequestObj?.setDischargeReqAttestation!
    );
    if (isValid === ValidationStatus.VALID) {
      setOpenLoaderPopUp(true);
      const isUploadSucceed = await uploadDocuments();
      if (
        dischargeRequestObj &&
        (isUploadSucceed ||
          dischargeRequestObj.dischargeRequestDocuments.length === 0)
      ) {
        const savedOrderIds = await saveDischargeRequestAPI();
        if (savedOrderIds.length > 0) {
          let apiCollection: any[] = [];
          savedOrderIds.forEach((orderId: string) => {
            apiCollection.push(getPDFContentAPI(orderId));
          });
          let urls = await Promise.all(apiCollection);
          if (!urls.some((url: string) => !url)) {
            dischargeRequestObj.setPdfUrls(urls);
          }
          setOpenLoaderPopUp(false);
          dischargeRequestObj.setDischargeRequestPageSection(
            DischargeRequestionPageSection.SUMMARY_DISCHARGE_REQUEST_FORM
          );
        }
      }
    }
  };

  const previousHandler = () => {
    dischargeRequestObj?.setIsPreviousClicked(true);
    dischargeRequestObj?.setDischargeRequestPageSection(
      DischargeRequestionPageSection.DISCHARGE_REQUEST_FORM
    );
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

  const reviewDischargeRequest = (event: any) => {
    event.preventDefault();
    previousHandler();
  };

  const handleDischargeRequestEditClick = (ref: any) => {
    window.scrollTo(0, 0);
    dischargeRequestObj?.setDischargeRequestPageSection(
      DischargeRequestionPageSection.DISCHARGE_REQUEST_FORM
    );
    dischargeRequestObj?.setScrollableDischargeComponentClassName(ref);
  };

  useEffect(() => {
    if (patient) {
      setIsLoading(false);
    } else {
      history.goBack();
    }
  }, []);

  return (
    <div className="reviewRequest-main-component">
      <div className="reviewRequest-main-component-container">
        <div className="review-Request-component">
          {isLoading && (
            <div className="review-Request-loader">
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && (
            <>
              <Navigator
                array={[
                  {
                    route: "/home",
                    pageName: "My Patients",
                  },
                  {
                    onLinkClick: reviewDischargeRequest,
                    route: "/",
                    pageName: "Discharge Request",
                  },
                ]}
                className="reviewRequest-route-section"
                title="Review Request"
              />
            </>
          )}
          {!isLoading && (
            <>
              <div className="review-discharge-request">
                <Grid item xs={12}>
                  <h2
                    className="review-discharge-header"
                    data-testid="review-discharge-header"
                  >
                    Review Discharge Request
                  </h2>
                  <div className="review-summary" data-testid="review-summary">
                    Please review and confirm the information entered for this
                    wound assessment is an accurate reflection of the patient's
                    medical record.
                  </div>
                </Grid>
                <Box></Box>
                <Grid
                  container
                  spacing={2}
                  classes={{ root: "discharge-request-grid-container" }}
                >
                  <Grid item xs={12}>
                    <h4 className="patient-name" data-testid="patient-info">
                      Patient Information
                    </h4>
                  </Grid>
                  {patient?.firstName && patient?.lastName && (
                    <Grid item xs={6} className="discharge-request-grid-item">
                      <div className="patient-name" data-testid="patient-name">
                        <h5
                          className="discharge-request-title"
                          data-testid="discharge-request-title-patient-name"
                        >
                          Patient Name
                        </h5>
                        <h5
                          className="discharge-request-value"
                          data-testid="discharge-request-value-patient-name"
                        >
                          {makeCapitalEachWordInString(
                            `${patient.firstName} ${patient.lastName}`
                          )}
                        </h5>
                      </div>
                    </Grid>
                  )}
                  {patient?.dob && (
                    <Grid item xs={6} className="discharge-request-grid-item">
                      <div className="dob-date" data-testid="dob-date">
                        <h5
                          className="discharge-request-title"
                          data-testid="discharge-request-title-dob-date"
                        >
                          Date of Birth
                        </h5>
                        <h5
                          className="discharge-request-value"
                          data-testid="discharge-request-value-dob-date"
                        >
                          {patient.dob
                            ? moment(patient.dob).format("MM/DD/YYYY")
                            : null}
                        </h5>
                      </div>
                    </Grid>
                  )}
                  <ProductInformationReview />
                  <SubmitterInformation
                    dischargeData={dischargeData}
                    setDischargeData={
                      dischargeRequestObj?.setDischargeRequestData!
                    }
                    isReviewDischargePage={true}
                    dischargeRequestEditBtnClick={() => {
                      handleDischargeRequestEditClick("submitter-info");
                      dischargeRequestObj?.setIsPreviousClicked(true);
                    }}
                  />
                  <WoundInformationDischargeRequest
                    dischargeData={dischargeData}
                    setDischargeData={
                      dischargeRequestObj?.setDischargeRequestData!
                    }
                    isReviewDischargePage={true}
                    woundInfoDetails={woundInfoDetails}
                    dischargeRequestEditBtnClick={() =>
                      handleDischargeRequestEditClick("woundInfoDR")
                    }
                  />
                  <TherapyOutcomes
                    dischargeData={dischargeData}
                    setDischargeData={
                      dischargeRequestObj?.setDischargeRequestData!
                    }
                    isReviewDischargePage={true}
                    dischargeRequestEditBtnClick={() =>
                      handleDischargeRequestEditClick("therapyoutcome-type")
                    }
                  />
                  <PatientAdmissionType
                    dischargeData={dischargeData}
                    setDischargeData={
                      dischargeRequestObj?.setDischargeRequestData!
                    }
                    isReviewDischargePage={true}
                    dischargeRequestEditBtnClick={() =>
                      handleDischargeRequestEditClick("patientadmissiontype")
                    }
                  />
                  <DischargeReqUploadDoc
                    isReviewDischargePage={true}
                    dischargeRequestEditBtnClick={() =>
                      handleDischargeRequestEditClick("dischargeReqDoc")
                    }
                  />
                  <div
                    className="attestationStyling"
                    data-testid="attestationAndSign"
                  >
                    <AttestationAndSignature
                      attestationData={
                        dischargeRequestObj?.dischargeReqAttestation!
                      }
                      setAttestationData={
                        dischargeRequestObj?.setDischargeReqAttestation!
                      }
                    />
                  </div>
                </Grid>
                <div>
                  {pickUpRequestObj!.pickUpRequestPage ===
                    PickUpRequestPageSection.DISCHARGE_REQUEST_START_FORM && (
                    <>
                      <PickUpRequestFooterButtonGroup
                        firstButtonTitle="Cancel"
                        firstButtonAction={openCancelDischargeRequestPopUp}
                        secondButtonTitle="Previous"
                        secondButtonAction={previousHandler}
                        thirdButtonTitle="Submit Request"
                        thirdButtonAction={summaryDischargeRequest}
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
                      <Popup
                        openFlag={openLoaderPopUp}
                        closeHandler={() => setOpenLoaderPopUp(false)}
                        dialogParentClass={"discharge-request-loader-pop-up"}
                        data-testid="loader-pop-up"
                        hideCloseButton={true}
                      >
                        <div className="discharge-request-loader">
                          <LoadingSpinner />
                        </div>
                      </Popup>
                      <Popup
                        openFlag={showErrorPopUp}
                        closeHandler={() => setShowErrorPopUp(false)}
                        data-testid="error-pop-up"
                      >
                        <div className="discharge-request-error">
                          <SendNoteFailure
                            backButtonAction={() => setShowErrorPopUp(false)}
                            message={SAVE_DISCHARGE_FAILED}
                            rootClass="discharge-request-error-pop-up"
                          />
                        </div>
                      </Popup>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
