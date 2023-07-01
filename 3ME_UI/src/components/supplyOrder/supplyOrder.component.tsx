import { Grid } from "@mui/material";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../context/SupplyOrderContext";
import { ReactNode, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ProgressBar from "../progressBar/progressBar.component";
import { SupplyOrderPageSection } from "./SupplyOrderPageSection.enum";
import SupplyOrderInfo from "./supplyOrderInfo/supplyOrderInfo.component";
import { SupplyOrderList } from "./supplyOrderList/supplyOrderList.component";
import SupplyOrderReview from "./supplyOrderReview/supplyOrderReview.component";
import SupplyOrderSummary from "./supplyOrderSummary/supplyOrderSummary.component";
import { any } from "underscore";
import { LeaveSupplyOrder } from "./supplyOrderInfo/leaveSupplyOrder/leaveSupplyOrder.component";

const SupplyOrder = () => {
  const openSupplyOrderPageEdit = any;
  const [popUpTitle, setPopUpTitle] = useState("");
  const [popUpButtonTitle, setPopUpButtonTitle] = useState("");
  const [cancelLeaveOpen, setCancelLeaveOpen] = useState(false);
  const [cancelConfirmText, setcancelConfirmText] = useState("");
  const [backBtnText, setbackBtnText] = useState("Back");
  const history = useHistory();
  const location: any = useLocation();
  const SupplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const { isOrderOverviewFlow } = location.state || "";
  const handleCancelLeavePopUp = () => {
    setCancelLeaveOpen(false);
  };
  const sectionToDisplay = () => {
    let page: ReactNode;
    switch (SupplyOrderObj?.supplyOrderPage) {
      case SupplyOrderPageSection.SUPPLYORDER_PATIENT_LIST:
        page = <SupplyOrderList supplyOrderContextObj={SupplyOrderObj} />;
        break;
      case SupplyOrderPageSection.SUPPLYORDER_INFO:
        page = (
          <SupplyOrderInfo
            openSupplyOrderPageEdit={openSupplyOrderPageEdit}
            isOrderOverviewFlow={isOrderOverviewFlow}
          />
        );
        break;
      case SupplyOrderPageSection.SUPPLYORDER_REVIEW:
        page = (
          <SupplyOrderReview
            supplyOrderContextObj={SupplyOrderObj}
            isOrderOverviewFlow={isOrderOverviewFlow}
          />
        );
        break;
      case SupplyOrderPageSection.SUPPLYORDER_SUMMARY:
        page = <SupplyOrderSummary supplyOrderContextObj={SupplyOrderObj} />;
        break;
    }
    return page;
  };

  const handleBackClick = () => {
    if (
      SupplyOrderObj?.supplyOrderPage ===
      SupplyOrderPageSection.SUPPLYORDER_INFO
    ) {
      setPopUpTitle("Are you sure you want to leave this order?");
      setPopUpButtonTitle("Leave Order");
      setCancelLeaveOpen(true);
      setbackBtnText("Back");
      setcancelConfirmText("All changes will be lost");
    } else if (
      SupplyOrderObj?.supplyOrderPage ===
      SupplyOrderPageSection.SUPPLYORDER_REVIEW
    ) {
      SupplyOrderObj?.setIsBackFromReviewPage(true);
      SupplyOrderObj?.setSupplyOrderPage(
        SupplyOrderPageSection.SUPPLYORDER_INFO
      );
    } else {
      history.goBack();
    }
  };

  return (
    <Grid className="newOrder-flow" container>
      {SupplyOrderObj?.supplyOrderPage !==
        SupplyOrderPageSection.SUPPLYORDER_SUMMARY && (
        <Grid item data-testid="SO-ProgressBar">
          <ProgressBar
            pageTitle={SupplyOrderObj?.supplyOrderPageTitle!}
            progressValue={SupplyOrderObj?.supplyOrderProgress}
            backButtonAction={handleBackClick}
          />
        </Grid>
      )}
      <Grid>{sectionToDisplay()}</Grid>
      <LeaveSupplyOrder
        title={popUpTitle}
        buttonTitle={popUpButtonTitle}
        handleCancelLeavePopUp={handleCancelLeavePopUp}
        cancelLeaveOpen={cancelLeaveOpen}
        cancelConfirmText={cancelConfirmText}
        backBtnText={backBtnText}
        SupplyOrderObj={SupplyOrderObj}
        isOrderOverviewFlow={isOrderOverviewFlow}
      />
    </Grid>
  );
};

export default SupplyOrder;
