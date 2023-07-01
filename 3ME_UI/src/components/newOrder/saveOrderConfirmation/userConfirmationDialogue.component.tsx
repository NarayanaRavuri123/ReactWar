import { useContext } from "react";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import "./userConfirmation.css";
import { RolesPermissionContext, RolesPermissionContextType } from "../../../context/RolesPermissionContext";

interface Props {
  closeModal: any;
  handleConfirmNavigationClick: any;
  handleSaveExitNavigationClick: any;
}
const UserConfirmationDialogue = ({
  closeModal,
  handleConfirmNavigationClick,
  handleSaveExitNavigationClick,
}: Props) => {
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  return (
    <>
      <div
        className="saveOrderConfirmPopup"
        data-testid="save-order-confirm-div-child"
      >
        <h2 className="header-title" data-testid="header-title">
          You haven't saved your order
        </h2>
        <h5 className="header-sub-title" data-testid="header-sub-title">
          If you exit without saving, any changes you have made to the order
          will be lost
        </h5>
        <div className="return-to-order-entry">
          <ExpressButton
            parentClass="return-to-order-entry-button"
            variant="outlined"
            clickHandler={() => closeModal()}
            testId="button-1"
          >
            Return to Order Entry
          </ExpressButton>
        </div>
        <div className="exit-without-saving">
          <ExpressButton
            parentClass="exit-without-saving-button"
            variant="outlined"
            testId="button-2"
            clickHandler={() => handleConfirmNavigationClick()}
          >
            Exit without Saving
          </ExpressButton>
        </div>
        <div className="save-and-exit">
          <ExpressButton
            parentClass="save-and-exit-button"
            variant="contained"
            testId="button-3"
            clickHandler={() => handleSaveExitNavigationClick()}
            disabled={
              permissionObj?.mappedRolesPermissionData.IsSupportRole
            }
          >
            Save and Exit
          </ExpressButton>
        </div>
      </div>
    </>
  );
};
export default UserConfirmationDialogue;
