import { useContext } from "react";
import { Box, Toolbar } from "@mui/material";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import { PersistentFooter } from "../../../core/persistentFooter/persistentFooter.Component";
import "./newOrderFooterBtnGroup.css";
import ShareIcon from "@mui/icons-material/Share";
import Share from "../../../assets/share.svg";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import { NewOrderPageSection } from "../NewOrderContainer.enum";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../../context/RolesPermissionContext";

type INewOrderFooterProps = {
  validateAll: any;
  handlePrevious: any;
  handleSaveExit: () => void;
  handleShareOrder: () => void;
  handleSave: any;
  handleCancelOrder: any;
  cancelBtnVisibility: boolean;
  shareOrderButtonText: string;
};

export const NewOrderFooterButtonGroup = ({
  validateAll,
  handlePrevious,
  handleSaveExit,
  handleCancelOrder,
  handleShareOrder,
  handleSave,
  cancelBtnVisibility,
  shareOrderButtonText,
}: INewOrderFooterProps) => {
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  return (
    <PersistentFooter>
      <Toolbar className="orderToolBar">
        <Box className="orderMaincontainer">
          <Box className="orderLeftContainer" flexWrap="wrap">
            <Box className="boxOrderStyle" p={1}>
              {cancelBtnVisibility && (
                <ExpressButton
                  clickHandler={handleCancelOrder}
                  parentClass="textOrderClass noHover"
                  testId="cancelOrderTest"
                  variant="text"
                  disabled={
                    permissionObj?.mappedRolesPermissionData.IsSupportRole
                  }
                >
                  Delete order
                </ExpressButton>
              )}
            </Box>
            <Box className="boxOrderStyle" p={1}>
              {NewOrderObj?.newOrderPage !==
                NewOrderPageSection.NEWORDER_REVIEW_ORDER && (
                <ExpressButton
                  clickHandler={handleSaveExit}
                  testId="saveExitTest"
                  variant="outlined"
                  id="VacSaveExit"
                  disabled={
                    permissionObj?.mappedRolesPermissionData.IsSupportRole
                  }
                >
                  Save & exit
                </ExpressButton>
              )}
            </Box>
            <Box className="boxOrderStyle" p={1}>
              {NewOrderObj?.newOrderPage !==
                NewOrderPageSection.NEWORDER_REVIEW_ORDER && (
                <ExpressButton
                  clickHandler={handleSave}
                  testId="SaveOrderTest"
                  variant="outlined"
                  id="VacSave"
                  disabled={
                    permissionObj?.mappedRolesPermissionData.IsSupportRole
                  }
                >
                  Save
                </ExpressButton>
              )}
            </Box>
            <Box className="boxOrderStyle" p={1}>
              <ExpressButton
                clickHandler={handleShareOrder}
                parentClass="shareOrderButton"
                testId="shareOrderTest"
                variant="outlined"
                id="VacShareOrder"
                disabled={
                  permissionObj?.mappedRolesPermissionData.IsSupportRole
                }
              >
                 { permissionObj?.mappedRolesPermissionData.IsSupportRole ? ( <ShareIcon className="shareOrderImage"></ShareIcon>) : ( <img src={Share} alt={Share} className="shareOrderImage" ></img>)}
               

                {shareOrderButtonText}
              </ExpressButton>
            </Box>
          </Box>
          <Box className="orderRightContainer" flexWrap="wrap">
            <Box className="boxOrderStyle" p={1}>
              <ExpressButton
                clickHandler={handlePrevious}
                parentClass="previousBtn"
                testId="prevOrderTest"
                variant="outlined"
                disabled={
                  permissionObj?.mappedRolesPermissionData.IsSupportRole
                }
              >
                Previous
              </ExpressButton>
            </Box>
            <Box className="boxOrderStyle" p={1}>
              <ExpressButton
                disabled={
                  permissionObj?.mappedRolesPermissionData.IsSupportRole ===
                  true
                    ? true
                    : NewOrderObj
                    ? NewOrderObj.errorInUploadFiles ||
                      NewOrderObj.showPrescriberUpdateEmail
                    : false
                }
                clickHandler={validateAll}
                parentClass="nextBtnNewOrder"
                testId="nextOrderTest"
                variant="contained"
              >
                {NewOrderObj?.newOrderPage ===
                NewOrderPageSection.NEWORDER_REVIEW_ORDER
                  ? "Submit Order"
                  : "Next"}
              </ExpressButton>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </PersistentFooter>
  );
};
