import "./missingRx.css";
import moment from "moment";
import { useState, useEffect } from "react";
import { IPatient } from "../../patient.interface";
import { MissingRxSection } from "./missingRx.enum";
import { getCMSContent } from "../../../../util/cmsService";
import {
  IPrescriberDetailInterface,
  defaultPrescriberDetail,
} from "./missingRxEPrescription/prescriberDetail.interface";
import {
  getEPrescriptionStatus,
  getPrescriptionDetails,
  getPrescriptionInfo,
} from "../../../../util/3meService";
import { CMS_PRINTABLE_DOCUMENTS } from "../../../../util/staticText";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import MissingRxFax from "./missingRxFaxInLater/missingRxFax.component";
import MissingRxUpload from "./missingRxUpload/missingRxUpload.component";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import AlertPopup from "../../../../core/alertButton/alertPopup/alertPopup.component";
import { MissingRxUploadFail } from "./missingRxUploadFail/missingRxUploadFail.component";
import MissingRxFaxSent from "./missingRxFaxInLaterSent/missingRxFaxSent.component.component";
import ChangePrescriptionType from "./changePrescriptionType/changePrescriptionType.component";
import MissingRxEPrescription from "./missingRxEPrescription/missingRxEPrescription.component";
import { MissingRxUploadSuccess } from "./missingRxUploadSuccess/missingRxUploadSuccess.component";
import MissingRxPrescriptionSent from "./missingRxPrescriptionSent/missingRxPrescriptionSent.component";
import { IPrintableDocumentsPdf } from "../../../newOrder/printCommonDocs/printCommonDocs.interface";
import { NewOrderValidator } from "../../../newOrder/newOrder.validator";
import { getUntouchedObj } from "../../../../util/utilityFunctions";

interface Props {
  closePopUpAction: Function;
  isSendPrescription?: boolean;
  patientData: IPatient;
}

const MissingRx = ({
  closePopUpAction,
  isSendPrescription = false,
  patientData,
}: Props) => {
  const [missingRxPopUpSection, setMissingRxPopUpSection] =
    useState<MissingRxSection>(MissingRxSection.MISSING_RX_LOADER);
  const [prescriptionType, setPrescriptionType] = useState<string | null>(null);
  const [prescriberDetails, setPrescriberDetails] =
    useState<IPrescriberDetailInterface>(defaultPrescriberDetail);
  const [pdfLinks, setPdfLinks] = useState<IPrintableDocumentsPdf | null>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const changeMissingRxPopUpDisplaySection = (
    newSection: MissingRxSection,
    errorMessage?: string
  ) => {
    if (errorMessage) {
      setErrorMessage(errorMessage);
    }
    setMissingRxPopUpSection(newSection);
  };

  const getPrescriptionMode = (value: Number) => {
    switch (value) {
      case 1:
        return "RxImage";
      case 2:
        return "EPrescription";
      case 3:
        return "Fax";
      default:
        return null;
    }
  };

  const getPresciberUserDetailsAndPdfLink = async () => {
    let tempArray = [];
    if (patientData.roNumber && patientData.roNumber.toString() !== "") {
      tempArray.push(fetchPrescriptionInfo());
    } else {
      tempArray.push(fetchPrescriptionDetails());
    }
    tempArray.push(getVacTherapyRxPadPdf());
    tempArray.push(fetchEPrescriptionStatus());
    const results = await Promise.all(tempArray);
    if (isSendPrescription) {
      setPrescriptionType("EPrescription");
    } else {
      setPrescriptionType(results[0] ?? "EPrescription");
    }
    const links = results[1];
    if (links) {
      setPdfLinks(links);
    }
  };

  const fetchPrescriptionInfo = async () => {
    try {
      const reqBody = {
        RentalOrderNumber: patientData.roNumber.toString(),
      };
      const response = await getPrescriptionInfo(reqBody);
      const data = response.data;
      if (
        data &&
        data.prescriberFirstName !== null &&
        data.prescriberLastName !== null &&
        data.prescriptionUploadMode !== 2
      ) {
        const validator = new NewOrderValidator();
        let isValid;
        if (data.prescriberEmailAddress) {
          isValid = validator.validate(
            data.prescriberEmailAddress,
            "updatedPrescriberEmail"
          );
        } else {
          isValid = getUntouchedObj();
        }
        const tempData = {
          prescriberName: {
            value: data.prescriberFirstName + " " + data.prescriberLastName,
            valid: ValidationStatus.VALID,
            required: false,
          },
          updatedPrescriberEmail: {
            value: data.prescriberEmailAddress,
            valid: isValid!.status,
            required: false,
          },
        };
        setPrescriberDetails(tempData);
        return getPrescriptionMode(data.prescriptionUploadMode);
      } else {
        return await fetchPrescriptionDetails();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchPrescriptionDetails = async () => {
    try {
      const reqBody = {
        RentalOrderNumber: patientData.roNumber.toString(),
        DOB: moment(patientData.dob).format("MM/DD/yyyy"),
      };
      const data = await getPrescriptionDetails(reqBody);
      if (data) {
        const tempData = {
          prescriberName: {
            value: data.prescriberFirstName + " " + data.prescriberLastName,
            valid: ValidationStatus.VALID,
            required: false,
          },
          updatedPrescriberEmail: {
            value: data.prescriberEmailAddress,
            valid: ValidationStatus.VALID,
            required: false,
          },
        };
        setPrescriberDetails(tempData);
        return data.prescriptionUploadMode;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getVacTherapyRxPadPdf = async () => {
    try {
      const response = await getCMSContent(CMS_PRINTABLE_DOCUMENTS);
      if (response.succeeded) {
        const pdfLinksData: IPrintableDocumentsPdf = {
          VACTherapyOrderPad: response.item.orderPad.FileLink,
          VACTherapyInsuranceAuthorizationForm:
            response.item.authorizationForm.FileLink,
        };
        return pdfLinksData;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchEPrescriptionStatus = async () => {
    try {
      const reqBody = {
        RentalOrderNumber: patientData.roNumber.toString(),
      };
      const data = await getEPrescriptionStatus(reqBody);
      if (data.succeeded && data.item && data.item.showErrorMessage) {
        setShowErrorMessage(data.item.showErrorMessage ?? false);
      } else {
        setShowErrorMessage(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const closePopUp = () => {
    closePopUpAction();
  };

  useEffect(() => {
    setMissingRxPopUpSection(MissingRxSection.MISSING_RX_LOADER);
    getPresciberUserDetailsAndPdfLink();
  }, []);

  useEffect(() => {
    if (prescriptionType) {
      switch (prescriptionType) {
        case "EPrescription":
          setMissingRxPopUpSection(MissingRxSection.E_PRESBRIBER);
          break;
        case "RxImage":
          setMissingRxPopUpSection(MissingRxSection.RX_UPLOAD);
          break;
        case "Fax":
          setMissingRxPopUpSection(MissingRxSection.FAX_IN_LATER);
          break;
        default:
          setPrescriptionType("EPrescription");
          break;
      }
    }
  }, [prescriptionType]);

  const missingRxPopUpDisplaySection = () => {
    switch (missingRxPopUpSection) {
      case MissingRxSection.E_PRESBRIBER:
        return (
          <MissingRxEPrescription
            closePopUpAction={closePopUp}
            changePopUpSection={changeMissingRxPopUpDisplaySection}
            patientData={patientData}
            prescriberDetails={prescriberDetails}
            showErrorMessage={showErrorMessage}
            setPrescriberDetails={setPrescriberDetails}
          />
        );
      case MissingRxSection.E_PRESBRIBER_SENT:
        return (
          <MissingRxPrescriptionSent
            prescriberDetails={prescriberDetails}
            setPrescriberDetails={setPrescriberDetails}
            closePopUpAction={closePopUp}
          />
        );
      case MissingRxSection.RX_UPLOAD:
        return (
          <MissingRxUpload
            changePopUpSection={changeMissingRxPopUpDisplaySection}
            patientData={patientData}
            pdfLink={pdfLinks!.VACTherapyOrderPad}
          />
        );
      case MissingRxSection.RX_UPLOAD_SENT:
        return <MissingRxUploadSuccess closePopUpAction={closePopUp} />;
      case MissingRxSection.RX_UPLOAD_FAILED:
        return (
          <MissingRxUploadFail
            changePopUpSection={changeMissingRxPopUpDisplaySection}
            errorMessage={errorMessage}
          />
        );
      case MissingRxSection.MISSING_RX_LOADER:
        return LoadSpinner();
      case MissingRxSection.FAX_IN_LATER:
        return (
          <MissingRxFax
            changePopUpSection={changeMissingRxPopUpDisplaySection}
            patient={patientData}
            pdfLink={pdfLinks!.VACTherapyOrderPad}
          />
        );
      case MissingRxSection.FAX_IN_LATER_SENT:
        return (
          <MissingRxFaxSent
            closePopUpAction={closePopUp}
            pdfLink={pdfLinks!.VACTherapyOrderPad}
          />
        );
      case MissingRxSection.CHANGE_PRESCRIBER_TYPE:
        return (
          <ChangePrescriptionType
            changePopUpSection={changeMissingRxPopUpDisplaySection}
            closePopUpAction={closePopUp}
            patientData={patientData}
            pdfLink={pdfLinks!.VACTherapyOrderPad}
            prescriberDetails={prescriberDetails}
            showErrorMessage={showErrorMessage}
            selectedPrescription={prescriptionType!}
            setPrescriberDetails={setPrescriberDetails}
          />
        );
      default:
        return <div style={{ width: "200px", height: "56px" }}></div>;
    }
  };

  const LoadSpinner = () => {
    return (
      <div className="missing-rx-spinner">
        <div className="spinner-missing-rx-space">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  return (
    <div className={missingRxPopUpSection}>
      <AlertPopup title="Missing Rx" titleClassName="missing-rx-header-title">
        {missingRxPopUpDisplaySection()}
      </AlertPopup>
    </div>
  );
};

export default MissingRx;
