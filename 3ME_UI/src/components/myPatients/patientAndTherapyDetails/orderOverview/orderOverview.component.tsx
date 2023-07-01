import { Button, Grid } from "@mui/material";
import { default as Moment, default as moment } from "moment";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useTabs } from "react-headless-tabs";
import { useHistory, useLocation } from "react-router-dom";
import { format } from "react-string-format";
import { ReactComponent as Back } from "../../../../assets/Arrow Down Med.svg";
import { ReactComponent as SelectIcon } from "../../../../assets/Rectangle_drop_down_icon.svg";
import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import {
  DischargeRequestContext,
  DischargeRequestContextType,
} from "../../../../context/DischargeRequestContext";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../../../context/OrderDetailsContext";
import {
  PickUpRequestContext,
  PickUpRequestContextType,
} from "../../../../context/PickUpRequestContext";
import {
  SendNoteContext,
  SendNoteContextType,
} from "../../../../context/SendNoteContext";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../../../context/SupplyOrderContext";
import { TabSelector } from "../../../../core/customTab/tabSelector";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { Popup } from "../../../../core/popup/popup.component";
import SnackBar from "../../../../core/snackBar/snackBar.component";
import {
  fetchWoundList,
  generateFaxCoverSheet,
  getPatient,
  getVacDressingKitProducts,
} from "../../../../util/3meService";
import { getCMSContent } from "../../../../util/cmsService";
import { getdropDownContent } from "../../../../util/dropDownService";
import { getNPIPrescriber } from "../../../../util/npiService";
import {
  getAllDocuments,
  getOrderSupplies,
} from "../../../../util/orderOverViewService";
import { getAdditionalWoundQuestionaries } from "../../../../util/primaryWoundTypeService";
import {
  CMS_PRINTABLE_DOCUMENTS,
  CMS_VAC_THERAPY_INFORMATION_CONTENT,
  DD_COMMON_DOCS_CONTENT,
  DD_UPLOAD_DOCUMENT_TYPE,
} from "../../../../util/staticText";
import {
  getPdfUrl,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import {
  getOrderStatusDetails,
  getPdfContent,
  getSupplyOrderDetailsapi,
  getVACOrderDetails,
} from "../../../../util/vacOrderService";
import { retrievePatientWoundDetails } from "../../../../util/woundAssessmentService";
import {
  Question,
  WoundQuestionaries,
} from "../../../newOrder/clinicalInformation/clinicalInfo.interface";
import { VacOrderSummaryData } from "../../../newOrder/mapper/VacOrderSummary/newOrderResponseMapper.interface";
import {
  ICanister,
  IDressingKit,
  INewOrder,
  IProductAccessory,
} from "../../../newOrder/newOrder.interface";
import { IPrintOrderSummaryRequest } from "../../../newOrder/newOrderReviewOrderStepper/PrintOrderSummaryPdf.interface";
import { IPrescriberModal } from "../../../newOrder/prescriberInformation/prescriberSearch/prescriberSearch.model";
import { IPrintableDocumentsPdf } from "../../../newOrder/printCommonDocs/printCommonDocs.interface";
import { IVacTherapyInformation } from "../../../newOrder/woundBed/vacTherapyInformation.interface";
import { IAlertTypes, IPatient, IPatientAlert } from "../../patient.interface";
import DocumentStepper from "../documentStepper/documentStepper.component";
import { IGetAllDocumentsRequest } from "../documentStepper/orderOverviewSubmittedDocument/submittedDocument.interface";
import OrderDetailsStepper from "../orderDetailsStepper/orderDetailsStepper.component";
import { IOrderDetailResponse } from "../orderDetailsTracking/orderDetailsTracking.interface";
import { WoundDetails } from "../orderOverviewWoundProgressTab/WoundProgressTab.interface";
import WoundDetail from "../orderOverviewWoundProgressTab/orderOverviewWoundDetails/orderOverviewWoundDetail.component";
import WoundProgress from "../orderOverviewWoundProgressTab/orderOverviewWoundProgress/orderOverviewWoundProgress.component";
import OrderStepper from "../orderStepper/orderStepper.component";
import {
  IGetOrderSuppliesRequest,
  IOrderSupplies,
  ISupplyOrdersInfo,
} from "../orderSupplyDetail/orderSupplyDetails.interface";
import PatientFinancialInfoStepper from "../patientFinancialInfoStepper/patientFinancialInfoStepper.component";
import {
  ISupplyOrderAccessory,
  ISupplyOrderCanister,
  ISupplyOrderDressingKit,
  ISupplyOrderInfoMapper,
} from "../supplyOrderDetails/supplyOrderResponseInterface";
import { mapAccessoryCanistorDressingData } from "../supplyOrderDetails/supplyOrderResponseMapper";
import SupplyOrderStepper from "../supplyOrderStepper/supplyOrderStepper.component";
import { CustomSelect } from "./customSelect/customSelect.component";
import { NavigatePatientAction } from "./navigatePatientAction";
import "./orderOverview.css";
import {
  IWoundAssesments,
  IWoundAssesmentsMap,
} from "./orderOverview.interface";
import {
  OrderOverViewTabs,
  OrderOverViewTabsTitle,
} from "./orderOverviewContainer.enum";
import {
  getBlankForNullValue,
  mapAccessoryData,
  mapCanisterData,
  mapClinicalInformationData,
  mapDeliveryInformationData,
  mapDressingKitData,
  mapProductInfoData,
  mapRequesterInfoData,
  mapSecondaryWoundIformationData,
  mapVacOrderOverviewResponse,
  mapWoundQuestionariesData,
  vacCannisterMapperData,
  vacPrimaryDressingKitMapperData,
} from "./orderOverviewResponseMapper";
import { getAlertsforRo } from "../../../../util/alertService";
import {
  createAlert,
  getMissingDocsAlert,
  createMeasurementDueAlertRo,
  getSupplyOrderDeliveredAlert,
  getSupplyOrderPendingAlert,
} from "../../../../util/alertFunctions";
import { ISuppyOrderAlertDataForRO } from "../../alert.interface";
import { getTherapyStartDate } from "../../../../signIn/deeplinkHandler";

export const OrderOverview = ({}) => {
  const SupplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const sendNoteObj = useContext<SendNoteContextType | null>(SendNoteContext);
  const orderOverViewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  const [woundAssessmentData, setWoundAssessmentData] = useState<any>();
  const [removePatientOpen, setRemovePatientOpen] = useState(false);
  const [removePatientMsg, setRemovePatientMsg] = useState("");
  const location: any = useLocation();
  const history: any = useHistory();
  const [emptyPopup, setEmptyPopup] = useState<boolean>(false);
  const [menuaActionArray, setMenuaActionArray] = useState<string[]>([]);
  const [patientData, setPatientData] = useState<IPatient>(
    location.state?.stateData
  );
  const [selectedTab, setSelectedTab] = useTabs([
    "Orders",
    "Documents",
    "Wound Progress",
    "Patient Financial Info",
  ]);
  const [insuranceTypes] = useState([]);
  const [insuranceTypesText] = useState([]);
  const [providerTypes] = useState([]);
  const [accidentTypes] = useState([]);
  const [therapyLengths] = useState([]);
  const [therapyGoals] = useState([]);
  const [vacTherapyInformationData, setVacTherapyInformationData] =
    useState<IVacTherapyInformation>();
  const [vacAllProducts, setAllVacProducts] = useState<null>(null);
  const [prodInfoTypes] = useState([]);
  const [deliverySites] = useState([]);
  const [states] = useState([]);
  const [statesText] = useState([]);
  const [orderDetailLoader, setOrderDetailLoader] = useState<boolean>(false);
  const isOrderFlow = orderOverViewObj?.isOrderFlow;
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const [orderSupplyDetail, setOrderSupplyDetail] = useState<IOrderSupplies>();

  const [supplyOrderData, setSupplyOrderData] =
    useState<ISupplyOrderInfoMapper | null>(null);
  const [canister, setCanister] = useState<ISupplyOrderCanister | null>(null);
  const [accessory, setAccessory] = useState<ISupplyOrderAccessory | null>(
    null
  );
  const [dressing, setDressing] = useState<ISupplyOrderDressingKit | null>(
    null
  );
  const pickUpRequestObj = useContext<PickUpRequestContextType | null>(
    PickUpRequestContext
  );
  const dischargeRequestObj = useContext<DischargeRequestContextType | null>(
    DischargeRequestContext
  );
  const [documentHeaderCount, setDocumentHeaderCount] = useState<number>();
  const [measurementDueHeaderCount, setMeasurementDueHeaderCount] = useState<
    number | null
  >();
  const [printableDocumentsObj, setPrintableDocumentsObj] = useState<
    IPrintableDocumentsPdf | undefined
  >();
  const [commonDocs, setCommonDocs] = useState([]);
  const [commonDocsText, setCommonDocsText] = useState([]);
  const [pdfUrl, setPDFURL] = useState("");
  const setOrderOverviewData = orderOverViewObj?.setOrderOverviewData;
  const [isOrderOverviewDataLoaded, setIsOrderOverviewDataLoaded] =
    useState<boolean>(false);
  const [isCommonMethodsexecuted, setIsCommonMethodsexecuted] =
    useState<boolean>(false);
  const [isSupplyOrderLoaded, setIsSupplyOrderLoaded] =
    useState<boolean>(false);
  const [isWoundProgressTabLoaded, setIsWoundProgressTabLoaded] =
    useState<boolean>(false);
  const [isWoundDetailTabLoaded, setIsWoundDetailTabLoaded] =
    useState<boolean>(false);
  const [isDocTabLoaded, setIsDocTabLoaded] = useState<boolean>(false);
  //woundListGetter&Setter
  const [woundListData, setWoundListData] = useState<
    WoundDetails | undefined
  >();
  const [documentTypeCode, setdocumentTypeCode] = useState([]);
  const [documentTypeText, setdocumentTypeText] = useState([]);
  const [assesmentList, setAssesmentList] = useState<IWoundAssesmentsMap[]>([]);
  const [interval, setInterval] = useState<number>(0);
  const [updatedAlertDataForRO, setUpdatedAlertDataForRO] = useState<any>();

  useEffect(() => {
    if (patientData === undefined) {
      setOrderDetailLoader(true);
      (async () => {
        if (AuthObj?.deepLinkPath) {
          const urlData = AuthObj?.deepLinkPath?.split("/");
          const onbj: any = JSON.parse(atob(urlData[4]));
          let woundAssessments: any;
          try {
            woundAssessments = await getPatient(onbj.ron, onbj.dob);
            if (woundAssessments.succeeded && woundAssessments.data !== null) {
              setPatientData(woundAssessments.data);
              if (onbj.tabname === "Orders") {
                orderOverViewObj?.resetData();
                orderOverViewObj?.resetSeletedSupplyOrderData();
                orderOverViewObj?.resetWoundData();
                orderOverViewObj?.setSelectedOrderTab("Orders");
              } else if (onbj.tabname === "Woundprogress") {
                orderOverViewObj?.setSelectedOrderTab(
                  OrderOverViewTabsTitle.WOUND_PROGRESS_TAB_TITLE
                );
                orderOverViewObj?.setWoundId(onbj.woundId);
              } else if (onbj.tabname === "Supplyorders") {
                orderOverViewObj?.setSelectedOrderTab(
                  OrderOverViewTabsTitle.SUPPLY_ORDER_TAB_TITLE
                );
                const supplyOrderData: ISupplyOrdersInfo = {
                  createdDate: "",
                  deliveredDate: "",
                  initiatedName: "",
                  product: "",
                  ropn: onbj?.ropn!,
                  status: "Delivered",
                  statusColor: "Green",
                };
                orderOverViewObj?.setSelectedSupplyOrder(supplyOrderData);
                orderOverViewObj?.setSelectedOrderTab(
                  OrderOverViewTabsTitle.ORDER_TAB_TITLE
                );
                getTherapyStartDate(onbj?.ron, onbj?.dob, orderOverViewObj!);
                orderOverViewObj?.setIsOrderFlow(true);
                orderOverViewObj?.setOrderTabTitle("Supply Orders");
              } else if (onbj.tabname === "Documents") {
                orderOverViewObj?.setSelectedOrderTab(
                  OrderOverViewTabsTitle.DOCUMENTS_TAB_TITLE
                );
                return {
                  pathname: "/home/orderOverview",
                  state: {
                    stateData: woundAssessments.data,
                  },
                };
              } else {
                history.replace("/home");
              }
            } else {
              history.replace("/home");
            }
          } catch (error) {
            history.replace("/home");
          }
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (patientData) {
      getAndSetTherapyDropDownData();
      if (!isCommonMethodsexecuted) callCommonMethodsToDetermineTabTitle();
    }
  }, [patientData]);

  useEffect(() => {
    if (patientData) {
      if (orderOverViewObj?.selectedOrderTab) {
        setOrderSelectedTab(orderOverViewObj?.selectedOrderTab);
      } else {
        setOrderSelectedTab(OrderOverViewTabs.ORDER_DETAILS);
      }

      if (
        !printableDocumentsObj &&
        orderOverViewObj?.selectedOrderTab === OrderOverViewTabs.DOCUMENTS
      ) {
        callAllDocTabApi();
      }
    }
  }, [orderOverViewObj?.selectedOrderTab, patientData]);

  useEffect(() => {
    if (
      patientData &&
      orderOverViewObj &&
      (orderOverViewObj?.selectedOrderTab === "Orders" ||
        orderOverViewObj?.selectedOrderTab === null) &&
      !orderOverViewObj.selectedSupplyOrder &&
      !isOrderOverviewDataLoaded
    ) {
      setOrderDetailLoader(true);
      getAllSupplyOrderAndVacOrderData();
      window.scroll(0, 0);
    }
  }, [
    orderOverViewObj?.selectedSupplyOrder,
    orderOverViewObj?.selectedOrderTab,
    patientData,
  ]);

  useEffect(() => {
    if (orderOverViewObj?.selectedSupplyOrder && patientData) {
      setOrderDetailLoader(true);
      fetchSupplyOrderData();
    }
  }, [orderOverViewObj?.selectedSupplyOrder, patientData]);

  useEffect(() => {
    if (patientData) {
      if (
        orderOverViewObj?.woundProgressTabTitle ===
          OrderOverViewTabsTitle.WOUND_DETAIL_TAB_TITLE &&
        orderOverViewObj?.woundId &&
        updatedAlertDataForRO
      ) {
        setIsWoundDetailTabLoaded(false);
        setOrderDetailLoader(true);
        loadWoundAssessmentData();
      } else setMeasurementDueHeaderCount(null);
    }
  }, [
    orderOverViewObj?.woundProgressTabTitle,
    updatedAlertDataForRO,
    patientData,
  ]);

  useEffect(() => {
    if (isCommonMethodsexecuted && patientData) {
      if (
        orderOverViewObj?.selectedOrderTab ===
          OrderOverViewTabs?.ORDER_DETAILS &&
        orderOverViewObj?.orderTabTitle !==
          OrderOverViewTabsTitle.SUPPLY_ORDER_TAB_TITLE
      ) {
        if (
          isOrderOverviewDataLoaded &&
          (isWoundDetailTabLoaded || isWoundProgressTabLoaded)
        )
          setOrderDetailLoader(false);
      }
      if (
        orderOverViewObj?.selectedOrderTab === OrderOverViewTabs?.WOUND_PROGRESS
      ) {
        if (
          orderOverViewObj?.woundProgressTabTitle ===
          OrderOverViewTabs?.WOUND_PROGRESS
        ) {
          if (isWoundProgressTabLoaded) setOrderDetailLoader(false);
        } else {
          if (isWoundDetailTabLoaded) setOrderDetailLoader(false);
        }
      }
      if (orderOverViewObj?.selectedOrderTab === OrderOverViewTabs?.DOCUMENTS) {
        if (isDocTabLoaded) setOrderDetailLoader(false);
      }
      if (
        orderOverViewObj?.selectedOrderTab ===
          OrderOverViewTabs?.ORDER_DETAILS &&
        orderOverViewObj?.orderTabTitle ===
          OrderOverViewTabsTitle.SUPPLY_ORDER_TAB_TITLE
      ) {
        if (isSupplyOrderLoaded) setOrderDetailLoader(false);
      }
    }
  }, [
    isCommonMethodsexecuted,
    orderOverViewObj?.selectedOrderTab,
    isOrderOverviewDataLoaded,
    isSupplyOrderLoaded,
    isWoundDetailTabLoaded,
    isWoundProgressTabLoaded,
    isDocTabLoaded,
    selectedTab,
    patientData,
  ]);

  const getAndSetTherapyDropDownData = async () => {
    if (patientData) {
      let menuActionsTextArray: Array<string> = [];
      patientData?.menuActions
        ?.sort((a: any, b: any) => (a.sequence > b.sequence ? 1 : -1))
        .map((x: any) => {
          if (
            x.text !== "Add Wound Assessment" &&
            x.text !== "Upload Documents"
          ) {
            let menuText = x.text;
            menuActionsTextArray.push(menuText);
          }
        });
      setMenuaActionArray(menuActionsTextArray);
    }
  };

  const callCommonMethodsToDetermineTabTitle = async () => {
    setOrderDetailLoader(true);
    let apiCollection = [
      fetchAllSupplyOrderForSelectedRO(),
      woundDetailsForSelectedRO(),
      initiateGetAlertsForRo(),
    ];
    const result = await Promise.all(apiCollection);
    if (result && result.length > 2) {
      await getDocumentTabAlertCount(result[2]);
      setIsCommonMethodsexecuted(true);
    }
  };
  const getDocumentTabAlertCount = async (alertDataForRo: any) => {
    if (patientData) {
      let documentAlertData: IPatientAlert[] | undefined =
        alertDataForRo?.alerts?.filter(
          (x: any) => x.alertName === "Missing Docs"
        );
      if (documentAlertData) {
        var count =
          documentAlertData[0]?.statusDelayReason?.statusDelayReasons?.length;
        if (count) setDocumentHeaderCount(count);
      }
    }
  };

  const initiateGetAlertsForRo = async () => {
    let reqParams = {
      rentalOrderNumber: patientData.roNumber,
      dob: moment(patientData.dob).format("yyyy-MM-DD"),
      ForceToCallMulesoft: true,
    };
    const allAertsForRO = await getAlertsforRo(reqParams);
    if (allAertsForRO) {
      const resp = await parseResponseForAllAlerts(allAertsForRO);
      return resp;
    }
  };

  const parseResponseForAllAlerts = async (allAertsForRO: any) => {
    let allAlertsForRO: Array<IPatientAlert> = [];

    if (allAertsForRO.missinRxAlert !== null) {
      allAlertsForRO.push(createAlert(IAlertTypes.MISRX));
    }
    if (allAertsForRO.missingDocumentAlert !== null) {
      allAlertsForRO.push(
        getMissingDocsAlert(
          IAlertTypes.MSDOC,
          "",
          allAertsForRO.missingDocumentAlert
        )
      );
    }
    if (allAertsForRO.dischargePendingAlert !== null) {
      allAlertsForRO.push(createAlert(IAlertTypes.DISPEN));
    }
    if (allAertsForRO.confirmPlacementAlert !== null) {
      allAlertsForRO.push(createAlert(IAlertTypes.CONPL));
    }

    if (allAertsForRO.measurementDueAlert !== null) {
      let dueAlerts = createMeasurementDueAlertRo(
        allAertsForRO.measurementDueAlert.wounds
      );
      dueAlerts.forEach((x) => {
        allAlertsForRO.push(x);
      });
    }
    if (allAertsForRO.proofOfDeliveryAlert !== null) {
      allAlertsForRO.push(createAlert(IAlertTypes.PODEL));
    }
    if (allAertsForRO.supplyOrderAlert != null) {
      const supplyOrderAlert = allAertsForRO.supplyOrderAlert
        .supplyOrderData as Array<ISuppyOrderAlertDataForRO>;
      supplyOrderAlert.forEach((x) => {
        if (x.type === "DELIVERED") {
          allAlertsForRO.push(
            getSupplyOrderDeliveredAlert(
              IAlertTypes.SUPDE,
              x.ropn,
              new Date(x.deliveredOn)
            )
          );
        } else if (x.type === "PENDING") {
          allAlertsForRO.push(
            getSupplyOrderPendingAlert(
              IAlertTypes.PNDSO,
              "Excessive Supply",
              x.ropn
            )
          );
        }
      });
    }
    let patientforAlerts: IPatient = {
      roNumber: Number(allAertsForRO.RON),
      orderID: allAertsForRO.OrderId,
      alerts: allAlertsForRO,
      firstName: "",
      lastName: "",
      dob: "",
      facilityName: "",
      orderCreationDate: "",
      status: allAertsForRO.status,
    };
    setUpdatedAlertDataForRO(patientforAlerts);
    return patientforAlerts;
  };

  const callAllDocTabApi = async () => {
    setOrderDetailLoader(true);

    let apiCollection = [
      fetchPrintableDocumentsLinks(),
      fetchCommonDocsContent(),
      fetchCommonDocsContent(),
      downloadFaxCoverSheet(),
      fetchDropdownContentsForDocType(),
      getAllDocumentsDetail(),
    ];
    const result = await Promise.all(apiCollection);
    if (result && result.length > 4) {
      setIsDocTabLoaded(true);
    }
  };

  const loadWoundAssessmentData = async () => {
    await getMesurmentDueAlertCount();
    let reqParams = {
      rentalOrderNumber: patientData.roNumber,
      dob: moment(patientData.dob).format("yyyy-MM-DD"),
      woundID: orderOverViewObj?.woundId.toString(),
    };
    const woundAssessments = await retrievePatientWoundDetails(reqParams);
    if (woundAssessments.succeeded) {
      setWoundAssessmentData(woundAssessments.data);
      let woundAssesmentsArray: IWoundAssesments[] =
        woundAssessments?.data?.assessments!;
      let assesmentListArray: Array<IWoundAssesmentsMap> = [];
      woundAssesmentsArray
        .sort((a: any, b: any) =>
          a.evaluationDate > b.evaluationDate ? 1 : a.volume > b.volume ? 1 : -1
        )
        .map((x: any) => {
          if (x.volume !== null) {
            let assesmentData: IWoundAssesmentsMap = {
              evaluationDate: x.evaluationDate.toString(),
              Volume: x.volume,
            };
            assesmentListArray.push(assesmentData);
          }
        });
      setAssesmentList(assesmentListArray);
      if (assesmentListArray.length > 10) {
        setInterval(assesmentListArray.length % 10);
      } else setInterval(0);

      setIsWoundDetailTabLoaded(true);
    } else setIsWoundDetailTabLoaded(true);
  };

  const getAllSupplyOrderAndVacOrderData = async () => {
    let apiCollection = [
      getOrderDetailsFromMS(patientData),
      fetchVACTherapyInformationData(),
    ];
    if (!vacAllProducts) {
      apiCollection.push(fetchVacDressingProducts());
      apiCollection.push(setQuestionnaireContent());
    }
    if (
      !orderOverViewObj?.orderDetailsTrackingData &&
      !orderOverViewObj?.error
    ) {
      apiCollection.push(getorderDetailsTrackingData());
      apiCollection.push(getOrderDetailsPdfContent());
    }
    const result = await Promise.all(apiCollection);
    if (result && result.length > 3) {
      await getOrderOverviewDetails(result[0]);
    }
  };

  const fetchAllSupplyOrderForSelectedRO = async () => {
    const respObj = await getOrderSuppliesDetail();
    if (orderOverViewObj?.orderTabTitle === "Orders...") {
      if (respObj && respObj.supplyOrders.length > 1) {
        orderOverViewObj?.setOrderTabTitle(
          OrderOverViewTabsTitle.ORDER_TAB_TITLE
        );
      } else {
        orderOverViewObj?.setOrderTabTitle(
          OrderOverViewTabsTitle.ORDER_DETAIL_TAB_TITLE
        );
      }
    }
    return respObj;
  };

  //getWoundList
  const woundDetailsForSelectedRO = async () => {
    const params = {
      RentalOrderNumber: patientData.roNumber,
    };
    const responseObj = await fetchWoundList(params);
    if (responseObj && responseObj?.succeeded) {
      setWoundListData(responseObj?.item);
      if (responseObj?.item?.wounds) {
        if (!orderOverViewObj?.woundId) {
          if (responseObj?.item?.wounds?.length > 1) {
            orderOverViewObj?.setWoundProgressTabTitle(
              OrderOverViewTabsTitle.WOUND_PROGRESS_TAB_TITLE
            );
            setIsWoundProgressTabLoaded(true);
          } else {
            orderOverViewObj?.setWoundProgressTabTitle(
              OrderOverViewTabsTitle.WOUND_DETAIL_TAB_TITLE
            );
            orderOverViewObj?.setWoundId(responseObj?.item?.wounds[0].id);
          }
        } else {
          orderOverViewObj?.setWoundProgressTabTitle(
            OrderOverViewTabsTitle.WOUND_DETAIL_TAB_TITLE
          );
        }
      } else {
        orderOverViewObj?.setWoundProgressTabTitle(
          OrderOverViewTabsTitle.WOUND_DETAIL_TAB_TITLE
        );
        setIsWoundDetailTabLoaded(true);
        setWoundListData(responseObj);
      }
    } else {
      orderOverViewObj?.setWoundProgressTabTitle(
        OrderOverViewTabsTitle.WOUND_DETAIL_TAB_TITLE
      );
      setIsWoundDetailTabLoaded(true);
      setWoundListData(responseObj);
    }
    return responseObj;
  };
  const validateAndSetData = async (e: any) => {
    NavigatePatientAction(
      patientData,
      e.target.value,
      setRemovePatientMsg,
      setEmptyPopup,
      setRemovePatientOpen,
      SupplyOrderObj,
      sendNoteObj,
      orderOverViewObj,
      history,
      location,
      () => {},
      pickUpRequestObj,
      dischargeRequestObj
    );
  };

  const getMesurmentDueAlertCount = async () => {
    let measurementDueAlertData: IPatientAlert[] | undefined = [];
    if (orderOverViewObj?.woundId) {
      measurementDueAlertData = updatedAlertDataForRO?.alerts?.filter(
        (x: any) =>
          x.alertName === "Measurements Due" &&
          x.woundOrderID === orderOverViewObj?.woundId.toString() &&
          x.severity === 2
      );
    } else if (!orderOverViewObj?.woundId) {
      measurementDueAlertData = updatedAlertDataForRO?.alerts?.filter(
        (x: any) => x.alertName === "Measurements Due" && x.severity === 2
      );
    }
    if (measurementDueAlertData) {
      var alertCount = measurementDueAlertData?.length;
      if (alertCount) setMeasurementDueHeaderCount(alertCount);
    }
  };

  const getOrderSuppliesDetail = async () => {
    const patientDob = new Date(patientData.dob);
    let reqParams: IGetOrderSuppliesRequest = {
      RentalOrderNumber: patientData.roNumber,
      dob: moment(patientDob).format("DD-MMM-yyyy").toString(),
    };
    try {
      const responseObj = await getOrderSupplies(reqParams);
      if (responseObj?.succeeded) {
        const data = responseObj;
        const supplyDetails: IOrderSupplies = data.item;
        setOrderSupplyDetail(supplyDetails);
        return supplyDetails;
      } else return false;
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCloseRemovePatient = () => {
    setRemovePatientOpen(false);
    orderOverViewObj!.resetData();
    history.push("/home");
  };

  const getorderDetailsTrackingData = async () => {
    let reqParams = {
      RentalOrderNumber: patientData?.roNumber,
      DOB: patientData?.dob,
    };
    try {
      const result = await getOrderStatusDetails(reqParams);

      if (result.error) {
        orderOverViewObj?.setError(true);
        let respObj: IOrderDetailResponse;
        respObj = {
          orderNumber: "",
          patientFirstName: "",
          patientLastName: "",
          salesRepName: "",
          orderDate: "",
          salesRepPhone: "",
          salesRepEmail: "",
          csrName: "",
          csrPhone: "",
          csrEmail: "",
          trackingLink: "",
          trackingNumber: "",
          receivedFlag: "",
          releaseToShipFlag: "",
          releaseDate: "",
          validatedFlag: "",
          benefitsComplDate: "",
          therapyFlag: "",
          therapyDate: "",
          deliveredDate: "",
          deliveredFlag: "",
          outForDeliveryFlag: "",
          outDeliveryDate: "",
          deliverySiteType: "",
          rentalProduct: "",
        };
        orderOverViewObj?.setOrderDetailsTrackingData(respObj);
      } else {
        let respObj: IOrderDetailResponse;
        respObj = {
          orderNumber: getBlankForNullValue(result.orderNumber),
          patientFirstName: getBlankForNullValue(result.patientDataFirstName),
          patientLastName: getBlankForNullValue(result.patientDataLastName),
          salesRepName: getBlankForNullValue(result.salesRepName),
          orderDate: getBlankForNullValue(result.orderDate),
          salesRepPhone: getBlankForNullValue(result.salesRepPhone),
          salesRepEmail: getBlankForNullValue(result.salesRepEmail),
          csrName: getBlankForNullValue(result.csrName),
          csrPhone: getBlankForNullValue(result.csrPhone),
          csrEmail: getBlankForNullValue(result.csrEmail),
          trackingLink: getBlankForNullValue(result.trackingLink),
          trackingNumber: getBlankForNullValue(result.trackingNumber),
          receivedFlag: result.receivedFlag,
          releaseToShipFlag: result.releaseToShipFlag,
          releaseDate: result.releaseDate,
          validatedFlag: getBlankForNullValue(result.validatedFlag),
          benefitsComplDate: getBlankForNullValue(result.benefitsComplDate),
          therapyFlag: result.therapyFlag,
          therapyDate: result.therapyDate,
          deliveredDate: result.deliveredDate,
          deliveredFlag: result.deliveredFlag,
          outForDeliveryFlag: result.outForDeliveryFlag,
          outDeliveryDate: result.outDeliveryDate,
          deliverySiteType: result.deliverySiteType,
          rentalProduct: getBlankForNullValue(result.rentalProduct),
        };
        orderOverViewObj?.setOrderDetailsTrackingData(respObj);
      }
      return result;
    } catch (error) {
      orderOverViewObj?.setError(true);
      return false;
    }
  };

  const getOrderDetailsPdfContent = async () => {
    try {
      if (patientData?.orderID) {
        let requestParams: IPrintOrderSummaryRequest = {
          EntityID: patientData?.orderID,
          EntityType: 0,
        };
        const responseObj = await getPdfContent(requestParams);
        if (responseObj.succeeded) {
          const url = getPdfUrl(responseObj.data.file);
          orderOverViewObj?.setPdfUrl(url);
        } else {
          orderOverViewObj?.setPdfUrl("");
        }
      }
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const fetchDropdownContentsForDocType = async () => {
    try {
      const data = await getdropDownContent(DD_UPLOAD_DOCUMENT_TYPE);
      if (data.items.length > 0) {
        const uploadDocumentmentObject = data.items.filter(
          (item: { name: string }) => item.name === DD_UPLOAD_DOCUMENT_TYPE
        );
        const uploadDocumentData = uploadDocumentmentObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setdocumentTypeCode(uploadDocumentData);
        setdocumentTypeText(
          uploadDocumentData.map((x: { text: string }) => x.text)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getAllDocumentsDetail = async () => {
    let requestParams: IGetAllDocumentsRequest = {
      RentalOrderNumber: patientData.roNumber,
    };
    try {
      const responseObj = await getAllDocuments(requestParams);
      if (responseObj.succeeded) {
        const data = responseObj;
        if (data && data.items.length > 0) {
          orderOverViewObj?.setDocumentDetails(data.items);
        }
      } else {
        setIsDocTabLoaded(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const sectionToDisplay = () => {
    let page: ReactNode;
    switch (selectedTab) {
      case OrderOverViewTabs.ORDER_DETAILS:
        if (
          orderOverViewObj?.orderTabTitle ===
            OrderOverViewTabsTitle.ORDER_DETAIL_TAB_TITLE &&
          orderOverViewObj?.selectedOrderTab !==
            OrderOverViewTabsTitle.DOCUMENTS_TAB_TITLE
        ) {
          page = (
            <OrderDetailsStepper
              isOrderFlow={orderOverViewObj?.isOrderFlow!}
              patientData={patientData}
              isOrderSummary={true}
              newOrderData={orderOverViewObj!.orderOverviewData}
              requesterInfo={orderOverViewObj?.requesterInfo}
              insuranceTypes={insuranceTypes}
              insuranceTypesText={insuranceTypesText}
              accidentTypes={accidentTypes}
              therapyLengths={therapyLengths}
              therapyGoals={therapyGoals}
              vacTherapyInformationData={vacTherapyInformationData!}
              dressingKit={orderOverViewObj?.dressingKit}
              canister={orderOverViewObj?.canister}
              accessory={orderOverViewObj?.accessory}
              productInfo={orderOverViewObj?.productInfo!}
              prodInfoTypes={prodInfoTypes!}
              secondaryWoundInfoData={orderOverViewObj?.secondaryWoundInfoData!}
              woundInfoData={orderOverViewObj?.woundInfoData!}
              deliveryInformation={orderOverViewObj?.deliveryInformation}
              deliverySites={deliverySites!}
              states={states}
              statesText={statesText}
              orderDetailLoaderCompleted={orderDetailLoader}
              selectedTab={selectedTab}
              alertsForRO={updatedAlertDataForRO}
            />
          );
        } else if (
          orderOverViewObj?.orderTabTitle ===
          OrderOverViewTabsTitle.ORDER_TAB_TITLE
        ) {
          page = (
            <OrderStepper
              patientData={patientData}
              selectedTab={selectedTab}
              isOrderFlow={isOrderFlow!}
              orderSupplyDetail={orderSupplyDetail}
              alertsForRO={updatedAlertDataForRO}
            />
          );
        } else if (
          orderOverViewObj?.orderTabTitle ===
          OrderOverViewTabsTitle.SUPPLY_ORDER_TAB_TITLE
        ) {
          page = (
            <SupplyOrderStepper
              patientData={patientData}
              supplyOrderData={supplyOrderData}
              selectedSupplyOrderData={orderOverViewObj?.selectedSupplyOrder!}
              canister={canister}
              accessory={accessory}
              dressing={dressing}
              therapyStartDate={
                orderOverViewObj?.selectedSupplyTherapyStartDate!
              }
              alertsForRO={updatedAlertDataForRO}
            />
          );
        }
        break;
      case OrderOverViewTabs.PATIENT_FINANCIAL_INFO:
        page = (
          <PatientFinancialInfoStepper
            patientData={patientData}
            newOrderData={orderOverViewObj!.orderOverviewData!}
          />
        );
        break;
      case OrderOverViewTabs.DOCUMENTS:
        page = (
          <DocumentStepper
            selectedTab={selectedTab}
            printableDocumentsLink={printableDocumentsObj}
            patientData={patientData}
            commonDocs={commonDocs}
            commonDocsText={commonDocsText}
            pdfUrl={pdfUrl}
            documentTypeCode={documentTypeCode}
            submittedDocumentsLoader={orderDetailLoader}
            documentTypeText={documentTypeText}
            alertsForRO={updatedAlertDataForRO}
          />
        );
        break;
      case OrderOverViewTabs.WOUND_PROGRESS:
        if (
          orderOverViewObj?.woundProgressTabTitle ===
          OrderOverViewTabsTitle.WOUND_PROGRESS_TAB_TITLE
        ) {
          page = <WoundProgress woundDetails={woundListData} />;
        } else if (
          orderOverViewObj?.woundProgressTabTitle ===
          OrderOverViewTabsTitle.WOUND_DETAIL_TAB_TITLE
        ) {
          page = (
            <WoundDetail
              woundDetails={woundListData}
              selectedPatientAlertData={patientData}
              selectedWoundId={orderOverViewObj?.woundId}
              woundIndex={orderOverViewObj?.woundIndex}
              woundAssessmentDetails={woundAssessmentData!}
              assesmentList={assesmentList}
              interval={interval}
              alertsForRO={updatedAlertDataForRO}
            />
          );
        }
        break;
    }
    return page;
  };

  const getOrderDetailsFromMS = async (patient: IPatient) => {
    try {
      let reqParams = {
        RentalOrderNumber: patient.roNumber,
        DOB: moment(patient.dob).format("DD-MMM-yyyy"),
      };
      const response = await getVACOrderDetails(reqParams);

      if (response.succeeded) {
        const vacOrderSummary: VacOrderSummaryData = response.item;
        return vacOrderSummary;
      } else {
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchVACTherapyInformationData = async () => {
    try {
      if (!vacTherapyInformationData) {
        const data = await getCMSContent(CMS_VAC_THERAPY_INFORMATION_CONTENT);
        if (data.item !== undefined) {
          setVacTherapyInformationData(data.item);
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const fetchVacDressingProducts = async () => {
    try {
      const response = await getVacDressingKitProducts();
      if (response.items.length > 0) {
        setAllVacProducts(response.items);
      }
      return response;
    } catch (error) {
      console.log("error", error);
      return false;
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
    orderOverViewObj?.setWoundQuestionnaries(mapData);
    return questionsData;
  };

  const fetchNPIPrescriber = async (vacOrderSummary: VacOrderSummaryData) => {
    let prescriberData: IPrescriberModal;
    let reqParams = {
      NPI: vacOrderSummary.prescriberNPI,
    };
    const data = await getNPIPrescriber(reqParams);
    if (data != null && data.succeeded && data.items.length > 0) {
      orderOverViewObj?.setPrescriberAddedData({
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
      orderOverViewObj?.setPrescriberAddedData(prescriberData);
    }
  };

  const getOrderOverviewDetails = async (vacOrderSummary: any) => {
    if (vacOrderSummary) {
      let patientBasicDataMapperResponse: INewOrder =
        await mapVacOrderOverviewResponse(
          vacOrderSummary,
          insuranceTypes,
          orderOverViewObj!.setShowAdditionalObject,
          providerTypes
        );
      if (vacOrderSummary.prescriberFirstName) {
        await fetchNPIPrescriber(vacOrderSummary);
      }
      let dressingMapperRes: IDressingKit = mapDressingKitData();
      let canisterMapperRes: ICanister = mapCanisterData(vacOrderSummary);
      let accessoryMapperRes: IProductAccessory =
        mapAccessoryData(vacOrderSummary);
      if (vacOrderSummary.mainDressing && vacOrderSummary.mainDressing.sku) {
        dressingMapperRes = vacPrimaryDressingKitMapperData(
          vacOrderSummary,
          dressingMapperRes!,
          vacAllProducts,
          orderOverViewObj
        );
      }
      vacCannisterMapperData(vacOrderSummary, orderOverViewObj);
      orderOverViewObj!.setOrderOverviewData(patientBasicDataMapperResponse);
      orderOverViewObj?.setDressingKit(dressingMapperRes!);
      orderOverViewObj?.setCanister(canisterMapperRes!);
      orderOverViewObj?.setAccessory(accessoryMapperRes!);
      var requesterInfo = mapRequesterInfoData(
        vacOrderSummary,
        AuthObj?.userProfile?.firstName
      );
      orderOverViewObj?.setRequesterInfo(requesterInfo);
      var productInfo = mapProductInfoData(vacOrderSummary);
      orderOverViewObj?.setProductInfo(productInfo);
      const deliveryInformation = mapDeliveryInformationData(vacOrderSummary);
      orderOverViewObj?.setDeliveryInformation(deliveryInformation);
      var clinicalInfo = mapClinicalInformationData(vacOrderSummary);
      orderOverViewObj?.setWoundInfoData(clinicalInfo);
      var primaryQuestions = orderOverViewObj?.woundQuestionaries?.get(
        clinicalInfo.woundType?.value
      );

      if (primaryQuestions) {
        var primaryWoundQuestionares = mapWoundQuestionariesData(
          vacOrderSummary.primaryWound,
          primaryQuestions!
        );
        orderOverViewObj?.setPrimaryAdditionalQuestions(
          primaryWoundQuestionares
        );
      }

      if (clinicalInfo.isShowSecondaryWoundInfo.value === "Yes") {
        var secondaryWoundInfo =
          mapSecondaryWoundIformationData(vacOrderSummary);
        orderOverViewObj?.setSecondaryWoundInfoData(secondaryWoundInfo);
        var secondaryQuestions = orderOverViewObj?.woundQuestionaries?.get(
          secondaryWoundInfo.woundType?.value
        );
        if (secondaryQuestions) {
          var secondaryWoundQuestionares = mapWoundQuestionariesData(
            vacOrderSummary.secondaryWound,
            secondaryQuestions!
          );
          orderOverViewObj?.setSecondaryAdditionalQuestions(
            secondaryWoundQuestionares
          );
        }
      }
      setIsOrderOverviewDataLoaded(true);
    } else {
      const mappres = orderOverViewObj?.orderOverviewData;
      mappres!.wasNPWTInitiated = {
        valid: ValidationStatus.VALID,
        value: "",
        isDefaultValid: true,
      };
      mappres!.contributingCause = {
        valid: ValidationStatus.UNTOUCHED,
        value: "",
      };
      orderOverViewObj?.setOrderOverviewData(mappres!);
      setIsOrderOverviewDataLoaded(true);
    }
  };

  const backPageNavigation = () => {
    if (selectedTab === OrderOverViewTabsTitle.ORDER_TAB_TITLE) {
      if (
        orderOverViewObj?.orderTabTitle ===
          OrderOverViewTabsTitle.ORDER_TAB_TITLE &&
        orderSupplyDetail &&
        orderSupplyDetail.supplyOrders &&
        orderSupplyDetail.supplyOrders.length > 1
      ) {
        AuthObj?.deepLinkPath ? history.push("/home") : history.goBack();
      } else if (
        orderOverViewObj?.orderTabTitle ===
          OrderOverViewTabsTitle.ORDER_DETAIL_TAB_TITLE &&
        orderSupplyDetail &&
        orderSupplyDetail.supplyOrders &&
        orderSupplyDetail.supplyOrders.length <= 1
      ) {
        AuthObj?.deepLinkPath ? history.push("/home") : history.goBack();
      } else if (
        orderOverViewObj?.orderTabTitle ===
          OrderOverViewTabsTitle.ORDER_DETAIL_TAB_TITLE &&
        orderSupplyDetail &&
        orderSupplyDetail.supplyOrders &&
        orderSupplyDetail.supplyOrders.length > 1
      ) {
        orderOverViewObj?.setOrderTabTitle(
          OrderOverViewTabsTitle.ORDER_TAB_TITLE
        );
      } else if (
        orderOverViewObj?.orderTabTitle ===
          OrderOverViewTabsTitle.ORDER_DETAIL_TAB_TITLE &&
        (orderSupplyDetail === undefined || orderSupplyDetail === null)
      ) {
        AuthObj?.deepLinkPath ? history.push("/home") : history.goBack();
      } else if (
        orderOverViewObj?.orderTabTitle ===
        OrderOverViewTabsTitle.SUPPLY_ORDER_TAB_TITLE
      ) {
        orderOverViewObj?.setOrderTabTitle(
          OrderOverViewTabsTitle.ORDER_TAB_TITLE
        );
        orderOverViewObj?.resetSeletedSupplyOrderData();
      }
    } else if (
      selectedTab === OrderOverViewTabsTitle.WOUND_PROGRESS_TAB_TITLE
    ) {
      if (
        orderOverViewObj?.woundProgressTabTitle ===
          OrderOverViewTabsTitle.WOUND_DETAIL_TAB_TITLE &&
        orderOverViewObj?.isWoundProgressFlow === true
      ) {
        orderOverViewObj?.setWoundProgressTabTitle(
          OrderOverViewTabsTitle.WOUND_PROGRESS_TAB_TITLE
        );
        orderOverViewObj?.setIsWoundProgressFlow(false);
      } else if (
        orderOverViewObj?.woundProgressTabTitle ===
          OrderOverViewTabsTitle.WOUND_DETAIL_TAB_TITLE &&
        orderOverViewObj?.isWoundProgressFlow === false
      ) {
        AuthObj?.deepLinkPath ? history.push("/home") : history.goBack();
      } else if (
        orderOverViewObj?.woundProgressTabTitle ===
          OrderOverViewTabsTitle.WOUND_PROGRESS_TAB_TITLE &&
        woundListData?.wounds &&
        woundListData?.wounds?.length > 1
      ) {
        AuthObj?.deepLinkPath ? history.push("/home") : history.goBack();
      }
    } else AuthObj?.deepLinkPath ? history.push("/home") : history.goBack();
  };

  const fetchSupplyOrderData = async () => {
    setIsSupplyOrderLoaded(false);
    orderOverViewObj?.setOrderTabTitle(
      OrderOverViewTabsTitle.SUPPLY_ORDER_TAB_TITLE
    );
    let supplyOrderData = await getSupplyOrderDetails();
    if (supplyOrderData) {
      mapSupplyOrderResponse(supplyOrderData);
    } else {
      setIsSupplyOrderLoaded(true);
    }
  };

  const getSupplyOrderDetails = async () => {
    try {
      if (patientData?.roNumber) {
        let reqParams = {
          RentalOrderNumber: patientData?.roNumber,
          DOB: patientData?.dob,
          ROPN: orderOverViewObj?.selectedSupplyOrder?.ropn,
        };
        const responseObj = await getSupplyOrderDetailsapi(reqParams);
        if (responseObj.succeeded) {
          const supplyOrderData: ISupplyOrderInfoMapper = responseObj.item;
          setSupplyOrderData(supplyOrderData);
          return supplyOrderData;
        } else return false;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const mapSupplyOrderResponse = (supplyOrderData: any) => {
    let supplyCanisterMapperRes: any = mapAccessoryCanistorDressingData(
      supplyOrderData,
      "Canister"
    );
    let canister: ISupplyOrderCanister = {
      canister: supplyCanisterMapperRes,
    };
    setCanister(canister);
    let supplyAccessoriesMapperRes: any = mapAccessoryCanistorDressingData(
      supplyOrderData,
      "Accessories"
    );
    let accessory: ISupplyOrderAccessory = {
      accessory: supplyAccessoriesMapperRes,
    };
    setAccessory(accessory);
    let supplyDressingMapperRes: any = mapAccessoryCanistorDressingData(
      supplyOrderData,
      "Dressing"
    );
    let dressing: ISupplyOrderDressingKit = {
      dressing: supplyDressingMapperRes,
    };
    setDressing(dressing);
    orderOverViewObj?.setOrderTabTitle(
      OrderOverViewTabsTitle.SUPPLY_ORDER_TAB_TITLE
    );
    setIsSupplyOrderLoaded(true);
  };

  const fetchPrintableDocumentsLinks = async () => {
    try {
      const response = await getCMSContent(CMS_PRINTABLE_DOCUMENTS);
      if (response.succeeded) {
        const printableDocresponseObj: IPrintableDocumentsPdf = {
          VACTherapyOrderPad: response.item.orderPad.FileLink,

          VACTherapyInsuranceAuthorizationForm:
            response.item.authorizationForm.FileLink,
        };

        setPrintableDocumentsObj(printableDocresponseObj);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchCommonDocsContent = async () => {
    //async and await
    try {
      const ddContent = format("{0}", DD_COMMON_DOCS_CONTENT);
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const commonDocObject = data.items.filter(
          (item: { name: string }) => item.name === DD_COMMON_DOCS_CONTENT
        );
        const commonDocArray = commonDocObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setCommonDocs(commonDocArray);
        setCommonDocsText(commonDocArray.map((x: { text: string }) => x.text));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const downloadFaxCoverSheet = async () => {
    const patientFirstName = patientData?.firstName;
    const patientLastName = patientData?.lastName;
    const patientDob = moment(patientData?.dob).format("YYYY-MM-DD");
    const rentalOrderNumber = patientData?.roNumber;
    let reqParam = {
      PatientFirstName: patientFirstName,
      PatientLastName: patientLastName,
      PatientDOB: patientDob,
      RON: rentalOrderNumber,
    };
    try {
      const response = await generateFaxCoverSheet(reqParam);
      if (response.succeeded) {
        const url = getPdfUrl(response.data);
        setPDFURL(url);
      } else {
        setPDFURL("");
      }
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const setOrderSelectedTab = async (selectedTabDetails: any) => {
    setSelectedTab(selectedTabDetails);
    orderOverViewObj?.setSelectedOrderTab(selectedTabDetails);
  };

  const spinner = () => {
    return (
      <div>
        <div className="saveapi-header"></div>
        <div className="saveapi-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="order-overview-component">
        <div className="header-first">
          <Back
            onClick={() => {
              backPageNavigation();
            }}
            className="back-button"
            data-testid="orderOverviewBckBtn"
          />
          {patientData && (
            <div className="header" data-testid="header">
              <h2 className="header-name">
                {makeCapitalEachWordInString(patientData.firstName) +
                  " " +
                  makeCapitalEachWordInString(patientData.lastName)}
              </h2>
              <h4 className="header-dob">
                DOB:{" "}
                {patientData.dob ? Moment(patientData.dob).format("L") : null}
              </h4>
            </div>
          )}
          <div className="dropdown-container" data-testid="customeselect">
            <CustomSelect
              handleChange={validateAndSetData}
              menuItem={menuaActionArray}
              name="therapyOptionss"
              placeHolder="Therapy Options"
              selectpropsClassName={"dropdown-info-select"}
              selectClassName={"dropdown-info-input"}
              value={""}
            />
            <Button
              startIcon={<SelectIcon />}
              className="drop-down-button"
            ></Button>
          </div>
        </div>
        <div className="tabview-page" data-testid="tab-nav">
          <nav className="tab-style-div">
            <Grid container className="tab-grid-conatiner" spacing={2}>
              <Grid className="tab-grid-item" item xs={2.52}>
                <TabSelector
                  testId="tab-orders"
                  isActive={
                    selectedTab === OrderOverViewTabsTitle.ORDER_TAB_TITLE
                  }
                  onClick={() =>
                    setOrderSelectedTab(OrderOverViewTabsTitle.ORDER_TAB_TITLE)
                  }
                  title={orderOverViewObj?.orderTabTitle!}
                />
              </Grid>
              <Grid className="tab-grid-item" item xs={2.52}>
                <TabSelector
                  isActive={selectedTab === "Documents"}
                  onClick={() => setOrderSelectedTab("Documents")}
                  title="Documents"
                  notificationCount={documentHeaderCount}
                  tabType="Document"
                />
              </Grid>
              <Grid className="tab-grid-item" item xs={2.52}>
                <TabSelector
                  isActive={selectedTab === "Wound Progress"}
                  onClick={() => setOrderSelectedTab("Wound Progress")}
                  title={orderOverViewObj?.woundProgressTabTitle!}
                  notificationCount={measurementDueHeaderCount}
                  tabType="Wound"
                />
              </Grid>
              <Grid className="tab-grid-item" item xs={2.52}>
                <TabSelector
                  data-testid="tab-patient-fin-info"
                  isActive={selectedTab === "Patient Financial Info"}
                  onClick={() => setSelectedTab("Patient Financial Info")}
                  title="Patient Financial Info"
                />
              </Grid>
            </Grid>
          </nav>
          {!orderDetailLoader && sectionToDisplay()}
        </div>
      </div>
      <SnackBar
        toastStyle="removePatientToast"
        openFlag={removePatientOpen}
        msg={removePatientMsg}
        handleCloseAlert={handleCloseRemovePatient}
        autoClose={removePatientOpen}
      ></SnackBar>
      <Popup
        closeHandler={() => {
          setEmptyPopup((x) => !x);
        }}
        openFlag={emptyPopup}
      >
        <div className="emptyPopup"></div>
      </Popup>
      {orderDetailLoader ? (
        <Popup
          hideCloseButton={true}
          openFlag={orderDetailLoader}
          closeHandler={() => {}}
        >
          {spinner()}
        </Popup>
      ) : (
        ""
      )}
    </>
  );
};
