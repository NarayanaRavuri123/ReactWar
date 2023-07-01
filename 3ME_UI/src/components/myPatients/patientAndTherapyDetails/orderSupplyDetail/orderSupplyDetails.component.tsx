import "./orderSupplyDetails.css";
import { ReactComponent as SupplyIconBlack } from "../../../../assets/orderSuppliesBlack.svg";
import { ReactComponent as Navigate } from "../../../../assets/Vector_navigate.svg";
import React, { useContext } from "react";
import { Popup } from "../../../../core/popup/popup.component";
import { ISupplyOrdersInfo } from "./orderSupplyDetails.interface";
import { makeCapitalEachWordInString } from "../../../../util/utilityFunctions";
import moment from "moment";
import {
  OrderDetailContextType,
  OrderDetailContext,
} from "../../../../context/OrderDetailsContext";

interface IOrderSupplyDetail {
  supplyOrderData: ISupplyOrdersInfo;
  therapyStartDate?: string;
}
const OrderSupplyDetail = ({
  supplyOrderData,
  therapyStartDate,
}: IOrderSupplyDetail) => {
  const [openPopup, setOpenPopup] = React.useState<boolean>(false);
  const orderOverViewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  const handleNavigateToSupplyOrderDetail = () => {
    orderOverViewObj?.setSelectedSupplyOrder(supplyOrderData);
    orderOverViewObj?.setSelectedSupplyTherapyStartDate(therapyStartDate!);
    orderOverViewObj?.setIsOrderFlow(true);
    orderOverViewObj?.setOrderTabTitle("Supply Orders");
  };
  return (
    <>
      <div className="order-supplies-detail-component">
        <div className="order-supplies-detail-container">
          <div
            className="supply-icon-div"
            data-testId="supply-order-icon-black"
          >
            <SupplyIconBlack
              className="icon"
              test-Id="supply-order-icon-black"
            />
          </div>

          <div className="details">
            <h4
              className="order-dressing-supply-order-label"
              data-testId="order-dressing-supply-order-heading"
            >
              Dressing & Supply Order
            </h4>
            <p
              className="order-supply-detail-label"
              data-testId="supply-order-initiatedBy"
            >
              Initiated by :
              {" " +
                makeCapitalEachWordInString(supplyOrderData.initiatedName!)}
            </p>
            <div className="therapy-status-section">
              <span
                className="order-supply-detail-status-label"
                data-testId="supply-order-status"
              >
                Status
              </span>
              <div
                className="oval"
                style={{
                  backgroundColor:
                    supplyOrderData?.statusColor !== ""
                      ? supplyOrderData?.statusColor?.toLowerCase()
                      : "grey",
                }}
              ></div>
              <p className="order-supply-detail-status-label">
                {makeCapitalEachWordInString(supplyOrderData.status!)}
              </p>
              {supplyOrderData.status === "DELIVERED" && (
                <p className="order-supply-detail-status-label">
                  {moment(supplyOrderData.deliveredDate!).format("MM/DD/yyyy")}
                </p>
              )}
            </div>
            <p
              className="order-supply-detail-label"
              data-testId="supply-order-product"
            >
              Product : {supplyOrderData.product}
            </p>
            <h6
              className="order-supply-detail-createdOn-label"
              data-testId="supply-order-created-on"
            >
              Created on{" "}
              {moment(supplyOrderData.createdDate!).format(
                "MMM DD, yyyy hh:mm A"
              )}
            </h6>
          </div>

          <div
            className="order-supplies-detail-navigate-icon-div"
            data-testId="navigate-icon-right"
          >
            <Navigate
              className="navigate-icon"
              onClick={() => {
                handleNavigateToSupplyOrderDetail();
              }}
              test-id="navigate-icon"
            />
          </div>
        </div>
      </div>
      {openPopup && (
        <Popup
          openFlag={openPopup}
          closeHandler={() => setOpenPopup(false)}
          dialogParentClass={"order-supplies-empty-pop-up"}
        >
          <div></div>
        </Popup>
      )}
    </>
  );
};

export default OrderSupplyDetail;
