import React, { useState, useContext } from "react";
import { PersistentFooter } from "../../../../core/persistentFooter/persistentFooter.Component";
import { Box, Toolbar } from "@mui/material";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import "../../../newOrder/newOrderFooterGroup/newOrderFooterBtnGroup.css";
import "./supplyOrderFooterButtonGroup.css";
import { Popup } from "../../../../core/popup/popup.component";
import { useHistory, useLocation } from "react-router-dom";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../../../context/SupplyOrderContext";
import { SupplyOrderValidator } from "../../supplyOrder.validator";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { SupplyOrderPageSection } from "../../SupplyOrderPageSection.enum";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../../../context/RolesPermissionContext";

type ISupplyOrderFooterProps = {
  handlePlaceOrder: () => void;
  isOrderOverviewFlow?: boolean;
};

export const SupplyOrderFooterButtonGroup = ({
  handlePlaceOrder,
  isOrderOverviewFlow,
}: ISupplyOrderFooterProps) => {
  const history = useHistory();
  const location = useLocation();
  const [popUpOpen, setPopUpOpen] = useState(false);
  const SupplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const Validator = new SupplyOrderValidator();
  const [validator] = useState<SupplyOrderValidator>(Validator);

  const handleDeleteSupplyOrder = () => {
    SupplyOrderObj?.setIsBackFromReviewPage(false);
    SupplyOrderObj?.setSupplyOrderPage(
      SupplyOrderPageSection.SUPPLYORDER_PATIENT_LIST
    );
    setPopUpOpen(false);
    window.scrollTo(0, 0);
    if (isOrderOverviewFlow) history.goBack();
    else history.push("/home");
  };

  const validateAll = () => {
    const isValid = validator.validateAll(SupplyOrderObj!);
    if (isValid === ValidationStatus.VALID) {
      SupplyOrderObj?.setIsBackFromReviewPage(false);
      SupplyOrderObj?.setSupplyOrderPage(
        SupplyOrderPageSection.SUPPLYORDER_REVIEW
      );
      window.scrollTo(0, 0);
    }
  };

  const handleSaveSupplyOrder = () => {
    SupplyOrderObj?.setIsBackFromReviewPage(false);
    SupplyOrderObj?.setSupplyOrderPage(
      SupplyOrderPageSection.SUPPLYORDER_SUMMARY
    );
    window.scrollTo(0, 0);
  };

  const popUpDeleteOrderPopUp = () => {
    return (
      <div className="supplyOrderDPopup">
        <div className="supplyOrderDPopupContent">
          <div className="supplyOrderDPopupTitle">
            Are you sure you want to delete this order?
          </div>
          <div className="supplyOrderDNoBtn">
            <ExpressButton
              parentClass="supplyOrderDOptBtnNo"
              variant="outlined"
              clickHandler={() => setPopUpOpen(false)}
            >
              No, Do Not Delete
            </ExpressButton>
          </div>
          <div className="supplyOrderDYesBtn">
            <ExpressButton
              parentClass="supplyOrderDOptBtnYes"
              variant="contained"
              clickHandler={handleDeleteSupplyOrder}
            >
              Yes, Delete Order
            </ExpressButton>
          </div>
        </div>
      </div>
    );
  };

  const getMainButtonText = () => {
    let page = "Review Order";
    switch (SupplyOrderObj?.supplyOrderPage) {
      case SupplyOrderPageSection.SUPPLYORDER_INFO:
        page = "Review Order";
        break;
      case SupplyOrderPageSection.SUPPLYORDER_REVIEW:
        page = "Place Order";
        break;
    }
    return page;
  };

  const handleBackBtn = () => {
    SupplyOrderObj?.setSupplyOrderPage(SupplyOrderPageSection.SUPPLYORDER_INFO);
    SupplyOrderObj?.setIsBackFromReviewPage(true);
  };

  return (
    <>
      <PersistentFooter>
        <Toolbar className="supplyOrderToolBar">
          <Box className="supplyOrderMaincontainer">
            <Box className="supplyOrderLeftContainer" flexWrap="wrap">
              <Box className="boxSupplyOrderStyle" p={1}>
                <ExpressButton
                  clickHandler={() => setPopUpOpen(true)}
                  parentClass="deleteOrderClass"
                  testId="deleteOrderClass"
                  variant="text"
                  disabled={
                    permissionObj?.mappedRolesPermissionData.IsSupportRole
                  }
                >
                  Delete order
                </ExpressButton>
              </Box>
            </Box>
            <Box className="supplyOrderRightContainer" flexWrap="wrap">
              <Box className="boxSupplyOrderStyle" p={1}>
                {SupplyOrderObj?.supplyOrderPage ===
                  SupplyOrderPageSection.SUPPLYORDER_REVIEW && (
                  <ExpressButton
                    clickHandler={handleBackBtn}
                    parentClass="backBtnReviewClass"
                    data-testid="backBtnReviewClass"
                    variant="outlined"
                  >
                    Back
                  </ExpressButton>
                )}
                <ExpressButton
                  clickHandler={
                    SupplyOrderObj?.supplyOrderPage ===
                    SupplyOrderPageSection.SUPPLYORDER_INFO
                      ? validateAll
                      : SupplyOrderPageSection.SUPPLYORDER_REVIEW
                      ? handlePlaceOrder
                      : handleSaveSupplyOrder
                  }
                  parentClass="reviewOrderClass"
                  testId="reviewOrderClass"
                  variant="contained"
                  disabled={
                    permissionObj?.mappedRolesPermissionData?.IsSupportRole
                  }
                >
                  {getMainButtonText()}
                </ExpressButton>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </PersistentFooter>
      <Popup openFlag={popUpOpen} closeHandler={() => setPopUpOpen(false)}>
        {popUpDeleteOrderPopUp()}
      </Popup>
    </>
  );
};

export default SupplyOrderFooterButtonGroup;
