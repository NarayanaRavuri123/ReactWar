import React, { useContext, useEffect } from "react";
import CustomDropZone from "../../../core/customDropZone/customDropZone.component";
import "./orderUploadDocument.css";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import { INewOrder } from "../newOrder.interface";
import { OrderUploadDocumentReviewOrder } from "./reviewOrder/orderUploadDocumentReviewOrder.component";
import { IDropZoneDocumentSelect } from "../../../core/customDropZone/dropZoneDocumentSelect.interface";

type Props = {
  editButtonClicked?: any;
  isOrderSummary?: boolean;
  isReviewOrder?: boolean;
  newOrderDocuments?: IDropZoneDocumentSelect[];
};

const OrderUploadDocument = ({
  editButtonClicked,
  isOrderSummary = false,
  isReviewOrder = false,
  newOrderDocuments,
}: Props) => {
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const allowedFiles = {
    "image/png": [".jpeg", ".gif", ".jpg", ".png"],
    "text/pdf": [".pdf"],
    "text/document": [".doc", ".docx", ".txt", ".rtf"],
  };

  useEffect(() => {
    if (
      NewOrderObj?.newOrderDocuments.some((file) => file.succeeded === false) ||
      NewOrderObj?.prescriptionDocuments.some(
        (file) => file.succeeded === false
      )
    ) {
      NewOrderObj?.setErrorInUploadFiles(true);
    } else {
      NewOrderObj?.setErrorInUploadFiles(false);
    }
    if (NewOrderObj?.newOrderData.submitPrescription.value === "RxImage") {
      if (NewOrderObj?.prescriptionDocuments.length === 0) {
        NewOrderObj?.setErrorInUploadFiles(true);
      }
    }
  }, [NewOrderObj?.newOrderDocuments, NewOrderObj?.prescriptionDocuments]);
  //set the is dirty to true if any new document uploaded or existing remooved
  useEffect(() => {
    if (
      NewOrderObj?.deletedOrderDocuments &&
      NewOrderObj?.deletedOrderDocuments.length > 0
    ) {
      NewOrderObj?.setIsHandleChangeTriggered(true);
    }
    if (
      NewOrderObj?.newOrderDocuments &&
      NewOrderObj?.newOrderDocuments.filter(
        (x) => !x.documentId && x.succeeded !== false
      ).length > 0
    ) {
      NewOrderObj?.setIsHandleChangeTriggered(true);
    }
  }, [NewOrderObj?.newOrderDocuments, NewOrderObj?.deletedOrderDocuments]);

  return (
    <div className="newOrderDoc">
      {!isReviewOrder && (
        <>
          <div className="uploadDoc">Upload Documents</div>
          <div className="uploadDocDesp">
            Documents uploaded are associated with the patient above and
            submitted to 3M for order processing. Files must be in one of the
            following formats: JPG, GIF, JPEG, PNG, TIFF or PDF.
            Each file cannot exceed 10 MB (10240 KB) in size.
          </div>
          <CustomDropZone
            allowedFiles={allowedFiles}
            setData={NewOrderObj?.setNewOrderDocuments}
            data={NewOrderObj?.newOrderDocuments}
            deletedData={NewOrderObj?.deletedOrderDocuments}
            setDeletedData={NewOrderObj?.setDeletedOrderDocuments}
            dragDropText="Drag and drop files here to upload"
            buttonDropText="Select files to upload"
            dropZoneStyles="dropZoneStyles"
            dragAndDropStyles="dragAndDrop"
            uploadWidgetCard="uploadWidgetCard"
            uploadIconStyle="uploadIconStyle"
            listingType="newOrder"
            maxFileSize={10240000}
            singleFile={false}
          />
        </>
      )}
      {isReviewOrder && newOrderDocuments && newOrderDocuments?.length > 0 && (
        <OrderUploadDocumentReviewOrder
          editButtonClicked={editButtonClicked}
          isOrderSummary={isOrderSummary}
          newOrderDocuments={newOrderDocuments!}
        />
      )}
    </div>
  );
};

export default OrderUploadDocument;
