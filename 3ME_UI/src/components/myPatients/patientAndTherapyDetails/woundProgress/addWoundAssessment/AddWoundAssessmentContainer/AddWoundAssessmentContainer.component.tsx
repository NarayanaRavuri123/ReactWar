import { Grid } from "@mui/material";
import moment from "moment";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  AuthContext,
  AuthContextType,
} from "../../../../../../context/AuthContext";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../../../../../context/RolesPermissionContext";
import {
  WoundAssessmentContext,
  WoundAssessmentContextType,
} from "../../../../../../context/WoundAssessmentContext";
import { IDropZoneDocumentSelect } from "../../../../../../core/customDropZone/dropZoneDocumentSelect.interface";
import { ValidationStatus } from "../../../../../../core/interfaces/input.interface";
import { LoadingSpinner } from "../../../../../../core/loader/LoadingSpinner";
import { Popup } from "../../../../../../core/popup/popup.component";
import {
  saveWoundAssessment,
  uploadDocument,
} from "../../../../../../util/3meService";
import { uid } from "../../../../../../util/alertFunctions";
import { retrievePatientDetails } from "../../../../../../util/pickUpOrDischargeService";
import {
  FILE_UPLOAD_SERVER_ERROR_MESSAGE_WA_UD,
  FILE_UPLOAD_SERVER_ERROR_MESSAGE_WA_UI,
} from "../../../../../../util/staticText";
import {
  IAnalyticsData,
  formatDate,
  getPdfUrl,
  sendAnalyticsData,
} from "../../../../../../util/utilityFunctions";
import { getPdfContent } from "../../../../../../util/vacOrderService";
import { retrievePatientWoundDetails } from "../../../../../../util/woundAssessmentService";
import { IPrintOrderSummaryRequest } from "../../../../../newOrder/newOrderReviewOrderStepper/PrintOrderSummaryPdf.interface";
import ProgressBar from "../../../../../progressBar/progressBar.component";
import AddWoundAssessment from "../addWoundAssessment.component";
import "../addWoundAssessment.css";
import AddWoundFooterButtonGroup from "../addWoundFooterButtonGroup/addWoundFooterButtonGroup.component";
import WoundAssessmentLeavePopUp from "../woundAssessmentLeavePopUp/woundAssessmentLeavePopUp.component";
import { IWoundAssessmentRequest } from "../woundAssessmentMapper/woundAssessmentRequest.interface";
import { mapWoundAssessmentRequestObj } from "../woundAssessmentMapper/woundAssessmentRequestMapper";
import {
  WoundAssessmentPageSection,
  WoundAssessmentType,
} from "../woundAssessmentPageSection.enum";
import WoundAssessmentSummary from "../woundAssessmentSummary/woundAssessmentSummary.component";
import WoundAssessmentReview from "../woundReviewAssessment/woundReviewAssessment.component";

type Props = {};

export const AddWoundAssessmentContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const [addWoundAssessmentLoader, setAddWoundAssessmentLoader] =
    useState(false);
  const [isErrorOccurred, setIsErrorOccurred] = useState<boolean | null>(null);
  const patientData: any = location.state;
  const [popUpTitle, setPopUpTitle] = useState("");
  const [popUpButtonTitle, setPopUpButtonTitle] = useState("");
  const [cancelConfirmText, setcancelConfirmText] = useState("");
  const [backBtnText, setbackBtnText] = useState("Back");
  const [saveWoundAssessmentLoader, setSaveWoundAssessmentLoader] =
    useState(false);

  const [errorPopUpFlag, setErrorPopUpFlag] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [pdfUrl, setPDFURL] = useState("");

  const WoundAssessmentObj = useContext<WoundAssessmentContextType | null>(
    WoundAssessmentContext
  );
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );

  const woundAssessmentContextObject =
    useContext<WoundAssessmentContextType | null>(WoundAssessmentContext);
  const authObj = useContext<AuthContextType | null>(AuthContext);
  // While implementing Wound Progress tab place below method (loadPatientWoundInfo) in Wound Progress tab
  // and place loadPatientProductInfo in a new useeffect
  const loadPatientWoundInfo = async () => {
    let reqParams = {
      rentalOrderNumber: patientData.ron,
      dob: moment(patientData.dob).format("yyyy-MM-DD"),
      woundID: patientData.woundOrderId,
    };
    try {
      const data = await retrievePatientWoundDetails(reqParams);
      if (data.error) {
        setIsErrorOccurred(true);
        setAddWoundAssessmentLoader(false);
      } else {
        WoundAssessmentObj?.setAddWoundAssessment((dt: any) => ({
          ...dt,
          patientFirstName: {
            value: data.data.firstName,
            valid: ValidationStatus.VALID,
          },
          patientLastName: {
            value: data.data.lastName,
            valid: ValidationStatus.VALID,
          },
          woundID: {
            value: patientData.woundOrderId,
            valid: ValidationStatus.VALID,
          },
          placementDate: {
            value: moment(data.data.placementDate).format("MM/DD/yyyy"),
            valid: ValidationStatus.VALID,
          },
          rentalOrderNumber: {
            value: data.data.ron,
            valid: ValidationStatus.VALID,
          },
          woundType: {
            value: data.data.woundType,
            valid: ValidationStatus.VALID,
          },
          woundLocation: {
            value: data.data.location === null ? "" : data.data.location,
            valid: ValidationStatus.VALID,
          },
          dateOfBirth: {
            value: moment(data.data.dob).format("MM/DD/yyyy"),
            valid: ValidationStatus.VALID,
          },
          woundDirection: {
            value: data.data.direction === null ? "" : data.data.direction,
            valid: ValidationStatus.VALID,
          },
          woundOrientation: {
            value: data.data.orientation === null ? "" : data.data.orientation,
            valid: ValidationStatus.VALID,
          },
          woundAssessmentDateTo: {
            value: formatDate(patientData.assessmentToDate).toString(),
            valid: ValidationStatus.VALID,
          },
          woundAssessmentDateFrom: {
            value: formatDate(patientData.assessmentFromDate).toString(),
            valid: ValidationStatus.VALID,
          },
          assessmentType: {
            value: determineAssessmentType(
              data.data.assessmentType.toUpperCase()
            ),
            valid: ValidationStatus.VALID,
          },
          previousEvaluationDate: {
            value: data.data.assessments[0].evaluationDate,
            valid: ValidationStatus.VALID,
          },
          previousWoundLength: {
            value: data.data.assessments[0].woundLength,
            valid: ValidationStatus.VALID,
          },
          previousWoundDepth: {
            value: data.data.assessments[0].woundDepth,
            valid: ValidationStatus.VALID,
          },
          previousWoundWidth: {
            value: data.data.assessments[0].woundWidth,
            valid: ValidationStatus.VALID,
          },
        }));
        loadPatientProductInfo();
      }
    } catch (error) {
      setIsErrorOccurred(true);
      setAddWoundAssessmentLoader(false);
    }
  };

  const determineAssessmentType = (value: string) => {
    let assessmentType: WoundAssessmentType = WoundAssessmentType.MWP;
    switch (value) {
      case WoundAssessmentType.MWP:
        assessmentType = WoundAssessmentType.MWP;
        break;
      case WoundAssessmentType.MWPWeekly:
        assessmentType = WoundAssessmentType.MWPWeekly;
        break;
      case WoundAssessmentType.MWPBiWeekly:
        assessmentType = WoundAssessmentType.MWPBiWeekly;
        break;
      case WoundAssessmentType.MWPFull:
        assessmentType = WoundAssessmentType.MWPFull;
        break;
    }
    return assessmentType;
  };

  const loadPatientProductInfo = async () => {
    let reqParams = {
      RentalOrderNumber: patientData.ron,
      DOB: moment(patientData.dob).format("yyyy-MM-DD"),
    };
    try {
      const data = await retrievePatientDetails(reqParams);
      if (data.error) {
        setIsErrorOccurred(false);
        setAddWoundAssessmentLoader(false);
      } else {
        WoundAssessmentObj?.setAddWoundAssessment((dt: any) => ({
          ...dt,
          productName: {
            value: `${data.productName} - ${data.productSerialNumber}`,
            valid: ValidationStatus.VALID,
          },
        }));
        setIsErrorOccurred(false);
        setAddWoundAssessmentLoader(false);
      }
    } catch (error) {
      setIsErrorOccurred(false);
      setAddWoundAssessmentLoader(false);
    }
  };

  const apiCallGetPdfContent = async (assessmentId: any) => {
    if (assessmentId) {
      let reqParams: IPrintOrderSummaryRequest = {
        EntityID: assessmentId,
        EntityType: 1,
      };
      const responseObj = await getPdfContent(reqParams);
      if (responseObj.succeeded) {
        const url = getPdfUrl(responseObj.data.file);
        setPDFURL(url);
      } else {
        setPDFURL("");
      }
      return responseObj;
    }
  };

  useEffect(() => {
    setAddWoundAssessmentLoader(true);
    WoundAssessmentObj?.resetAddWoundAssessmentData();
    loadPatientWoundInfo();
    if (woundAssessmentContextObject?.guid === null) {
      woundAssessmentContextObject?.setGuid(uid);
    }
  }, []);

  const woundAssessmentSectionToDisplay = () => {
    let page: ReactNode;
    switch (WoundAssessmentObj?.woundAssessmentPageSection) {
      case WoundAssessmentPageSection.WOUND_ASSESSMENT_FORM:
        page = (
          <AddWoundAssessment
            isErrorOccurred={isErrorOccurred}
            data={WoundAssessmentObj?.addWoundAssessment!}
            setData={WoundAssessmentObj?.setAddWoundAssessment}
          />
        );
        break;
      case WoundAssessmentPageSection.WOUND_ASSESSMENT_REVIEW:
        page = (
          <WoundAssessmentReview
            woundAssessmentContextObj={WoundAssessmentObj}
          />
        );
        break;
      case WoundAssessmentPageSection.WOUND_ASSESSMENT_SUMMARY:
        page = (
          <WoundAssessmentSummary
            woundAssessmentContextObj={WoundAssessmentObj}
            pdfUrl={pdfUrl}
          />
        );
        break;
    }
    return page;
  };

  const handleBackArrowClick = () => {
    if (
      WoundAssessmentObj?.woundAssessmentPageSection ===
      WoundAssessmentPageSection.WOUND_ASSESSMENT_FORM
    ) {
      history.goBack();
    } else if (
      WoundAssessmentObj?.woundAssessmentPageSection ===
      WoundAssessmentPageSection.WOUND_ASSESSMENT_REVIEW
    ) {
      WoundAssessmentObj?.setWoundAssessmentProgress(50);
      WoundAssessmentObj?.setIsBackFromWoundPage(true);
      WoundAssessmentObj?.setWoundAssessmentPageSection(
        WoundAssessmentPageSection.WOUND_ASSESSMENT_FORM
      );
    } else {
      history.goBack();
    }
  };

  const callSaveWoundAssessmentOrder = async () => {
    let uploadedDocs: any[] = [];
    let response: any;
    let errorInUploadFileImage = false;
    let updatedFiles: IDropZoneDocumentSelect[] = [];
    WoundAssessmentObj?.woundImagesUpload.forEach((document) => {
      if (!document.documentId) {
        let uploadedDoc = {
          fileName: document.documentName,
          content: document.documentBase64,
          forAddition: true,
        };
        uploadedDocs.push(uploadedDoc);
      }
    });
    if (
      WoundAssessmentObj?.deletedWoundImagesDocuments &&
      WoundAssessmentObj?.deletedWoundImagesDocuments.length > 0
    ) {
      WoundAssessmentObj?.deletedWoundImagesDocuments.forEach((documentId) => {
        let deletedDoc = {
          DocumentId: documentId,
          forAddition: false,
        };
        uploadedDocs.push(deletedDoc);
      });
    }
    if (uploadedDocs.length > 0) {
      let docRequest = {
        entityID: WoundAssessmentObj?.guid,
        entityType: 2,
        Files: uploadedDocs,
      };
      const docResult = await uploadDocument(docRequest);
      if (!docResult || !docResult.succeeded) {
        WoundAssessmentObj?.setSaveWoundAssessmentLoader(false);
        setErrorPopUpFlag(true);
        seterrorMessage("Something went wrong !!");
        errorInUploadFileImage = true;
      } else {
        response = docResult.data;
        WoundAssessmentObj?.setDeletedWoundImagesDocuments([]);
        updatedFiles = WoundAssessmentObj?.woundImagesUpload.map((item) => {
          var successFile = response.filter(
            (file: { fileName: any }) => file.fileName === item.documentName
          );
          if (
            item.documentName === successFile[0]?.fileName &&
            (successFile[0]?.code === 1054 || successFile[0]?.code === 1042)
          ) {
            const updatedItem: IDropZoneDocumentSelect = {
              ...item,
              succeeded: true,
              documentId: successFile[0]?.message,
            };
            return updatedItem;
          } else if (
            item.documentName !== successFile[0]?.fileName &&
            item.documentId
          ) {
            return item;
          } else {
            const errorItem: IDropZoneDocumentSelect = {
              ...item,
              succeeded: false,
              errorMessage: successFile[0]?.message,
            };
            return errorItem;
          }
        })!;
        WoundAssessmentObj?.setwoundImagesUpload(updatedFiles);
        WoundAssessmentObj?.setDeletedWoundImagesDocuments([]);
      }
      if (
        response?.filter(
          (file: { code: number }) => file.code !== 1042 && file.code !== 1054
        ).length > 0
      ) {
        errorInUploadFileImage = true;
        WoundAssessmentObj?.setSaveWoundAssessmentLoader(false);
        setErrorPopUpFlag(true);
        seterrorMessage(FILE_UPLOAD_SERVER_ERROR_MESSAGE_WA_UI);
      }
    }
    // upload images ends here
    if (errorInUploadFileImage === false) {
      await uploadWoundDocuments(updatedFiles);
    }
  };

  const uploadWoundDocuments = async (
    updatedFiles: IDropZoneDocumentSelect[]
  ) => {
    let response: any;
    let uploadedDocs: any[] = [];
    let updatedDocumentFiles: IDropZoneDocumentSelect[] = [];
    let errorInUploadFileDocument = false;
    let woundImagesDocID: any[] = [];
    let woundDocID: any[] = [];
    WoundAssessmentObj?.woundDocsUpload.forEach((document) => {
      if (!document.documentId) {
        let uploadedDoc = {
          fileName: document.documentName,
          content: document.documentBase64,
          forAddition: true,
        };
        uploadedDocs.push(uploadedDoc);
      }
    });
    if (
      WoundAssessmentObj?.deletedWoundDocuments &&
      WoundAssessmentObj?.deletedWoundDocuments.length > 0
    ) {
      WoundAssessmentObj?.deletedWoundDocuments.forEach((documentId) => {
        let deletedDoc = {
          DocumentId: documentId,
          forAddition: false,
        };
        uploadedDocs.push(deletedDoc);
      });
    }
    if (uploadedDocs.length > 0) {
      let docRequest = {
        entityID: WoundAssessmentObj?.guid,
        entityType: 4,
        Files: uploadedDocs,
      };
      const docResult = await uploadDocument(docRequest);
      if (!docResult || !docResult.succeeded) {
        WoundAssessmentObj?.setSaveWoundAssessmentLoader(false);
        setErrorPopUpFlag(true);
        seterrorMessage("Something went wrong !!");
        errorInUploadFileDocument = true;
      } else {
        response = docResult.data;
        WoundAssessmentObj?.setDeletedWoundDocuments([]);
        updatedDocumentFiles = WoundAssessmentObj?.woundDocsUpload.map(
          (item) => {
            var successFile = response.filter(
              (file: { fileName: any }) => file.fileName === item.documentName
            );
            if (
              item.documentName === successFile[0]?.fileName &&
              (successFile[0]?.code === 1054 || successFile[0]?.code === 1042)
            ) {
              const updatedItem: IDropZoneDocumentSelect = {
                ...item,
                succeeded: true,
                documentId: successFile[0]?.message,
              };
              return updatedItem;
            } else if (
              item.documentName !== successFile[0]?.fileName &&
              item.documentId
            ) {
              return item;
            } else {
              const errorItem: IDropZoneDocumentSelect = {
                ...item,
                succeeded: false,
                errorMessage: successFile[0]?.message,
              };
              return errorItem;
            }
          }
        )!;
        WoundAssessmentObj?.setwoundDocsUpload(updatedDocumentFiles);
        WoundAssessmentObj?.setDeletedWoundDocuments([]);
      }
      if (
        response?.filter(
          (file: { code: number }) => file.code !== 1042 && file.code !== 1054
        ).length > 0
      ) {
        errorInUploadFileDocument = true;
        WoundAssessmentObj?.setSaveWoundAssessmentLoader(false);
        setErrorPopUpFlag(true);
        seterrorMessage(FILE_UPLOAD_SERVER_ERROR_MESSAGE_WA_UD);
      }
    }
    if (errorInUploadFileDocument === false) {
      if (updatedFiles.length === 0) {
        updatedFiles = WoundAssessmentObj?.woundImagesUpload!;
      }
      if (updatedDocumentFiles.length === 0) {
        updatedDocumentFiles = WoundAssessmentObj?.woundDocsUpload!;
      }
      woundImagesDocID = updatedFiles.map((x: any) => {
        if (x.documentId) {
          return x.documentId;
        }
      });
      woundDocID = updatedDocumentFiles.map((x: any) => {
        if (x.documentId) {
          return x.documentId;
        }
      });
      const isSalesRole: boolean =
        permissionObj?.mappedRolesPermissionData.IsSalesRole ||
        permissionObj?.mappedRolesPermissionData.IsSalesManagerRole
          ? true
          : false;
      const reqParam: IWoundAssessmentRequest =
        await mapWoundAssessmentRequestObj(
          WoundAssessmentObj!,
          isSalesRole,
          woundImagesDocID,
          woundDocID,
          authObj?.registeredFaciltyAddress?.siteUseId ?? "",
          authObj?.registeredFaciltyAddress?.accountName ?? ""
        );
      let result: any = await saveWoundAssessment(reqParam);
      if (!result || !result.succeeded || result === undefined) {
        woundAssessmentContextObject?.setSaveWoundAssessmentLoader(false);
        setErrorPopUpFlag(true);
        seterrorMessage("Something went wrong !!");
      } else {
        const getPdfResponse = await apiCallGetPdfContent(result.data);
        if (
          !getPdfResponse ||
          !getPdfResponse.succeeded ||
          getPdfResponse === undefined
        ) {
          setErrorPopUpFlag(true);
          seterrorMessage("Something went wrong !!");
        } else {
          {
            woundAssessmentContextObject?.setGuid(null);
            woundAssessmentContextObject?.setShowDialogWA(false);
            woundAssessmentContextObject?.setSaveWoundAssessmentLoader(false);
            setErrorPopUpFlag(false);
            woundAssessmentContextObject?.setWoundAssessmentPageSection(
              WoundAssessmentPageSection.WOUND_ASSESSMENT_SUMMARY
            );
          }
        }
      }
    }
  };

  useEffect(() => {
    if (
      WoundAssessmentObj?.woundAssessmentPageSection ===
      WoundAssessmentPageSection.WOUND_ASSESSMENT_REVIEW
    ) {
      window.scrollTo(0, 0);
    } else if (
      WoundAssessmentObj?.woundAssessmentPageSection ===
      WoundAssessmentPageSection.WOUND_ASSESSMENT_SUMMARY
    ) {
      window.scrollTo(0, 0);
    }
    if (
      WoundAssessmentObj?.woundAssessmentPageSection ===
      WoundAssessmentPageSection.WOUND_ASSESSMENT_FORM
    ) {
      window.scrollTo(0, 0);
    }
  }, [WoundAssessmentObj?.woundAssessmentPageSection]);

  const spinner = () => {
    return (
      <div>
        <div className="addWound-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  const handleDelete = async (e: any) => {
    woundAssessmentAnalytics(
      "Delete_Wound_Assessment",
      authObj?.userProfile?.userID!,
      authObj?.registeredFaciltyAddress?.siteUseId!,
      permissionObj?.mappedRolesPermissionData.roleName!
    );
    woundAssessmentContextObject?.setShowDialogWA(false);
    history.goBack();
  };
  return (
    <>
      <Grid
        className="newOrder-flow"
        data-testid="addWoundAssessment-flow"
        container
      >
        {WoundAssessmentObj?.woundAssessmentPageSection !==
          WoundAssessmentPageSection.WOUND_ASSESSMENT_SUMMARY && (
          <Grid item>
            <ProgressBar
              pageTitle="Wound Assessment"
              progressValue={WoundAssessmentObj?.woundAssessmentProgress}
              backButtonAction={handleBackArrowClick}
            />
          </Grid>
        )}
        {woundAssessmentSectionToDisplay()}
      </Grid>
      <Popup
        closeHandler={() => {}}
        openFlag={addWoundAssessmentLoader}
        hideCloseButton={true}
      >
        {spinner()}
      </Popup>
      {isErrorOccurred === false &&
        WoundAssessmentObj?.woundAssessmentPageSection !==
          WoundAssessmentPageSection.WOUND_ASSESSMENT_SUMMARY && (
          <AddWoundFooterButtonGroup
            saveWoundAssessmentLoader={
              woundAssessmentContextObject?.saveWoundAssessmentLoader!
            }
            setSaveWoundAssessmentLoader={
              woundAssessmentContextObject?.setSaveWoundAssessmentLoader!
            }
            errorFlag={errorPopUpFlag}
            errorMessage={errorMessage}
            callSaveWoundAssessmentOrder={callSaveWoundAssessmentOrder}
            setErrorFlag={setErrorPopUpFlag}
            deleteHandler={() => handleDelete(false)}
          />
        )}

      <WoundAssessmentLeavePopUp
        when={woundAssessmentContextObject?.showDialogWA!}
        navigate={(path) =>
          history.push({
            pathname: path,
            state: {
              stateData: patientData.selectedPatientData,
            },
          })
        }
        shouldBlockNavigation={(location) => {
          if (woundAssessmentContextObject?.showDialogWA) {
            if (location.pathname !== "/addWoundAssessment") {
              return true;
            }
          }
          return false;
        }}
      />
      {WoundAssessmentObj?.woundAssessmentPageSection !==
        WoundAssessmentPageSection.WOUND_ASSESSMENT_SUMMARY && (
        <WoundAssessmentLeavePopUp
          when={woundAssessmentContextObject?.showDialogWA!}
          navigate={(path) =>
            history.push({
              pathname: path,
              state: {
                stateData: patientData.selectedPatientData,
              },
            })
          }
          shouldBlockNavigation={(location) => {
            if (woundAssessmentContextObject?.showDialogWA) {
              if (location.pathname !== "/addWoundAssessment") {
                return true;
              }
            }
            return false;
          }}
        />
      )}
    </>
  );
};

export const woundAssessmentAnalytics = (
  eventName: string,
  userId: string,
  facilityId: string,
  roleId: string
) => {
  let analyticsData: IAnalyticsData = {
    page_type: "react",
    view_name: "woundAssessment",
    event_type: "click",
    event_name: eventName,
    tealium_event: "Wound_Assessment",
    mmmex_userrecordid: userId,
    mmmex_facilityid: facilityId,
    mmmex_roleid: roleId,
    mmmex_pagename: "woundAssessment",
  };
  sendAnalyticsData(analyticsData);
};
