import { Grid, useMediaQuery } from "@mui/material";
import moment from "moment";
import { ReactComponent as FileIcon } from "../../../../../../assets/empty_File_Icon.svg";
import "./submittedDocumentGridView.css";
import { getFileExtension } from "../../../../../../util/utilityFunctions";
import { WindowService } from "../../../../../../util/window.service";
import { useEffect, useState } from "react";
type Props = {
  documentsData: any[];
  clickToOpentheDocument: any;
  windowService?: WindowService;
};
const SubmittedDocumentGridView = ({
  documentsData,
  clickToOpentheDocument,
  windowService = new WindowService(),
}: Props) => {
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  useEffect(() => {
    windowService.resize(() => {
      if (windowService.getWidth() < 1090) {
        setIsMobileScreen(true);
      } else {
        setIsMobileScreen(false);
      }
    });
  }, []);
  const documentGridDisplay = (doc: any, index: number) => {
    return (
      <div className="doucument-details-container">
        <div className="icon-div">
          <FileIcon
            className="file-icon"
            data-testid="file-icon-list-view"
            title="file-icon"
          />
          <h5
            className={
              doc.fileType
                ? fileIconTextClassName(
                    getFileExtension(doc.documentName),
                    doc.fileType.toUpperCase()
                  )
                : fileIconTextClassName(
                    getFileExtension(doc.documentName),
                    "PDF"
                  )
            }
            data-testid="file-icon-text"
          >
            {doc.documentName
              ? getFileExtension(doc.documentName)
              : doc.fileType
              ? doc.fileType.toUpperCase()
              : "PDF"}
          </h5>
        </div>
        <div className="details">
          <div className="file-details">
            <h5
              className="document-name-title"
              data-testid="document-name-title"
            >
              File Name
            </h5>
            <p
              className="document-name-title-value"
              data-testid="document-name-title-value"
              onClick={() => clickToOpentheDocument(doc.documentId)}
            >
              {doc.documentName
                ? doc.documentName
                : doc.fileType
                ? doc.documentId + `.${doc.fileType.toLowerCase()}`
                : doc.documentId + ".pdf"}
            </p>
          </div>
          <div className="document-details">
            <div className="document-type-div">
              <h5 className="doc-type-title" data-testid="doc-type-title">
                Doc Type
              </h5>
              <p className="doc-type-title-value" data-testid="doc-type-value">
                {doc.succeeded ? doc?.documentType?.value : doc?.documentType}
              </p>
            </div>
            <div className="document-submitted-date-div">
              <h5
                className="doc-submitted-date-title"
                data-testid="doc-submitted-date-title"
              >
                Submit Date
              </h5>
              <p
                className="doc-submitted-date-value"
                data-testid="doc-submitted-date-value"
              >
                {moment.utc(doc.submissionDate).format("l hh:mm:ss A")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const fileIconTextClassName = (
    documentNameExtension: string,
    fileType: string
  ): string => {
    if (
      documentNameExtension.length === 4 &&
      documentNameExtension !== "" &&
      documentNameExtension !== "TIFF"
    ) {
      return "file-icon-text";
    } else if (
      documentNameExtension.length === 3 &&
      documentNameExtension !== null
    ) {
      return "file-icon-text-for-three";
    } else if (
      fileType.length === 4 &&
      documentNameExtension === "" &&
      fileType !== "TIFF"
    ) {
      return "file-icon-text";
    } else if (fileType.length === 3 && documentNameExtension === "") {
      return "file-icon-text-for-three";
    } else if (
      documentNameExtension.toUpperCase() === "TIFF" &&
      documentNameExtension !== ""
    )
      return "file-icon-text-tiff";
    else if (
      fileType.toUpperCase() === "TIFF" &&
      documentNameExtension === ""
    ) {
      return "file-icon-text-tiff";
    }
    return "";
  };
  return (
    <>
      <Grid
        container
        className="submitted-document-grid-view-container"
        spacing={0}
      >
        {documentsData &&
          documentsData?.map((doc, index) => {
            return isMobileScreen ? (
              <Grid item className="submitted-grid-view-item">
                {documentGridDisplay(doc, index)}
              </Grid>
            ) : (
              <Grid item sm={4} className="submitted-grid-view-item">
                {documentGridDisplay(doc, index)}
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default SubmittedDocumentGridView;
