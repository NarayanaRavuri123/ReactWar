import { Button } from "@mui/material";
import moment from "moment";
import {
  getTextFromCode,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import "./contributingCauseReviewOrder.css";
import { IContributingCauseReviewOrder } from "./contributingCauseReviewOrder.interface";

export const ContributingCauseReviewOrder = ({
  accidentTypes,
  data,
  editButtonClicked,
  isOrderSummary = false,
}: IContributingCauseReviewOrder) => {
  return (
    <div className="contributin-cause-review-order">
      <div className="contributin-cause-component-title">
        <h2
          className="contributin-cause-review-order-title"
          data-testid="contributin-cause-review-order-title"
        >
          Contributing Cause
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "contributin-cause-review-order-edit-button" }}
            data-testid="contributin-cause-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="all-content-div">
        <div
          className={
            data.contributingCause.value === "yes"
              ? "content-div"
              : "content-div-last"
          }
        >
          <div className="sub-content-div">
            <h5
              className="contributin-cause-review-order-content-title"
              data-testid="is-wound-direct-result-of-accident"
            >
              Is the wound a direct result of an accident?
            </h5>
            <h5
              className="contributin-cause-review-order-content-value"
              data-testid="is-wound-direct-result-of-accident-value"
            >
              {`${
                data.contributingCause.value !== ""
                  ? makeCapitalEachWordInString(data.contributingCause.value)
                  : "--"
              }`}
            </h5>
          </div>
        </div>
        {data.contributingCause.value === "yes" && (
          <div className="content-div-last">
            <div className="sub-content-div">
              <h5
                className="contributin-cause-review-order-content-title"
                data-testid="date-of-accident"
              >
                Date of Accident
              </h5>
              <h5
                className="contributin-cause-review-order-content-value"
                data-testid="date-of-accident-value"
              >{`${moment(data.dateOfAccident.value).format(
                "MM/DD/YYYY"
              )}`}</h5>
            </div>
            <div className="sub-content-div">
              <h5
                className="contributin-cause-review-order-content-title"
                data-testid="accident-type"
              >
                Accident Type
              </h5>
              <h5
                className="contributin-cause-review-order-content-value"
                data-testid="accident-type-value"
              >
                {getTextFromCode(accidentTypes, data.accidentType.value)}
              </h5>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
