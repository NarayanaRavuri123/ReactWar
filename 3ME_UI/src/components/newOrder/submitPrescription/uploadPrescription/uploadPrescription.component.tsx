import React from "react";
import CustomDropZone from "../../../../core/customDropZone/customDropZone.component";
import "./uploadPrescription.css";

type Props = {
  data: any;
  setData: any;
  buttonDropClassName?: string;
  buttonDropText?: string;
  removeTitleWhenFilesSelected?: boolean;
};

const UploadPrescription = ({
  data,
  setData,
  buttonDropClassName,
  buttonDropText = "Select prescription to upload",
  removeTitleWhenFilesSelected = false,
}: Props) => {
  const allowedFiles = {
    "image/png": [".jpeg", ".gif", ".jpg", ".png"],
    "text/pdf": [".pdf"],
    "text/document": [".doc", ".docx", ".txt", ".rtf"],
  };
  return (
    <div className="prescriptionDoc">
      {removeTitleWhenFilesSelected && data.length !== 0 ? null : (
        <div className="rxUploadDesp">
          Files must be in one of the following formats: JPG, GIF, JPEG, PNG,
         TIFF or PDF. Each file cannot exceed 10 MB (10240 KB)
          in size. Only one file can be uploaded in the Rx Upload.
        </div>
      )}
      <CustomDropZone
        allowedFiles={allowedFiles}
        setData={setData}
        data={data}
        dragDropText="Drag and drop prescription here to upload"
        buttonDropClassName={buttonDropClassName}
        buttonDropText={buttonDropText}
        dropZoneStyles="dropZoneStyles"
        dragAndDropStyles="dragAndDrop"
        uploadWidgetCard="uploadWidgetCard"
        uploadIconStyle="uploadIconStyle"
        listingType="prescriptionDoc"
        maxFileSize={10240000}
        singleFile={true}
      />
    </div>
  );
};

export default UploadPrescription;
