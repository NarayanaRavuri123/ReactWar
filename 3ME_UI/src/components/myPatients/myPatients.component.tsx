import moment from "moment";
import { Grid } from "@mui/material";
import Popper from "@mui/material/Popper";
import { useDebounce } from "use-debounce";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as SupplyIcon } from "../../assets/orderSupplies.svg";
import { ReactComponent as VACTherapyIcon } from "../../assets/orderVACTherapy.svg";
import { ReactComponent as PatientAction } from "../../assets/patientAction.svg";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import {
  DischargeRequestContext,
  DischargeRequestContextType,
} from "../../context/DischargeRequestContext";
import { MobileDisplayContext } from "../../context/MobileDisplayContext";
import {
  MyPatientContext,
  MyPatientContextType,
} from "../../context/MyPatientContext";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../context/NewOrderContext";
import {
  PickUpRequestContext,
  PickUpRequestContextType,
} from "../../context/PickUpRequestContext";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../context/RolesPermissionContext";
import {
  SendNoteContext,
  SendNoteContextType,
} from "../../context/SendNoteContext";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../context/SupplyOrderContext";
import { Popup } from "../../core/popup/popup.component";
import SnackBar from "../../core/snackBar/snackBar.component";
import { LoadingSpinner } from "../../core/loader/LoadingSpinner";
import {
  fetchWoundList,
  getFaciityPatients,
  getPatients,
} from "../../util/3meService";
import { DeletePopup } from "../../core/deleteOrder/deleteOrder.component";
import {
  createAlert,
  createMeasurementDueAlert,
  getMissingDocsAlert,
  getSupplyOrderDeliveredAlert,
  getSupplyOrderPendingAlert,
} from "../../util/alertFunctions";
import { getAlerts, negotiate } from "../../util/alertService";
import { getDeepClone } from "../../util/ObjectFunctions";
import { Validator } from "../../util/order.validations";
import { USER_ROLE_BASE } from "../../util/PermissionName";
import {
  HOLD_THERAPY_ERROR_MESSAGE,
  NO_PATIENT_FOUND,
  RESUME_THERAPY_ERROR_MESSAGE,
} from "../../util/staticText";
import {
  IAnalyticsData,
  makeCapitalEachWordInString,
  sendAnalyticsData,
} from "../../util/utilityFunctions";
import {
  cancelOrSubmitVacOrder,
  getOrderStatusDetails,
} from "../../util/vacOrderService";
import { FacilityBaseUserRole } from "../myPatients/facilityBaseUserRole/facilityBaseUserRole.component";
import { NeedHelp } from "../needHelp/needHelp.component";
import { SharedOrderModal } from "../newOrder/newOrderFooterGroup/shareOrder/shareOrder.enum";
import { ShareOrderInfo } from "../newOrder/newOrderFooterGroup/shareOrder/shareOrderMainComponent";
import { PickUpRequestPageSection } from "../pickUpAndDischargeRequest/pickUpRequest/pickUpRequestPageSection.enum";
import { SupplyOrderPageSection } from "../supplyOrder/SupplyOrderPageSection.enum";
import { AddPatientButton } from "./addPatientButton/addPatientButton.component";
import { AddPatientContainer } from "./addPatientContainer/addPatientContainer.component";
import { AddPatientContext } from "./addPatientContainer/addPatientContainer.context";
import {
  IAlertRequest,
  IAlertsRequest,
  ISuppyOrderAlertData,
} from "./alert.interface";
import MissingRx from "./allAlerts/missingRx/missingRx.component";
import "./myPatients.css";
import {
  BorderButtonWithIcon,
  DotMenuIconButton,
  Header,
  HeaderDiv,
  MyPatientsSubDiv,
  NeedHelpDiv,
  PatientProfile,
  PatientProfileCard,
  PatientProfileColumn,
  PatientProfileDotMenu,
  PatientProfileMessage,
  PatientProfileRow,
  RightMenuDiv,
  Search,
  SearchIconWrapper,
  SearchPatientDiv,
  StyledCardContent,
  StyledInputBase,
} from "./myPatients.style";
import {
  IAlertTypes,
  IPatient,
  IPatientAlert,
  IStopSaringOrder,
} from "./patient.interface";
import { HoldTherapy } from "./patientActions/holdOrResumeTherapy/holdTherapy/holdTherapy.component";
import { WoundDetails } from "./patientActions/holdOrResumeTherapy/main/holdOrResumeTherapy.interface";
import { ResumeTherapy } from "./patientActions/holdOrResumeTherapy/resumeTherapy/resumeTherapy.component";
import { SuccessPopUp } from "./patientActions/holdOrResumeTherapy/successPopUp/successPopUp.component";
import { PatientActions } from "./patientActions/patientActions.component";
import StopSharingOrder from "./patientActions/stopSharingOrder/stopSharingOrder.component";
import PatientAlerts from "./patientAlerts/patientAlerts.component";
import { NavigatePatientAction } from "./patientAndTherapyDetails/orderOverview/navigatePatientAction";
import { PatientData } from "./PatientData";
import { PatientOrdersDetails } from "./patientOrdersDetails/patientOrdersDetails.component";
import { GetPatientLockedData } from "./savedPatientLockDetails";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../context/OrderDetailsContext";
import { SendNoteFailure } from "../send3MNote/popUps/failurePopUp/sendNoteFailure.component";
import { CancelPatientOrder } from "./patientActions/cancelPatientOrder/cancelPatientOrder.component";
import { IFacility } from "../manageProfile/facilityInformation/facility.interface";

type Props = {
  isTesting?: boolean;
};

export const MyPatients = ({ isTesting = false }: Props) => {
  const { isMobileScreen } = useContext(MobileDisplayContext);
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const SupplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const [error, setError] = useState(false);
  const [alertsRequest, setAlertsRequest] = useState<IAlertsRequest>();
  const [updatedAlertData, setUpdatedAlertData] = useState<IPatient>();
  const [, setSelectedPatientAction] = useState("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchedInput, setSearchedInput] = useState<string>("");
  const [debouncedText] = useDebounce(searchInput, 500);
  const [emptyPopup, setEmptyPopup] = useState<boolean>(false);
  const [searchingPatient, setSearchingPatient] = useState<boolean>(false);
  const [patients, setPatients] = React.useState<Array<IPatient>>();
  const [patientList, setPatientList] = React.useState<Array<IPatient>>();
  const [removePatientOpen, setRemovePatientOpen] = React.useState(false);
  const [hubStarted, setHubStarted] = React.useState(false);
  const [removePatientMsg, setRemovePatientMsg] = useState("");
  const [alertType, setAlertType] = useState<IAlertTypes>();
  const [patientActionAlertPopUp, setPatientActionAlertPopUp] = useState(false);
  const [openPopUp, setOpenPopUp] = useState<boolean>(false);
  const [isHoldTherapy, setIsHoldTherapy] = useState<boolean>(true);
  const [wounds, setWounds] = useState<[WoundDetails] | undefined>(undefined);
  const [therapyStartDate, setTherapyStartDate] = useState<Date | undefined>(
    undefined
  );
  const [showErrorPopUp, setShowErrorPopUp] = useState<boolean>(false);
  const [showWarningPoppUp, setShowWarningPoppUp] = useState<boolean>(false);
  const [showSuccessPopUp, setShowSuccessPopUp] = useState<boolean>(false);
  const [isPatientCancelOrder, setIsPatientCancelOrder] =
    useState<boolean>(false);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const [cancelSharedOrder, setCancelSharedOrder] =
    useState<IStopSaringOrder | null>(null);
  const MyPatientObj = useContext<MyPatientContextType | null>(
    MyPatientContext
  );
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const dischargeRequestObj = useContext<DischargeRequestContextType | null>(
    DischargeRequestContext
  );
  const sendNoteObj = useContext<SendNoteContextType | null>(SendNoteContext);

  const [menuTappedPatient, setMenuTappedPatient] =
    React.useState<IPatient | null>();
  const pickUpRequestObj = useContext<PickUpRequestContextType | null>(
    PickUpRequestContext
  );
  const [isMyPatientFlow, setIsMyPatientFlow] = useState<boolean>(false);
  const [vacOrderID, setVacOrderID] = useState("");
  const [selectedPatientChangePres, setSelectedPatientChangePres] =
    useState<IPatient | null>();
  let loggedInEmail = "";
  const AuthDetails = sessionStorage.getItem("okta-token-storage");
  if (AuthDetails) {
    const data = JSON.parse(AuthDetails ?? "");
    loggedInEmail = data.idToken.claims?.email;
  }
  // For need help
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const isLoggedIn = AuthObj?.isLoggedIn ? AuthObj?.isLoggedIn : false;
  const userRole = AuthObj?.userRolePermissionData?.userRole;
  const [deleteOrderPopUpFlag, setDeleteOrderPopUpFlag] = useState(false);
  const [deleteOrderLoadSpinner, setDeleteOrderLoadSpinner] = useState(false);
  const orderOverViewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  const [menuSelectedPatient, setMenuSelectedPatient] = useState<IPatient>();
  useEffect(() => {
    if (MyPatientObj?.reloadMyPatient) {
      setSearchInput("");
      setSearchedInput("");
      loadPatientData("");
    }
  }, [MyPatientObj?.reloadMyPatient]);

  useEffect(() => {
    window.history.replaceState({}, "Used to clear the history state object");
    history.replace(location.pathname, {});
  }, []);

  const myPatientAnalytics = (eventName: string) => {
    let analyticsData: IAnalyticsData = {
      page_type: "react",
      view_name: "MyPatientComponent",
      event_type: "click",
      event_name: eventName,
      tealium_event: "My_Patient_Dashboard",
      mmmex_userrecordid: AuthObj?.userProfile?.userID!,
      mmmex_facilityid: AuthObj?.registeredFaciltyAddress?.siteUseId!,
      mmmex_roleid: permissionObj?.mappedRolesPermissionData?.roleName!,
      mmmex_pagename: "My Patients",
    };
    sendAnalyticsData(analyticsData);
  };

  const handleOpen = () => {
    myPatientAnalytics("Add_Patient");
    setOpen(true);
  };

  const statusColor = (status: any) => {
    switch (status) {
      case "Submitted":
        return "orangeCircle";
      case "Saved":
        return "yellowCircle";
      case "In Process":
        return "greenCircle";
      case "Shipped":
        return "greenCircle";
      case "Approved For Placement":
        return "greenCircle";
      case "Delivered":
        return "greenCircle";
      case "In Therapy":
        return "blueCircle";
      case "Pickup Pending":
        return "greyCircle";
      case "Closed":
        return "greyCircle";
      default:
        return "purpleCircle";
    }
  };

  const negotiateSignalR = async () => {
    if (MyPatientObj?.hubConnection !== undefined) {
      // Stop the existing hub connection if exist
      MyPatientObj?.hubConnection.stop();
    }
    let connection = await negotiate();
    if (connection) {
      MyPatientObj?.setHubConnection(connection);
      connection
        .start()
        .then(function () {
          setHubStarted(true);
          return connection;
        })
        .catch(function (err: any) {
          console.log(err.toString());
        });
      connection.on("NotifyAlerts", (notifyResp) => {
        parseAlertResponse(notifyResp);
      });
    }
  };

  const parseAlertResponse = async (notifyResp: string) => {
    const data = JSON.parse(notifyResp);
    let patientAlerts: Array<IPatientAlert> = [];
    if (data.MissinRxAlert !== null) {
      patientAlerts.push(createAlert(IAlertTypes.MISRX));
    }
    if (data.MissingDocumentAlert !== null) {
      patientAlerts.push(
        getMissingDocsAlert(IAlertTypes.MSDOC, "", data.MissingDocumentAlert)
      );
    }
    if (data.DischargePendingAlert != null) {
      patientAlerts.push(createAlert(IAlertTypes.DISPEN));
    }
    if (data.ConfirmPlacementAlert != null) {
      patientAlerts.push(createAlert(IAlertTypes.CONPL));
    }

    if (
      data.MeasurementDueAlert != null &&
      permissionObj?.mappedRolesPermissionData.IsShowAddWoundAssessmentMenu
    ) {
      let dueAlerts = createMeasurementDueAlert(
        data.MeasurementDueAlert.Wounds
      );
      dueAlerts.forEach((x) => {
        patientAlerts.push(x);
      });
    }
    if (data.ProofOfDeliveryAlert != null) {
      patientAlerts.push(createAlert(IAlertTypes.PODEL));
    }
    if (
      data.SupplyOrderAlert != null &&
      permissionObj?.mappedRolesPermissionData.IsShowSupplyOrderButton
    ) {
      const supplyOrderAlert = data.SupplyOrderAlert
        .SupplyOrderData as Array<ISuppyOrderAlertData>;
      supplyOrderAlert.forEach((x) => {
        if (x.Type === "DELIVERED") {
          patientAlerts.push(
            getSupplyOrderDeliveredAlert(
              IAlertTypes.SUPDE,
              x.ROPN,
              new Date(x.DeliveredOn)
            )
          );
        } else if (x.Type === "PENDING") {
          patientAlerts.push(
            getSupplyOrderPendingAlert(
              IAlertTypes.PNDSO,
              "Excessive Supply",
              x.ROPN
            )
          );
        }
      });
    }
    if (data.SharedOrderAlert != null) {
      patientAlerts.push(
        createAlert(
          IAlertTypes.SHODR,
          loggedInEmail.toLowerCase() !==
            data.SharedOrderAlert.From.toLowerCase()
            ? `From ${makeCapitalEachWordInString(
                data.SharedOrderAlert.FromRecipientName.toLowerCase()
              )}`
            : `To ${makeCapitalEachWordInString(
                data.SharedOrderAlert.ToRecipientName.toLowerCase()
              )}`,
          null,
          data.SharedOrderAlert
        )
      );
    }
    let patient: IPatient = {
      roNumber: Number(data.RON),
      orderID: data.OrderId,
      alerts: patientAlerts,
      firstName: "",
      lastName: "",
      dob: "",
      facilityName: "",
      orderCreationDate: "",
      status: data.status,
    };
    setUpdatedAlertData(patient);
  };

  const initiateGetAlerts = async (reqParams: IAlertsRequest) => {
    try {
      if (reqParams && reqParams.alerts?.length > 0) {
        await getAlerts(reqParams);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const loadPatientData = async (searchParam: string) => {
    if (isTesting) return;
    setSearchedInput(searchParam);
    if (
      MyPatientObj &&
      !MyPatientObj.reloadMyPatient &&
      patientList &&
      patientList.length > 0
    ) {
      doLocalSearchForPatient(searchParam);
    } else {
      try {
        setSearchingPatient(true);
        let data: Array<IPatient> | null = [];
        const dt = await getFaciityPatients(
          AuthObj?.registeredFaciltyAddress?.siteUseId ??
            AuthObj?.userProfile?.facilities[0].siteUseId,
          AuthObj?.registeredFaciltyAddress?.careGiverId,
          AuthObj?.userProfile?.userName,
          false
        );
        if (dt.data !== null) data = dt.data as Array<IPatient>;

        if (data && data.length >= 0) {
          const patientData = data as Array<IPatient>;
          patientData.forEach((el, index) => {
            el.statusColor = el.color + "Circle";
            el.alerts = [];
          });
          setPatientList(patientData);
          let alertsRequestlist: Array<IAlertRequest> = [];
          patientData.map((x) => {
            if (x.dob !== null && x.dob !== undefined && x.dob !== "") {
              let alertReq: IAlertRequest = {
                rentalOrderNumber: x.roNumber.toString(),
                dob: x.dob,
                orderID: x.orderID!,
              };
              alertsRequestlist.push(alertReq);
            }
          });
          const newdata: IAlertsRequest = {
            alerts: alertsRequestlist,
          };
          setAlertsRequest(newdata);
          setPatients(patientData);
          setSearchingPatient(false);
        }
        MyPatientObj?.setReloadMyPatient(false);
      } catch (error) {
        console.log("error", error);
        setError(true);
        MyPatientObj?.setReloadMyPatient(false);
      }
    }
  };

  const doLocalSearchForPatient = (searchParam: string) => {
    if (searchParam.length > 0 && patientList) {
      const filtedPatient = patientList.filter(
        (patient: IPatient) =>
          patient.lastName.toLowerCase().includes(searchParam.toLowerCase()) ||
          patient.firstName.toLowerCase().includes(searchParam.toLowerCase()) ||
          patient.roNumber.toString().includes(searchParam)
      );
      setPatients(filtedPatient);
    } else {
      setPatients(patientList);
    }
  };

  const addAlertsToPatients = (array: Array<IPatient>, alert: IPatient) => {
    if (array && array.length > 0) {
      const index = array.findIndex(
        (patient: IPatient) =>
          patient.roNumber.toString() === alert.roNumber.toString() ||
          (patient.orderID &&
            alert.orderID &&
            patient.orderID === alert.orderID)
      );
      if (index !== -1) {
        const patient = array[index];
        patient.alerts = alert.alerts;
      }
    }
  };

  const removePateint = (value: string) => {
    if (patientList) {
      const index = patientList.findIndex(
        (patient: IPatient) =>
          patient.roNumber.toString() === value ||
          (patient.orderID && patient.orderID === value)
      );
      if (index !== -1) {
        let updatedList = [...patientList];
        updatedList.splice(index, 1);
        setSearchInput("");
        setSearchedInput("");
        setPatientList(updatedList);
        setPatients(updatedList);
      }
    }
  };

  const getWoundList = async (roNumber: number) => {
    const params = {
      RentalOrderNumber: roNumber.toString(),
    };
    try {
      const response = await fetchWoundList(params);
      if (response.succeeded === false) {
        setShowErrorPopUp(true);
        return;
      }
      const wounds = response.item.wounds;
      if (wounds && wounds.length > 0) {
        const updatedWounds = wounds
          .map((wound: WoundDetails, index: number) => {
            if (index > 1) {
              wound.id = "";
            }
            wound.isChecked = false;
            return wound;
          })
          .filter((wound: WoundDetails) => wound.id !== "");
        setWounds(updatedWounds);
      } else {
        setShowErrorPopUp(true);
      }
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  };

  const getTherapyStartDate = async (selectedPatient: IPatient) => {
    const reqParam = {
      RentalOrderNumber: selectedPatient.roNumber.toString(),
      DOB: selectedPatient.dob,
    };
    try {
      const result = await getOrderStatusDetails(reqParam);
      if (result) {
        const dateStr = result.therapyDate;
        const date = moment(dateStr, "YYYY-MM-DDTHH:mm:ss").toDate();
        setTherapyStartDate(date);
      }
      return true;
    } catch {
      console.log("error", error);
      return false;
    }
  };

  const addNewPatient = async (newPatient: IPatient) => {
    if (searchInput.length !== 0) {
      setSearchInput("");
    }
    newPatient.statusColor = statusColor(newPatient.status);
    const localList: IPatient[] = getDeepClone(patientList);
    localList.push(newPatient);
    setPatients(localList);
  };
  const getMenuActions = (patient: any, menuAction: any) => {
    patient!.menuActions =
      patient &&
      patient?.menuActions?.filter((menus: any) => menus.text !== menuAction);
    return patient!.menuActions;
  };

  const handleClick = (event: any) => {
    if (event.currentTarget.id !== "") {
      const patient = patients?.filter(
        (patient: { roNumber: Number }) =>
          patient.roNumber.toString() === event.currentTarget.id
      )[0];
      if (!permissionObj?.mappedRolesPermissionData?.IsShowSupplyOrderButton) {
        patient!.menuActions = getMenuActions(patient, "Order Supplies");
      }
      if (
        !permissionObj?.mappedRolesPermissionData?.IsShowAddWoundAssessmentMenu
      ) {
        patient!.menuActions = getMenuActions(patient, "Add Wound Assessment");
      }

      setMenuTappedPatient(patient);
      setVacOrderID(event.currentTarget.name);
    } else {
      const patient = patients?.filter(
        (patient: IPatient) =>
          patient?.orderID !== null &&
          patient?.orderID!.toString() === event.currentTarget.name
      )[0];
      setVacOrderID(event.currentTarget.name);
      setMenuTappedPatient(patient);
    }
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handlePopperClose = async (
    event: React.MouseEvent<HTMLElement>,
    selectedVal: string
  ) => {
    setSelectedPatientAction(selectedVal);
    myPatientAnalytics(`${selectedVal} PatientAction Button`);
    if (
      (selectedVal === "Order Supplies" ||
        selectedVal === "Remove Patient" ||
        selectedVal === "Pickup/Discharge Request" ||
        selectedVal === "Send 3M A Note" ||
        selectedVal === "Add Wound Assessment" ||
        selectedVal === "Upload Documents") &&
      menuTappedPatient
    ) {
      NavigatePatientAction(
        menuTappedPatient,
        selectedVal,
        setRemovePatientMsg,
        setEmptyPopup,
        setRemovePatientOpen,
        SupplyOrderObj,
        sendNoteObj,
        orderOverViewObj,
        history,
        location,
        removePateint,
        pickUpRequestObj,
        dischargeRequestObj
      );
    } else if (
      selectedVal === "Pickup/Discharge Request" &&
      menuTappedPatient
    ) {
      pickUpRequestObj?.resetData();
      dischargeRequestObj?.resetData();
      pickUpRequestObj?.setPickUpRequestPage(
        PickUpRequestPageSection.PICK_UP_REQUEST_START_FORM
      );
      pickUpRequestObj?.setPatient(menuTappedPatient);
      history.push("/home/pickUpRequest");
      return;
    } else if (selectedVal === "Discharge Request" && menuTappedPatient) {
      pickUpRequestObj?.resetData();
      dischargeRequestObj?.resetData();
      pickUpRequestObj?.setPickUpRequestPage(
        PickUpRequestPageSection.DISCHARGE_REQUEST_START_FORM
      );
      pickUpRequestObj?.setPatient(menuTappedPatient);
      history.push("/home/dischargeRequest");
      return;
    } else if (selectedVal === "Share Order" && menuTappedPatient) {
      NewOrderObj?.setshareOrderAddPopUpSection(SharedOrderModal.SHARE_ORDER);
      setIsMyPatientFlow(true);
      NewOrderObj?.setshareOrderPopup(true);
    } else if (selectedVal === "Continue Saved Order" && menuTappedPatient) {
      NewOrderObj?.resetNewOrderForm();
      GetPatientLockedData(
        menuTappedPatient.orderID,
        true,
        MyPatientObj,
        history
      );
    } else if (selectedVal === "Send Prescription" && menuTappedPatient) {
      setAlertTypeAndPatientData(IAlertTypes.MISRX, menuTappedPatient);
    } else if (
      (selectedVal === "Hold Therapy" || selectedVal === "Resume Therapy") &&
      menuTappedPatient
    ) {
      setWounds(undefined);
      setAnchorEl(anchorEl ? null : event.currentTarget);
      setIsHoldTherapy(selectedVal === "Hold Therapy");
      setOpenPopUp(true);
      await Promise.all([
        getWoundList(menuTappedPatient.roNumber),
        getTherapyStartDate(menuTappedPatient),
      ]);
    } else if (
      (selectedVal === "Stop Sharing Order" ||
        selectedVal === "Cancel Sharing") &&
      menuTappedPatient
    ) {
      setCancelSharedOrder({
        stopSharingOrder: true,
        orderID: menuTappedPatient.orderID
          ? menuTappedPatient.orderID?.toString()
          : null,
        sharedBy: menuTappedPatient?.sharedStatus
          ? menuTappedPatient?.sharedStatus
          : null,
      });
    } else if (selectedVal === "Delete Saved Order" && menuTappedPatient) {
      setDeleteOrderPopUpFlag(true);
    } else if (selectedVal === "Cancel Patient Order" && menuTappedPatient) {
      setMenuSelectedPatient(menuTappedPatient!);
      setIsPatientCancelOrder(true);
    } else {
      setMenuTappedPatient(null);
      setAnchorEl(anchorEl ? null : event.currentTarget);
      setEmptyPopup(true);
    }
  };

  const handlePopperClosewhenClickOutside = (
    event: MouseEvent | TouchEvent
  ) => {
    setMenuTappedPatient(null);
    setAnchorEl(null);
  };

  const handleCloseRemovePatient = () => {
    setRemovePatientOpen(false);
    setAnchorEl(null);
    setMenuTappedPatient(null);
  };

  const redirectToVacOrder = () => {
    myPatientAnalytics("Order_Vac_MyPatient_Button");
    NewOrderObj?.resetNewOrderForm();
    history.push("/orders/newOrder");
  };

  const redirectToSupplyOrder = () => {
    myPatientAnalytics("Order_Supplies_MyPatient_Button");
    SupplyOrderObj?.setSupplyOrderPage(
      SupplyOrderPageSection.SUPPLYORDER_PATIENT_LIST
    );
    SupplyOrderObj?.resetSupplyOrder();
    history.push("/orders/supplyOrderList");
  };

  const handlePatientSearch = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const re = /^[a-zA-Z0-9-]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSearchInput(e.target.value);
    }
  };

  const closeAllTherapyPopups = () => {
    setOpenPopUp((x) => !x);
    setTimeout(() => {
      setWounds(undefined);
      setShowErrorPopUp(false);
      setShowWarningPoppUp(false);
      setShowSuccessPopUp(false);
    }, 500);
  };

  const closeTherapyPopUp = () => {
    setWounds(undefined);
    setShowSuccessPopUp(true);
  };

  const showWarningMessage = () => {
    setWounds(undefined);
    setShowWarningPoppUp(true);
  };

  let openEL = Boolean(anchorEl);
  const id = openEL ? "simple-popper" : undefined;

  const LoadSpinner = () => {
    return (
      <div className="myPatientListSpinner">
        <LoadingSpinner />
      </div>
    );
  };

  const ShowNoWoundPopUp = () => {
    return (
      <div className="myPatientListSpinner">
        <h4>No Wound found.</h4>
      </div>
    );
  };

  const LoadTherapy = () => {
    if (wounds && therapyStartDate && !showSuccessPopUp) {
      return isHoldTherapy ? (
        <HoldTherapy
          closePopup={closeTherapyPopUp}
          patient={menuTappedPatient!}
          showWarningPopup={showWarningMessage}
          therapyStartDate={therapyStartDate}
          wounds={wounds}
        />
      ) : (
        <ResumeTherapy
          closePopup={closeTherapyPopUp}
          patient={menuTappedPatient!}
          showWarningPopup={showWarningMessage}
          therapyStartDate={therapyStartDate}
          wounds={wounds}
        />
      );
    } else if (showSuccessPopUp) {
      return isHoldTherapy ? (
        <SuccessPopUp
          title="Success!"
          description1="The hold request has been successfully applied to the patient order."
          description2="If a resumption date was not indicated, you will need to manually resume therapy by selecting “Resume Therapy after Hold” from the patient actions."
          buttonTitle="Done"
          btnAction={() => {
            setOpenPopUp(false);
            setTimeout(() => {
              setShowSuccessPopUp(false);
            }, 500);
          }}
        />
      ) : (
        <SuccessPopUp
          title="Success!"
          description1="The hold has been removed and therapy can resume for the patient indicated."
          description2=""
          buttonTitle="Done"
          btnAction={() => {
            setOpenPopUp(false);
            setTimeout(() => {
              setShowSuccessPopUp(false);
            }, 500);
          }}
        />
      );
    } else if (!wounds && showWarningPoppUp && !showSuccessPopUp) {
      return (
        <SendNoteFailure
          rootClass="warning-pop-up"
          message={
            isHoldTherapy
              ? HOLD_THERAPY_ERROR_MESSAGE
              : RESUME_THERAPY_ERROR_MESSAGE
          }
          backButtonAction={closeAllTherapyPopups}
        />
      );
    } else if (!wounds && !showSuccessPopUp) {
      return showErrorPopUp ? <ShowNoWoundPopUp /> : <LoadSpinner />;
    }
  };

  useEffect(() => {
    if (AuthObj?.userProfile && AuthObj?.registeredFaciltyAddress) {
      negotiateSignalR();
      MyPatientObj?.setReloadMyPatient(true);
    }
    // Unmount
    return () => {
      unLoadStopHubConnection();
    };
  }, [
    AuthObj?.registeredFaciltyAddress,
    permissionObj?.mappedRolesPermissionData,
    AuthObj?.userProfile,
  ]);

  useEffect(() => {
    if (alertsRequest && hubStarted) {
      initiateGetAlerts(alertsRequest);
    }
  }, [alertsRequest, hubStarted]);

  useEffect(() => {
    if (updatedAlertData) {
      if (patientList && patientList.length > 0) {
        addAlertsToPatients(patientList, updatedAlertData);
      }
      if (patients && patients.length > 0) {
        addAlertsToPatients(patients, updatedAlertData);
        const latestPatients = [...patients];
        setPatients(latestPatients);
      }
    }
  }, [updatedAlertData]);

  useEffect(() => {
    if (
      (debouncedText.length === 0 && searchedInput !== debouncedText) ||
      debouncedText.length >= 3
    ) {
      loadPatientData(debouncedText);
    }
  }, [debouncedText]);

  const unLoadStopHubConnection = async () => {
    if (MyPatientObj?.hubConnection) {
      MyPatientObj?.hubConnection.stop();
    }
  };

  const setAlertTypeAndPatientData = (
    alertType: IAlertTypes,
    selectedPatientData: any
  ) => {
    setSelectedPatientChangePres(selectedPatientData);
    setAlertType(alertType);
    setPatientActionAlertPopUp(true);
  };

  const renderPatientActionPopUp = () => {
    switch (alertType) {
      case IAlertTypes.MISRX:
        return (
          <MissingRx
            isSendPrescription={true}
            closePopUpAction={() => setPatientActionAlertPopUp(false)}
            patientData={selectedPatientChangePres!}
          />
        );
      default:
        return <div style={{ width: "200px", height: "56px" }}></div>;
    }
  };

  const doNotDeleteHandler = () => {
    setDeleteOrderPopUpFlag(false);
  };

  const deleteHandler = async () => {
    try {
      setDeleteOrderLoadSpinner(true);
      const response = await cancelOrSubmitVacOrder(vacOrderID, 0);
      setDeleteOrderPopUpFlag(false);
      if (response.succeeded) {
        removePateint(vacOrderID);
        setTimeout(() => {
          setDeleteOrderLoadSpinner(false);
        }, 500);
      } else {
        setDeleteOrderLoadSpinner(false);
        setShowErrorPopUp(true);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <MyPatientsSubDiv>
        <StyledCardContent>
          <HeaderDiv>
            <Header>My Patients</Header>
          </HeaderDiv>
          {permissionObj &&
          permissionObj?.mappedRolesPermissionData &&
          permissionObj?.mappedRolesPermissionData.IsBaseRole ? (
            <FacilityBaseUserRole />
          ) : (
            <>
              <div className="addpatientBox">
                <AddPatientButton
                  isBtnVisible={isMobileScreen}
                  onClickHandler={handleOpen}
                />
                <SearchPatientDiv>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon style={{ color: "#76767A" }} />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search Name or RO #"
                      inputProps={{ "aria-label": "search" }}
                      onChange={handlePatientSearch}
                      value={searchInput}
                      autoFocus
                    />
                  </Search>
                  <AddPatientButton
                    isBtnVisible={!isMobileScreen}
                    onClickHandler={handleOpen}
                    isBtnDisabled={
                      permissionObj?.mappedRolesPermissionData?.IsSupportRole!
                    }
                    testId="add-patient-button-test"
                  />
                  <AddPatientContext.Provider
                    value={{
                      closePopup: () => setOpen(false),
                      patientSearchValidator: new Validator(),
                      addPatientToList: addNewPatient,
                    }}
                  >
                    <Popup
                      dialogParentClass="add-patient-popup"
                      openFlag={open}
                      closeHandler={() => setOpen(false)}
                    >
                      <AddPatientContainer />
                    </Popup>
                  </AddPatientContext.Provider>
                </SearchPatientDiv>
              </div>
              {searchingPatient ? (
                LoadSpinner()
              ) : (
                <>
                  {patients && !MyPatientObj?.reloadMyPatient ? (
                    patients.length !== 0 ? (
                      <PatientProfileCard>
                        {patients.map((rec, index) => {
                          return (
                            <PatientProfileRow key={index}>
                              <PatientProfileColumn>
                                <PatientProfile>
                                  <PatientData {...rec} />
                                  <Grid
                                    item
                                    className="alert-container"
                                    classes={{ root: "alert-container-root" }}
                                  >
                                    <Grid
                                      container
                                      className="alert-box-container"
                                      classes={{
                                        root: "alert-box-container-root",
                                      }}
                                      key={index}
                                    >
                                      {rec.alerts.map((alert) => (
                                        <PatientAlerts
                                          alertData={alert}
                                          key={alert.alertID.toString()}
                                          patient={rec}
                                          patientAnalytics={myPatientAnalytics}
                                        />
                                      ))}
                                    </Grid>
                                  </Grid>
                                  {rec?.menuActions!.length > 0 && (
                                    <PatientProfileDotMenu>
                                      <DotMenuIconButton
                                        id={rec.roNumber.toString()}
                                        onClick={handleClick}
                                        name={
                                          rec?.orderID != null
                                            ? rec?.orderID!.toString()
                                            : rec.roNumber.toString()
                                        }
                                        className="PatientPopper"
                                      >
                                        {" "}
                                        <PatientAction />{" "}
                                      </DotMenuIconButton>
                                      <Popper
                                        open={openEL}
                                        anchorEl={anchorEl}
                                        placement={"bottom-end"}
                                        disablePortal={true}
                                        style={{ zIndex: 2 }}
                                        modifiers={[
                                          {
                                            name: "flip",
                                            enabled: true,
                                            options: {
                                              altBoundary: true,
                                              rootBoundary: "window",
                                              flipVariations: true,
                                              allowedAutoPlacements: [
                                                "top-end",
                                                "bottom-end",
                                              ],
                                              padding: 0,
                                            },
                                          },
                                          {
                                            name: "preventOverflow",
                                            enabled: true,
                                            options: {
                                              altAxis: true,
                                              altBoundary: true,
                                              rootBoundary: "window",
                                              tether: true,
                                              padding: 0,
                                            },
                                          },
                                        ]}
                                      >
                                        <PatientActions
                                          setSelectedValue={handlePopperClose}
                                          clickedOutside={
                                            handlePopperClosewhenClickOutside
                                          }
                                          menuData={
                                            menuTappedPatient?.menuActions
                                          }
                                        />
                                      </Popper>
                                    </PatientProfileDotMenu>
                                  )}
                                </PatientProfile>
                              </PatientProfileColumn>
                            </PatientProfileRow>
                          );
                        })}
                      </PatientProfileCard>
                    ) : (
                      <PatientProfileMessage>
                        {NO_PATIENT_FOUND}
                      </PatientProfileMessage>
                    )
                  ) : error ? (
                    <PatientProfileMessage>
                      <div style={{ color: "#76767A" }}>
                        Oops something went wrong !
                      </div>
                    </PatientProfileMessage>
                  ) : null}
                </>
              )}
            </>
          )}
        </StyledCardContent>
      </MyPatientsSubDiv>
      <RightMenuDiv>
        <div
          className={
            !permissionObj?.mappedRolesPermissionData.IsShowSupplyOrderButton &&
            !permissionObj?.mappedRolesPermissionData.IsShowVacOrderButton
              ? "myPatientbuttonDivEmpty"
              : "myPatientbuttonDiv"
          }
        >
          {permissionObj?.mappedRolesPermissionData.IsShowSupplyOrderButton && (
            <BorderButtonWithIcon
              variant="outlined"
              data-testid="orderTherapy"
              startIcon={<SupplyIcon />}
              onClick={redirectToSupplyOrder}
              id="Order Supplies"
            >
              Order Supplies
            </BorderButtonWithIcon>
          )}
          {permissionObj?.mappedRolesPermissionData.IsShowVacOrderButton && (
            <BorderButtonWithIcon
              variant="outlined"
              data-testid="newOrdervac"
              startIcon={<VACTherapyIcon />}
              onClick={redirectToVacOrder}
            >
              <span>
                Order V.A.C.<sup style={{ marginRight: "5px" }}>®</sup> Therapy
              </span>
            </BorderButtonWithIcon>
          )}
        </div>
        <NeedHelpDiv>
          <NeedHelp
            isLoggedIn={isLoggedIn}
            userRole={userRole}
            isFromHelpSupport={false}
          />
        </NeedHelpDiv>
      </RightMenuDiv>
      <Popup
        closeHandler={() => {
          setEmptyPopup((x) => !x);
        }}
        openFlag={emptyPopup}
      >
        <div className="emptyPopup"></div>
      </Popup>
      <Popup
        closeHandler={() => {
          setDeleteOrderPopUpFlag(false);
        }}
        openFlag={deleteOrderPopUpFlag}
        hideCloseButton={deleteOrderLoadSpinner ? true : false}
      >
        {deleteOrderLoadSpinner ? (
          <div className="deleteorder-spinner">
            <LoadingSpinner />
          </div>
        ) : (
          <DeletePopup
            doNotDeleteHandler={doNotDeleteHandler}
            deleteHandler={deleteHandler}
          />
        )}
      </Popup>
      <Popup
        openFlag={patientActionAlertPopUp}
        closeHandler={() => setPatientActionAlertPopUp(false)}
      >
        {renderPatientActionPopUp()}
      </Popup>
      <Popup
        closeHandler={() => {
          setOpenPopUp((x) => !x);
          setTimeout(() => {
            setWounds(undefined);
            setShowErrorPopUp(false);
            setShowWarningPoppUp(false);
            setShowSuccessPopUp(false);
          }, 500);
        }}
        openFlag={openPopUp}
      >
        {LoadTherapy()}
      </Popup>
      <PatientOrdersDetails />
      <SnackBar
        toastStyle="removePatientToast"
        openFlag={removePatientOpen}
        msg={removePatientMsg}
        handleCloseAlert={handleCloseRemovePatient}
        autoClose={removePatientOpen}
      ></SnackBar>
      <ShareOrderInfo
        isMyPatientFlow={isMyPatientFlow}
        vacOrderID={vacOrderID!}
      />
      {cancelSharedOrder?.stopSharingOrder && (
        <StopSharingOrder
          cancelSharedOrderDetail={cancelSharedOrder}
          setCancelSharedOrderDetail={setCancelSharedOrder}
        />
      )}
      <Popup
        closeHandler={() => {
          setIsPatientCancelOrder(false);
        }}
        openFlag={isPatientCancelOrder}
      >
        <CancelPatientOrder
          patient={menuSelectedPatient!}
          isPatientCancelOrder={() => setIsPatientCancelOrder(false)}
        />
      </Popup>
    </>
  );
};
