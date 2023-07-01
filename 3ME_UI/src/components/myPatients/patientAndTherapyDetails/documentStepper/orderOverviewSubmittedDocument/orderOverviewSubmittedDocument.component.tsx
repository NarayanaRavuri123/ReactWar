import { useState } from "react";
import { ReactComponent as GridView } from "../../../../../assets/gridView.svg";
import { ReactComponent as GridViewSlected } from "../../../../../assets/gridView_selected.svg";
import { ReactComponent as ListView } from "../../../../../assets/listView.svg";
import { ReactComponent as ListViewSelected } from "../../../../../assets/listView_selected.svg";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import SubmittedDocumentGridView from "./SubmittedDocumentGridView/submittedDocumentGridView.component";
import SubmitDocumentListView from "./SubmittedDocumentsListView/submittedDocumentListView.component";
import "./orderOverviewSubmittedDocument.css";
import { IDropZoneDocumentSelect } from "../../../../../core/customDropZone/dropZoneDocumentSelect.interface";
import {
  getDocumentUrl,
  getPdfUrl,
  getPdfUrlGif,
} from "../../../../../util/utilityFunctions";
import { getDocumentContent } from "../../../../../util/orderOverViewService";
import {
  IGetDocumentContentRequest,
  IGetDocumentContentResponse,
} from "./submittedDocument.interface";
import SnackBar from "../../../../../core/snackBar/snackBar.component";
import jsPDF from "jspdf";
import { Popup } from "../../../../../core/popup/popup.component";
import { LoadingSpinner } from "../../../../../core/loader/LoadingSpinner";
import { Grid } from "@mui/material";
type Props = {
  documentsData: IDropZoneDocumentSelect[];
  documentTypeCode: any;
};
const OrderOverviewSubmittedDocuments = ({
  documentsData,
  documentTypeCode,
}: Props) => {
  const [switchToListView, setSwitchTolistView] = useState<boolean>(true);
  const [failedToDisplayPdf, setFailedToDisplayPdf] = useState<boolean>(false);
  const [getDocumentContentLoader, setGetDocumentContentLoader] =
    useState(false);
  const toggleToListView = () => {
    setSwitchTolistView(true);
  };
  const toggleToGridView = () => {
    setSwitchTolistView(false);
  };
  const spinner = () => {
    return (
      <div>
        <div className="addWound-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };
  const clickToOpentheDocument = async (documentId: string) => {
    setGetDocumentContentLoader(true);
    let reqBody: IGetDocumentContentRequest = {
      documentId: documentId,
    };
    const response = await getDocumentContent(reqBody);
    if (response.succeeded) {
      const item: IGetDocumentContentResponse = response.item;
      if (item.fileType && item.documentContent) {
        if (item.fileType.toLowerCase() === "pdf") {
          const url: any = await getPdfUrl(item.documentContent);
          window.open(url, "_blank");
          setGetDocumentContentLoader(false);
        } else {
          const url = await getDocumentUrl(item.fileType, item.documentContent);
          window.open(url, "_blank");
          setGetDocumentContentLoader(false);
        }
      }
    } else {
      setFailedToDisplayPdf(true);
      setTimeout(() => {
        setFailedToDisplayPdf(false);
      }, 5000);
      setGetDocumentContentLoader(false);
    }
  };
  return (
    <>
      <div className="submitted-documents-component">
        <SnackBar
          toastStyle="submittedDocumentTrackingToast"
          handleCloseAlert={() => {
            setFailedToDisplayPdf(false);
          }}
          msg="File does not yet exist. Please try again in a few minutes"
          openFlag={failedToDisplayPdf}
        />
        <div className="submitted-documents-info">
          <div className="submitted-documents-info-header">
            <h2
              className="submitted-documents-info-title"
              data-testId="submitted-documents-info-title"
            >
              Submitted Documents
            </h2>
          </div>
          <div className="submitted-documents-info-button">
            <ExpressButton
              clickHandler={toggleToListView}
              parentClass={
                switchToListView
                  ? "parent-button list-view-button-selected"
                  : "parent-button list-view-button"
              }
              variant="outlined"
              testId="list-view-button"
            >
              {!switchToListView ? (
                <ListView className="icon" />
              ) : (
                <ListViewSelected className="icon" />
              )}
              <span
                className={
                  switchToListView ? "icon-text-selected" : "icon-text"
                }
              >
                List
              </span>
            </ExpressButton>
            <ExpressButton
              clickHandler={toggleToGridView}
              parentClass={
                !switchToListView
                  ? "parent-button grid-view-button-selected"
                  : "parent-button grid-view-button"
              }
              variant="outlined"
              testId="grid-view-button"
            >
              {!switchToListView ? (
                <GridViewSlected className="icon" />
              ) : (
                <GridView className="icon" />
              )}
              <span
                className={
                  !switchToListView ? "icon-text-selected" : "icon-text"
                }
              >
                Grid
              </span>
            </ExpressButton>
          </div>
        </div>
        <div className="submit-documents-content-div">
          <p
            className="submit-documents-content-text"
            data-testId="submitted-documents-content-text"
          >
            To remove documents created within 3M™ Express (V.A.C.® Therapy
            Insurance Authorization Forms, Wound Progress Reports, Discharges,
            Proof of Delivery), please contact the 3M™ Express Support team at
            <span className="submit-documents-content-text">
              (800) 275-4524 ext. 41858.
            </span>{" "}
            The view of the documents provided may be a low resolution view.
            This view is for your reference only; it is not the resolution that
            is received by 3M.
          </p>
        </div>
        {documentsData && (
          <div className="submitted-documents-list-div">
            {switchToListView && (
              <div className="mainDiv-list">
                <SubmitDocumentListView
                  documentsData={documentsData}
                  documentTypeCode={documentTypeCode}
                  clickToOpentheDocument={clickToOpentheDocument}
                />
              </div>
            )}
            {!switchToListView && (
              <div className="mainDiv-grid">
                <SubmittedDocumentGridView
                  documentsData={documentsData}
                  clickToOpentheDocument={clickToOpentheDocument}
                />
              </div>
            )}
          </div>
        )}
        {documentsData && documentsData.length < 1 && (
          <Grid
            item
            xs={6}
            className="submitted-documents-list-not-avaliable-item"
          >
            <div className="submitted-documents-list-not-avaliable">
              <p className="submitted-documents-list-not-avaliable-text">
                The request to display the list of documents or open a selected
                document has failed.Please try again or contact 3M for
                assistance 1-800-275-4524
              </p>
            </div>
          </Grid>
        )}
        <Popup
          closeHandler={() => {}}
          openFlag={getDocumentContentLoader}
          hideCloseButton={true}
        >
          {spinner()}
        </Popup>
      </div>
    </>
  );
};
export default OrderOverviewSubmittedDocuments;
