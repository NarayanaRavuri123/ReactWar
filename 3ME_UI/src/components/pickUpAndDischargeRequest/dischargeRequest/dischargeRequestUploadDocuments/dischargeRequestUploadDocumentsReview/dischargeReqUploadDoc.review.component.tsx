import { Button, Grid } from "@mui/material";
import React, { useContext } from "react";
import "./dischargeRequestUploadDoc.review.css";
import {
  DischargeRequestContext,
  DischargeRequestContextType,
} from "../../../../../context/DischargeRequestContext";
import { IDropZoneDocumentSelect } from "../../../../../core/customDropZone/dropZoneDocumentSelect.interface";

interface Props {
  dischargeRequestEditBtnClick?: () => void;
  isSummaryDischargePage?: boolean;
}

const DischargeReqUploadDocReview = ({
  dischargeRequestEditBtnClick,
  isSummaryDischargePage,
}: Props) => {
  const DischargeReqObj = useContext<DischargeRequestContextType | null>(
    DischargeRequestContext
  );

  return (
    <>
      <Grid container spacing={2}>
        <div className="document-title" data-testId="document-title">
          <>
            Documents
            {!isSummaryDischargePage && (
              <Button
                classes={{ root: "edit-doc" }}
                data-testId="edit-doc-test"
                onClick={dischargeRequestEditBtnClick}
              >
                Edit
              </Button>
            )}
          </>
        </div>
        <div className="document-info-div">
          {DischargeReqObj?.dischargeRequestDocuments.length! > 0
            ? DischargeReqObj?.dischargeRequestDocuments.map(
                (obj: IDropZoneDocumentSelect) => (
                  <h5 className="listDocs" data-testid="order-upload-value">
                    <span className="dot-with-space">&bull; </span>
                    {obj.documentName}
                  </h5>
                )
              )
            : "-"}
        </div>
      </Grid>
    </>
  );
};

export default DischargeReqUploadDocReview;
