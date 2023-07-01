import { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../../context/SupplyOrderContext";
import { SupplyOrderPageSection } from "../../supplyOrder/SupplyOrderPageSection.enum";
import "./newOrderOptions.css";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../../context/RolesPermissionContext";
import {
  IAnalyticsData,
  sendAnalyticsData,
} from "../../../util/utilityFunctions";

export const NewOrderOptions = () => {
  const SupplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const history = useHistory();
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );

  const vacOrderAnalytics = (eventName: string) => {
    let analyticsData: IAnalyticsData = {
      page_type: "react",
      view_name: "NewOrderComponent",
      event_type: "click",
      event_name: eventName,
      tealium_event: "New_Order",
      mmmex_userrecordid: AuthObj?.userProfile?.userID!,
      mmmex_facilityid: AuthObj?.registeredFaciltyAddress?.siteUseId!,
      mmmex_roleid: permissionObj?.mappedRolesPermissionData?.roleName!,
      mmmex_pagename: "New Order",
    };
    sendAnalyticsData(analyticsData);
  };
  const handleRedirectNewOrder = () => {
    vacOrderAnalytics("New_Order");
    NewOrderObj?.resetNewOrderForm();
    history.push("/orders/newOrder");
  };
  const handleRedirectSupplyOrder = () => {
    vacOrderAnalytics("Supply_Order");
    SupplyOrderObj?.resetSupplyOrder();
    SupplyOrderObj?.setSupplyOrderPage(
      SupplyOrderPageSection.SUPPLYORDER_PATIENT_LIST
    );
    history.push("/orders/supplyOrderList");
  };

  return (
    <>
      <div className="optionContainer">
        <div className="optionTitle">New Order</div>
        <div className="containerFlex">
          <div className="optionCardBorder" onClick={handleRedirectNewOrder}>
            <div className="optionCardTitle" data-testid="homeorder">
              Home Order
            </div>
            <div className="optionCardText">
              Outpatient order to be used at home by a patient
            </div>
          </div>
          <div className="optionCardBorder" onClick={handleRedirectSupplyOrder}>
            <div className="optionCardTitle" data-testid="supplyorder">
              Order Supplies
            </div>
            <div className="optionCardText">Order supplies for a patient</div>
          </div>
        </div>
      </div>
    </>
  );
};
