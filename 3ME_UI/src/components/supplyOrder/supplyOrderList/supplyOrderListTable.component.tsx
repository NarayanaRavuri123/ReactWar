import React, { useContext, useState } from "react";
import Table from "../../../core/customSortingTable/table.component";
import "./supplyOrderList.css";
import {
  IAnalyticsData,
  makeCapitalEachWordInString,
  sendAnalyticsData,
} from "../../../util/utilityFunctions";
import { LoadingSpinner } from "../../../core/loader/LoadingSpinner";
import { NO_PATIENT_FOUND } from "../../../util/staticText";
import { IPatient } from "../../myPatients/patient.interface";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../../context/SupplyOrderContext";
import { SupplyOrderPageSection } from "../SupplyOrderPageSection.enum";
import { Popup } from "../../../core/popup/popup.component";
import Moment from "moment";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../../context/RolesPermissionContext";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../../context/OrderDetailsContext";
import { useHistory } from "react-router-dom";
interface Props {
  spinnerPatientList: boolean | null | undefined;
  error: boolean;
  handleSorting: any;
  sortedData: [];
  columns: any;
}

const SupplyOrderListTable = ({
  spinnerPatientList,
  handleSorting,
  error,
  sortedData,
  columns,
}: Props) => {
  const history = useHistory();
  const SupplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const orderOverViewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  const [emptyPopup, setEmptyPopup] = useState(false);
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );

  const handleSelectLink = (patient: IPatient) => {
    SupplyOrderObj?.resetSupplyOrder();
    SupplyOrderObj?.setSelectedPatient(patient);
    SupplyOrderObj?.setSupplyOrderPage(SupplyOrderPageSection.SUPPLYORDER_INFO);
    let data: IAnalyticsData = {
      page_type: "react",
      view_name: "supplyOrderComponent",
      event_type: "click",
      event_name: "selectPatient_SupplyOrder",
      tealium_event: "Order_Supplies_Button",
      mmmex_userrecordid: AuthObj?.userProfile?.userID!,
      mmmex_facilityid: AuthObj?.registeredFaciltyAddress?.siteUseId!,
      mmmex_pagename: "Supply Order Select Patient",
      mmmex_roleid: permissionObj?.mappedRolesPermissionData?.roleName!,
    };
    sendAnalyticsData(data);
  };

  const handleROLink = (data: IPatient) => {
    orderOverViewObj?.resetSeletedSupplyOrderData();
    orderOverViewObj?.resetWoundData();
    orderOverViewObj?.setSelectedOrderTab("Orders");
    if (data) {
      data.alerts = [];
      history.push({
        pathname: "/home/orderOverview",
        state: {
          stateData: data,
        },
      });
    }

    let analyticsData: IAnalyticsData = {
      page_type: "react",
      view_name: "supplyOrderComponent",
      event_type: "click",
      event_name: "selectRON_SupplyOrder",
      tealium_event: "Order_Supplies_Button",
      mmmex_userrecordid: AuthObj?.userProfile?.userID!,
      mmmex_facilityid: AuthObj?.registeredFaciltyAddress?.siteUseId!,
      mmmex_pagename: "Supply Order Select Patient",
      mmmex_roleid: "string",
    };
    sendAnalyticsData(analyticsData);
  };

  const LoadSpinner = () => {
    return (
      <div className="soPatientListSpinner">
        <LoadingSpinner />
      </div>
    );
  };

  return (
    <div className="table_container">
      <Table
        tableClassName="table"
        tableColumns={columns}
        handleSorting={handleSorting}
      >
        {!spinnerPatientList && !error && sortedData.length > 0 ? (
          <tbody>
            {sortedData.map((data: any) => {
              return (
                <tr key={data.id}>
                  <td
                    onClick={() => handleSelectLink(data)}
                    className="select-patient-link"
                  >
                    Select
                  </td>
                  <td className="table-static-data">
                    {makeCapitalEachWordInString(
                      `${data.lastName} ${data.firstName}`
                    )}
                  </td>
                  <td className="table-static-data">
                    {data.dob ? Moment(data.dob).format("L") : null}
                  </td>
                  <td
                    onClick={() => handleROLink(data)}
                    className="select-ro-link"
                  >
                    {data.roNumber}
                  </td>
                </tr>
              );
            })}
          </tbody>
        ) : null}
      </Table>
      {spinnerPatientList ? LoadSpinner() : null}
      {error ? (
        <div className="patient-Error-msg">Oops something went wrong !</div>
      ) : null}
      {!error && sortedData.length === 0 && !spinnerPatientList ? (
        <div className="patient-Error-msg">{NO_PATIENT_FOUND}</div>
      ) : null}
      <Popup
        closeHandler={() => {
          setEmptyPopup((x) => !x);
        }}
        openFlag={emptyPopup}
      >
        {" "}
        <div className="emptyPopup"></div>
      </Popup>
    </div>
  );
};

export default SupplyOrderListTable;
