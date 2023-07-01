import React, { MouseEvent, useContext, useEffect } from "react";
import "./submitPrescription.css";
import { Button, Grid } from "@mui/material";
import { NewOrderValidator } from "../newOrder.validator";
import { WindowService } from "../../../util/window.service";
import { ISubmitPrescription } from "./submitPrescription.validator";
import { ReactComponent as PrintIcon } from "../../../assets/print.svg";
import VACTherapyOrderPad from "../../../assets/pdf/VACTherapyOrderPad.pdf";
import { PrescriptionOption } from "./prescriptionOption/prescriptionOption.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import UploadPrescription from "./uploadPrescription/uploadPrescription.component";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import { EPrescription } from "./ePrescription/ePrescription.component";

export const SubmitPrescription = ({
  data,
  Validator = new NewOrderValidator(),
  setData,
  openPDF,
  printableDocumentsLink,
}: ISubmitPrescription) => {
  const [validator] = React.useState<NewOrderValidator>(Validator!);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);

  const radioButtonAction = (e: MouseEvent<HTMLElement>) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    NewOrderObj?.setPrescriptionDocuments([]);
    const isValid = validator.validate(
      e.currentTarget.id,
      "submitPrescription"
    );
    if (e.currentTarget.id === "EPrescription") {
      if (NewOrderObj?.prescriberAddedData !== undefined) {
        NewOrderObj?.setIsPrescriberAddedOpenInfo(true);
        setPrescriberData(ValidationStatus.VALID, e.currentTarget.id);
      } else {
        NewOrderObj?.setIsPrescriberAddedOpenErrorInfo(true);
        setPrescriberData(ValidationStatus.INVALID, e.currentTarget.id);
      }
    } else {
      NewOrderObj?.setIsPrescriberAddedOpenInfo(false);
      NewOrderObj?.setIsPrescriberAddedOpenErrorInfo(false);

      setData(
        Object.assign({}, data, {
          submitPrescription: {
            value: e.currentTarget.id,
            valid: isValid?.status,
          },
        })
      );
    }
  };
  function openPDFLink() {
    const windowService = new WindowService();
    windowService.openPdf(printableDocumentsLink!.VACTherapyOrderPad);
  }
  const setPrescriberData = (ValidationStatus: any, value: string) => {
    setData({
      ...data,
      submitPrescription: {
        value: value,
        valid: ValidationStatus,
      },
    });
  };
  useEffect(() => {
    if (NewOrderObj?.prescriberAddedData !== undefined)
      if (data.submitPrescription.value === "EPrescription") {
        const email = NewOrderObj?.prescriberAddedData?.email!;

        setData({
          ...data,
          submitPrescription: {
            value: "EPrescription",
            valid: ValidationStatus.VALID,
          },
          updatedPrescriberEmail: {
            value: email,
            valid: ValidationStatus.VALID,
          },
        });
        NewOrderObj?.setIsPrescriberAddedOpenInfo(true);
        NewOrderObj?.setIsPrescriberAddedOpenErrorInfo(false);
      }
  }, [NewOrderObj?.prescriberAddedData]);

  return (
    <div className="submit-prescription">
      <div className="submit-prescription-header">
        <h2
          className="submit-prescription-title"
          data-testid="submit-prescription-title"
        >
          Submit a Valid Prescription
        </h2>
        <div className="submit-prescription-subTitle-div">
          <h3
            className={
              data?.submitPrescription.valid === ValidationStatus.INVALID
                ? "submit-prescription-subTitle-error"
                : "submit-prescription-subTitle"
            }
          >
            Prescription Submission
          </h3>
          <h3 className="submit-prescription-subTitle-astrick"> *</h3>
        </div>
        <h5
          className="submit-prescription-description"
          data-testid="submit-prescription-description"
        >
          A prescription signed and dated by the prescriber is required for all
          orders
        </h5>
        <Button
          classes={{ root: "button-print-rx" }}
          data-testid="button-print-rx"
          variant="outlined"
          onClick={openPDF ? openPDF : openPDFLink}
          startIcon={<PrintIcon />}
        >
          Print Rx
        </Button>
      </div>
      <Grid
        className="submit-prescription-grid-container"
        container
        spacing={2}
      >
        <Grid className="submit-prescription-grid-item" item xs={12}>
          <div className="submit-prescription-div">
            <PrescriptionOption
              id="EPrescription"
              title="E-Prescription"
              prescriptionClassName="prescription-option"
              description="A DocuSign email will be sent to the prescriber requesting an electronically signed prescription"
              isOptionSelected={
                data.submitPrescription.value === "EPrescription"
              }
              buttonOnClick={radioButtonAction}
            />
            <EPrescription
              data={data}
              Validator={Validator}
              setData={setData}
            />
            <PrescriptionOption
              id="RxImage"
              title="Rx Upload"
              prescriptionClassName="prescription-option"
              description="Attach the prescription to this order by using the scan icon (additional documents may be included)"
              isOptionSelected={data.submitPrescription.value === "RxImage"}
              buttonOnClick={radioButtonAction}
            />
            {data.submitPrescription.value === "RxImage" && (
              <UploadPrescription
                data={NewOrderObj?.prescriptionDocuments}
                setData={NewOrderObj?.setPrescriptionDocuments}
              />
            )}
            <PrescriptionOption
              id="Fax"
              title="Fax in Later"
              prescriptionClassName="prescription-option changePrescriptionTypesTitle"
              description="After submitting this order, please fax the prescription and other clinical documents to "
              isOptionSelected={data.submitPrescription.value === "Fax"}
              buttonOnClick={radioButtonAction}
              isFaxLater={true}
              phoneNumber="1-888-245-2295."
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
