import { Button, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ReactComponent as DownloadIcon } from "../../../../../assets/download.svg";
import { CustomDropDown } from "../../../../../core/customDropdown/customDropdown.component";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../../../../core/inputWithLabel/inputWithLabel.component";
import { COMMON_DOCS_INSURANCE_AUTHORIZATION_FORM } from "../../../../../util/staticText";
import {
  getCodeFromText,
  getTextFromCode,
} from "../../../../../util/utilityFunctions";
import { WindowService } from "../../../../../util/window.service";
import { IPatient, IPatientAlert } from "../../../patient.interface";
import "./orderOverviewDocument.css";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../../../../context/OrderDetailsContext";

interface Props {
  selectedPatientData: IPatient;
  printableDocumentsLink: any;
  commonDocs: any;
  commonDocsText: any;
  pdfUrl: any;
  downloadBtnAction?: any | null;
  alertsForRO?: IPatient;
}
export const OrderOverviewDocument = ({
  printableDocumentsLink,
  selectedPatientData,
  commonDocs,
  commonDocsText,
  pdfUrl,
  downloadBtnAction = null,
  alertsForRO,
}: Props) => {
  const orderOverViewObj = useContext<OrderDetailContextType | null>(
    OrderDetailContext
  );
  const selectedCommonDoc = orderOverViewObj!.selectedCommonDoc;
  const setSelectedCommonDoc = orderOverViewObj!.setSelectedCommonDoc;

  const [missingDocs, setMissingDocs] = useState<Array<IPatientAlert>>([]);

  const handleClickPdfDownload = () => {
    if (pdfUrl) window.open(pdfUrl, "_blank");
  };

  const validateAndSetData = (e: any) => {
    setSelectedCommonDoc(getCodeFromText(commonDocs, e.target.value));
  };

  const openPdfDoc = () => {
    if (selectedCommonDoc && selectedCommonDoc !== "") {
      const windowService = new WindowService();
      const pdf =
        selectedCommonDoc === COMMON_DOCS_INSURANCE_AUTHORIZATION_FORM
          ? printableDocumentsLink!.VACTherapyInsuranceAuthorizationForm
          : printableDocumentsLink!.VACTherapyOrderPad;
      windowService.openPdf(pdf);
    }
  };

  useEffect(() => {
    const result = alertsForRO?.alerts.filter(
      (item) => item.alertName === "Missing Docs"
    );
    setMissingDocs(result || []);
  }, []);

  return (
    <div className="order-overview-documents">
      {missingDocs.map((alert) => (
        <div className="missing-docs-alert">
          <h5
            className="missing-docs-alert-title"
            data-testid="documentAlert-header"
          >
            Missing Documents
          </h5>
          {alert &&
            alert.statusDelayReason &&
            Array.isArray(alert.statusDelayReason.statusDelayReasons) &&
            alert.statusDelayReason.statusDelayReasons.map(
              (statusDelayDetail) => {
                return (
                  <div className="missing-document-delay-reason-and-details">
                    <span className="dot-with-space">&bull; </span>
                    <h5
                      className="missing-document-delay-reason-and-details-text"
                      data-testid="delay-reason-and-details-text"
                    >
                      <span className="delay-reason-and-details-text-bold">
                        {statusDelayDetail.delayReason + "."}
                      </span>
                      {` ${statusDelayDetail.delayDetail}.`}
                    </h5>
                  </div>
                );
              }
            )}
        </div>
      ))}
      <div
        className={`orderOverviewPrintDoc ${
          missingDocs.length > 0 ? "" : "no-top-space"
        }`}
      >
        <Grid className="orderOverviewPrintDoc-grid-container" container>
          <Grid className="orderOverviewPrintDoc-grid-item" item xs={7}>
            <div className="orderOverviewPrintDoc-title-div">
              <p
                className="orderOverviewPrintDoc-title"
                data-testid="printDoc-title"
              >
                Print/Download Common Documents
              </p>
            </div>
          </Grid>
          <Grid
            className="orderOverviewPrintDoc-grid-item"
            data-testid="orderoverview-doc"
            item
            xs={5}
          >
            <div className="download-and-print-coversheet-div">
              <ExpressButton
                parentClass="orderOverviewLinkButton-title"
                variant="text"
                clickHandler={
                  downloadBtnAction ? downloadBtnAction : handleClickPdfDownload
                }
                startIcon={<DownloadIcon />}
                testId="downlod-print-fax-cover-sheet"
              >
                Download & Print Fax Cover Sheet
              </ExpressButton>
            </div>
          </Grid>
          <Grid className="orderOverviewPrintDoc-grid-item" item xs={12}>
            <div className="empty">
              <></>
            </div>
          </Grid>
          <Grid className="orderOverviewPrintDoc-grid-item" item xs={6}>
            <InputWithLabel
              isRequired={false}
              label="Common Docs"
              labelClassName="dropdown-title"
            >
              <CustomDropDown
                handleChange={validateAndSetData}
                menuItem={commonDocsText}
                name="commonDocs"
                placeHolder="Select document to print"
                selectpropsClassName={
                  selectedCommonDoc && selectedCommonDoc !== ""
                    ? "printCommonDocs-select"
                    : "placeHolder"
                }
                selectClassName={
                  selectedCommonDoc && selectedCommonDoc !== ""
                    ? "printCommonDocs-input"
                    : "placeHolder"
                }
                value={
                  selectedCommonDoc && selectedCommonDoc !== ""
                    ? getTextFromCode(commonDocs, selectedCommonDoc)
                    : ""
                }
              />
            </InputWithLabel>
          </Grid>
          <Grid className="orderOverviewPrintDoc-grid-item" item xs={6}>
            <InputWithLabel label="" isRequired={false}>
              <Button
                disabled={!selectedCommonDoc || selectedCommonDoc === ""}
                classes={{ root: "button-orderOverviewPrintDoc" }}
                variant="outlined"
                onClick={openPdfDoc}
              >
                Open
              </Button>
            </InputWithLabel>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default OrderOverviewDocument;
