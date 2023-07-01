import { IDropZoneDocumentSelect } from "../../../../core/customDropZone/dropZoneDocumentSelect.interface";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";

export let defaultAddressData: IDropZoneDocumentSelect = {
  documentType: {
    valid: ValidationStatus.UNTOUCHED,
    value: "",
    required: true,
  },
  documentName: "",
  documentBase64: "",
  succeeded: false,
  errorMessage: null,
  isFetchingBase64: false,
};
