import React from "react";
import "./changePrescriptionRxUpload.css";
import UploadPrescription from "../../../../../newOrder/submitPrescription/uploadPrescription/uploadPrescription.component";
import { IDropZoneDocumentSelect } from "../../../../../../core/customDropZone/dropZoneDocumentSelect.interface";

type Props = {
  docData: IDropZoneDocumentSelect[];
  setDocData: React.Dispatch<React.SetStateAction<IDropZoneDocumentSelect[]>>;
};

const ChangePrescriptionRxUpload = ({ docData, setDocData }: Props) => {
  return (
    <div className="change-pres" data-testid="change-pres">
      <div
        className="change-pres-uploaddiv"
        data-testid="change-pres-uploaddiv"
      >
        <UploadPrescription
          data={docData}
          setData={setDocData}
          buttonDropClassName={"change-pres-button-drop-select"}
          buttonDropText="Select prescription to upload"
          removeTitleWhenFilesSelected={true}
        />
      </div>
    </div>
  );
};

export default ChangePrescriptionRxUpload;
