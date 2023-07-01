import { format } from "react-string-format";
import Moment from "moment";
import { Circle } from "@mui/icons-material";
import {
  CreatedDate,
  PatientDataBox,
  PatientDataRowCol,
  PatientDataTitle,
  PatientDataValue,
  PatientName,
} from "./myPatients.style";
import { IPatient } from "./patient.interface";
import "./myPatients.css";
import {
  MyPatientContext,
  MyPatientContextType,
} from "../../context/MyPatientContext";
import { useContext } from "react";
import { MyPatientModalSection } from "./patientOrdersDetails/patientOrdersDetails.component";
import { useHistory } from "react-router-dom";
import { GetPatientLockedData } from "./savedPatientLockDetails";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../context/NewOrderContext";
import { acceptedOrderOverviewStatus } from "./patientAndTherapyDetails/orderOverview/orderOverviewContainer.enum";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../context/OrderDetailsContext";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../context/RolesPermissionContext";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { IAnalyticsData, sendAnalyticsData } from "../../util/utilityFunctions";

export const PatientData = ({
  lastName,
  firstName,
  dob,
  roNumber,
  facilityName,
  orderCreationDate,
  status,
  statusColor,
  orderID,
  menuActions,
  alerts,
  color,
  productName,
  placementDate,
  productSerialNumber,
  sharedStatus,
  woundOrderID,
}: IPatient) => {
  const MyPatientObj = useContext<MyPatientContextType | null>(
    MyPatientContext
  );
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const history = useHistory();
  const orderOverViewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
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

  const handleOnPatientClick = () => {
    myPatientAnalytics("Patient_Click");
    var myPatientObj = {
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      roNumber: roNumber,
      orderCreationDate: orderCreationDate,
      status: status,
      statusColor: statusColor,
      orderID: orderID,
      menuActions: menuActions,
      alerts: alerts,
      color: color,
      productName: productName,
      placementDate: placementDate,
      productSerialNumber: productSerialNumber,
      sharedStatus: sharedStatus,
      woundOrderID: woundOrderID,
      facilityName: facilityName,
    };
    var acceptedStatus: Array<string> = [];
    acceptedStatus = Object.values(acceptedOrderOverviewStatus).map(
      (element: any) => element.toUpperCase()
    );

    if (acceptedStatus.includes(status!.toUpperCase())) {
      orderOverViewObj!.resetData();
      orderOverViewObj!.resetSeletedSupplyOrderData();
      orderOverViewObj!.resetWoundData();
      orderOverViewObj?.setSelectedOrderTab("Orders");
      history.push({
        pathname: "/home/orderOverview",
        state: {
          stateData: myPatientObj,
        },
      });
    } else if (status === "Saved") {
      NewOrderObj?.resetNewOrderForm();
      GetPatientLockedData(orderID, true, MyPatientObj, history);
    } else {
      MyPatientObj?.setMyPatientClickModalSection(
        MyPatientModalSection.LOAD_PATIENT
      );
      MyPatientObj?.setOpenPatientOrderAndDetail(true);
    }
    MyPatientObj?.setPatientOrderStatus(status);
    MyPatientObj?.setorderId(orderID);
  };
  return (
    <PatientDataBox
      onClick={handleOnPatientClick}
      data-testid="patientStatusClick"
    >
      <PatientName>{format("{0}, {1}", lastName, firstName)}</PatientName>
      <PatientDataRowCol>
        <PatientDataTitle>DOB:</PatientDataTitle>
        <PatientDataValue>
          {dob ? Moment(dob).format("L") : null}
        </PatientDataValue>
      </PatientDataRowCol>
      <PatientDataRowCol>
        <PatientDataTitle>RO#:</PatientDataTitle>
        <PatientDataValue>{roNumber}</PatientDataValue>
      </PatientDataRowCol>
      <PatientDataRowCol>
        <PatientDataTitle>Facility:</PatientDataTitle>
        <PatientDataValue data-testid={roNumber}>
          {facilityName}
        </PatientDataValue>
      </PatientDataRowCol>
      <PatientDataRowCol>
        <PatientDataTitle>Status:</PatientDataTitle>
        <PatientDataValue>
          {status && <Circle className={`statusIconMain ${statusColor}`} />}
          {status}
        </PatientDataValue>
      </PatientDataRowCol>
      <CreatedDate>
        Created On{" "}
        {orderCreationDate
          ? Moment.utc(orderCreationDate.slice(0, 19))
              .utcOffset("-06:00")
              .format("llll")
          : null}
      </CreatedDate>
    </PatientDataBox>
  );
};
