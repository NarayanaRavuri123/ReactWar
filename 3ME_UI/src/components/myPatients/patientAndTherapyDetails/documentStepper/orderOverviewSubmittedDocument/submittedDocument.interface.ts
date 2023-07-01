export interface IGetAllDocumentsRequest {
  RentalOrderNumber: number;
}

export interface ISubmittedDocuments {
  documents: Array<ISubmittedDocumentInfo>;
}

export interface ISubmittedDocumentInfo {
  documentId: string | null;
  documentName: string | null;
  documentType: string | null;
  submissionDate: string | null;
  fileType: string | null;
}
export interface IGetDocumentContentRequest {
  documentId: string;
}
export interface IGetDocumentContentResponse {
  fileType: string | null;
  documentContent: any | null;
}
