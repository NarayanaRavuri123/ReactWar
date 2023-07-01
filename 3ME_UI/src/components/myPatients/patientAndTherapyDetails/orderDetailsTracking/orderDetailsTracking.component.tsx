import {
  Grid,
  ListItem,
  Step,
  StepConnector,
  stepConnectorClasses,
  Stepper,
  styled,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ReactComponent as DownloadIcon } from "../../../../assets/download.svg";
import { ReactComponent as StepperIcon } from "../../../../assets/stepperIcon.svg";
import { ReactComponent as StepperOval } from "../../../../assets/stepperOval.svg";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../../../context/OrderDetailsContext";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import SnackBar from "../../../../core/snackBar/snackBar.component";
import OrderDetailAlertBanner from "../orderDetailsAlertBanner/orderDetailsAlertBanner.component";
import { IOrderOverviewProps } from "../orderOverview/orderOverview.interface";
import { alertTypes } from "../orderOverview/orderOverviewContainer.enum";
import { Navigator } from "../../../helpAndSupport/Navigator/navigator.component";
import "./orderDetailsTracking.css";
import { useHistory } from "react-router-dom";

interface orderDetails {
  date: any;
  status: string;
  current: boolean;
}

export const OrderDetailsTracking = ({
  patientData,
  orderDetailsTrackingData,
  pdfUrl,
  isOrderFlow,
  alertsForRO,
}: IOrderOverviewProps) => {
  const orderOverviewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  const [orderDetailsToastFlag, setorderDetailsToastFlag] = useState(false);
  let acceptedAlerts: Array<string> = [];
  acceptedAlerts = Object.values(alertTypes).map((element: any) => element);
  const error = orderOverviewObj?.error;
  const history: any = useHistory();
  const [orders, setOrders] = useState<orderDetails[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const orders = [
      {
        date: orderDetailsTrackingData?.orderDate,
        status: "Order Received",
        current: orderDetailsTrackingData?.receivedFlag === "Y" ? true : false,
      },
      {
        date: orderDetailsTrackingData?.benefitsComplDate,
        status: "Benefits Verified",
        current: orderDetailsTrackingData?.validatedFlag === "Y" ? true : false,
      },
      {
        date: orderDetailsTrackingData?.releaseDate,
        status: "Pending Release",
        current:
          orderDetailsTrackingData?.releaseToShipFlag === "Y" ? true : false,
      },
      {
        date: orderDetailsTrackingData?.outDeliveryDate,
        status: "Out for Delivery",
        current:
          orderDetailsTrackingData?.outForDeliveryFlag === "Y" ? true : false,
      },
      {
        date: orderDetailsTrackingData?.deliveredDate,
        status: "Delivered",
        current: orderDetailsTrackingData?.deliveredFlag === "Y" ? true : false,
      },
      {
        date: orderDetailsTrackingData?.therapyDate,
        status: "Therapy",
        current: orderDetailsTrackingData?.therapyFlag === "Y" ? true : false,
      },
    ];

    if (orders) {
      for (let i = 1; i < orders.length; i++) {
        if (orders[i].current === true) {
          for (let j = 0; j < i; j++) {
            orders[j].current = true;
          }
        }
      }
    }
    setOrders(orders);
  }, []);

  const activeStep = orders?.findIndex((order) => order.current);

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

  const handleClickPdfDownload = async () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    } else {
      setorderDetailsToastFlag(true);
      setTimeout(() => {
        setorderDetailsToastFlag(false);
      }, 5000);
    }
  };

  return (
    <>
      <div className="order-details-component">
        <SnackBar
          toastStyle="orderDetailsTrackingToast"
          autoClose={false}
          handleCloseAlert={() => {
            setorderDetailsToastFlag(false);
          }}
          msg="File does not exist.Please contact 3M for assistance with this order"
          phoneNumber="1-800-275-4524."
          openFlag={orderDetailsToastFlag}
        />
        <div className="order-detailsDiv">
          <div className="order-details-navigator-main">
            {isOrderFlow && (
              <div className="order-details-navigator">
                <Navigator
                  array={[
                    {
                      route: "/home/orderOverview",
                      onLinkClick: () => {
                        orderOverviewObj?.setOrderTabTitle("Orders");
                        orderOverviewObj?.setIsOrderFlow(false);
                        orderOverviewObj?.resetSeletedSupplyOrderData();
                      },
                      pageName: "Orders",
                    },
                  ]}
                  className="order-overview-route-section"
                  title="Order Detail"
                  isStateDataPresent={true}
                  stateData={patientData}
                />
              </div>
            )}
          </div>
          <div className="alert-banner">
            {alertsForRO?.alerts
              .filter((item) => acceptedAlerts.includes(item.alertName))
              .map((alert) => (
                <OrderDetailAlertBanner
                  alertData={alert}
                  key={alert.alertID.toString()}
                  patientData={patientData}
                  alertsForRO={alertsForRO}
                />
              ))}
          </div>
          <div className="order-details-div-title">
            <Grid
              container
              display="flex"
              flexDirection="row"
              className="order-details-grid-container"
              spacing={2}
            >
              <Grid className="order-details-grid-item" item xs={6}>
                <h2 className="orderDetail" data-testid="detail-header">
                  Order Detail
                </h2>
              </Grid>
              <Grid item xs={6} className="order-details-grid-item">
                <div className="orderDetailsSummaryPdfBtn-div">
                  <ExpressButton
                    clickHandler={() => {
                      handleClickPdfDownload();
                    }}
                    parentClass="orderDetailsSummaryPdfBtn"
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

          <div className="container">
            <div className="column" data-testid="detail-container">
              <h4 className="vac-header">
                {orderDetailsTrackingData &&
                orderDetailsTrackingData.rentalProduct !== ""
                  ? orderDetailsTrackingData.rentalProduct
                  : "Product Not Available"}
              </h4>

              <div
                className="orderDetailsTrackingDataContent"
                data-testid="detail-status-label"
              >
                <p>Status</p>

                <div className="order-status-div">
                  <div
                    className="oval"
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
                  <p className="leftsidecolumnvalue">{patientData?.status}</p>
                </div>
                <br></br>

                <p>Rental Order Number</p>
                <p className="leftsidecolumnvalue">{patientData?.roNumber}</p>
                <br></br>
                <p>Delivery Location Type</p>
                <p
                  className="leftsidecolumnvalue"
                  data-testid="order-Details-Column-Value"
                >
                  {orderDetailsTrackingData?.deliverySiteType
                    ? orderDetailsTrackingData.deliverySiteType
                    : "Not Available"}
                </p>
                <br></br>
                <p>Therapy Start Date</p>
                <p className="leftsidecolumnvalue">
                  {orderDetailsTrackingData?.therapyDate
                    ? orderDetailsTrackingData.therapyDate &&
                      new Date(
                        orderDetailsTrackingData.therapyDate
                      ).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })
                    : "Not Available"}
                </p>
              </div>
            </div>
            {(orderDetailsTrackingData || error) && (
              <div className="column">
                <div>
                  <h4 className="ordertracking1">Order Tracking</h4>
                  <div
                    className="orderDetailsContent"
                    data-testid="order-Details-content"
                  >
                    {error ? (
                      <div className="error" data-testid="order-Details-error">
                        No tracking information available
                      </div>
                    ) : (
                      <div
                        className="milestone"
                        data-testid="milestone-stepper"
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
                          {orders?.map((order, index) => (
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
                                  className="stepperMain"
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
                                    <span className="StepperStatus">
                                      {order.status}
                                      <span
                                        className={
                                          order.status.replace(/\s+/g, "") +
                                          "Date"
                                        }
                                      >
                                        {order.date &&
                                          new Date(
                                            order.date
                                          ).toLocaleDateString("en-US", {
                                            month: "2-digit",
                                            day: "2-digit",
                                            year: "numeric",
                                          })}
                                      </span>
                                    </span>

                                    {order.status === "Out for Delivery" && (
                                      <div className="trackMain">
                                        <p
                                          className={
                                            orderDetailsTrackingData?.trackingLink ===
                                            ""
                                              ? "trackingLinkp"
                                              : "trackingLinkpActive"
                                          }
                                        >
                                          Track Package:
                                        </p>
                                        <a
                                          className="trackingLink"
                                          href={
                                            orderDetailsTrackingData?.trackingLink
                                          }
                                          target="_blank"
                                        >
                                          {
                                            orderDetailsTrackingData?.trackingNumber
                                          }
                                        </a>
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};
