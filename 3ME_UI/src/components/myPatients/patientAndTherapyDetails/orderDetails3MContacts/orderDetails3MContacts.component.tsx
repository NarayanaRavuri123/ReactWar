import { Grid } from "@mui/material";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";
import "./orderDetail3MContacts.css";
import { IOrderDetails3MContacts } from "./orderDetails3MContats.interface";
import { useEffect, useState } from "react";

export const OrderDetails3MContacts = ({
  orderDetailsTrackingData,
  error,
}: IOrderDetails3MContacts) => {
  const [isTabletScreen, setIsTabletScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsTabletScreen(window.innerWidth >= 320 && window.innerWidth <= 420);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {(orderDetailsTrackingData || error) && (
        <div className="contact-3m-order">
          <div className="contact-3m-title">
            <h2 className="contact-3m-order-title" data-testid="contact-title">
              3M Contacts
            </h2>
          </div>

          <div className="all-content-div">
            <div className="content-div">
              <Grid className="grid-container" container spacing={2}>
                <Grid className="grid-item" item xs={isTabletScreen ? 6 : 4.3}>
                  <div className="sub-content-div">
                    <h5
                      className="contact-3m-order-content-title"
                      data-testid="name"
                    >
                      Sales Rep
                    </h5>
                    <h5
                      className="contact-3m-order-content-value"
                      data-testid="name-value-salesrep"
                    >{`${makeCapitalEachWordInString(
                      orderDetailsTrackingData.salesRepName === null ||
                        orderDetailsTrackingData.salesRepName === ""
                        ? "--"
                        : orderDetailsTrackingData.salesRepName
                    )} 
            `}</h5>
                    {orderDetailsTrackingData?.salesRepEmail &&
                    orderDetailsTrackingData?.salesRepEmail !== "" ? (
                      <a
                        className="contact-value-email-phone"
                        href={`mailto:${makeCapitalEachWordInString(
                          orderDetailsTrackingData?.salesRepEmail
                        )}`}
                      >
                        {makeCapitalEachWordInString(
                          orderDetailsTrackingData?.salesRepEmail
                        )}
                      </a>
                    ) : (
                      ""
                    )}
                    {orderDetailsTrackingData?.salesRepPhone &&
                    orderDetailsTrackingData?.salesRepPhone !== "" ? (
                      <a
                        className="contact-value-email-phone"
                        data-testid="phone-value-salesrep"
                        href={`tel:${orderDetailsTrackingData.salesRepPhone.replace(
                          "x",
                          " x"
                        )}`}
                      >
                        {orderDetailsTrackingData.salesRepPhone.replace(
                          "x",
                          " x"
                        )}
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                </Grid>
                <Grid className="grid-item" item xs={3}>
                  <div className="sub-content-div">
                    <h5
                      className="contact-3m-order-content-title"
                      data-testid="cust-serv-rep"
                    >
                      Customer Service Rep
                    </h5>
                    <h5
                      className="contact-3m-order-content-value"
                      data-testid="name-value-csr-name"
                    >{`${makeCapitalEachWordInString(
                      orderDetailsTrackingData.csrName === null ||
                        orderDetailsTrackingData.csrName === ""
                        ? "--"
                        : orderDetailsTrackingData.csrName
                    )} 
                   `}</h5>
                    {orderDetailsTrackingData?.csrEmail &&
                    orderDetailsTrackingData?.csrEmail !== "" ? (
                      <a
                        className="contact-value-email-phone"
                        href={`mailto:${makeCapitalEachWordInString(
                          orderDetailsTrackingData?.csrEmail
                        )}`}
                      >
                        {makeCapitalEachWordInString(
                          orderDetailsTrackingData?.csrEmail
                        )}
                      </a>
                    ) : (
                      <h5
                        className="contact-3m-order-content-value"
                        data-testid="phone-value-csr"
                      >{`${makeCapitalEachWordInString("")} 
                   `}</h5>
                    )}
                    {orderDetailsTrackingData?.csrPhone &&
                    orderDetailsTrackingData?.csrPhone !== "" ? (
                      <a
                        className="contact-value-email-phone"
                        href={`tel:${orderDetailsTrackingData.csrPhone.replace(
                          "x",
                          " x"
                        )}`}
                      >
                        {orderDetailsTrackingData.csrPhone.replace("x", " x")}
                      </a>
                    ) : (
                      <h5
                        className="contact-3m-order-content-value"
                        data-testid="no-content-value"
                      >{`${makeCapitalEachWordInString("")} 
                   `}</h5>
                    )}
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
