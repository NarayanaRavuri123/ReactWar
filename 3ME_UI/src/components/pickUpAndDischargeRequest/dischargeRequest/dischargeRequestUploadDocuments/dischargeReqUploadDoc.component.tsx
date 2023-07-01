import { useContext, useEffect } from "react";
import {
  DischargeRequestContext,
  DischargeRequestContextType,
} from "../../../../context/DischargeRequestContext";
import "./dischargeRequestUploadDocuments.css";
import CustomDropZone from "../../../../core/customDropZone/customDropZone.component";
import DischargeReqUploadDocReview from "./dischargeRequestUploadDocumentsReview/dischargeReqUploadDoc.review.component";
interface Props {
  isReviewDischargePage?: boolean;
  dischargeRequestEditBtnClick?: () => void;
  isSummaryDischargePage?: boolean;
}
const DischargeReqUploadDoc = ({
  isReviewDischargePage = false,
  dischargeRequestEditBtnClick,
  isSummaryDischargePage = false,
}: Props) => {
  const dischargeRequestObj = useContext<DischargeRequestContextType | null>(
    DischargeRequestContext
  );
  const allowedFiles = {
    "image/png": [".jpeg", ".gif", ".jpg", ".png"],
    "text/pdf": [".pdf"],
    "text/document": [".doc", ".docx", ".txt", ".rtf"],
  };

  useEffect(() => {
    if (
      dischargeRequestObj?.dischargeRequestDocuments.some(
        (file) => file.succeeded === false
      )
    ) {
      dischargeRequestObj?.setErrorInUploadFiles(true);
    } else {
      dischargeRequestObj?.setErrorInUploadFiles(false);
    }
  }, [
    dischargeRequestObj?.dischargeRequestDocuments,
    dischargeRequestObj?.deletedDischargeRequestDocuments,
  ]);

  return !isReviewDischargePage ? (
    <div className="dischargeReqDoc">
      <div
        data-testid="dischargeReq-doc-header"
        className="uploadDischargeReqDoc"
      >
        Upload Documents
      </div>
      <div
        data-testid="dischargeReq-doc-desc"
        className="uploadDischargeReqDocDesc"
      >
        Documents uploaded are associated with the patient above and submitted
        to 3M for order processing. Files must be in one of the following
        formats: JPG, GIF, JPEG, PNG, TIFF or PDF. Each file
        cannot exceed 10 MB (10240 KB) in size.
      </div>
      <CustomDropZone
        allowedFiles={allowedFiles}
        setData={dischargeRequestObj?.setDischargeRequestDocuments}
        data={dischargeRequestObj?.dischargeRequestDocuments}
        deletedData={dischargeRequestObj?.deletedDischargeRequestDocuments}
        setDeletedData={
          dischargeRequestObj?.setDeletedDischargeRequestDocuments
        }
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
    </div>
  ) : (
    <DischargeReqUploadDocReview
      dischargeRequestEditBtnClick={dischargeRequestEditBtnClick}
      isSummaryDischargePage={isSummaryDischargePage}
    />
  );
};

export default DischargeReqUploadDoc;
