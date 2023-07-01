import "./secondaryWoundInfo.css";
import { Button } from "@mui/material";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../context/NewOrderContext";
import { useContext, useState } from "react";
import WoundBed from "../../woundBed/woundBed.component";
import { Exudate } from "../../exudate/exudate.component";
import { NewOrderValidator } from "../../newOrder.validator";
import Debridement from "../../debridement/debridement.component";
import { ClinicalInformation } from "../clinicalInformation.component";
import WoundDimension from "../../woundDimension/woundDimension.component";
import WoundTunneling from "../../woundTunneling/woundTunneling.component";
import { ISecondaryWoundInfoComponent } from "./secondaryWoundInfo.interface";
import { ValidationStatus } from "../../../../core/interfaces/input.interface";
import WoundUndermining from "../../woundUndermining/woundUndermining.component";
import { ExposedStructures } from "../../exposedStructures/exposedStructures.component";
import { NewOrderPageSection } from "../../NewOrderContainer.enum";

export const SecondaryWoundInfo = ({
  data,
  editButtonClicked,
  isOrderSummary,
  isReviewOrder,
  newValidator = new NewOrderValidator(),
  setData,
  setWoundInfoData,
  woundInfoData,
  vacTherapyInformationData,
}: ISecondaryWoundInfoComponent) => {
  const [validator] = useState<NewOrderValidator>(newValidator!);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);

  const addSecondaryWoundInfo = () => {
    const value = data.isShowSecondaryWoundInfo.value === "Yes" ? "No" : "Yes";
    if (value === "No") {
      NewOrderObj?.resetSecondaryWoundInfoDataForm();
    }
    data!.isShowSecondaryWoundInfo = {
      value: value,
      valid: ValidationStatus.VALID,
      isDefaultValid: true,
    };
    setData(Object.assign({}, data));
  };

  const editButtonClickedcalled = (ref: any) => {
    window.scrollTo(0, 0);
    NewOrderObj?.setnewOrderProgress(40);
    NewOrderObj?.setisComingFromPrev(true);
    NewOrderObj?.setNewOrderPage(
      NewOrderPageSection.NEWORDER_PATIENT_WOUND_INFO
    );
    NewOrderObj?.setScrollableComponentClassName(ref);
  };
  return (
    <div className="secondary-wound">
      {!isReviewOrder && !isOrderSummary && (
        <Button
          classes={{
            root:
              data.isShowSecondaryWoundInfo.value === "Yes"
                ? "remove-secondary-wound"
                : "add-secondary-wound",
          }}
          data-testid="add-secondary-wound"
          variant="outlined"
          onClick={addSecondaryWoundInfo}
        >
          {data.isShowSecondaryWoundInfo.value === "Yes"
            ? "- Remove secondary wound"
            : "+ Add secondary wound"}
        </Button>
      )}
      {data.isShowSecondaryWoundInfo.value === "Yes" && (
        <div
          className="secondary-wound-detail"
          data-testid="secondary-wound-detail"
        >
          <ClinicalInformation
            editButtonClicked={() =>
              editButtonClickedcalled("clinical-information-main-container-sec")
            }
            isOrderSummary={isOrderSummary}
            isReviewOrder={isReviewOrder}
            isSecondaryWoundInfo={true}
            newValidator={validator}
            setWoundInfoData={setWoundInfoData}
            woundInfoData={woundInfoData}
          />
          <Debridement
            editButtonClicked={() =>
              editButtonClickedcalled("debridement-main-container-sec")
            }
            isSecondaryWoundInfo={true}
            isOrderSummary={isOrderSummary}
            isReviewOrder={isReviewOrder}
            setWoundInfoData={setWoundInfoData}
            woundInfoData={woundInfoData}
            Validator={validator}
          />
          <WoundDimension
            editButtonClicked={() =>
              editButtonClickedcalled("wound-dimensions-main-container-sec")
            }
            isSecondaryWoundInfo={true}
            isOrderSummary={isOrderSummary}
            isReviewOrder={isReviewOrder}
            setWoundInfoData={setWoundInfoData}
            woundInfoData={woundInfoData}
            Validator={validator}
          />
          <WoundUndermining
            editButtonClicked={() =>
              editButtonClickedcalled("wound-undermining-main-container-sec")
            }
            isSecondaryWoundInfo={true}
            isOrderSummary={isOrderSummary}
            isReviewOrder={isReviewOrder}
            setWoundInfoData={setWoundInfoData}
            woundInfoData={woundInfoData}
            Validator={validator}
          />
          <WoundTunneling
            editButtonClicked={() =>
              editButtonClickedcalled("wound-tunneling-main-container-sec")
            }
            isSecondaryWoundInfo={true}
            isOrderSummary={isOrderSummary}
            isReviewOrder={isReviewOrder}
            setWoundInfoData={setWoundInfoData}
            woundInfoData={woundInfoData}
            Validator={validator}
          />
          <WoundBed
            editButtonClicked={() =>
              editButtonClickedcalled("wound-bed-main-container-sec")
            }
            isSecondaryWoundInfo={true}
            isOrderSummary={isOrderSummary}
            isReviewOrder={isReviewOrder}
            setWoundInfoData={setWoundInfoData}
            woundInfoData={woundInfoData}
            vacTherapyInformationData={vacTherapyInformationData}
            Validator={validator}
          />
          <Exudate
            editButtonClicked={() =>
              editButtonClickedcalled("exudate-main-container-sec")
            }
            isSecondaryWoundInfo={true}
            isOrderSummary={isOrderSummary}
            isReviewOrder={isReviewOrder}
            setWoundInfoData={setWoundInfoData}
            woundInfoData={woundInfoData}
            Validator={validator}
          />
          <ExposedStructures
            editButtonClicked={() =>
              editButtonClickedcalled("exposed-structures-main-container-sec")
            }
            isSecondaryWoundInfo={true}
            isOrderSummary={isOrderSummary}
            isReviewOrder={isReviewOrder}
            setWoundInfoData={setWoundInfoData}
            woundInfoData={woundInfoData}
            Validator={validator}
          />
        </div>
      )}
    </div>
  );
};
