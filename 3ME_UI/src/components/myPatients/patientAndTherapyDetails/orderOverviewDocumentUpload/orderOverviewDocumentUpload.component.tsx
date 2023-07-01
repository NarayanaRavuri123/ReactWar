import { useContext } from "react";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../../../context/OrderDetailsContext";
import CustomDropZone from "../../../../core/customDropZone/customDropZone.component";
import "./orderOverviewDocumentUpload.css";

type Props = {
  isTestingComponent?: boolean;
  callUploadDocToIFace: Function;
  documentTypeText: any;
};

const OrderOverviewDocumentUpload = ({
  isTestingComponent = false,
  callUploadDocToIFace,
  documentTypeText,
}: Props) => {
  const orderOverViewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  const allowedFiles = {
    "image/png": [".jpeg", ".gif", ".jpg", ".png", ".tiff"],
    "text/pdf": [".pdf"],
  };

  return (
    <div className="order-upload-doc">
      <div className="order-upload-doc-container">
        <div className="">
          <h2
            className="order-upload-doc-header"
            data-testid="order-upload-doc-header"
          >
            Upload Documents
          </h2>
          <div data-testid="order-upload-desc" className="order-upload-desc">
            Documents uploaded are associated with the patient above and
            submitted to 3M for order processing. Files must be in one of the
            following formats: JPG, GIF, JPEG, PNG, TIFF or PDF. Each file
            cannot exceed 10 MB (10240 KB) in size.
          </div>
          <CustomDropZone
            allowedFiles={allowedFiles}
            setData={orderOverViewObj?.setorderOverviewDocsUpload}
            data={orderOverViewObj?.orderOverviewDocsUpload!}
            deletedData={orderOverViewObj?.deletedOrderDocuments}
            setDeletedData={orderOverViewObj?.setDeletedOrderDocuments}
            dragDropText="Drag and drop files here to upload"
            buttonDropText="Select files to upload"
            dropZoneStyles="dropZoneStyles"
            dragAndDropStyles="dragAndDrop"
            uploadWidgetCard="orderuploadDocWidgetCard"
            uploadIconStyle="uploadIconStyle"
            listingType="orderOverview"
            maxFileSize={10240000}
            singleFile={false}
            isTestingComponent={isTestingComponent}
            callUploadDocToIFace={callUploadDocToIFace}
            uploadedData={orderOverViewObj?.documentsDetails}
            documentTypeText={documentTypeText}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderOverviewDocumentUpload;
