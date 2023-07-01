import "./missingRxFaxSent.css";
import { Button } from "@mui/material";
import { WindowService } from "../../../../../util/window.service";
import { ReactComponent as PrintIcon } from "../../../../../assets/print.svg";
import { ReactComponent as InfoIcon } from "../../../../../assets/InfoIcon.svg";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";

interface Props {
  closePopUpAction: any;
  openPdf?: any;
  pdfLink: string;
}

const MissingRxFaxSent = ({ closePopUpAction, openPdf, pdfLink }: Props) => {
  const openVACTherapyOrderPadPdf = () => {
    const windowService = new WindowService();
    windowService.openPdf(pdfLink);
  };

  return (
    <div className="missing-rx-fax-in-later-sent">
      <h4
        className="description-missingRxFaxSent"
        data-testid="description-missingRxFaxSent"
      >
        <span className="bold">Success!</span> The prescription type has been
        changed to fax.
      </h4>
      <div
        className="changePres-title-msg-div"
        data-testid="changePres-title-msg-div"
      >
        <h4
          className="changePres-title-msg"
          data-testid="sub-description-missingRxFaxSent"
        >
          A prescription signed and dated by the prescriber is required for all
          orders
        </h4>
        <Button
          classes={{ root: "button-printrx-change-prescription-rx" }}
          data-testid="print-rx-button"
          variant="outlined"
          onClick={openPdf ? openPdf : openVACTherapyOrderPadPdf}
          startIcon={<PrintIcon />}
        >
          Print Rx
        </Button>
      </div>
      <div className="fax-detail" data-testid="fax-detail">
        <span>
          <InfoIcon className="info-icon" />
        </span>
        <h4 className="fax-detail-text" data-testid="fax-detail-text">
          Please fax the prescription to 1-888-245-2295.
        </h4>
      </div>
      <ExpressButton
        clickHandler={closePopUpAction}
        parentClass="done-button"
        testId="done-button"
        variant="contained"
      >
        Done
      </ExpressButton>
    </div>
  );
};

export default MissingRxFaxSent;
