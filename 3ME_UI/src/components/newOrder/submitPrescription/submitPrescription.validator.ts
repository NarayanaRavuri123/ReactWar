import { INewOrder } from "../newOrder.interface";
import { NewOrderValidator } from "../newOrder.validator";
import { IPrintableDocumentsPdf } from "../printCommonDocs/printCommonDocs.interface";

export interface ISubmitPrescription {
  data: INewOrder;
  Validator?: NewOrderValidator;
  setData: Function;
  openPDF?: any;
  printableDocumentsLink?: IPrintableDocumentsPdf;
}
