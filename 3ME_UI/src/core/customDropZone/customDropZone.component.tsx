import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import UploadIcon from "../../assets/upload.svg";
import OrderOverviewUploadDocument from "../../components/myPatients/patientAndTherapyDetails/orderOverviewDocumentUpload/orderOverviewUploadDocument.component";
import OrderUploadDocList from "../../components/newOrder/orderUploadDocument/orderUploadDocList.component";
import UploadPrescriptionList from "../../components/newOrder/submitPrescription/uploadPrescription/uploadPrescriptionList.component";
import { ExpressButton } from "../expressButton/expressButton.component";
import { customDocumentUploadError, getBase64 } from "./customDropZoneFunction";
import { ICustomDropZone } from "./dropZone.interface";
import { IDropZoneDocumentSelect } from "./dropZoneDocumentSelect.interface";

const CustomDropZone = ({
  data,
  setData,
  deletedData,
  setDeletedData,
  dropZoneStyles,
  dragAndDropStyles,
  uploadWidgetCard,
  uploadIconStyle,
  buttonDropText,
  buttonDropClassName = "",
  dragDropText,
  listingType,
  maxFileSize,
  allowedFiles,
  singleFile,
  setErrorInUploadFiles,
  isTestingComponent = false,
  callUploadDocToIFace,
  uploadedData = [],
  documentTypeText,
}: ICustomDropZone) => {
  const [SelectedFiles, setSelectedFiles] = useState<any[]>([]);

  const onDrop = useCallback(
    (accFiles: File[], RejFiles: FileRejection[]) => {
      const mappedAcc = accFiles.map((file: any) => ({ file, errors: [] }));
      setSelectedFiles((curr) => [...mappedAcc, ...RejFiles]);
    },
    [data]
  );

  const fileNameValidator = (file: any) => {
    let doesFileAlreadyExists = null;
    if (
      (listingType === "newOrder" || listingType === "orderOverview") &&
      file.size !== 0
    ) {
      [...data, ...uploadedData].some((element: any) => {
        if (element.documentName === file.name) {
          return (doesFileAlreadyExists = {
            code: "duplicate-file",
            message: `File already exists`,
          });
        } else {
          return (doesFileAlreadyExists = null);
        }
      });
    } else if (file.size === 0) {
      return (doesFileAlreadyExists = {
        code: "empty-file",
        message: `File Has No Content`,
      });
    } else {
      return (doesFileAlreadyExists = null);
    }
    return doesFileAlreadyExists;
  };

  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      accept: allowedFiles,
      maxSize: maxFileSize,
      onDrop,
      multiple: singleFile ? false : true,
      validator: fileNameValidator,
      maxFiles: singleFile ? 1 : 0,
    });

  useEffect(() => {
    let tempData: any = [];
    if (SelectedFiles.length !== 0 && Array.isArray(SelectedFiles)) {
      (async () => {
        await SelectedFiles.forEach(async (element) => {
          if (element.errors.length === 0) {
            tempData.push({
              documentName: element.file.name,
              documentBase64: "",
              succeeded: true,
              errorMessage: null,
              file: element.file,
              isFetchingBase64: false,
            });
          } else {
            tempData.push({
              documentName: element.file.name,
              documentBase64: "",
              succeeded: false,
              errorMessage: customDocumentUploadError(element.errors[0].code),
              file: element.file,
              isFetchingBase64: false,
            });
          }
        });
      })();
      if (singleFile) {
        fetchBase64FoSelectedFiles(tempData);
        if (data.length === 0 && tempData.length === 1) {
          setData(tempData);
        }
      } else {
        setData((data: any) => [...data, ...tempData]);
      }
    }
  }, [SelectedFiles]);

  useEffect(() => {
    fetchBase64FoSelectedFiles(data);
    if (!isTestingComponent) {
      setData(data);
    }
  }, [data]);

  const onDelete = (file: any, index: any) => {
    if (file.documentId && file.documentId !== "") {
      let selectFileForDeletion: any = [];
      selectFileForDeletion[0] = file.documentId;
      setDeletedData((deletedData: any) => [
        ...deletedData,
        ...selectFileForDeletion,
      ]);
    }
    setSelectedFiles((curr) =>
      curr.filter((fw) => SelectedFiles.indexOf(fw) !== index)
    );
    setData((curr: any[]) => curr.filter((fw) => data.indexOf(fw) !== index));
  };

  const displayDropZoneWidget = () => {
    let displayDZ = true;
    if (listingType === "newOrder" || listingType === "orderOverview") {
      displayDZ = true;
    } else if (data.length !== 0) {
      displayDZ = false;
    }
    return displayDZ;
  };

  const fetchBase64FoSelectedFiles = (elements: IDropZoneDocumentSelect[]) => {
    if (Array.isArray(elements)) {
      elements.forEach((element: any) => {
        (async () => {
          if (
            !element.isFetchingBase64 &&
            element.succeeded &&
            element.documentBase64 === ""
          ) {
            element.isFetchingBase64 = true;
            element.documentBase64 = await getBase64(element.file);
            element.isFetchingBase64 = false;
          }
        })();
      });
    }
  };

  return (
    <>
      {displayDropZoneWidget() && (
        <div className={uploadWidgetCard}>
          <div {...getRootProps()} className={dropZoneStyles}>
            <input {...getInputProps()} />
            <div className={dragAndDropStyles} data-testid="drag-drop-id">
              <img
                className={uploadIconStyle}
                src={UploadIcon}
                alt="uploadIconAlt"
              />
              {dragDropText}
            </div>
            <ExpressButton
              parentClass={buttonDropClassName}
              testId="drag-drop-button-id"
              variant="outlined"
            >
              {buttonDropText}
            </ExpressButton>
          </div>
          {listingType === "orderOverview" && (
            <OrderOverviewUploadDocument
              onDelete={onDelete}
              data={data}
              setData={setData}
              callUploadDocToIFace={callUploadDocToIFace!}
              documentTypeText={documentTypeText!}
            />
          )}
        </div>
      )}

      {listingType === "newOrder" ? (
        <OrderUploadDocList onDelete={onDelete} data={data} setData={setData} />
      ) : (
        listingType !== "orderOverview" && (
          <UploadPrescriptionList onDelete={onDelete} data={data} />
        )
      )}
    </>
  );
};

export default CustomDropZone;
