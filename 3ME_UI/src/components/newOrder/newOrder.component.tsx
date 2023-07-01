import { Grid } from "@mui/material";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Prompt, useHistory, useLocation, useParams } from "react-router-dom";
import { format } from "react-string-format";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../context/NewOrderContext";
import { ValidationStatus } from "../../core/interfaces/input.interface";
import { LoadingSpinner } from "../../core/loader/LoadingSpinner";
import { Popup } from "../../core/popup/popup.component";
import SnackBar from "../../core/snackBar/snackBar.component";
import {
  getVacDressingKitProducts,
  getVacOrderLockStatus,
  saveVacOrder,
  updateVacOrder,
} from "../../util/3meService";
import { getCMSContent } from "../../util/cmsService";
import { getdropDownContent } from "../../util/dropDownService";
import { getNPIPrescriber } from "../../util/npiService";
import {
  CMS_VAC_THERAPY_INFORMATION_CONTENT,
  DD_INSURANCE_TYPE_CONTENT,
  DD_PHONE_TYPE_CONTENT,
  DD_PROVIDER_TYPE,
  DD_US_STATES_CONTENT,
  FILE_UPLOAD_LOCAL_ERROR_MESSAGE,
  FILE_UPLOAD_SERVER_ERROR_MESSAGE,
} from "../../util/staticText";
import {
  callShareVacOrder,
  cancelOrSubmitVacOrder,
  getPdfContent,
  UnlockVacOrder,
} from "../../util/vacOrderService";
import ProgressBar from "../progressBar/progressBar.component";
import { VacDressingKitModel } from "./dressingSupplies/vacDressingKit/vacDressingKit.interface";
import { mapSaveVacOrderRequest } from "./mapper/newOrderRequestMapper";
import { ISaveVacOrderRequest } from "./mapper/newOrderRequestMapper.interface";
import { uploadDocument } from "../../util/3meService";
import { ShareOrderInfo } from "./newOrderFooterGroup/shareOrder/shareOrderMainComponent";
import ReviewOrderStepper from "./newOrderReviewOrderStepper/reviewOrderStepper.component";
import { getVacOrderSummary } from "../../util/vacOrderService";
import { VacOrderSummaryData } from "./mapper/VacOrderSummary/newOrderResponseMapper.interface";
import {
  mapAccessory,
  mapCanister,
  mapClinicalInformation,
  mapDeliveryInformation,
  mapDressingKit,
  mapProductInfo,
  mapRequesterInfo,
  mapSecondaryWoundIformation,
  mapVacOrderResponse,
  mapWoundQuestionaries,
} from "./mapper/VacOrderSummary/newOrderResponseMapper";

import {
  vacCannisterMapper,
  vacPrimaryDressingKitMapper,
  vacSecondaryDressingKitMapper,
} from "./mapper/VacOrderSummary/vacProductsMapper";
import { IDropZoneDocumentSelect } from "../../core/customDropZone/dropZoneDocumentSelect.interface";
import "./newOrder.css";
import {
  ICanister,
  IDressingKit,
  INewOrder,
  INewOrderProps,
  IProductAccessory,
} from "./newOrder.interface";
import { NewOrderValidator } from "./newOrder.validator";
import { NewOrderPageSection } from "./NewOrderContainer.enum";
import { CancelOrder } from "./newOrderFooterGroup/cancelOrder.component";
import NewOrderErrorPopupMessage from "./newOrderFooterGroup/newOrderErrorPopupMessage.component";
import { NewOrderFooterButtonGroup } from "./newOrderFooterGroup/newOrderFooterBtnGroup.component";
import { NextOrder } from "./newOrderFooterGroup/nextOrder.component";
import { SaveExitOrder } from "./newOrderFooterGroup/saveExit.component";
import { SharedOrderModal } from "./newOrderFooterGroup/shareOrder/shareOrder.enum";
import { IShareOrderRequest } from "./newOrderFooterGroup/shareOrder/shareOrderRequest.interface";
import PatientInfoStepper from "./newOrderPatientInfoStepper/patientInfoStepper.component";
import { IPrescriberModal } from "./prescriberInformation/prescriberSearch/prescriberSearch.model";
import { IVacTherapyInformation } from "./woundBed/vacTherapyInformation.interface";
import { WoundInformation } from "./newOrderWoundInfoStepper/newOrderWoundInfoStepper.Component";
import { cancelSharedOrder } from "../../util/alertService";
import { ExpressButton } from "../../core/expressButton/expressButton.component";
import { DeletePopup } from "../../core/deleteOrder/deleteOrder.component";
import UserConfirmation from "./saveOrderConfirmation/userConfirmation.component";
import { IPrintOrderSummaryRequest } from "./newOrderReviewOrderStepper/PrintOrderSummaryPdf.interface";
import {
  IAnalyticsData,
  getPdfUrl,
  sendAnalyticsData,
} from "../../util/utilityFunctions";
import { getAdditionalWoundQuestionaries } from "../../util/primaryWoundTypeService";
import {
  Question,
  WoundQuestionaries,
} from "./clinicalInformation/clinicalInfo.interface";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../context/RolesPermissionContext";

export const NewOrder = ({
  Validator = new NewOrderValidator(),
}: INewOrderProps) => {
  let { id }: any = useParams();
  const history = useHistory();
  const location: any = useLocation();
  const [validator] = useState<NewOrderValidator>(Validator);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const newOrderDocuments = NewOrderObj?.newOrderDocuments;
  const newOrderData = NewOrderObj?.newOrderData;
  const setNewOrderData = NewOrderObj?.setNewOrderData;
  const requesterInfo = NewOrderObj?.requesterInfo;
  const setRequesterInfo = NewOrderObj?.setRequesterInfo;
  const productInfo = NewOrderObj?.productInfo;
  const setProductInfo = NewOrderObj?.setProductInfo;
  const dressingKit = NewOrderObj?.dressingKit;
  const setDressingKit = NewOrderObj?.setDressingKit;
  const canister = NewOrderObj?.canister;
  const setCanister = NewOrderObj?.setCanister;
  const accessory = NewOrderObj?.accessory;
  const setAccessory = NewOrderObj?.setAccessory;
  const woundInfoData = NewOrderObj?.woundInfoData;
  const setWoundInfoData = NewOrderObj?.setWoundInfoData;
  const secondaryWoundInfoData = NewOrderObj?.secondaryWoundInfoData;
  const deliveryInformation = NewOrderObj?.deliveryInformation;
  const setDeliveryInformation = NewOrderObj?.setDeliveryInformation;
  const setSecondaryWoundInfoData = NewOrderObj?.setSecondaryWoundInfoData;
  const setNewOrderDocuments = NewOrderObj?.setNewOrderDocuments;
  const [newOrderErrorPopPpFlag, setNewOrderErrorPopUpFlag] = useState(false);
  const [saveOrderToastFlag, setSaveOrderToastFlag] = useState(false);
  const [saveAndExitOpen, setSaveAndExitOpen] = useState(false);
  const [cancelOrderOpen, setCancelOrderOpen] = useState(false);
  const [deleteOrderOpen, setDeleteOrderOpen] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState("");
  const [backButtonText, setBackButtonText] = useState("Back");
  const [popUpButtonTitle, setPopUpButtonTitle] = useState("");
  const [nextOrderOpen, setNextOrderOpen] = useState(false);
  const [vacTherapyInformationData, setvacTherapyInformationData] =
    useState<IVacTherapyInformation>();
  const [saveAPILoader, setsaveAPILoader] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [vacOrderID, setVacOrderID] = useState("");
  const [states, setStates] = useState([]);
  const [statesText, setStatesText] = useState([]);
  const [phoneTypes, setPhoneTypes] = useState([]);
  const [insuranceTypes, setInsuranceTypes] = useState([]);
  const [insuranceTypesText, setInsuranceTypesText] = useState([]);
  const [providerTypes, setProviderTypes] = useState([]);
  const [shareOrderText, setshareOrderText] = useState<any>();
  const [vacAllProducts, setAllVacProducts] =
    useState<VacDressingKitModel | null>(null);
  const [getApiLoader, setgetAPILoader] = useState(false);
  const [cancelBtnVisibility, setCancelBtnVisibility] = useState(true);
  const [emptyPopup, setEmptyPopup] = useState<boolean>(false);
  const [shareOrderPopupData, setShareOrderPopupData] =
    useState<IShareOrderRequest>();
  const [shareOrderButtonText, setShareOrderButtonText] = useState("");
  const [cancelShareLoader, setCancelShareLoader] = useState(false);
  const [isStopShareOrderSuccess, setIsStopShareOrderSuccess] = useState(false);
  const [sharedOrderUserA, setSharedOrderUserA] = useState("");
  const [ShareOrderLoader, setShareOrderLoader] = useState(false);
  const [freshNewOrderLoader, setFreshNewOrderLoader] = useState(false);
  const [cancelConfirmationDesc, setCancelConfirmationDesc] = useState("");
  const showDialog = NewOrderObj?.showDialog;
  const setShowDialog = NewOrderObj?.setShowDialog;
  const [isSaveExitFlow, setIsSaveExitFlow] = useState(false);
  const [blockNavigation, setBlockNavigation] = useState(false);
  let { orderID } = location.state || "";
  if (id !== undefined && location.state === undefined) {
    orderID = atob(id);
    NewOrderObj?.setVacOrderID(orderID);
  }

  const [pdfUrl, setPDFURL] = useState("");
  const [deepLinkVacOrderLocked, setDeepLinkVacOrderLocked] = useState(null);
  const fetchVacDressingProducts = async () => {
    //async and await
    try {
      const response = await getVacDressingKitProducts();
      if (response.items.length > 0) {
        setAllVacProducts(response.items);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchDropdownContents = async () => {
    //async and await
    try {
      const ddContent = format(
        "{0},{1},{2},{3}",
        DD_PHONE_TYPE_CONTENT,
        DD_US_STATES_CONTENT,
        DD_INSURANCE_TYPE_CONTENT,
        DD_PROVIDER_TYPE
      );
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const phoneTypeObject = data.items.filter(
          (item: { name: string }) => item.name === DD_PHONE_TYPE_CONTENT
        );
        const phoneTypeArray = phoneTypeObject[0].data
          .sort((a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
          )
          .map((x: { text: any }) => x.text);
        setPhoneTypes(phoneTypeArray);
        const statesObject = data.items.filter(
          (item: { name: string }) => item.name === DD_US_STATES_CONTENT
        );
        const statesData = statesObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setStates(statesData);
        setStatesText(statesData.map((x: { text: string }) => x.text));
        const relationshipObject = data.items.filter(
          (item: { name: string }) => item.name === DD_INSURANCE_TYPE_CONTENT
        );
        const relationshipDataArray = relationshipObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setInsuranceTypes(relationshipDataArray);
        setInsuranceTypesText(
          relationshipDataArray.map((x: { text: string }) => x.text)
        );
        const providerDataTypeObj = data.items.filter(
          (item: { name: string }) => item.name === DD_PROVIDER_TYPE
        );
        const providerDataTypeArr = providerDataTypeObj[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setProviderTypes(providerDataTypeArr);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSaveAndExit = () => {
    setsaveAPILoader(true);
    setIsSaveExitFlow(true);
    try {
      NewOrderObj?.setShowDialog(false);
      initiateSaveVacOrder(true);
    } catch (error) {
      setNewOrderErrorPopUpFlag(true);
      seterrorMessage("Something went wrong !!");
    }
  };

  const handleSaveAndExitNavigation = () => {
    setIsSaveExitFlow(true);
    const isValid = validator.validateMinimumFields(
      newOrderData,
      setNewOrderData!
    );
    if (isValid === ValidationStatus.VALID) {
      let errorFiles = NewOrderObj?.newOrderDocuments.filter(
        (file) => file.succeeded !== true
      );
      if (errorFiles?.length === 0) {
        setsaveAPILoader(true);
        try {
          let obj = initiateSaveVacOrder(true, undefined, true);
          return obj;
        } catch (error) {
          setNewOrderErrorPopUpFlag(true);
          seterrorMessage("Something went wrong !!");
          return false;
        }
      } else {
        setNewOrderErrorPopUpFlag(true);
        seterrorMessage(FILE_UPLOAD_LOCAL_ERROR_MESSAGE);
        return false;
      }
    } else {
      setNewOrderErrorPopUpFlag(true);
      seterrorMessage(
        "First Name, Last Name, and Date of Birth are Required fields in order to save. Please complete these fields to save your order."
      );
      return false;
    }
  };

  const handleSaveAndShare = (
    sharedToEmail?: string,
    sharedToNote?: string
  ) => {
    let shareOrderPopupData: IShareOrderRequest = {
      sharedTo: sharedToEmail!,
      sharedOrderNotes: sharedToNote!,
      isSharedOrder: true,
    };
    setShareOrderPopupData(shareOrderPopupData);

    try {
      initiateSaveVacOrder(false, shareOrderPopupData);
    } catch (error) {
      setNewOrderErrorPopUpFlag(true);
      seterrorMessage("Something went wrong !!");
    }
  };

  const callSaveVacOrder = async (isSaveAndExit: boolean) => {
    const newOrderWoundDetails = NewOrderObj?.woundInfoData;
    const requesterDetails = NewOrderObj?.requesterInfo;
    const productDetails = NewOrderObj?.productInfo;
    const dressingDetails = NewOrderObj?.dressingKit;
    const canisterDetails = NewOrderObj?.canister;
    const accessoryDetails = NewOrderObj?.accessory;
    const deliveryInformation = NewOrderObj?.deliveryInformation;
    const orderIDExists = vacOrderID !== "";
    const loggedInUserSiteUseID = AuthObj?.registeredFaciltyAddress?.siteUseId!;
    let result;
    const reqParam: ISaveVacOrderRequest = await mapSaveVacOrderRequest(
      isSaveAndExit,
      newOrderData!,
      requesterDetails!,
      productDetails!,
      newOrderWoundDetails!,
      dressingDetails!,
      canisterDetails!,
      accessoryDetails!,
      NewOrderObj,
      orderIDExists ? vacOrderID! : null,
      deliveryInformation!,
      loggedInUserSiteUseID
    );
    if (orderIDExists) {
      result = await updateVacOrder(reqParam);
    } else {
      result = await saveVacOrder(reqParam);
    }
    return result;
  };

  const initiateSaveVacOrder = async (
    isSaveAndExit: boolean,
    shareOrderPopupData?: IShareOrderRequest,
    isNavigationSaveExitClicked?: boolean
  ) => {
    setsaveAPILoader(true);
    let errorInUploadFile = false;
    const result = await callSaveVacOrder(isSaveAndExit);
    if (!result || !result.succeeded) {
      setNewOrderErrorPopUpFlag(true);
      seterrorMessage("Something went wrong !!");
      setBlockNavigation(false);
      setsaveAPILoader(false);
      return false;
    } else {
      // Add documents to DB here
      NewOrderObj?.setIsHandleChangeTriggered(false);
      NewOrderObj?.setVacOrderID(result.data);
      let uploadedDocs: any[] = [];
      let response: any;

      NewOrderObj?.newOrderDocuments.forEach((document) => {
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
        NewOrderObj?.deletedOrderDocuments &&
        NewOrderObj?.deletedOrderDocuments.length > 0
      ) {
        NewOrderObj?.deletedOrderDocuments.forEach((documentId) => {
          let deletedDoc = {
            DocumentId: documentId,
            forAddition: false,
          };
          uploadedDocs.push(deletedDoc);
        });
      }
      if (uploadedDocs.length > 0) {
        let docRequest = {
          entityID: result.data,
          entityType: 1,
          Files: uploadedDocs,
        };
        const docResult = await uploadDocument(docRequest);
        if (!docResult.succeeded) {
          setSaveAndExitOpen(false);
          setNewOrderErrorPopUpFlag(true);
          seterrorMessage(FILE_UPLOAD_SERVER_ERROR_MESSAGE);
        } else {
          response = docResult.data;
          NewOrderObj?.setDeletedOrderDocuments([]);
          let updatedFiles: IDropZoneDocumentSelect[] =
            NewOrderObj?.newOrderDocuments.map((item) => {
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
          NewOrderObj?.setNewOrderDocuments(updatedFiles);
          NewOrderObj?.setDeletedOrderDocuments([]);
        }
        if (
          response?.filter(
            (file: { code: number }) => file.code !== 1042 && file.code !== 1054
          ).length > 0
        ) {
          errorInUploadFile = true;
          setSaveAndExitOpen(false);
          setNewOrderErrorPopUpFlag(true);
          seterrorMessage(FILE_UPLOAD_SERVER_ERROR_MESSAGE);
        }
      }
      setSaveAndExitOpen(false);
      if (isSaveAndExit && !errorInUploadFile && !isNavigationSaveExitClicked) {
        setSaveAndExitOpen(false);
        history.goBack();
      } else {
        setSaveAndExitOpen(false);
        setVacOrderID(result.data);
        NewOrderObj?.setVacOrderID(result.data);
        setSaveOrderToastFlag(true);
        setTimeout(() => {
          setSaveOrderToastFlag(false);
        }, 5000);
        if (shareOrderPopupData?.isSharedOrder) {
          setsaveAPILoader(false);
          setShareOrderLoader(true);
          let shareOrderRequestObj = {
            OrderId: result.data,
            SharedTo: shareOrderPopupData?.sharedTo,
            SharedOrderNotes: shareOrderPopupData?.sharedOrderNotes,
            facilityName: AuthObj?.registeredFaciltyAddress?.accountName,
          };
          apicallShareVacOrder(shareOrderRequestObj);
        }
        setsaveAPILoader(false);
        if (!errorInUploadFile && isNavigationSaveExitClicked) {
          setBlockNavigation(true);
          return true;
        } else return false;
      }
    }
    setsaveAPILoader(false);
  };

  const callSubmitVacOrder = async () => {
    //async and await
    try {
      setFreshNewOrderLoader(true);
      const result = await callSaveVacOrder(true);
      if (!result || !result.succeeded) {
        setNewOrderErrorPopUpFlag(true);
        seterrorMessage("Something went wrong !!");
        setFreshNewOrderLoader(false);
      } else {
        setVacOrderID(result.data);
        NewOrderObj?.setVacOrderID(result.data);
        const uploadDocReponseObj = await callUploadDocApi(result.data);
        const response = await cancelOrSubmitVacOrder(result.data, 1);
        if (response.succeeded) {
          window.scrollTo(0, 0);
          NewOrderObj?.setNewOrderPage(NewOrderPageSection.NEWORDER_SUMMARY);

          if (!uploadDocReponseObj) {
            setNewOrderErrorPopUpFlag(true);
            seterrorMessage(FILE_UPLOAD_SERVER_ERROR_MESSAGE);
          }
          const getPdfResponse = await apiCallGetPdfContent(result.data);
          if (getPdfResponse) {
            setFreshNewOrderLoader(false);
          }
        } else {
          setFreshNewOrderLoader(false);
          setNewOrderErrorPopUpFlag(true);
          seterrorMessage("Order Submission Failed !!");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const apiCallGetPdfContent = async (vacOrderID: any) => {
    if (vacOrderID) {
      let reqParams: IPrintOrderSummaryRequest = {
        EntityID: vacOrderID,
        EntityType: 0,
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

  const callUnloackVacOrder = async () => {
    //async and await
    try {
      if (vacOrderID) {
        const result = await UnlockVacOrder(vacOrderID);
        if (!result || !result.succeeded) {
          setNewOrderErrorPopUpFlag(true);
          seterrorMessage("Something went wrong !!");
          return false;
        } else {
          return true;
        }
      } else return true;
    } catch (error) {
      console.log("error", error);
    }
  };

  const callUploadDocApi = async (vacOrderId: any) => {
    // Add documents to DB here
    let uploadedDocs: any[] = [];
    let response: any;
    let returnObj: any = true;
    NewOrderObj?.newOrderDocuments.forEach((document) => {
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
      NewOrderObj?.deletedOrderDocuments &&
      NewOrderObj?.deletedOrderDocuments.length > 0
    ) {
      NewOrderObj?.deletedOrderDocuments.forEach((documentId) => {
        let deletedDoc = {
          DocumentId: documentId,
          forAddition: false,
        };
        uploadedDocs.push(deletedDoc);
      });
    }
    if (uploadedDocs.length > 0) {
      let docRequest = {
        entityID: vacOrderId,
        entityType: 1,
        Files: uploadedDocs,
      };
      const docResult = await uploadDocument(docRequest);
      if (!docResult.succeeded) {
        setSaveAndExitOpen(false);
        returnObj = false;
      } else {
        response = docResult.data;
        NewOrderObj?.setDeletedOrderDocuments([]);
        let updatedFiles: any[] = NewOrderObj?.newOrderDocuments.map((item) => {
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
        NewOrderObj?.setNewOrderDocuments(updatedFiles);
        NewOrderObj?.setDeletedOrderDocuments([]);
      }
      if (
        response?.filter(
          (file: { code: number }) => file.code !== 1042 && file.code !== 1054
        ).length > 0
      ) {
        returnObj = false;
      }
    }
    return returnObj;
  };

  const apicallShareVacOrder = async (shareOrderRequestObj: any) => {
    const responseObj = await callShareVacOrder(shareOrderRequestObj);
    if (responseObj.succeeded) {
      NewOrderObj?.setshareOrderAddPopUpSection(
        SharedOrderModal.SHARE_ORDER_INVITE_SUCESS
      );
      const subText = "Shared Order";
      setShareOrderButtonText("Stop Share");
      const subText2 = "To " + shareOrderRequestObj.SharedTo;
      setshareOrderText(
        sharedOrderAlert(
          subText,
          subText2,
          shareOrderRequestObj.SharedOrderNotes
        )
      );
      setShareOrderLoader(false);
    } else {
      setShareOrderLoader(false);
      NewOrderObj?.setshareOrderPopup(false);
      setNewOrderErrorPopUpFlag(true);
      seterrorMessage(responseObj.error.message);
    }
  };

  const setQuestionnaireContent = async () => {
    const questionsData = await getAdditionalWoundQuestionaries();
    const mapData = new Map<string, WoundQuestionaries>();
    questionsData.forEach((val: any) => {
      if (!mapData.has(val.woundType)) {
        mapData.set(val.woundType, {
          additionalQuestion: val.additionalQuestion.map((quest: Question) => ({
            ...quest,
            value: "",
            valid: ValidationStatus.UNTOUCHED,
          })),
          category: val.category,
          woundType: val.woundType,
        });
      }
    });
    NewOrderObj?.setWoundQuestionnaries(mapData);
    return mapData;
  };

  const validateAll = () => {
    let isValid = "";
    if (
      NewOrderObj?.newOrderPage === NewOrderPageSection.NEWORDER_PATIENT_INFO
    ) {
      isValid = validator.validateAll(
        newOrderData,
        requesterInfo,
        dressingKit,
        deliveryInformation,
        setNewOrderData!,
        setRequesterInfo!,
        setDressingKit!,
        setDeliveryInformation!
      );
      if (
        newOrderData?.submitPrescription?.value === "EPrescription" &&
        NewOrderObj?.prescriberList?.eScript === "No"
      ) {
        isValid = ValidationStatus.INVALID;
      }
      if (isValid === ValidationStatus.VALID) {
        vacOrderAnalytics("Next");
        setNextOrderOpen(true);
      }
    } else if (
      NewOrderObj?.newOrderPage ===
      NewOrderPageSection.NEWORDER_PATIENT_WOUND_INFO
    ) {
      const isValid = validator.validateAllWoundInfo(
        NewOrderObj?.woundInfoData,
        NewOrderObj?.setWoundInfoData,
        NewOrderObj.secondaryWoundInfoData,
        NewOrderObj.setSecondaryWoundInfoData,
        NewOrderObj?.primaryAdditionalQuestions,
        NewOrderObj?.setPrimaryAdditionalQuestions,
        NewOrderObj?.secondaryAdditionalQuestions,
        NewOrderObj?.setSecondaryAdditionalQuestions
      );
      if (isValid === ValidationStatus.VALID) {
        vacOrderAnalytics("Next");
        window.scrollTo(0, 0);
        NewOrderObj?.setnewOrderProgress(80);
        NewOrderObj?.setNewOrderPage(NewOrderPageSection.NEWORDER_REVIEW_ORDER);
      }
    } else if (
      NewOrderObj?.newOrderPage === NewOrderPageSection.NEWORDER_REVIEW_ORDER
    ) {
      vacOrderAnalytics("Submit_Vac_Order");
      callSubmitVacOrder();
    }
  };

  const handleNextOrderPopup = () => {
    setNextOrderOpen(false);
  };

  const vacOrderAnalytics = (eventName: string) => {
    let analyticsData: IAnalyticsData = {
      page_type: "react",
      view_name: "vacOrderComponent",
      event_type: "click",
      event_name: eventName,
      tealium_event: "Vac_Order_Button",
      mmmex_userrecordid: AuthObj?.userProfile?.userID!,
      mmmex_facilityid: AuthObj?.registeredFaciltyAddress?.siteUseId!,
      mmmex_roleid: permissionObj?.mappedRolesPermissionData?.roleName!,
      mmmex_pagename: "vacOrder",
    };
    sendAnalyticsData(analyticsData);
  };

  const SaveAndExitPopupHandler = () => {
    setIsSaveExitFlow(true);
    const isValid = validator.validateMinimumFields(
      newOrderData,
      setNewOrderData!
    );
    if (isValid === ValidationStatus.VALID) {
      vacOrderAnalytics("Save_Exit_Vac_Order");
      let errorFiles = NewOrderObj?.newOrderDocuments.filter(
        (file) => file.succeeded !== true
      );
      if (errorFiles?.length === 0) {
        setSaveAndExitOpen(true);
      } else {
        setNewOrderErrorPopUpFlag(true);
        seterrorMessage(FILE_UPLOAD_LOCAL_ERROR_MESSAGE);
      }
    } else {
      setNewOrderErrorPopUpFlag(true);
      seterrorMessage(
        "First Name, Last Name, and Date of Birth are Required fields in order to save. Please complete these fields to save your order."
      );
    }
  };

  const saveOrderHandler = async () => {
    const isValid = validator.validateMinimumFields(
      newOrderData,
      setNewOrderData!
    );
    if (isValid === ValidationStatus.VALID) {
      vacOrderAnalytics("Save_Vac_Order");
      //check for file uplaod error
      let errorFiles = NewOrderObj?.newOrderDocuments.filter(
        (file) => file.succeeded !== true
      );
      if (errorFiles?.length === 0) {
        setsaveAPILoader(true);
        try {
          initiateSaveVacOrder(false);
        } catch (error) {
          setNewOrderErrorPopUpFlag(true);
          seterrorMessage("Something went wrong !!");
        }
      } else {
        setNewOrderErrorPopUpFlag(true);
        seterrorMessage(FILE_UPLOAD_LOCAL_ERROR_MESSAGE);
      }
    } else {
      setNewOrderErrorPopUpFlag(true);
      seterrorMessage(
        "First Name, Last Name, and Date of Birth are Required fields in order to save. Please complete these fields to save your order."
      );
    }
  };

  const hideCancelPopupHandler = () => {
    setCancelOrderOpen(false);
  };

  const shareOrderHandler = () => {
    if (shareOrderButtonText === "Share Order") {
      const isValid = validator.validateMinimumFields(
        newOrderData,
        setNewOrderData!
      );
      if (isValid === ValidationStatus.VALID) {
        NewOrderObj?.setshareOrderAddPopUpSection(SharedOrderModal.SHARE_ORDER);
        NewOrderObj?.setshareOrderPopup(true);
        vacOrderAnalytics("Share_Vac_Order");
      } else {
        setNewOrderErrorPopUpFlag(true);
        seterrorMessage(
          "First Name, Last Name, and Date of Birth are Required fields in order to save. Please complete these fields to Share your order."
        );
      }
    } else {
      callStopShareOrder();
    }
  };

  const previousButtonHandler = () => {
    vacOrderAnalytics("Previous");
    if (
      NewOrderObj?.isPartialOrder &&
      NewOrderObj?.newOrderPage === NewOrderPageSection.NEWORDER_REVIEW_ORDER
    ) {
      window.scrollTo(0, 0);
      NewOrderObj?.setisComingFromPrev(true);
      NewOrderObj?.setnewOrderProgress(20);
      NewOrderObj?.setNewOrderPage(NewOrderPageSection.NEWORDER_PATIENT_INFO);
    } else {
      if (
        NewOrderObj?.newOrderPage ===
        NewOrderPageSection.NEWORDER_PATIENT_WOUND_INFO
      ) {
        window.scrollTo(0, 0);
        NewOrderObj?.setisComingFromPrev(true);
        NewOrderObj?.setnewOrderProgress(20);
        NewOrderObj?.setNewOrderPage(NewOrderPageSection.NEWORDER_PATIENT_INFO);
        checkForSecondaryWoundInfo();
      } else if (
        NewOrderObj?.newOrderPage === NewOrderPageSection.NEWORDER_REVIEW_ORDER
      ) {
        window.scrollTo(0, 0);
        NewOrderObj?.setisComingFromPrev(true);
        NewOrderObj?.setnewOrderProgress(40);
        NewOrderObj?.setNewOrderPage(
          NewOrderPageSection.NEWORDER_PATIENT_WOUND_INFO
        );
      } else {
        history.goBack();
      }
    }
  };

  const showCancelPopupHandler = () => {
    if (
      NewOrderObj?.isPartialOrder &&
      NewOrderObj?.newOrderPage === NewOrderPageSection.NEWORDER_REVIEW_ORDER
    ) {
      NewOrderObj?.setNewOrderPage(NewOrderPageSection.NEWORDER_PATIENT_INFO);
    } else {
      if (
        NewOrderObj?.newOrderPage ===
        NewOrderPageSection.NEWORDER_PATIENT_WOUND_INFO
      ) {
        NewOrderObj?.setisComingFromPrev(true);
        NewOrderObj?.setnewOrderProgress(20);
        NewOrderObj?.setNewOrderPage(NewOrderPageSection.NEWORDER_PATIENT_INFO);
      } else if (
        NewOrderObj?.newOrderPage === NewOrderPageSection.NEWORDER_REVIEW_ORDER
      ) {
        NewOrderObj?.setisComingFromPrev(true);
        NewOrderObj?.setnewOrderProgress(40);
        NewOrderObj?.setNewOrderPage(
          NewOrderPageSection.NEWORDER_PATIENT_WOUND_INFO
        );
      } else {
        const isUserUpdatedForm = validator.validateUserEnteredAnyDataOrNot(
          newOrderData,
          newOrderDocuments,
          requesterInfo,
          dressingKit,
          accessory,
          NewOrderObj!.showAddtionalObject
        );
        if (isUserUpdatedForm) {
          history.goBack();
        } else {
          history.goBack();
        }
      }
    }
  };

  const showCancelPopupHandlerDirect = () => {
    const isUserUpdatedForm = validator.validateUserEnteredAnyDataOrNot(
      newOrderData,
      newOrderDocuments,
      requesterInfo,
      dressingKit,
      accessory,
      NewOrderObj!.showAddtionalObject
    );
    if (isUserUpdatedForm) {
      setDeleteOrderOpen(true);
    } else {
      history.goBack();
    }
  };

  const handleErrorPopupBackButton = () => {
    setNewOrderErrorPopUpFlag(false);
    if (
      NewOrderObj?.isHandleChangeTriggered &&
      (NewOrderObj?.newOrderPage ===
        NewOrderPageSection.NEWORDER_PATIENT_INFO ||
        NewOrderObj?.newOrderPage ===
          NewOrderPageSection.NEWORDER_PATIENT_WOUND_INFO)
    ) {
      NewOrderObj?.setShowDialog(true);
    }
    setIsSaveExitFlow(false);
  };

  const handleExitButton = () => {
    if (vacOrderID) {
      UnlockVacOrder(vacOrderID);
    }
    NewOrderObj?.setShowDialog(false);
    setIsSaveExitFlow(false);
    history.goBack();
  };

  const sectionToDisplay = () => {
    let page: ReactNode;
    switch (NewOrderObj?.newOrderPage) {
      case NewOrderPageSection.NEWORDER_PATIENT_INFO:
        page = (
          <PatientInfoStepper
            orderId={orderID}
            newOrderData={newOrderData}
            setNewOrderData={setNewOrderData}
            nextOrderOpen={nextOrderOpen}
            vacTherapyInformationData={vacTherapyInformationData!}
            states={states}
            statesText={statesText}
            phoneTypes={phoneTypes}
            insuranceTypes={insuranceTypes}
            insuranceTypesText={insuranceTypesText}
            sharedOrderText={shareOrderText}
            requesterInfo={requesterInfo}
            setRequesterInfo={setRequesterInfo}
            productInfo={productInfo}
            setProductInfo={setProductInfo}
            dressingKit={dressingKit}
            setDressingKit={setDressingKit}
            canister={canister}
            setCanister={setCanister}
            accessory={accessory}
            setAccessory={setAccessory}
            deliveryInformation={deliveryInformation}
            setDeliveryInformation={setDeliveryInformation}
          />
        );
        break;
      case NewOrderPageSection.NEWORDER_PATIENT_WOUND_INFO:
        page = (
          <WoundInformation
            secondaryWoundInfoData={secondaryWoundInfoData!}
            setSecondaryWoundInfoData={setSecondaryWoundInfoData}
            setWoundInfoData={setWoundInfoData}
            woundInfoData={woundInfoData!}
            vacTherapyInformationData={vacTherapyInformationData!}
          />
        );
        break;
      case NewOrderPageSection.NEWORDER_REVIEW_ORDER:
        page = (
          <ReviewOrderStepper
            isOrderSummary={false}
            isPartialOrder={NewOrderObj?.isPartialOrder ?? false}
            isReviewOrder={true}
            newOrderData={newOrderData}
            requesterInfo={requesterInfo}
            productInfo={productInfo}
            dressingKit={dressingKit}
            canister={canister}
            accessory={accessory}
            nextOrderOpen={nextOrderOpen}
            secondaryWoundInfoData={secondaryWoundInfoData!}
            setNewOrderData={setNewOrderData}
            setRequesterInfo={setRequesterInfo}
            setProductInfo={setProductInfo}
            setDressingKit={setDressingKit}
            setCanister={setCanister}
            setAcessory={setAccessory}
            setSecondaryWoundInfoData={setSecondaryWoundInfoData}
            setWoundInfoData={setWoundInfoData}
            woundInfoData={woundInfoData!}
            vacTherapyInformationData={vacTherapyInformationData!}
            newOrderDocuments={newOrderDocuments!}
            deliveryInformation={deliveryInformation}
            setDeliveryInformation={setDeliveryInformation}
          />
        );
        break;
      case NewOrderPageSection.NEWORDER_SUMMARY:
        page = (
          <ReviewOrderStepper
            isOrderSummary={true}
            isPartialOrder={NewOrderObj?.isPartialOrder ?? false}
            isReviewOrder={true}
            newOrderData={newOrderData}
            requesterInfo={requesterInfo}
            productInfo={productInfo}
            dressingKit={dressingKit}
            canister={canister}
            accessory={accessory}
            nextOrderOpen={nextOrderOpen}
            secondaryWoundInfoData={secondaryWoundInfoData!}
            setSecondaryWoundInfoData={setSecondaryWoundInfoData}
            setNewOrderData={setNewOrderData}
            setRequesterInfo={setRequesterInfo}
            setProductInfo={setProductInfo}
            setDressingKit={setDressingKit}
            setCanister={setCanister}
            setAcessory={setAccessory}
            setWoundInfoData={setWoundInfoData}
            woundInfoData={woundInfoData!}
            vacTherapyInformationData={vacTherapyInformationData!}
            newOrderDocuments={newOrderDocuments!}
            deliveryInformation={deliveryInformation}
            setDeliveryInformation={setDeliveryInformation}
            vacOrderID={vacOrderID!}
            pdfUrl={pdfUrl}
          />
        );
        break;
    }
    return page;
  };

  const checkForSecondaryWoundInfo = () => {
    const secondaryWoundInfo = NewOrderObj?.secondaryWoundInfoData;
    const isUserUpdatedForm =
      validator.validateSecondaryWoundForUserEnteredAnyDataOrNot(
        secondaryWoundInfo
      );
    const data = NewOrderObj?.woundInfoData;
    const setData = NewOrderObj?.setWoundInfoData;
    if (data && setData) {
      data!.isShowSecondaryWoundInfo = {
        value: isUserUpdatedForm ? "Yes" : "No",
        valid: ValidationStatus.VALID,
        isDefaultValid: true,
      };
      setData(data);
    }
  };

  const fetchVACTherapyInformationData = async () => {
    //async and await
    try {
      const data = await getCMSContent(CMS_VAC_THERAPY_INFORMATION_CONTENT);
      if (data.item !== undefined) {
        setvacTherapyInformationData(data.item);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const callCancelSharedOrder = async (reqBody: any) => {
    try {
      const result = await cancelSharedOrder(reqBody);
      if (!result || !result.succeeded) {
        seterrorMessage("Something went wrong!!");
        setNewOrderErrorPopUpFlag(true);
        setIsStopShareOrderSuccess(false);
      } else {
        setCancelShareLoader(false);
        setIsStopShareOrderSuccess(true);
      }
      setCancelShareLoader(false);
    } catch (error) {
      setCancelShareLoader(false);
    }
  };

  const callStopShareOrder = () => {
    setCancelShareLoader(true);
    const reqParam = {
      OrderId: vacOrderID,
      FacilityName: AuthObj?.registeredFaciltyAddress?.accountName,
    };
    callCancelSharedOrder(reqParam);
  };

  const sharedOrderAlert = (
    subText1: string,
    subText2: string,
    notes: string
  ) => {
    return (
      <div className="sharedOrderStyle">
        <div>
          <p className="shareOrderDesc">
            {" "}
            <span className="shareOrderAlertTitle"> {subText1}</span> {subText2}
            <span className="stopSharingbtnLink" onClick={callStopShareOrder}>
              {" "}
              Stop Sharing{" "}
            </span>
          </p>
        </div>
        <p className="shareOrderNote">
          {" "}
          <b>Note:</b> {notes}{" "}
        </p>
      </div>
    );
  };

  const getOrderDetails = async (orderID: string) => {
    const result: any = await Promise.all([
      getVacOrderSummary(orderID, true),
      setQuestionnaireContent(),
    ]);
    const orderResponse = result[0];
    const questionaries = result[1];
    if (!orderResponse.succeeded) {
      if (orderResponse?.error?.code! === 1035) {
        setgetAPILoader(false);
        setDeepLinkVacOrderLocked(orderResponse.error.message);
      } else {
        setgetAPILoader(false);
        history.push("/home");
        setVacOrderID("");
        NewOrderObj?.setVacOrderID("");
      }
    } else {
      if (orderResponse && questionaries && orderResponse.succeeded) {
        const vacOrderSummary = result[0].data as VacOrderSummaryData;
        let mapperRes: INewOrder = await mapVacOrderResponse(
          vacOrderSummary,
          insuranceTypes,
          NewOrderObj?.setShowAdditionalObject,
          providerTypes,
          validator
        );
        if (
          vacOrderSummary.sharedDetails.to &&
          vacOrderSummary.sharedDetails.to ===
            AuthObj?.userProfile?.firstName +
              " " +
              AuthObj?.userProfile?.lastName
        ) {
          setCancelBtnVisibility(false);
        }
        if (vacOrderSummary.administeringDressingChanges) {
          NewOrderObj?.setActive(true);
          NewOrderObj?.setCaregiverSelected(true);
        }
        if (
          vacOrderSummary.sharedDetails.to &&
          vacOrderSummary.sharedDetails.from
        ) {
          const subText = "Shared Order";
          setShareOrderButtonText("Stop Share");
          if (
            vacOrderSummary.sharedDetails.from ===
            AuthObj?.userProfile?.firstName +
              " " +
              AuthObj?.userProfile?.lastName
          ) {
            const subText2 = "To " + vacOrderSummary.sharedDetails.to;
            setshareOrderText(
              sharedOrderAlert(
                subText,
                subText2,
                vacOrderSummary.sharedDetails.notes
              )
            );
          } else {
            const subText2 = "From " + vacOrderSummary.sharedDetails.from;
            setshareOrderText(
              sharedOrderAlert(
                subText,
                subText2,
                vacOrderSummary.sharedDetails.notes
              )
            );
          }
          setSharedOrderUserA(vacOrderSummary.sharedDetails.from);
        }
        if (vacOrderSummary.prescriberFirstName) {
          let prescriberData: IPrescriberModal;
          let reqParams = {
            NPI: vacOrderSummary.prescriberNPI,
          };
          const data = await getNPIPrescriber(reqParams);
          if (data != null && data.succeeded && data.items.length > 0) {
            NewOrderObj?.setPrescriberAddedData({
              ...data.items[0],
              email: vacOrderSummary.prescriberEmailAddress,
            });
          } else {
            prescriberData = {
              firstName: vacOrderSummary.prescriberFirstName,
              lastName: vacOrderSummary.prescriberLastName,
              npi: vacOrderSummary.prescriberNPI,
              email: vacOrderSummary.prescriberEmailAddress,
              city: "",
              state: "",
              telephoneNumber: "",
              zipCode: "",
              address1: "",
              address2: "",
            };
            NewOrderObj?.setPrescriberAddedData(prescriberData);
          }
        }
        let dressingMapperRes: IDressingKit = mapDressingKit();
        let canisterMapperRes: ICanister = mapCanister(vacOrderSummary);
        let accessoryMapperRes: IProductAccessory =
          mapAccessory(vacOrderSummary);
        if (vacOrderSummary.mainDressing.sku) {
          dressingMapperRes = vacPrimaryDressingKitMapper(
            vacOrderSummary,
            dressingMapperRes!,
            vacAllProducts,
            NewOrderObj
          );
        }
        if (vacOrderSummary.additionalDressing.sku) {
          dressingMapperRes = vacSecondaryDressingKitMapper(
            vacOrderSummary,
            dressingMapperRes!,
            vacAllProducts,
            NewOrderObj
          );
        }
        vacCannisterMapper(vacOrderSummary, NewOrderObj);
        NewOrderObj?.setNewOrderData(mapperRes);
        NewOrderObj?.setDressingKit(dressingMapperRes!);
        NewOrderObj?.setCanister(canisterMapperRes!);
        NewOrderObj?.setAccessory(accessoryMapperRes!);
        let tempData: any = [];
        if (vacOrderSummary.document?.length !== 0) {
          vacOrderSummary.document.forEach((element) => {
            tempData.push({
              documentName: element.docName,
              documentBase64: "",
              succeeded: true,
              errorMessage: null,
              documentId: element.documentId,
            });
          });
        }
        NewOrderObj?.setNewOrderDocuments(tempData);
        var requesterInfo = mapRequesterInfo(
          vacOrderSummary,
          AuthObj?.userProfile?.firstName,
          validator
        );
        NewOrderObj?.setRequesterInfo(requesterInfo);
        var productInfo = mapProductInfo(vacOrderSummary);
        NewOrderObj?.setProductInfo(productInfo);
        var clinicalInfo = mapClinicalInformation(vacOrderSummary, validator);
        NewOrderObj?.setWoundInfoData(clinicalInfo);
        const deliveryInformation = mapDeliveryInformation(
          vacOrderSummary,
          validator
        );
        NewOrderObj?.setDeliveryInformation(deliveryInformation);
        var primaryQuestions = questionaries.get(clinicalInfo.woundType?.value);
        if (primaryQuestions) {
          var primaryWoundQuestionares = mapWoundQuestionaries(
            vacOrderSummary.primaryWound,
            primaryQuestions!
          );
          NewOrderObj?.setPrimaryAdditionalQuestions(primaryWoundQuestionares);
        }
        if (clinicalInfo.isShowSecondaryWoundInfo.value === "Yes") {
          var secondaryWoundInfo = mapSecondaryWoundIformation(
            vacOrderSummary,
            validator
          );
          NewOrderObj?.setSecondaryWoundInfoData(secondaryWoundInfo);

          var secondaryQuestions = questionaries.get(
            secondaryWoundInfo.woundType?.value
          );
          if (secondaryQuestions) {
            var secondaryWoundQuestionares = mapWoundQuestionaries(
              vacOrderSummary.secondaryWound,
              secondaryQuestions!
            );
            NewOrderObj?.setSecondaryAdditionalQuestions(
              secondaryWoundQuestionares
            );
          }
        }
        setgetAPILoader(false);
      } else {
        setgetAPILoader(false);
        history.push("/orders/newOrder");
        setVacOrderID("");
        NewOrderObj?.setVacOrderID("");
      }
    }
  };

  const doNotDeleteHandler = () => {
    setDeleteOrderOpen(false);
  };

  const deleteHandler = async () => {
    if (vacOrderID !== null && vacOrderID !== "") {
      callCancelVacOrder(0);
      vacOrderAnalytics("Delete_Vac_Order");
    } else {
      NewOrderObj?.setShowDialog(false);
      history.goBack();
    }
  };

  const callCancelVacOrder = async (flag: any) => {
    //async and await
    NewOrderObj?.setShowDialog(false);
    setDeleteOrderOpen(false);
    try {
      setFreshNewOrderLoader(true);
      const response = await cancelOrSubmitVacOrder(vacOrderID, flag);
      if (response.succeeded) {
        setTimeout(() => {
          setFreshNewOrderLoader(false);
        }, 1000);
        history.goBack();
      } else {
        setFreshNewOrderLoader(false);
        setNewOrderErrorPopUpFlag(true);
        seterrorMessage("Something went wrong !!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    setShareOrderButtonText("Share Order");
    fetchVACTherapyInformationData();
    fetchDropdownContents();
    if (orderID) {
      setVacOrderID(orderID);
      fetchVacDressingProducts();
      NewOrderObj?.setVacOrderID(orderID);
      setgetAPILoader(true);
    }
    NewOrderObj?.setshareOrderAddPopUpSection(SharedOrderModal.SHARE_ORDER);
  }, []);

  useEffect(() => {
    if (
      NewOrderObj?.isHandleChangeTriggered &&
      (NewOrderObj?.newOrderPage ===
        NewOrderPageSection.NEWORDER_PATIENT_INFO ||
        NewOrderObj?.newOrderPage ===
          NewOrderPageSection.NEWORDER_PATIENT_WOUND_INFO ||
        NewOrderObj?.newOrderPage === NewOrderPageSection.NEWORDER_REVIEW_ORDER)
    ) {
      NewOrderObj?.setShowDialog(true);
    } else {
      NewOrderObj?.setShowDialog(false);
    }
  }, [NewOrderObj?.newOrderPage, NewOrderObj?.isHandleChangeTriggered]);

  useEffect(() => {
    if (
      orderID &&
      insuranceTypes.length > 0 &&
      providerTypes.length > 0 &&
      vacAllProducts !== null &&
      AuthObj?.userProfile
    ) {
      getOrderDetails(orderID);
      setVacOrderID(orderID);
      NewOrderObj?.setVacOrderID(orderID);
    }
  }, [
    insuranceTypes,
    providerTypes,
    NewOrderObj?.setPrescriberAddedData,
    vacAllProducts,
  ]);

  useEffect(() => {
    NewOrderObj?.setVacOrderID(orderID);
    if (NewOrderObj?.vacOrderID) {
      const obj = {
        OrderId: NewOrderObj?.vacOrderID,
      };
      getVacOrderLockStatus(obj);
    }
  }, [NewOrderObj?.vacOrderID, orderID]);

  const spinner = () => {
    return (
      <div>
        <div className="saveapi-header">Saving Order</div>
        <div className="saveapi-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  const getSpinner = () => {
    return (
      <div>
        <div className="saveapi-header">Retrieving Saved Order</div>
        <div className="saveapi-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  const stopShareOrderSpinner = () => {
    return (
      <div>
        <div className="saveapi-header"></div>
        <div className="saveapi-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  const shareOrderSpinner = () => {
    return (
      <div>
        <div className="saveapi-header">Sharing Order</div>
        <div className="saveapi-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  const freshNewOrderSpinner = () => {
    return (
      <div>
        <div className="saveapi-header"></div>
        <div className="saveapi-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  const closeSuccessSharedPopup = () => {
    if (
      sharedOrderUserA ===
      AuthObj?.userProfile?.firstName + " " + AuthObj?.userProfile?.lastName
    ) {
      setshareOrderText("");
      setShareOrderButtonText("Share Order");
    } else {
      NewOrderObj?.setIsHandleChangeTriggered(false);
      history.push("/home");
    }
    setIsStopShareOrderSuccess(false);
  };

  const stopShareOrderSuccessPopUp = () => {
    return (
      <div className="successStopShare">
        <div className="successStopShareTitle">
          {sharedOrderUserA ===
          AuthObj?.userProfile?.firstName + " " + AuthObj?.userProfile?.lastName
            ? `Success! The order is no longer shared`
            : `Success! The order is no longer shared with you`}
        </div>
        <div className="successStopShareDesp">
          {sharedOrderUserA ===
          AuthObj?.userProfile?.firstName + " " + AuthObj?.userProfile?.lastName
            ? `Any edits others have made and saved will remain in the order. If you wish to share the order again, you can now do so.`
            : `Any edits you have made and saved will remain in the order. You can
            also re-add the order to your list using the Add Patient option from
            the My Patients dashboard.`}
        </div>
        <div className="successStopShareClose">
          <ExpressButton
            parentClass="successStopShareButton"
            variant="contained"
            clickHandler={closeSuccessSharedPopup}
          >
            Close
          </ExpressButton>
        </div>
      </div>
    );
  };

  const patientLocked = (deepLinkVacOrderLocked: any) => {
    return (
      <div className="patient-load-spinner" data-testid="patienLocked">
        <div className="patient-locked" data-testid="patient-locked-popup">
          This order is currently being edited by {deepLinkVacOrderLocked} {}.
        </div>
        <div
          className="patient-locked-desp"
          data-testid="patient-locked-popup-bodytext"
        >
          You can edit the order when they are finished.
        </div>
        <ExpressButton
          variant="contained"
          parentClass="cancelBtn"
          clickHandler={() => {
            AuthObj?.setDeepLinkPath(null);
            setDeepLinkVacOrderLocked(null);
            history.push("/home");
          }}
        >
          Close
        </ExpressButton>
      </div>
    );
  };

  return (
    <>
      <Grid className="newOrder-flow" data-testid="newOrder-flow" container>
        {NewOrderObj?.newOrderPage !== NewOrderPageSection.NEWORDER_SUMMARY && (
          <Grid item>
            <ProgressBar
              pageTitle="Home Order"
              progressValue={NewOrderObj?.newOrderProgress!}
              backButtonAction={() => {
                showCancelPopupHandler();
              }}
            />
          </Grid>
        )}
        <Grid>{sectionToDisplay()}</Grid>
        <SaveExitOrder
          handleSaveAndExit={handleSaveAndExit}
          setSaveAndExitOpen={setSaveAndExitOpen}
          saveAndExitOpen={saveAndExitOpen}
        />
        <ShareOrderInfo
          handleSaveAndShare={handleSaveAndShare}
          vacOrderID={vacOrderID}
        />
        <CancelOrder
          title={popUpTitle}
          buttonTitle={popUpButtonTitle}
          cancelOrderOpen={cancelOrderOpen}
          handleClosePopUp={hideCancelPopupHandler}
          vacOrderID={vacOrderID}
          setNewOrderErrorPopUpFlag={setNewOrderErrorPopUpFlag}
          seterrorMessage={seterrorMessage}
          backButtonText={backButtonText}
          cancelConfirmationDesc={cancelConfirmationDesc}
        />
        <NextOrder
          nextOrderOpen={nextOrderOpen}
          handlenextPopUp={handleNextOrderPopup}
          setNextOrderOpen={setNextOrderOpen}
        />
        {NewOrderObj?.newOrderPage !== NewOrderPageSection.NEWORDER_SUMMARY && (
          <NewOrderFooterButtonGroup
            validateAll={validateAll}
            handleSave={saveOrderHandler}
            handlePrevious={previousButtonHandler}
            handleShareOrder={shareOrderHandler}
            handleCancelOrder={showCancelPopupHandlerDirect}
            handleSaveExit={SaveAndExitPopupHandler}
            cancelBtnVisibility={cancelBtnVisibility}
            shareOrderButtonText={shareOrderButtonText}
          />
        )}
      </Grid>
      <SnackBar
        toastStyle="newOrderSaveToast"
        handleCloseAlert={() => {
          setSaveOrderToastFlag(false);
        }}
        msg="Order has been Saved"
        openFlag={saveOrderToastFlag}
      />
      <NewOrderErrorPopupMessage
        errorPopupFlag={newOrderErrorPopPpFlag}
        handleBackButton={() => handleErrorPopupBackButton()}
        popUpStyles="newOrderErrorPopup"
        errorMessage={errorMessage}
        isSaveExitFlow={isSaveExitFlow}
        handleExitButton={() => handleExitButton()}
      />
      {saveAPILoader ? (
        <Popup
          hideCloseButton={true}
          openFlag={saveAPILoader}
          closeHandler={() => {}}
        >
          {spinner()}
        </Popup>
      ) : (
        ""
      )}
      {getApiLoader ? (
        <Popup
          hideCloseButton={true}
          openFlag={getApiLoader}
          closeHandler={() => {}}
        >
          {getSpinner()}
        </Popup>
      ) : (
        ""
      )}
      {cancelShareLoader ? (
        <Popup
          hideCloseButton={true}
          openFlag={cancelShareLoader}
          closeHandler={() => {}}
        >
          {stopShareOrderSpinner()}
        </Popup>
      ) : (
        ""
      )}
      {ShareOrderLoader ? (
        <Popup
          hideCloseButton={true}
          openFlag={ShareOrderLoader}
          closeHandler={() => {}}
        >
          {shareOrderSpinner()}
        </Popup>
      ) : (
        ""
      )}
      {freshNewOrderLoader ? (
        <Popup
          hideCloseButton={true}
          openFlag={freshNewOrderLoader}
          closeHandler={() => {}}
        >
          {freshNewOrderSpinner()}
        </Popup>
      ) : (
        ""
      )}
      {isStopShareOrderSuccess ? (
        <Popup
          openFlag={isStopShareOrderSuccess}
          closeHandler={closeSuccessSharedPopup}
        >
          {stopShareOrderSuccessPopUp()}
        </Popup>
      ) : (
        ""
      )}
      <Popup
        closeHandler={() => {
          setEmptyPopup((x) => !x);
        }}
        openFlag={emptyPopup}
      >
        <div className="emptyPopup"></div>
      </Popup>
      {deleteOrderOpen ? (
        <Popup
          openFlag={deleteOrderOpen}
          closeHandler={() => setDeleteOrderOpen(false)}
        >
          <DeletePopup
            doNotDeleteHandler={doNotDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Popup>
      ) : null}
      <UserConfirmation
        when={NewOrderObj?.showDialog!}
        navigate={(path) => history.push(path)}
        shouldBlockNavigation={(location) => {
          // This case it blocks the navigation when:
          // 1. the login form is dirty, and
          // 2. the user is going to 'other' scene.
          //    (Just an example, in real case you might
          //     need to block all location regarding this case)
          if (showDialog) {
            if (location.pathname !== "/orders/newOrder") {
              return true;
            }
          }
          return false;
        }}
        handleSaveExit={handleSaveAndExitNavigation}
        handleUnloacVacOrder={callUnloackVacOrder}
      />
      <Popup
        hideCloseButton={true}
        openFlag={deepLinkVacOrderLocked !== null}
        closeHandler={() => {
          setDeepLinkVacOrderLocked(null);
        }}
      >
        {patientLocked(deepLinkVacOrderLocked)}
      </Popup>
    </>
  );
};
