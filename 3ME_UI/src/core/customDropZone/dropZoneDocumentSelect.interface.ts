import { IInputField } from "../interfaces/input.interface";

export interface IDropZoneDocumentSelect {
  documentName: string;
  documentBase64: string;
  succeeded: boolean;
  errorMessage: string | null;
  isFetchingBase64: boolean;
  documentId?: string | null;
  documentType?: IInputField;
  documentIndex?: number;
  fileType?: string | null;
  submissionDate?: string | null;
}
