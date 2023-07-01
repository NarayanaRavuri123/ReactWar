import "./missingRxFax.css";
import { Button } from "@mui/material";
import { MissingRxSection } from "../missingRx.enum";
import { IPatient } from "../../../patient.interface";
import { WindowService } from "../../../../../util/window.service";
import { ReactComponent as PrintIcon } from "../../../../../assets/print.svg";
import { ReactComponent as InfoIcon } from "../../../../../assets/InfoIcon.svg";
import { makeCapitalEachWordInString } from "../../../../../util/utilityFunctions";

interface Props {
  changePopUpSection: (newSection: MissingRxSection) => void;
  patient: IPatient;
  pdfLink: string;
}

const MissingRxFax = ({ changePopUpSection, patient, pdfLink }: Props) => {
  const openVACTherapyOrderPadPdf = () => {
    const windowService = new WindowService();
    windowService.openPdf(pdfLink);
  };

  return (
    <div className="missingRxFax">
      <div
        className="description-missingRxFax"
        data-testid="description-missing-rx-Fax"
      >
        {`An ActiV.A.C.™ order has been submitted for ${makeCapitalEachWordInString(
          patient.lastName
        )} ${makeCapitalEachWordInString(patient.firstName)}, but a signed
        Rx has not been received. An ActiV.A.C.™ cannot be released without a
        signed prescription.`}
      </div>
      <div className="descp-text-link">
        <div className="descp-text" data-testid="descp-text">
          Prescription type from your order
        </div>
        <div
          className="descp-link"
          data-testid="descp-link"
          onClick={() =>
            changePopUpSection(MissingRxSection.CHANGE_PRESCRIBER_TYPE)
          }
        >
          Change prescription type
        </div>
      </div>
      <div className="title-text">
        <b>Fax in Later</b>
      </div>
      <div className="title-msg-div" data-testid="title-msg-div">
        <h4 className="title-msg" data-testid="title-msg">A prescription signed and dated by the prescriber is required for all
        orders</h4>
        <Button
          classes={{ root: "button-printrx-rx" }}
          data-testid="button-printrx-rx"
          variant="outlined"
          onClick={openVACTherapyOrderPadPdf}
          startIcon={<PrintIcon />}
        >
          Print Rx
        </Button>
      </div>
      <div className="fax-detail" data-testid="fax-detail">
        <span>
          <InfoIcon className="info-icon" />
        </span>
        <h4 className="fax-detail-text">
          Please fax the prescription to 1-888-245-2295.
        </h4>
      </div>
    </div>
  );
};

export default MissingRxFax;
