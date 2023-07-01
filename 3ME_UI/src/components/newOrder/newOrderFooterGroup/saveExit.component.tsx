import { ExpressButton } from "../../../core/expressButton/expressButton.component";
import "../newOrder.css";
import { Popup } from "../../../core/popup/popup.component";

type ISaveExitOrderProps = {
  setSaveAndExitOpen: any;
  saveAndExitOpen: any;
  handleSaveAndExit: Function;
};

export const SaveExitOrder = ({
  setSaveAndExitOpen,
  saveAndExitOpen,
  handleSaveAndExit,
}: ISaveExitOrderProps) => {
  return (
    <Popup
      closeHandler={() => setSaveAndExitOpen(false)}
      openFlag={saveAndExitOpen}
      dialogParentClass="saveAndExitPopup"
    >
      <span className="exitConfirmationText">
        Are you sure you want to exit this order?
      </span>
      <span className="exitConfirmationDescText">
        This order will show up as saved on your lists
      </span>
      <ExpressButton
        variant="outlined"
        clickHandler={() => setSaveAndExitOpen(false)}
        parentClass="exitCancelBtn"
      >
        Cancel
      </ExpressButton>
      <ExpressButton
        variant="contained"
        clickHandler={() => {
          handleSaveAndExit();
        }}
        parentClass="exitBtn"
      >
        Save and Exit
      </ExpressButton>
    </Popup>
  );
};
