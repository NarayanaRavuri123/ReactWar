import { useContext, useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import "./proofOfDeliveryDocumentUpload.css";
import { ReactComponent as PrintIcon } from "../../../../assets/print.svg";
import RedCheck from "../../../../assets/redCheck.svg";
import GreenCheck from "../../../../assets/greenCheck.svg";
import SelectCloseIcon from "../../../../assets/selectclose.svg";
import CustomDropZone from "../../../../core/customDropZone/customDropZone.component";
import {
  SubmitProofOfDeliveryContext,
  SubmitProofOfDeliveryContextType,
} from "../../../../context/submitProofOfDeliveryContext";
import { uploadDocToIface } from "../../../../util/orderOverViewService";

export const ProofOfDeliveryDocumentUpload = ({
  setIsUploadSuccess,
  setIsLoading,
}: {
  setIsUploadSuccess: Function;
  setIsLoading: Function;
}) => {
  const submitProofOfDeliveryObj =
    useContext<SubmitProofOfDeliveryContextType | null>(
      SubmitProofOfDeliveryContext
    );
  const proofOfDeliveryUploadDocs =
    submitProofOfDeliveryObj?.proofOfDeliveryUploadDocs!;
  const setProofOfDeliveryUploadDocs =
    submitProofOfDeliveryObj?.setProofOfDeliveryUploadDocs!;
  const patientData = submitProofOfDeliveryObj?.patient;
  const allowedFiles = {
    "image/png": [".jpeg", ".gif", ".jpg", ".png", ".tiff"],
    "text/pdf": [".pdf"],
  };
  const fileStatus = submitProofOfDeliveryObj?.fileStatus;
  const setFileStatus = submitProofOfDeliveryObj?.setFileStatus!;
  const openProofOfDeliveryPdf = () => {};
  const removeDocumentAction = () => {
    setProofOfDeliveryUploadDocs([]);
  };
  const uploadDocumentAction = async () => {
    setIsLoading(true);
    if (
      proofOfDeliveryUploadDocs.length > 0 &&
      proofOfDeliveryUploadDocs[0].succeeded
    ) {
      let podUploadDoc = proofOfDeliveryUploadDocs[0];
      let document = {
        fileName: podUploadDoc.documentName,
        FileNetTypeCode: "POHD",
        Base64Content: podUploadDoc.documentBase64,
      };
      let uploadDocRequest = {
        RentalOrderNumber: patientData?.roNumber.toString(),
        files: [document],
      };
      const podDocResult = await uploadDocToIface(uploadDocRequest);
      setIsLoading(false);
      if (podDocResult && podDocResult.succeeded) {
        if (podDocResult.items[0].code === 1506) {
          setIsUploadSuccess(true);
        } else {
          proofOfDeliveryUploadDocs[0].succeeded = false;
          proofOfDeliveryUploadDocs[0].errorMessage = "Virus Detected";
        }
      } else {
        setIsUploadSuccess(false);
      }
    }
  };
  return (
    <div className="proofOfDeliveryUpload" data-testid="proofOfDeliveryUpload">
      <>
        <Grid container className="pod-upload-container">
          <Grid item xs={4.05} data-testid="pod-title-msg">
            A POD/AOB signed and dated by the patient or authorized agent is
            required to receive care
          </Grid>
          <Grid item xs={5}>
            <Button
              classes={{ root: "print-pod-button" }}
              data-testid="print-pod-button"
              variant="outlined"
              onClick={openProofOfDeliveryPdf}
              startIcon={<PrintIcon />}
            >
              Download & Print POD
            </Button>
          </Grid>
        </Grid>
        {proofOfDeliveryUploadDocs?.length === 0 ? (
          <Grid item xs={7} className="pod-upload-doc-container">
            <div className="pod-upload-desp" data-testid="pod-upload-desp">
              Files must be in one of the following formats: JPG, GIF, JPEG,
              PNG, TIFF or PDF. Each file cannot exceed 10 MB (10240 KB) in
              size. Only one file can be uploaded for the POD/AOB.
            </div>
            <CustomDropZone
              allowedFiles={allowedFiles}
              setData={setProofOfDeliveryUploadDocs}
              data={proofOfDeliveryUploadDocs}
              data-testid="pod-drop-zone"
              dragDropText="Drag and drop signed POD file here to upload"
              buttonDropText="Select POD file to upload"
              dropZoneStyles="dropZoneStyles"
              dragAndDropStyles="dragAndDrop"
              uploadWidgetCard="uploadWidgetCard"
              uploadIconStyle="uploadIconStyle"
              listingType="prescriptionDoc"
              buttonDropClassName="selectPodBtn"
              maxFileSize={10240000}
              singleFile={true}
            />
          </Grid>
        ) : (
          <Grid item xs={7} className="pod-upload-doc-container">
            <div className="pod-selectedFileDiv">
              <div className={"pod-selected-file-div"}>
                <div key={0} className="pod-fileDetailCard">
                  <div className="pod-filename" data-testid="pod-file-name">
                    {proofOfDeliveryUploadDocs[0].documentName}
                  </div>
                  <div
                    className={`pod-fileStatus${
                      !proofOfDeliveryUploadDocs[0].succeeded ? `error` : ``
                    }`}
                    data-testid={
                      !proofOfDeliveryUploadDocs[0].succeeded
                        ? "pod-error"
                        : "pod-success"
                    }
                  >
                    {!proofOfDeliveryUploadDocs[0].succeeded ? (
                      <div className="check-mark-img">
                        <img src={RedCheck} alt={RedCheck} />
                      </div>
                    ) : (
                      <div className="check-mark-img">
                        <img src={GreenCheck} alt={GreenCheck} />
                      </div>
                    )}
                    <span className="upload-status">
                      {proofOfDeliveryUploadDocs[0].succeeded
                        ? "Upload successful!"
                        : proofOfDeliveryUploadDocs[0].errorMessage}
                    </span>
                  </div>
                  <div
                    className="pod-fileClose"
                    data-testid="pod-fileClose"
                    onClick={removeDocumentAction}
                  >
                    <img src={SelectCloseIcon} alt={SelectCloseIcon} />
                  </div>
                </div>
              </div>
              <div className="pod-uploadDocBtn" data-testid="pod-uploadDocBtn">
                <ExpressButton
                  disabled={!proofOfDeliveryUploadDocs[0].succeeded}
                  parentClass="btnUpload"
                  variant="contained"
                  clickHandler={uploadDocumentAction}
                >
                  Submit POD
                </ExpressButton>
              </div>
            </div>
          </Grid>
        )}
      </>
    </div>
  );
};
