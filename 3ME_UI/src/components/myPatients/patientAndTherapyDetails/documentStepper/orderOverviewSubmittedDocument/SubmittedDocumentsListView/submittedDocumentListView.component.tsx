import { Grid } from "@mui/material";
import moment from "moment";
import { ReactComponent as FileIcon } from "../../../../../../assets/empty_File_Icon.svg";
import GreenCheck from "../../../../../../assets/greenCheck.svg";
import RedCheck from "../../../../../../assets/redCheck.svg";
import "./submittedDocumentListView.css";
import { getFileExtension } from "../../../../../../util/utilityFunctions";

type Props = {
  documentsData: any[];
  documentTypeCode: any;
  clickToOpentheDocument: any;
};
const SubmitDocumentListView = ({
  documentsData,
  documentTypeCode,
  clickToOpentheDocument,
}: Props) => {
  const getIconTextClassName = (
    documentName: string,
    fileType: string
  ): string => {
    if (
      documentName.length === 4 &&
      documentName !== "" &&
      documentName !== "TIFF"
    ) {
      return "file-icon-text-listView";
    } else if (documentName.length === 3 && documentName !== null) {
      return "file-icon-text-for-three-listView";
    } else if (
      fileType.length === 4 &&
      documentName === "" &&
      fileType !== "TIFF"
    ) {
      return "file-icon-text-listView";
    } else if (fileType.length === 3 && documentName === "") {
      return "file-icon-text-for-three-listView";
    } else if (documentName.toUpperCase() === "TIFF" && documentName !== "")
      return "file-icon-text-tiff-list-view";
    else if (fileType.toUpperCase() === "TIFF" && documentName === "") {
      return "file-icon-text-tiff-list-view";
    }
    return "";
  };
  return (
    <>
      {documentsData &&
        documentsData?.map((doc, index) => {
          return (
            <>
              <Grid
                container
                className="submitted-documents-grid-container"
                spacing={0}
              >
                <Grid className="submitted-documents-grid-item" item xs={1}>
                  <div className="file-icon-div" data-testId="file-icon-div">
                    <FileIcon
                      className="file-icon"
                      data-testid={`empty-file-icon-list-view`}
                      title="file-icon"
                    />
                    <h5
                      className={
                        doc.fileType !== null
                          ? getIconTextClassName(
                              getFileExtension(doc.documentName),
                              doc.fileType.toUpperCase()
                            )
                          : getIconTextClassName(
                              getFileExtension(doc.documentName),
                              "PDF"
                            )
                      }
                      data-testid="file-icon-text-list-view"
                    >
                      {doc.documentName !== null
                        ? getFileExtension(doc.documentName)
                        : doc.fileType !== null
                        ? doc.fileType.toUpperCase()
                        : "PDF"}
                    </h5>
                  </div>
                </Grid>
                <Grid className="submitted-documents-grid-item" item xs={4}>
                  <div className="submitted-documents-heading-div">
                    <h4
                      className="submitted-document-heading"
                      data-testId="submitted-document-heading-fileName"
                    >
                      File Name
                    </h4>
                    <p
                      className="submitted-document-link"
                      data-testId="submitted-document-file-name-value"
                      onClick={() => clickToOpentheDocument(doc.documentId)}
                    >
                      {doc.documentName
                        ? doc.documentName
                        : doc.fileType
                        ? doc.documentId + `.${doc.fileType.toLowerCase()}`
                        : doc.documentId + ".pdf"}
                    </p>
                  </div>
                </Grid>
                <Grid className="submitted-documents-grid-item" item xs={1.8}>
                  <div className="submitted-documents-heading-div">
                    <h4
                      className="submitted-document-heading"
                      data-testId="submitted-document-heading-doc-type"
                    >
                      Doc Type
                    </h4>
                    <p
                      className="submitted-document-doc-type-value"
                      data-testId="submitted-document-heading-doc-type-value"
                    >
                      {doc.succeeded
                        ? doc?.documentType?.value
                        : doc?.documentType}
                    </p>
                  </div>
                </Grid>
                <Grid className="submitted-documents-grid-item" item xs={2.5}>
                  <div className="submitted-documents-heading-div">
                    <h4
                      className="submitted-document-heading"
                      data-testId="submitted-document-heading-submit-date"
                    >
                      Submit Date
                    </h4>
                    <p
                      className="submitted-document-submit-date-valule"
                      data-testId="submitted-document-heading-submit-date-value"
                    >
                      {moment.utc(doc.submissionDate).format("l hh:mm:ss A")}
                    </p>
                  </div>
                </Grid>
                <Grid className="submitted-documents-grid-item" item xs={2.5}>
                  <div className="submitted-documents-heading-div">
                    {doc.succeeded && (
                      <div
                        className={`fileStatus${!doc.succeeded ? `error` : ``}`}
                      >
                        <img
                          style={{
                            verticalAlign: "text-bottom",
                            marginRight: "5px",
                          }}
                          src={doc.succeeded ? GreenCheck : RedCheck}
                          alt={GreenCheck}
                        />
                        {doc.succeeded ? "Upload success!" : doc.errorMessage}
                      </div>
                    )}
                  </div>
                </Grid>
              </Grid>
            </>
          );
        })}
    </>
  );
};
export default SubmitDocumentListView;
