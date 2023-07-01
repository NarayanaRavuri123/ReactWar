import {
  Grid,
  ListItem,
  Step,
  StepConnector,
  Stepper,
  Typography,
  stepConnectorClasses,
  styled,
} from "@mui/material";
import { ReactComponent as DownloadIcon } from "../../../../assets/download.svg";
import { ReactComponent as StepperIcon } from "../../../../assets/stepperIcon.svg";
import { ReactComponent as StepperOval } from "../../../../assets/stepperOval.svg";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { ISupplyOrderTracking } from "../orderOverview/orderOverview.interface";
import "./supplyOrderDetailsTracking.css";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";
import { Navigator } from "../../../helpAndSupport/Navigator/navigator.component";
import OrderDetailAlertBanner from "../orderDetailsAlertBanner/orderDetailsAlertBanner.component";
import { useContext, useEffect, useState } from "react";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../../../context/OrderDetailsContext";

interface supplyOrderDetails {
  date: any;
  status: string;
  current: boolean;
}

const SupplyOrderDetailsTracking = ({
  patientData,
  supplyOrderTrackingData,
  selectedSupplyOrderData,
  therapyStartDate,
  alertsForRO,
}: ISupplyOrderTracking) => {
  const orderOverviewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  const [supplyOrders, setSupplyOrders] = useState<supplyOrderDetails[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const supplyOrders = [
      {
        date:
          supplyOrderTrackingData?.orderedDate === null
            ? ""
            : supplyOrderTrackingData?.orderedDate,
        status: "Order Received",
        current: supplyOrderTrackingData?.orderedFlag === "Y" ? true : false,
      },
      {
        date:
          supplyOrderTrackingData?.shippedDate === null
            ? ""
            : supplyOrderTrackingData?.shippedDate,
        status: "Shipped",
        current: supplyOrderTrackingData?.shippedFlag === "Y" ? true : false,
      },
      {
        date:
          supplyOrderTrackingData?.deliveredDate !== null
            ? supplyOrderTrackingData?.deliveredDate
            : "",
        status: "Delivered",
        current: supplyOrderTrackingData?.deliveredFlag === "Y" ? true : false,
      },
    ];
    if (supplyOrders) {
      for (let i = 1; i < supplyOrders.length; i++) {
        if (supplyOrders[i].current === true) {
          for (let j = 0; j < i; j++) {
            supplyOrders[j].current = true;
          }
        }
      }
    }
    setSupplyOrders(supplyOrders);
  }, []);

  const activeStep = supplyOrders?.findIndex((order) => order.current);

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`& .${stepConnectorClasses.line}`]: {
      width: 2,
      minHeight: 14,
      marginLeft: 12.5,
      border: 0,
      backgroundColor: "#76767a",
    },

    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: "#0049BD",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        minHeight: 54,
      },
    },

    [`& .${stepConnectorClasses.vertical}`]: {
      zIndex: 9,
      position: "relative",
      top: "-14px",
      height: "15px",
    },
  }));

  const renderStepperIcon = (status: any) => {
    switch (status) {
      case true:
        return <StepperIcon />;
      case false:
        return <StepperOval />;
      default:
        return "";
    }
  };

  const getStylesByStatus = (status: any) => {
    switch (status) {
      case true:
        return "enteredIconStyles";
      case false:
        return "disabledStyle";
      default:
        return "";
    }
  };
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="supplyOrder-details-component">
        <div className="supplyOrder-detailsDiv">
          <div className="supply-order-details-navigator-main">
            {orderOverviewObj?.isOrderFlow && (
              <div className="supplyOrder-details-navigator">
                <Navigator
                  array={[
                    {
                      route: "/home/orderOverview",
                      onLinkClick: () => {
                        window.scrollTo(0, 0);
                        orderOverviewObj?.setOrderTabTitle("Orders");
                        orderOverviewObj?.setSelectedOrderTab("Orders");
                        orderOverviewObj?.setIsOrderFlow(false);
                        orderOverviewObj?.resetSeletedSupplyOrderData();
                      },
                      pageName: "Orders",
                    },
                  ]}
                  className=".supplyOrder-overview-route-section"
                  title="Supply Orders"
                  isStateDataPresent={true}
                  stateData={patientData}
                />
              </div>
            )}
          </div>
          <div className="alert-banner">
            {alertsForRO?.alerts
              .filter(
                (item) =>
                  item.alertName === "Pending Supply Order" &&
                  item.ropn === selectedSupplyOrderData?.ropn
              )
              .map((alert) => (
                <OrderDetailAlertBanner
                  alertData={alert}
                  key={alert.alertID.toString()}
                  patientData={patientData}
                  alertsForRO={alertsForRO}
                />
              ))}
          </div>
          <div className="supplyOrder-details-div-title">
            <Grid
              container
              display="flex"
              flexDirection="row"
              className="supplyOrder-details-grid-container"
              spacing={2}
            >
              <Grid className="supplyOrder-details-grid-item" item xs={6}>
                <h2 className="supplyOrderDetail" data-testid="detail-header">
                  Supply Order Detail
                </h2>
              </Grid>
              <Grid item xs={6} className="supplyOrder-details-grid-item">
                <div className="supplyOrderDetailsSummaryPdfBtn-div">
                  <ExpressButton
                    clickHandler={() => handlePrint()}
                    parentClass="supplyOrderDetailsSummaryPdfBtn"
                    testId="acc-cancel-test"
                    variant="text"
                    startIcon={<DownloadIcon />}
                  >
                    Save & Print Order Summary
                  </ExpressButton>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className="supplyOrderContainer">
            <div className="supplyOrderColumn" data-testid="detail-container">
              <h4> Order Information</h4>
              <div
                className="supplyOrderDetailsTrackingContent"
                data-testid="detail-status-label"
              >
                <p>Status</p>

                <div className="supplyOrder-status-div">
                  <div
                    className="oval"
                    style={{
                      backgroundColor:
                        selectedSupplyOrderData?.statusColor === "Orange"
                          ? "orange"
                          : selectedSupplyOrderData?.statusColor === "Green"
                          ? "green"
                          : "",
                    }}
                  ></div>
                  <p className="supplyOrderleftsidecolumnvalue">
                    {makeCapitalEachWordInString(
                      selectedSupplyOrderData?.status!
                    )}
                  </p>
                </div>
                <br></br>

                <p>Rental Order Number</p>
                <p className="supplyOrderleftsidecolumnvalue">
                  {patientData?.roNumber}
                </p>
                <br></br>
                <p>Supply Order Number</p>
                <p
                  className="supplyOrderleftsidecolumnvalue"
                  data-testid="order-Details-Column-Value"
                >
                  {selectedSupplyOrderData?.ropn
                    ? selectedSupplyOrderData?.ropn
                    : "--"}
                </p>
                <br></br>
                <p>Therapy Start Date</p>
                <p className="supplyOrderleftsidecolumnvalue">
                  {therapyStartDate
                    ? therapyStartDate &&
                      new Date(therapyStartDate).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : "--"}
                </p>
              </div>
            </div>

            <div className="supplyOrderColumn" data-testid="supplyorder-column">
              <div>
                <h4 className="supplyOrdertracking1">Order Tracking</h4>
                <div
                  className="supplyOrderDetailsContent"
                  data-testid="order-Details-content"
                >
                  {supplyOrderTrackingData === undefined || null ? (
                    <div
                      className="supplyOrdererror"
                      data-testid="order-Details-error"
                    >
                      No tracking information available
                    </div>
                  ) : (
                    <div
                      className="supplyOrdermilestone"
                      data-testid="supplyorder-milestone"
                    >
                      <Stepper
                        style={{
                          marginTop: "10px",
                          padding: "0px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        nonLinear
                        orientation="vertical"
                        activeStep={activeStep}
                        connector={<ColorlibConnector />}
                      >
                        {supplyOrders?.map((order, index) => (
                          <Step
                            key={index}
                            active={order.current}
                            completed={
                              order.status === "Delivered" ? true : false
                            }
                          >
                            <>
                              <ListItem
                                style={{
                                  fontSize: "1rem",
                                  height: "18px",
                                  zIndex: order.current === true ? 2 : 12,
                                }}
                                className="supplyOrderstepperMain"
                              >
                                <Typography
                                  className={getStylesByStatus(order.current)}
                                  style={{
                                    color:
                                      order.current === false
                                        ? "gray"
                                        : "white",
                                    right: "1px",
                                    position: "relative",
                                  }}
                                >
                                  {renderStepperIcon(order.current)}
                                </Typography>
                                <Typography
                                  className={
                                    order.current === true
                                      ? "activeLabel"
                                      : "notActiveLabel"
                                  }
                                >
                                  <span className="supplyOrderStepperStatus">
                                    {order.status}
                                    {""}
                                    <span
                                      className={
                                        order.status.replace(/\s+/g, "") +
                                        "Date"
                                      }
                                    >
                                      {order.date &&
                                        new Date(order.date).toLocaleDateString(
                                          "en-US",
                                          {
                                            month: "2-digit",
                                            day: "2-digit",
                                            year: "numeric",
                                          }
                                        )}
                                    </span>
                                  </span>

                                  {order.status === "Shipped" && (
                                    <div
                                      className="supplyOrdertrackMain"
                                      data-testid="supplyorder-ordertrack"
                                    >
                                      <div className="supplyOrdertrackMain">
                                        <p
                                          className={
                                            supplyOrderTrackingData?.trackingLink ===
                                            ""
                                              ? "trackingLinkp"
                                              : "trackingLinkpActive"
                                          }
                                        >
                                          Track Package:
                                        </p>
                                        <a
                                          className="supplyOrdertrackingLink"
                                          href={
                                            supplyOrderTrackingData?.trackingLink
                                          }
                                          target="_blank"
                                        >
                                          {
                                            supplyOrderTrackingData?.trackingNumber
                                          }
                                        </a>
                                      </div>
                                    </div>
                                  )}
                                </Typography>
                              </ListItem>
                            </>
                          </Step>
                        ))}
                      </Stepper>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplyOrderDetailsTracking;
