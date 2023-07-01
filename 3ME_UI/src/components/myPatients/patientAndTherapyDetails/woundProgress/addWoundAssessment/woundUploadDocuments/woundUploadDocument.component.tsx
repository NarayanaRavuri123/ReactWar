import React, { useContext, useEffect } from "react";
import {
  WoundAssessmentContext,
  WoundAssessmentContextType,
} from "../../../../../../context/WoundAssessmentContext";
import CustomDropZone from "../../../../../../core/customDropZone/customDropZone.component";
import "./woundUploadDocument.css";

type Props = { isTestingComponent?: boolean };

const WoundUploadDocument = ({ isTestingComponent = false }: Props) => {
  const WoundAssessmentObj = useContext<WoundAssessmentContextType | null>(
    WoundAssessmentContext
  );
  const allowedFiles = {
    "image/png": [".jpeg", ".gif", ".jpg", ".png"],
    "text/pdf": [".pdf"],
    "text/document": [".doc", ".docx", ".txt", ".rtf"],
  };
  useEffect(() => {
    if (
      WoundAssessmentObj?.woundDocsUpload.some(
        (file) => file.succeeded === false
      )
    ) {
      WoundAssessmentObj?.setErrorInDocUploadFiles(true);
    } else {
      WoundAssessmentObj?.setErrorInDocUploadFiles(false);
    }
  }, [
    WoundAssessmentObj?.woundDocsUpload,
    WoundAssessmentObj?.deletedWoundDocuments,
  ]);

  useEffect(() => {
    if (
      WoundAssessmentObj?.deletedWoundDocuments &&
      WoundAssessmentObj?.deletedWoundDocuments.length > 0
    ) {
      WoundAssessmentObj?.setIsHandleChangeTriggered(true);
    }
    if (
      WoundAssessmentObj?.woundDocsUpload &&
      WoundAssessmentObj?.woundDocsUpload.filter(
        (x) => !x.documentId && x.succeeded !== false
      ).length > 0
    ) {
      WoundAssessmentObj?.setIsHandleChangeTriggered(true);
    }
  }, [
    WoundAssessmentObj?.woundDocsUpload,
    WoundAssessmentObj?.deletedWoundDocuments,
  ]);

  return (
    <div className="newWoundDoc">
      <div data-testid="wound-doc-header" className="uploadWoundDoc">
        Upload Additional Documents
        <div data-testid="wound-doc-desc" className="uploadWoundDocDesc">
          Documents uploaded are associated with the patient above and submitted
          to 3M for order processing. Files must be in one of the following
          formats: JPG, GIF, JPEG, PNG, TIFF or PDF. Each file
          cannot exceed 10 MB (10240 KB) in size.
        </div>
        <CustomDropZone
          allowedFiles={allowedFiles}
          setData={WoundAssessmentObj?.setwoundDocsUpload}
          data={WoundAssessmentObj?.woundDocsUpload}
          deletedData={WoundAssessmentObj?.deletedWoundDocuments}
          setDeletedData={WoundAssessmentObj?.setDeletedWoundDocuments}
          dragDropText="Drag and drop files here to upload"
          buttonDropText="Select files to upload"
          dropZoneStyles="dropZoneStyles"
          dragAndDropStyles="dragAndDrop"
          uploadWidgetCard="uploadWidgetCard"
          uploadIconStyle="uploadIconStyle"
          listingType="newOrder"
          maxFileSize={10240000}
          singleFile={false}
          isTestingComponent={isTestingComponent}
        />
      </div>
    </div>
  );
};
export default WoundUploadDocument;
