import { Button } from "@mui/material";
import "./therapyInformationReviewOrder.css";
import {
  getTextFromCode,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import { ITherapyInformationReviewOrder } from "./therapyInformationReviewOrder.interface";

export const TherapyInformationReviewOrder = ({
  data,
  editButtonClicked,
  therapyLengths,
  therapyGoals,
  isOrderSummary = false,
  isOrderOverviewFlow = false,
}: ITherapyInformationReviewOrder) => {
  const getPrescriptionTypeName = (): string => {
    switch (data.submitPrescription.value) {
      case "EPrescription":
        return "E-Prescription";
      case "RxImage":
        return "Rx Upload";
      case "Fax":
        return "Fax in Later";
      default:
        return isOrderOverviewFlow ? "--" : "E-Prescription";
    }
  };
  return (
    <div className="therapy-information-review-order">
      <div className="therapy-information-component-title">
        <h2
          className="therapy-information-review-order-title"
          data-testid="therapy-information-review-order-title"
        >
          Therapy Information
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "therapy-information-review-order-edit-button" }}
            data-testid="therapy-information-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="all-content-div">
        <div className="content-div">
          <div className="sub-content-div">
            <h5
              className="therapy-information-review-order-content-title"
              data-testid="lengthOfTherapy"
            >
              Length of Therapy
            </h5>
            <h5
              className="therapy-information-review-order-content-value"
              data-testid="lengthOfTherapy-value"
            >
              {data.lengthOfTherapy.value !== ""
                ? makeCapitalEachWordInString(
                    getTextFromCode(therapyLengths, data.lengthOfTherapy.value)
                  )
                : "--"}
            </h5>
          </div>
          {!isOrderOverviewFlow && (
            <div className="sub-content-div">
              <h5
                className="therapy-information-review-order-content-title"
                data-testid="goalOfTherapy"
              >
                Goal of Therapy
              </h5>
              <h5
                className="therapy-information-review-order-content-value"
                data-testid="goalOfTherapy-value"
              >
                {getTextFromCode(therapyGoals, data.goalOfTherapy.value)}
              </h5>
            </div>
          )}
        </div>
        <div className="content-div-last">
          <div className="sub-content-div">
            <h5
              className="therapy-information-review-order-content-title"
              data-testid="submitPrescription"
            >
              Prescription Type
            </h5>
            <h5
              className="therapy-information-review-order-content-value"
              data-testid="submitPrescription-value"
            >
              {getPrescriptionTypeName()}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
