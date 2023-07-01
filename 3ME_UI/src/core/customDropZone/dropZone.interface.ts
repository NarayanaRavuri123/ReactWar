import { Accept } from "react-dropzone";

export interface ICustomDropZone {
  dropZoneStyles?: string;
  dragAndDropStyles?: string;
  uploadWidgetCard?: string;
  uploadIconStyle?: string;
  dragDropText: string;
  buttonDropText: string;
  buttonDropClassName?: string;
  setData: any;
  data: any;
  listingType?: string;
  maxFileSize?: number;
  allowedFiles?: Accept | undefined;
  setErrorInUploadFiles?: Function;
  singleFile: boolean;
  deletedData?: any;
  setDeletedData?: any;
  isTestingComponent?: boolean;
  callUploadDocToIFace?: Function;
  uploadedData?: any;
  documentTypeText?: any;
}
