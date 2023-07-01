import "./changePrescriptionType.css";
import { Button, Grid } from "@mui/material";
import { MissingRxSection } from "../missingRx.enum";
import { IPatient } from "../../../patient.interface";
import React, { MouseEvent, useEffect, useState } from "react";
import {
  updatePrescriptionType,
  uploadDocument,
} from "../../../../../util/3meService";
import { WindowService } from "../../../../../util/window.service";
import { saveDocumentToFilenet } from "../../../../../util/alertService";
import { LoadingSpinner } from "../../../../../core/loader/LoadingSpinner";
import { ReactComponent as PrintIcon } from "../../../../../assets/print.svg";
import ChangeEPrescription from "./changeEPrescription/changeEPrescription.component";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import { IPrescriberDetailInterface } from "../missingRxEPrescription/prescriberDetail.interface";
import ChangePrescriptionRxUpload from "./changePrescriptionRxUpload/changePrescriptionRxUpload.component";
import { IDropZoneDocumentSelect } from "../../../../../core/customDropZone/dropZoneDocumentSelect.interface";
import { PrescriptionOption } from "../../../../newOrder/submitPrescription/prescriptionOption/prescriptionOption.component";
import { ValidationStatus } from "../../../../../core/interfaces/input.interface";

interface Props {
  changePopUpSection: Function;
  closePopUpAction: Function;
  patientData: IPatient;
  pdfLink: string;
  prescriberDetails: IPrescriberDetailInterface;
  showErrorMessage: boolean;
  selectedPrescription: string;
  setPrescriberDetails: React.Dispatch<
    React.SetStateAction<IPrescriberDetailInterface>
  >;
}

const ChangePrescriptionType = ({
  changePopUpSection,
  closePopUpAction,
  patientData,
  pdfLink,
  prescriberDetails,
  showErrorMessage,
  selectedPrescription,
  setPrescriberDetails,
}: Props) => {
  const [editPrescriberMode, setEditPrescriberMode] = useState(false);
  const [missingRxUploadDoc, setMissingRxUploadDoc] = useState<
    IDropZoneDocumentSelect[]
  >([]);
  const [selectedPrescriptionType, setSelectedPrescriptionType] =
    useState<string>("");
  const [originalPrescriberDetails] =
    useState<IPrescriberDetailInterface>(prescriberDetails);
  const [isLoading, setIsLoading] = useState(false);

  const openChangePrescriptionPdf = () => {
    const windowService = new WindowService();
    windowService.openPdf(pdfLink);
  };

  const getPrescriptionMode = () => {
    switch (selectedPrescriptionType) {
      case "RxImage":
        return 1;
      case "EPrescription":
        return 2;
      case "Fax":
        return 3;
      default:
        return null;
    }
  };

  const onRadioButtonClick =
    (type: React.SetStateAction<string>) => (e: MouseEvent<HTMLElement>) => {
      // When user in E-Prescrption and edit mode.
      // And directly switch to other prescription type
      // Need to change edit mode review mode.
      // And if user already changes mail then set it backup email.
      if (
        selectedPrescriptionType === "EPrescription" &&
        type !== selectedPrescriptionType &&
        editPrescriberMode
      ) {
        setEditPrescriberMode(false);
        setPrescriberDetails(originalPrescriberDetails);
      } else if (
        selectedPrescriptionType === "RxImage" &&
        type !== selectedPrescriptionType
      ) {
        setMissingRxUploadDoc([]);
      }
      setSelectedPrescriptionType(type);
    };

  const uploadDoc = async () => {
    setIsLoading(true);
    let uploadingDoc = missingRxUploadDoc[0];
    let document = {
      fileName: uploadingDoc.documentName,
      content: uploadingDoc.documentBase64,
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
        return response.length > 0 && response[0].message === "Success";
      } else {
        setIsLoading(false);
        uploadingDoc.succeeded = false;
        uploadingDoc.errorMessage = "Virus Detected";
      }
    } else {
      setIsLoading(false);
      uploadingDoc.succeeded = false;
      uploadingDoc.errorMessage = docResult
        ? docResult.error.message
        : "File has no content";
    }
  };

  const updatePrescriptionMode = async (isUploadDocSuccess: boolean) => {
    if (!isUploadDocSuccess && selectedPrescriptionType === "RxImage") {
      updateUIForSubmitPrescription(isUploadDocSuccess);
    } else {
      try {
        const reqBody = {
          RentalOrderNumber: patientData.roNumber.toString(),
          PrescriptionMethod: getPrescriptionMode(),
        };
        setIsLoading(true);
        const data = await updatePrescriptionType(reqBody);
        setIsLoading(false);
        if (data.succeeded) {
          updateUIForSubmitPrescription(isUploadDocSuccess);
        } else {
          changePopUpSection(
            MissingRxSection.RX_UPLOAD_FAILED,
            "Oops! something went wrong"
          );
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const updateUIForSubmitPrescription = (isUploadDocSuccess?: boolean) => {
    switch (selectedPrescriptionType) {
      case "EPrescription":
        changePopUpSection(MissingRxSection.E_PRESBRIBER_SENT);
        break;
      case "RxImage":
        if (isUploadDocSuccess) {
          changePopUpSection(MissingRxSection.RX_UPLOAD_SENT);
        } else {
          changePopUpSection(
            MissingRxSection.RX_UPLOAD_FAILED,
            "The Rx upload failed. Please try again or call 1-800-275-4524 ext 41858 for help."
          );
        }
        break;
      case "Fax":
        changePopUpSection(MissingRxSection.FAX_IN_LATER_SENT);
        break;
      default:
        break;
    }
  };

  const uploadDocumentAction = async () => {
    if (missingRxUploadDoc.length > 0 && missingRxUploadDoc[0].succeeded) {
      return uploadDoc();
    }
  };

  const handleSubmitPrescription = async () => {
    let isUploadDocSuccess = true;
    if (selectedPrescriptionType === "RxImage") {
      let isSuccess = await uploadDocumentAction();
      if (isSuccess === undefined) {
        return;
      } else {
        isUploadDocSuccess = isSuccess;
      }
    }
    if (patientData.orderID && patientData.orderID !== "") {
      updatePrescriptionMode(isUploadDocSuccess);
    } else {
      updateUIForSubmitPrescription(isUploadDocSuccess);
    }
  };

  useEffect(() => {
    // Update selectedPrescription from last pop up.
    setSelectedPrescriptionType(selectedPrescription);
  }, []);

  const spinner = () => {
    return (
      <div className="authentication-loader">
        <LoadingSpinner />
      </div>
    );
  };

  const changePrescriptionUI = () => {
    return (
      <div className="changePrescriptionType">
        <div className="change-prescription" data-testid="change-prescription">
          An ActiV.A.C.™ order has been submitted for{" "}
          <span className="patientNamespan">
            {patientData.lastName.toLowerCase() +
              " " +
              patientData.firstName.toLowerCase()}
          </span>
          , but a signed Rx has not been received. An ActiV.A.C.™ cannot be
          released without a signed prescription.
        </div>
        <div
          className="changePres-title-msg-div"
          data-testid="changePres-title-msg-div"
        >
          <h4
            className="changePres-title-msg"
            data-testid="changePres-title-msg"
          >
            A prescription signed and dated by the prescriber is required for
            all orders
          </h4>
          <Button
            classes={{ root: "button-printrx-change-prescription-rx" }}
            data-testid="button-printrx-change-prescription-rx"
            variant="outlined"
            onClick={openChangePrescriptionPdf}
            startIcon={<PrintIcon />}
          >
            Print Rx
          </Button>
        </div>
        <div className="change-prescription-subTitle-div">
          <h3 className="change-prescription-subTitle">
            Prescription Type{" "}
            <span className="change-prescription-subTitle-astrick">*</span>
          </h3>
        </div>
        <div className="change-prescription-main-div">
          <Grid
            className="change-prescription-grid-container"
            container
            spacing={2}
          >
            <Grid className="change-prescription-grid-item" item xs={12}>
              <PrescriptionOption
                id="EPrescription"
                title="E-Prescription"
                prescriptionClassName="prescription-option changePrescriptionTypesTitle"
                description="A DocuSign email will be sent to the prescriber requesting an electronically signed prescription"
                isOptionSelected={selectedPrescriptionType === "EPrescription"}
                buttonOnClick={onRadioButtonClick("EPrescription")}
              />
              {selectedPrescriptionType === "EPrescription" && (
                <ChangeEPrescription
                  showErrorMessage={showErrorMessage}
                  changePopUpSection={changePopUpSection}
                  editPrescriberMode={editPrescriberMode}
                  isComingFromChangePrescription={true}
                  prescriberDetails={prescriberDetails}
                  setEditPrescriberMode={setEditPrescriberMode}
                  setPrescriberDetails={setPrescriberDetails}
                />
              )}
              <PrescriptionOption
                id="RxImage"
                title="Rx Upload"
                prescriptionClassName="prescription-option changePrescriptionTypesTitle"
                description="Attach the prescription to this order"
                isOptionSelected={selectedPrescriptionType === "RxImage"}
                buttonOnClick={onRadioButtonClick("RxImage")}
              />
              {selectedPrescriptionType === "RxImage" && (
                <ChangePrescriptionRxUpload
                  docData={missingRxUploadDoc}
                  setDocData={setMissingRxUploadDoc}
                />
              )}
              <PrescriptionOption
                id="Fax"
                title="Fax in Later"
                prescriptionClassName="prescription-option changePrescriptionTypesTitle"
                description="After submitting this order, please fax the prescription and other clinical documents to "
                isOptionSelected={selectedPrescriptionType === "Fax"}
                buttonOnClick={onRadioButtonClick("Fax")}
                isFaxLater={true}
                phoneNumber="1-888-245-2295."
              />
            </Grid>
          </Grid>
        </div>
        <div className="change-prescription-footer">
          <Grid
            className="change-prescription-grid-container"
            container
            spacing={2}
          >
            <Grid className="change-prescription-grid-item" item xs={6}>
              <ExpressButton
                clickHandler={() => closePopUpAction()}
                parentClass="cancelBtn"
                testId="cancelBtnTest"
                variant="outlined"
              >
                Cancel
              </ExpressButton>
            </Grid>
            <Grid className="change-prescription-grid-item" item xs={6}>
              <ExpressButton
                disabled={
                  selectedPrescriptionType === "" ||
                  (selectedPrescriptionType === "RxImage" &&
                    (missingRxUploadDoc.length !== 1 ||
                      (missingRxUploadDoc.length === 1 &&
                        !missingRxUploadDoc[0].succeeded))) ||
                  (selectedPrescriptionType === "EPrescription" &&
                    (editPrescriberMode ||
                      showErrorMessage ||
                      prescriberDetails.updatedPrescriberEmail.valid !==
                        ValidationStatus.VALID))
                }
                clickHandler={handleSubmitPrescription}
                parentClass="submitBtn"
                testId="submitBtnTest"
                variant="contained"
              >
                Submit
              </ExpressButton>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  };
  return <>{isLoading ? spinner() : changePrescriptionUI()}</>;
};

export default ChangePrescriptionType;
