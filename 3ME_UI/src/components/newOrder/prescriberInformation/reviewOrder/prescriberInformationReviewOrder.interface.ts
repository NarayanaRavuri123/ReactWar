import { IPrescriberModal } from "../prescriberSearch/prescriberSearch.model";

export interface IPrescriberInformationReviewOrder {
  data: IPrescriberModal | undefined;
  editButtonClicked: any;
  isOrderSummary?: boolean;
}
