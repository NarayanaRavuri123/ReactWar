import { INewOrder } from "../newOrder.interface";
import { NewOrderValidator } from "../newOrder.validator";

export interface IPrintCommonDocs {
  data: INewOrder;
  Validator?: NewOrderValidator;
  setData: Function;
  printableDocumentsLink: IPrintableDocumentsPdf | undefined;
}

export interface IPrintableDocumentsPdf {
  VACTherapyOrderPad: string;
  VACTherapyInsuranceAuthorizationForm: string;
}
