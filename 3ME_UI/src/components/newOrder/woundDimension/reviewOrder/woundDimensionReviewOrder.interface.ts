import { INewOrderWoundInfo } from "../../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { ISecondaryWoundInfo } from "../../clinicalInformation/secondaryWoundInfo/secondaryWoundInfo.interface";
import { IInputField } from "../../../../core/interfaces/input.interface";

export interface IWoundDimensionReviewOrder {
  editButtonClicked: any;
  isOrderSummary?: boolean;
  woundInfoData:
    | INewOrderWoundInfo
    | ISecondaryWoundInfo
    | IWoundMeasurementOrderOverviewSummary;
}

export interface IWoundMeasurementOrderOverviewSummary {
  woundMeasurementDate: IInputField;
  woundLength: IInputField;
  woundWidth: IInputField;
  woundDepth: IInputField;
  woundThickness?: IInputField;
}

export interface IWoundTunnelingOrderOverviewSummary {
  woundTunneling: IInputField;
  location1Depth: IInputField;
  location1Position: IInputField;
  location2Depth: IInputField;
  location2Position?: IInputField;
}

export interface IWoundExudateOrderOverviewSummary {
  exudateAmount: IInputField;
  exudateAppearance: IInputField;
}
