import "./missingRxUpload.css";
import { useState } from "react";
import { Button } from "@mui/material";
import { MissingRxSection } from "../missingRx.enum";
import { IPatient } from "../../../patient.interface";
import { WindowService } from "../../../../../util/window.service";
import { ReactComponent as PrintIcon } from "../../../../../assets/print.svg";
import VACTherapyOrderPad from "../../../../../assets/pdf/VACTherapyOrderPad.pdf";
import { makeCapitalEachWordInString } from "../../../../../util/utilityFunctions";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import { IDropZoneDocumentSelect } from "../../../../../core/customDropZone/dropZoneDocumentSelect.interface";
import UploadPrescription from "../../../../newOrder/submitPrescription/uploadPrescription/uploadPrescription.component";
import RedCheck from "../../../../../assets/redCheck.svg";
import { uploadDocument } from "../../../../../util/3meService";
import SelectCloseIcon from "../../../../../assets/selectclose.svg";
import { LoadingSpinner } from "../../../../../core/loader/LoadingSpinner";
import { saveDocumentToFilenet } from "../../../../../util/alertService";

interface Props {
  changePopUpSection: (
    newSection: MissingRxSection,
    errorMessage?: string
  ) => void;
  patientData: IPatient;
  pdfLink: string;
}

const MissingRxUpload = ({
  changePopUpSection,
  patientData,
  pdfLink,
}: Props) => {
  const [missingRxUploadDocs, setMissingRxUploadDocs] = useState<
    IDropZoneDocumentSelect[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const openVACTherapyOrderPadPdf = () => {
    const windowService = new WindowService();
    windowService.openPdf(pdfLink);
  };

  const uploadDoc = async () => {
    setIsLoading(true);
    let missingRxUploadDoc = missingRxUploadDocs[0];
    let document = {
      fileName: missingRxUploadDoc.documentName,
      content: missingRxUploadDoc.documentBase64,
      forAddition: true,
    };
    let uploadDocRequest = {
      entityID: patientData.roNumber.toString(),
      entityType: 3,
      files: [document],
    };
    const docResult = await uploadDocument(uploadDocRequest);
    if (docResult && docResult.succeeded) {
      if (docResult.data[0].code === 1042 || docResult.data[0].code === 1054) {
        let reqParam = {
          RentalOrderNumber: patientData.roNumber.toString(),
          Documents: [docResult.data[0].message],
        };
        const response = await saveDocumentToFilenet(reqParam);
        setIsLoading(false);
        if (response.length > 0 && response[0].message === "Success") {
          changePopUpSection(MissingRxSection.RX_UPLOAD_SENT);
        } else {
          changePopUpSection(
            MissingRxSection.RX_UPLOAD_FAILED,
            "The Rx upload failed. Please try again or call 1-800-275-4524 ext 41858 for help."
          );
        }
      } else {
        setIsLoading(false);
        missingRxUploadDoc.succeeded = false;
        missingRxUploadDoc.errorMessage = "Virus Detected";
      }
    } else {
      setIsLoading(false);
      if (docResult === undefined) {
        missingRxUploadDoc.succeeded = false;
        missingRxUploadDoc.errorMessage = "File has no content";
      }
      missingRxUploadDoc.succeeded = false;
      missingRxUploadDoc.errorMessage = docResult.error.message;
    }
  };

  const uploadDocumentAction = async () => {
    if (missingRxUploadDocs.length > 0 && missingRxUploadDocs[0].succeeded) {
      uploadDoc();
    }
  };

  const removeDocumentAction = () => {
    setMissingRxUploadDocs([]);
  };

  const spinner = () => {
    return (
      <div className="authentication-loader">
        <LoadingSpinner />
      </div>
    );
  };

  const missingRxUI = () => {
    return (
      <div className="missingRxUpload">
        <div
          className="description-missing-rx"
          data-testid="description-missing-rx"
        >
          An ActiV.A.C.™ order has been submitted for{" "}
          <span className="patientNamespan">
            {makeCapitalEachWordInString(patientData.lastName) +
              " " +
              makeCapitalEachWordInString(patientData.firstName)}
          </span>
          , but a signed Rx has not been received. An ActiV.A.C.™ cannot be
          released without a signed prescription.
        </div>
        <div className="desp-text-link">
          <div className="desp-text" data-testid="desp-text">
            Prescription type from your order
          </div>
          <div
            className="desp-link"
            data-testid="desp-link"
            onClick={() =>
              changePopUpSection(MissingRxSection.CHANGE_PRESCRIBER_TYPE)
            }
          >
            Change prescription type
          </div>
        </div>
        <div className="title-text">
          <b>Rx Upload</b>
        </div>
        <div className="title-msg" data-testid="title-msg">
          A prescription signed and dated by the prescriber is required for all
          orders
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
        {missingRxUploadDocs.length === 0 ? (
          <div className="uploadCustomDiv">
            <UploadPrescription
              data={missingRxUploadDocs}
              setData={setMissingRxUploadDocs}
              buttonDropClassName="change-pres-button-drop-select"
              buttonDropText="Select file to upload"
            />
          </div>
        ) : (
          <div className="selectedFileDiv">
            <div className="fileNameTitle">File Name</div>
            <div className={"selected-file-div"}>
              <div key={0} className="fileDetailCard">
                <div className="filename">
                  {missingRxUploadDocs[0].documentName}
                </div>
                <div
                  className={`fileStatus${
                    !missingRxUploadDocs[0].succeeded ? `error` : ``
                  }`}
                >
                  {!missingRxUploadDocs[0].succeeded && (
                    <img
                      style={{
                        verticalAlign: "text-bottom",
                        marginRight: "5px",
                      }}
                      src={RedCheck}
                      alt={RedCheck}
                    />
                  )}
                  {missingRxUploadDocs[0].succeeded
                    ? ""
                    : missingRxUploadDocs[0].errorMessage}
                </div>
                <div
                  className="fileClose"
                  hidden={missingRxUploadDocs[0].succeeded}
                  onClick={removeDocumentAction}
                >
                  <img src={SelectCloseIcon} alt={SelectCloseIcon} />
                </div>
              </div>
            </div>
            <div className="uploadDocBtn">
              <ExpressButton
                disabled={!missingRxUploadDocs[0].succeeded}
                parentClass="btnUpload"
                variant="contained"
                clickHandler={uploadDocumentAction}
              >
                Upload documents
              </ExpressButton>
            </div>
          </div>
        )}
      </div>
    );
  };

  return <>{isLoading ? spinner() : missingRxUI()}</>;
};

export default MissingRxUpload;
