import { WoundDetails } from "../../main/holdOrResumeTherapy.interface";

export interface IWoundMeasurement {
  wound: WoundDetails;
  updateWoundMeasurement: (updatedWound: WoundDetails) => void;
}
