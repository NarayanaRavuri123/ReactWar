import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import RedCheck from "../../../../assets/redCheck.svg";
import SelectCloseIcon from "../../../../assets/selectclose.svg";
import {
  OrderDetailContext,
  OrderDetailContextType,
} from "../../../../context/OrderDetailsContext";
import { IDropZoneDocumentSelect } from "../../../../core/customDropZone/dropZoneDocumentSelect.interface";
import { CustomDropDown } from "../../../../core/customDropdown/customDropdown.component";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import {
  IInputField,
  ValidationStatus,
} from "../../../../core/interfaces/input.interface";
import { getdropDownContent } from "../../../../util/dropDownService";
import { DD_UPLOAD_DOCUMENT_TYPE } from "../../../../util/staticText";
import "./orderOverviewUploadDocument.css";

type Props = {
  data: IDropZoneDocumentSelect[];
  setData: any;
  onDelete: (file: IDropZoneDocumentSelect, key: any) => void;
  callUploadDocToIFace?: Function;
  documentTypeText?: any;
};

const OrderOverviewUploadDocument = ({
  data,
  setData,
  callUploadDocToIFace,
  onDelete,
  documentTypeText,
}: Props) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const validateAndSetData = (e: any, index: number) => {
    const temp = data.map((x: IDropZoneDocumentSelect, ind: number) => {
      if (ind === index) {
        const dropdowndata: IInputField = {
          value: e.target.value,
          valid: ValidationStatus.VALID,
        };
        x.documentType = dropdowndata;
        return x;
      }
      return x;
    });
    setData(temp);
  };

  const handleUploadClick = async () => {
    let errorCount = 0;
    if (data.length > 0) {
      const temp = data.map((x: IDropZoneDocumentSelect) => {
        if (!x.documentType?.value) {
          const dat: IInputField = {
            ...x.documentType!,
            valid: ValidationStatus.INVALID,
          };
          x.documentType = dat;
          errorCount = 1;
          return x;
        }
        return x;
      });
      setData(temp);
    }
    if (errorCount === 0) {
      callUploadDocToIFace!();
    }
  };

  useEffect(() => {
    if (data) {
      const isInvalidFilePresent = data.some(
        (filecount: IDropZoneDocumentSelect) => filecount.errorMessage !== null
      );
      setIsDisabled(isInvalidFilePresent);
    }
  }, [data]);

  return (
    <>
      {data && data.length > 0 && (
        <div className="upload-document-with-type-or-status">
          {data &&
            data.length > 0 &&
            data.map((file: IDropZoneDocumentSelect, index: number) => {
              return (
                <Grid
                  className="upload-document-grid-container"
                  container
                  spacing={2}
                >
                  <Grid className="upload-document-grid-item" item xs={6}>
                    <div className="upload-document-filename-div">
                      <h4 className="upload-document-filename-title">
                        File Name
                      </h4>
                      <h4
                        className="upload-document-filename-value"
                        data-testid={"documentNameTest" + index}
                      >
                        {file.documentName}
                      </h4>
                    </div>
                  </Grid>
                  <Grid className="upload-document-grid-item" item xs={6}>
                    <div className="document-type-or-status-div">
                      {!file.succeeded ? (
                        <div
                          className={`docUploadfileStatus${
                            !file.succeeded ? `error` : ``
                          }`}
                          data-testid={
                            `docUploadfileStatus${
                              !file.succeeded ? `error` : ``
                            }` + index
                          }
                        >
                          <img
                            style={{
                              verticalAlign: "text-bottom",
                              marginRight: "5px",
                              marginBottom: "4px",
                            }}
                            src={RedCheck}
                            alt={RedCheck}
                          />
                          <h4 className="upload-error-text">
                            {file.errorMessage}
                          </h4>
                        </div>
                      ) : (
                        <div className="upload-document-type-div">
                          <InputWithLabel
                            label="Document Type"
                            testId={"order-document-upload" + index}
                            isRequired={true}
                            error={
                              file.documentType?.valid ===
                              ValidationStatus.INVALID
                            }
                          >
                            <CustomDropDown
                              name="documentType"
                              value={
                                file.documentType ? file.documentType.value : ""
                              }
                              handleChange={(event: any) =>
                                validateAndSetData(event, index)
                              }
                              selectpropsClassName={
                                file.documentType
                                  ? "documentType-info-select"
                                  : "placeholder"
                              }
                              selectClassName="documentType-info-input"
                              testId={"documentType-testid" + index}
                              menuItem={documentTypeText}
                              placeHolder="Select document Type"
                            />
                          </InputWithLabel>
                        </div>
                      )}
                      <div
                        className={
                          file.succeeded
                            ? "docUploadfileCloseSuccess"
                            : "docUploadfileCloseFail"
                        }
                        data-testid={"document-upload-close-icon" + index}
                        onClick={() => onDelete(file, index)}
                      >
                        <img src={SelectCloseIcon} alt={SelectCloseIcon} />
                      </div>
                    </div>
                  </Grid>
                </Grid>
              );
            })}
          {data && data.length > 0 && (
            <div className="order-Upload-button">
              <ExpressButton
                variant="contained"
                parentClass="orderDocUploadBtn"
                testId="orderDocUploadBtn"
                disabled={isDisabled}
                clickHandler={() => handleUploadClick()}
              >
                Upload Documents
              </ExpressButton>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderOverviewUploadDocument;
