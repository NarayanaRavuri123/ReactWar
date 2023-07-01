import moment from "moment";
import {
  getTextFromCode,
  makeCapitalEachWordInString,
} from "../../../../util/utilityFunctions";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../../context/NewOrderContext";
import { Button, Grid } from "@mui/material";
import "./clinicalInformationReviewOrder.css";
import { useContext, useEffect, useState } from "react";
import { Question, QuestionTypes } from "../clinicalInfo.interface";
import { IClinicalInformationReviewOrder } from "./clinicalInformationReviewOrder.interface";

export const ClinicalInformationReviewOrder = ({
  editButtonClicked,
  isOrderSummary,
  isSecondaryWoundInfo,
  woundInfoData,
  woundLocations,
  woundDirections,
  woundOrientations,
  newOrderObj,
}: IClinicalInformationReviewOrder) => {
  //const newOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const [isShowAdditionalQuestions, setIsShowAdditionalQuestions] =
    useState<boolean>(false);
  const [questionsCategoty, setQuestionsCategoty] = useState<string>("");
  const [additionalQuestions, setAdditionalQuestions] = useState<
    Question[] | undefined
  >();

  const showAdditionalQuestions = () => {
    const questions = isSecondaryWoundInfo
      ? newOrderObj?.secondaryAdditionalQuestions
      : newOrderObj?.primaryAdditionalQuestions;
    if (questions) {
      setIsShowAdditionalQuestions(true);
    } else {
      setIsShowAdditionalQuestions(false);
    }
  };

  const getQuestionsCategoty = () => {
    const output = isSecondaryWoundInfo
      ? newOrderObj?.secondaryAdditionalQuestions?.category ?? ""
      : newOrderObj?.primaryAdditionalQuestions?.category ?? "";
    setQuestionsCategoty(output);
  };

  const getAdditionalQuestions = () => {
    let additionalQuestions: Question[] | undefined;
    if (isSecondaryWoundInfo) {
      additionalQuestions =
        newOrderObj?.secondaryAdditionalQuestions?.additionalQuestion;
    } else {
      additionalQuestions =
        newOrderObj?.primaryAdditionalQuestions?.additionalQuestion;
    }
    setAdditionalQuestions(additionalQuestions);
  };

  const getQuestionAnswer = (question: Question): string => {
    let output = "";
    switch (question.type) {
      case QuestionTypes.RADIO:
        output = makeCapitalEachWordInString(question.value);
        break;
      case QuestionTypes.DATE:
        output = moment(question.value).format("MM/DD/YYYY");
        break;
      case QuestionTypes.TEXT:
        output = question.value;
        break;
    }
    return output;
  };

  useEffect(() => {
    showAdditionalQuestions();
    getQuestionsCategoty();
    getAdditionalQuestions();
  }, []);

  return (
    <div className="clinical-information-review-order">
      <div
        className={`clinical-information-review-order-header ${
          isSecondaryWoundInfo ? " secondary" : ""
        }`}
      >
        <h2
          className="clinical-information-review-order-title"
          data-testid="clinical-information-review-order-title"
        >
          {isSecondaryWoundInfo ? "Secondary Wound" : "Clinical Information"}
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "clinical-information-review-order-edit-button" }}
            data-testid="clinical-information-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>
      <Grid
        className="clinical-information-review-order-grid-container"
        container
        spacing={2}
      >
        {!isSecondaryWoundInfo && (
          <Grid
            className="clinical-information-review-order-grid-item"
            item
            xs={12}
          >
            <h5
              className="clinical-information-review-order-content-title"
              data-testid="short-narrative-of-possible-consequences"
            >
              Consequences if V.A.C.® Therapy is not used
            </h5>
            <h5
              className="clinical-information-review-order-content-value"
              data-testid="short-narrative-of-possible-consequences-value"
            >
              {woundInfoData.shortNarrativeOfPossibleConsequences.value === ""
                ? "--"
                : woundInfoData.shortNarrativeOfPossibleConsequences.value}
            </h5>
          </Grid>
        )}
        <Grid
          className="clinical-information-review-order-grid-item"
          item
          xs={6}
        >
          <h5
            className="clinical-information-review-order-content-title"
            data-testid="wound-type"
          >
            {isSecondaryWoundInfo
              ? "Secondary Wound Type"
              : "Primary Wound Type"}
          </h5>
          <h5
            className="clinical-information-review-order-content-value"
            data-testid="wound-type-value"
          >
            {woundInfoData.woundType.value &&
            woundInfoData.woundType.value !== "--"
              ? woundInfoData.woundType.value
              : "--"}
          </h5>
        </Grid>
        {isShowAdditionalQuestions && (
          <>
            <Grid
              className="clinical-information-review-order-grid-item"
              item
              xs={6}
            >
              <h5
                className="clinical-information-review-order-content-title"
                data-testid="previous-therapies-other"
              >
                Wound Category
              </h5>
              <h5
                className="clinical-information-review-order-content-value"
                data-testid="previous-therapies-other-value"
              >
                {questionsCategoty}
              </h5>
            </Grid>

            {additionalQuestions &&
              additionalQuestions.map((question: Question, index: number) => (
                <Grid
                  key={index}
                  className="clinical-information-review-order-grid-item"
                  item
                  xs={12}
                >
                  <h5
                    className="clinical-information-review-order-content-title"
                    data-testid="previous-therapies-other"
                  >
                    {question?.text}
                  </h5>
                  <h5
                    className="clinical-information-review-order-content-value"
                    data-testid="previous-therapies-other-value"
                  >
                    {getQuestionAnswer(question)}
                  </h5>
                </Grid>
              ))}
          </>
        )}
        <Grid
          className="clinical-information-review-order-grid-item"
          item
          xs={6}
        >
          <h5
            className="clinical-information-review-order-content-title"
            data-testid="wound-age"
          >
            Wound Age
          </h5>
          <h5
            className="clinical-information-review-order-content-value"
            data-testid="wound-age-value"
          >
            {woundInfoData.woundAge.value &&
            woundInfoData.woundAge.value !== "--"
              ? `${woundInfoData.woundAge.value} ${
                  parseInt(woundInfoData.woundAge.value) > 1
                    ? "Months"
                    : "Month"
                }`
              : "--"}
          </h5>
        </Grid>
        <Grid
          className="clinical-information-review-order-grid-item"
          item
          xs={6}
        >
          <h5
            className="clinical-information-review-order-content-title"
            data-testid="wound-location"
          >
            Wound Location
          </h5>
          <h5
            className="clinical-information-review-order-content-value"
            data-testid="wound-location-value"
          >
            {woundInfoData.woundLocation.value &&
            woundInfoData.woundLocation.value !== "" &&
            woundInfoData.woundLocation.value !== "--"
              ? getTextFromCode(
                  woundLocations,
                  woundInfoData.woundLocation.value
                )
              : "--"}
          </h5>
        </Grid>
        <Grid
          className="clinical-information-review-order-grid-item"
          item
          xs={6}
        >
          <h5
            className="clinical-information-review-order-content-title"
            data-testid="wound-direction"
          >
            Wound Direction
          </h5>
          <h5
            className="clinical-information-review-order-content-value"
            data-testid="wound-direction-value"
          >
            {woundInfoData.woundDirection.value &&
            woundInfoData.woundDirection.value !== "--"
              ? getTextFromCode(
                  woundDirections,
                  woundInfoData.woundDirection.value
                )
              : "--"}
          </h5>
        </Grid>
        <Grid
          className="clinical-information-review-order-grid-item"
          item
          xs={6}
        >
          <h5
            className="clinical-information-review-order-content-title"
            data-testid="wound-orientation"
          >
            Wound Orientation
          </h5>
          <h5
            className="clinical-information-review-order-content-value"
            data-testid="wound-orientation-value"
          >
            {woundInfoData.woundOrientation.value &&
            woundInfoData.woundOrientation.value !== "--"
              ? getTextFromCode(
                  woundOrientations,
                  woundInfoData.woundOrientation.value
                )
              : "--"}
          </h5>
        </Grid>
        <Grid
          className="clinical-information-review-order-grid-item"
          item
          xs={12}
        >
          <h5
            className="clinical-information-review-order-content-title"
            data-testid="previous-therapies-other"
          >
            Is there eschar tissue present in the wound?
          </h5>
          <h5
            className="clinical-information-review-order-content-value"
            data-testid="previous-therapies-other-value"
          >
            {makeCapitalEachWordInString(
              woundInfoData.isTissuePresent.value !== ""
                ? woundInfoData.isTissuePresent.value
                : "--"
            )}
          </h5>
        </Grid>
      </Grid>
    </div>
  );
};
