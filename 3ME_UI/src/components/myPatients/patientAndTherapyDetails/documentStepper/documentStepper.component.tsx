import { useContext, useEffect, useState } from "react";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../../../context/OrderDetailsContext";
import { IDropZoneDocumentSelect } from "../../../../core/customDropZone/dropZoneDocumentSelect.interface";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { Popup } from "../../../../core/popup/popup.component";
import { getdropDownContent } from "../../../../util/dropDownService";
import {
  getAllDocuments,
  uploadDocToIface,
} from "../../../../util/orderOverViewService";
import {
  DD_UPLOAD_DOCUMENT_TYPE,
  FILE_UPLOAD_LOCAL_ERROR_MESSAGE,
} from "../../../../util/staticText";
import { getCodeFromText } from "../../../../util/utilityFunctions";
import NewOrderErrorPopupMessage from "../../../newOrder/newOrderFooterGroup/newOrderErrorPopupMessage.component";
import { IPatient } from "../../patient.interface";
import OrderOverviewDocumentUpload from "../orderOverviewDocumentUpload/orderOverviewDocumentUpload.component";
import "./documentStepper.css";
import OrderOverviewDocument from "./orderOverviewDocument/orderOverviewDocument.components";
import OrderOverviewSubmittedDocuments from "./orderOverviewSubmittedDocument/orderOverviewSubmittedDocument.component";
import { IGetAllDocumentsRequest } from "./orderOverviewSubmittedDocument/submittedDocument.interface";
import moment from "moment";

interface Props {
  selectedTab: any;
  printableDocumentsLink: any;
  patientData: IPatient;
  commonDocs: any;
  commonDocsText: any;
  pdfUrl: any;
  documentTypeCode: any;
  submittedDocumentsLoader: boolean;
  documentTypeText: any;
  alertsForRO?: IPatient;
}
const DocumentStepper = ({
  selectedTab,
  printableDocumentsLink,
  patientData,
  commonDocs,
  commonDocsText,
  pdfUrl,
  documentTypeCode,
  submittedDocumentsLoader,
  documentTypeText,
  alertsForRO,
}: Props) => {
  const orderOverviewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  const [orderOverviewErrorPopPpFlag, setOrderOverviewErrorPopPpFlag] =
    useState(false);

  const [uploadDocumentsLoader, setUploadDocumentsLoader] =
    useState<boolean>(false);
  const [errorMessage, seterrorMessage] = useState("");

  const callUploadDocToIFace = async () => {
    if (
      orderOverviewObj &&
      orderOverviewObj.orderOverviewDocsUpload &&
      orderOverviewObj.orderOverviewDocsUpload.length > 0
    ) {
      let uploadedDocs: any[] = [];
      orderOverviewObj?.orderOverviewDocsUpload!.forEach((document) => {
        if (!document.documentId) {
          let uploadedDoc = {
            FileName: document.documentName,
            FileNetTypeCode: getCodeFromText(
              documentTypeCode,
              document.documentType?.value!
            ),
            Base64Content: document.documentBase64,
          };
          uploadedDocs.push(uploadedDoc);
        }
      });
      if (uploadedDocs.length > 0) {
        let docRequest = {
          RentalOrderNumber: patientData.roNumber,
          Files: uploadedDocs,
        };
        setUploadDocumentsLoader(true);
        const response = await uploadDocToIface(docRequest);
        if (!response.succeeded) {
          setUploadDocumentsLoader(false);
          setOrderOverviewErrorPopPpFlag(true);
          seterrorMessage(FILE_UPLOAD_LOCAL_ERROR_MESSAGE);
        } else {
          let updatedFiles: IDropZoneDocumentSelect[] = [];
          let errorFiles: IDropZoneDocumentSelect[] = [];
          orderOverviewObj.orderOverviewDocsUpload.forEach(
            (item: IDropZoneDocumentSelect) => {
              const file = response.items.filter(
                (doc: { fileName: string; documentTypeCode: string }) =>
                  doc.fileName === item.documentName
              )[0];
              item.succeeded = file.code === 1506;
              if (item.succeeded) {
                item.documentId = file.message;
                item.documentType = {
                  value: getCodeFromText(
                    documentTypeCode,
                    item.documentType!.value
                  ),
                  valid: ValidationStatus.VALID,
                };
                item.submissionDate = moment
                  .utc(new Date(), "YYYY-MM-DDTHH:mm:ss")
                  .utcOffset("-06:00")
                  .format("l hh:mm:ss A");
                item.fileType = item.documentName.substring(
                  item.documentName.lastIndexOf(".") + 1
                );
                updatedFiles.push(item);
              } else {
                item.errorMessage = file.message;
                errorFiles.push(item);
              }
            }
          );
          let updateExistingData = orderOverviewObj.documentsDetails;
          orderOverviewObj.setDocumentDetails([
            ...updatedFiles,
            ...updateExistingData,
          ]);
          if (errorFiles.length > 0) {
            orderOverviewObj?.setorderOverviewDocsUpload(errorFiles!);
          } else {
            orderOverviewObj?.setorderOverviewDocsUpload([]);
          }
          setUploadDocumentsLoader(false);
        }
      }
    }
  };

  const handleErrorPopupBackButton = () => {
    setOrderOverviewErrorPopPpFlag(false);
  };

  const handleExitButton = () => {
    setOrderOverviewErrorPopPpFlag(false);
  };

  const spinner = () => {
    return (
      <div>
        <div className="saveapi-header"></div>
        <div className="saveapi-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };
  return (
    <div className="documentstepper-container">
      {!submittedDocumentsLoader && (
        <div className="documentstepperForm">
          <OrderOverviewDocument
            printableDocumentsLink={printableDocumentsLink}
            selectedPatientData={patientData}
            commonDocs={commonDocs}
            commonDocsText={commonDocsText}
            pdfUrl={pdfUrl}
            alertsForRO={alertsForRO}
          />
          <OrderOverviewDocumentUpload
            callUploadDocToIFace={callUploadDocToIFace}
            documentTypeText={documentTypeText}
          />
          <OrderOverviewSubmittedDocuments
            documentsData={orderOverviewObj?.documentsDetails!}
            documentTypeCode={documentTypeCode}
          />
        </div>
      )}
      <NewOrderErrorPopupMessage
        errorPopupFlag={orderOverviewErrorPopPpFlag}
        handleBackButton={() => handleErrorPopupBackButton()}
        popUpStyles="newOrderErrorPopup"
        errorMessage={errorMessage}
        isSaveExitFlow={false}
        handleExitButton={() => handleExitButton()}
      />
      {uploadDocumentsLoader ? (
        <Popup
          hideCloseButton={true}
          openFlag={uploadDocumentsLoader}
          closeHandler={() => {}}
        >
          {spinner()}
        </Popup>
      ) : (
        ""
      )}
    </div>
  );
};

export default DocumentStepper;
