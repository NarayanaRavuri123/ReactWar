import { IHoldAndResumeDate } from "../../resumeTherapy/resumeTherapy.interface";
import { IHoldOrResumeTherapyData } from "../holdOrResumeTherapy.interface";

export interface IHoldOrResumeDate {
  data: IHoldOrResumeTherapyData;
  holdAndResumeMinMaxDates: Array<IHoldAndResumeDate>;
  index: number;
  isHoldTherapy: boolean;
  setData: any;
}
