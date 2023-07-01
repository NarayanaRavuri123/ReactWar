import { useContext } from "react";
import { ReactComponent as IconOrderTab } from "../../../../assets/Icons_order_tab.svg";
import { ReactComponent as Navigate } from "../../../../assets/Vector_navigate.svg";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../../../context/OrderDetailsContext";
import OrderDetailAlertBanner from "../orderDetailsAlertBanner/orderDetailsAlertBanner.component";
import { IOrderCurrentTherapy } from "../orderOverview/orderOverview.interface";
import {
  OrderOverViewTabsTitle,
  alertTypes,
} from "../orderOverview/orderOverviewContainer.enum";
import { useHistory } from "react-router-dom";
import "./orderCurrentTherapy.css";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import OrderSupplyDetail from "../orderSupplyDetail/orderSupplyDetails.component";
import { NavigatePatientAction } from "../orderOverview/navigatePatientAction";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../../../context/SupplyOrderContext";
import { ISupplyOrdersInfo } from "../orderSupplyDetail/orderSupplyDetails.interface";
import {
  PickUpRequestContext,
  PickUpRequestContextType,
} from "../../../../context/PickUpRequestContext";
import {
  DischargeRequestContext,
  DischargeRequestContextType,
} from "../../../../context/DischargeRequestContext";
import "./orderCurrentTherapy.css";

export const OrderCurrentTherapy = ({
  patientData,
  orderDetailsTrackingData,
  supplyOrderSuppliesDetail,
  alertsForRO,
}: IOrderCurrentTherapy) => {
  const orderOverViewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );

  let acceptedAlerts: Array<string> = [];
  acceptedAlerts = Object.values(alertTypes).map((element: any) => element);
  const error = orderOverViewObj?.error;
  const history: any = useHistory();

  const handleNavigateToOrderDetail = () => {
    orderOverViewObj?.setIsOrderFlow(true);
    orderOverViewObj?.setOrderTabTitle(
      OrderOverViewTabsTitle.ORDER_DETAIL_TAB_TITLE
    );
  };
  const SupplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const pickUpRequestObj = useContext<PickUpRequestContextType | null>(
    PickUpRequestContext
  );
  const dischargeRequestObj = useContext<DischargeRequestContextType | null>(
    DischargeRequestContext
  );

  const navigateToSupplyOrder = () => {
    NavigatePatientAction(
      patientData!,
      "Order Supplies",
      () => {},
      () => {},
      () => {},
      SupplyOrderObj,
      null,
      null,
      history,
      null,
      () => {},
      pickUpRequestObj,
      dischargeRequestObj
    );
  };
  return (
    <>
      {(orderDetailsTrackingData || error) && (
        <div className="current-therapy-form">
          <div className="current-therapy-info">
            <div className="current-therapy-info-header">
              <h2
                className="current-therapy-info-title"
                data-testId="sec-header"
              >
                Current Therapy
              </h2>
            </div>
          </div>
          <div className="order-current-therapy-detail-component">
            <div className="order-current-therapy-detail-container">
              <div className="current-therapy-icon-div">
                <IconOrderTab className="icon" />
              </div>

              <div className="current-therapy-details">
                <h4 className="order-current-therapy-label">
                  {orderDetailsTrackingData &&
                  orderDetailsTrackingData.rentalProduct
                    ? orderDetailsTrackingData.rentalProduct
                    : "Product Not Available"}
                </h4>
                <div className="order-current-therapy-status-section">
                  <span
                    className="order-current-therapy-status-label"
                    data-testId="status-testid"
                  >
                    Status :
                  </span>
                  <div
                    className="oval-current-therapy"
                    style={{
                      backgroundColor:
                        patientData?.statusColor === "blueCircle"
                          ? "blue"
                          : patientData?.statusColor === "orangeCircle"
                          ? "orange"
                          : patientData?.statusColor === "yellowCircle"
                          ? "yellow"
                          : patientData?.statusColor === "redCircle"
                          ? "red"
                          : patientData?.statusColor === "greenCircle"
                          ? "green"
                          : patientData?.statusColor === "greyCircle"
                          ? "grey"
                          : patientData?.statusColor === "purpleCircle"
                          ? "purple"
                          : "",
                    }}
                  ></div>
                  <p className="order-current-therapy-status-label-value">
                    {patientData?.status}
                  </p>
                </div>
                <p
                  className="order-current-therapy-detail-label"
                  data-testId="current-therapy-content"
                >
                  RO# : {patientData?.roNumber}
                </p>
                <p
                  className="order-current-therapy-detail-label"
                  data-testId="current-therapy-loaction"
                >
                  Location :{" "}
                  {orderDetailsTrackingData?.deliverySiteType
                    ? orderDetailsTrackingData.deliverySiteType
                    : "--"}
                </p>
                <p className="order-current-therapy-detail-label">
                  Therapy Start Date :{" "}
                  {orderDetailsTrackingData?.therapyDate
                    ? orderDetailsTrackingData.therapyDate &&
                      new Date(
                        orderDetailsTrackingData.therapyDate
                      ).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : "--"}
                </p>
              </div>
              <div className="order-current-therapy-navigate-icon-div">
                <Navigate
                  className="navigate-icon"
                  onClick={() => {
                    handleNavigateToOrderDetail();
                  }}
                />
              </div>
            </div>

            {alertsForRO?.alerts
              .filter((item) => acceptedAlerts.includes(item.alertName))
              .map((alert) => (
                <div className="alert-banner">
                  <OrderDetailAlertBanner
                    alertData={alert}
                    key={alert.alertID.toString()}
                    patientData={patientData}
                    alertsForRO={alertsForRO}
                  />
                </div>
              ))}
          </div>
          <div className="space-bottom"></div>
          <div className="order-supplies-info">
            <div className="order-supplies-info-header">
              <h2
                className="order-supplies-info-title"
                data-testId="order-supplies-info-title"
              >
                Supply Orders
              </h2>
            </div>
            <div className="order-supplies-info-button">
              <ExpressButton
                clickHandler={navigateToSupplyOrder}
                parentClass="order-supplies-button"
                variant="outlined"
                testId="order-supplies-button"
              >
                Order Supplies
              </ExpressButton>
            </div>
          </div>
          <div className="SupplyOrderdivMain">
            {supplyOrderSuppliesDetail &&
              supplyOrderSuppliesDetail?.supplyOrders &&
              supplyOrderSuppliesDetail?.supplyOrders.map(
                (rec: ISupplyOrdersInfo, index: number) => {
                  return (
                    <div className="order-supplies-detail-container">
                      <OrderSupplyDetail
                        supplyOrderData={rec}
                        therapyStartDate={
                          supplyOrderSuppliesDetail.therapyStartDate!
                        }
                      />
                    </div>
                  );
                }
              )}
            {supplyOrderSuppliesDetail?.supplyOrders.length === 0 &&
              supplyOrderSuppliesDetail && (
                <div className="order-supplies-not-present">
                  <h4 className="order-supplies-not-present-text">
                    Dressing and Supply orders detail not available
                  </h4>
                </div>
              )}
          </div>
          {/* If required will add this */}
          <div className="space-bottom"></div>
        </div>
      )}
    </>
  );
};
