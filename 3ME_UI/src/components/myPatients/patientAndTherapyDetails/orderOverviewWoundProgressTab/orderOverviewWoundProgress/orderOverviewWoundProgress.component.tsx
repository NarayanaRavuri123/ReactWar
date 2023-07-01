import { Grid } from "@mui/material";
import moment from "moment";
import { useContext, useState } from "react";
import { WoundDetails, WoundListDetail } from "../WoundProgressTab.interface";
import "./orderOverviewWoundProgress.css";

import { Popup } from "../../../../../core/popup/popup.component";
import { OrderOverViewTabsTitle } from "../../orderOverview/orderOverviewContainer.enum";
import {
  OrderDetailContextType,
  OrderDetailContext,
} from "../../../../../context/OrderDetailsContext";
import { ReactComponent as Navigate } from "../../../../../assets/Vector_navigate.svg";
import { handleEmptyValue } from "../../../../../util/utilityFunctions";
type Props = {
  woundDetails: WoundDetails | undefined;
};
const WoundProgress = ({ woundDetails }: Props) => {
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const orderOverViewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );

  const navigateToWoundDetail = (index: any, woundId: any) => {
    setOpenPopup(true);
    orderOverViewObj?.setWoundIndex(index);
    orderOverViewObj?.setWoundId(woundId);
    orderOverViewObj?.setIsWoundProgressFlow(true);
    orderOverViewObj?.setWoundProgressTabTitle(
      OrderOverViewTabsTitle.WOUND_DETAIL_TAB_TITLE
    );
  };

  return (
    <>
      <Grid container className="wound-progress-tab-container">
        {woundDetails &&
          woundDetails?.wounds.map(
            (woundDetail: WoundListDetail, index: number) => {
              return (
                <Grid item xs={12} className="wound-progress-tab-item">
                  <div
                    className={`wound-progress-tab-parent-div${
                      index + 1 === woundDetails.wounds.length ? " bottom" : ""
                    }`}
                  >
                    <div className="wound-progress-wound-detail-div">
                      <h5
                        className="wound-progresss-tab-wound-number-heading"
                        data-testid="wound-progresss-tab-wound-number-heading"
                      >
                        {`Wound #${index + 1}`}
                      </h5>
                      <p
                        className="wound-progresss-tab-wound-location"
                        data-testid="wound-progresss-tab-wound-location"
                      >
                        {`${`${handleEmptyValue(woundDetail?.location!)},`} 
                        ${`${handleEmptyValue(woundDetail?.direction!)}`} 
                        ${handleEmptyValue(woundDetail?.orientation!)}`}
                      </p>
                      <p
                        className="wound-progresss-tab-wound-type"
                        data-testid="wound-progresss-tab-wound-type"
                      >
                        {handleEmptyValue(woundDetail?.type!)}
                      </p>
                      <p
                        className="wound-progresss-tab-wound-assessed-on"
                        data-testid="wound-progresss-tab-wound-assessed-on"
                      >
                        {`Last Assessed on ${moment(
                          handleEmptyValue(woundDetail?.evaluationDate!)
                        ).format("MMM DD, yyyy")}`}
                      </p>
                    </div>
                    <div className="navigation-div">
                      <Navigate
                        className="navigate-icon-right"
                        onClick={() =>
                          navigateToWoundDetail(index + 1, woundDetail.id)
                        }
                      />
                    </div>
                  </div>
                </Grid>
              );
            }
          )}
      </Grid>
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
export default WoundProgress;
