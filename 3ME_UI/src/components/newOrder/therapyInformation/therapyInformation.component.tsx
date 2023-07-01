import {
  DD_THERAPY_LENGTHS_CONTENT,
  DD_THERAPY_GOALS_CONTENT,
} from "../../../util/staticText";
import "./therapyInformation.css";
import { Grid } from "@mui/material";
import {
  getCodeFromText,
  getTextFromCode,
} from "../../../util/utilityFunctions";
import { useState, useEffect, useContext } from "react";
import { format } from "react-string-format";
import { NewOrderValidator } from "../newOrder.validator";
import { getdropDownContent } from "../../../util/dropDownService";
import { ITherapyInformation } from "./therapyInformation.interface";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { CustomDropDown } from "../../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { TherapyInformationReviewOrder } from "./reviewOrder/therapyInformationReviewOrder.component";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";

export const TherapyInformation = ({
  data,
  Validator = new NewOrderValidator(),
  setData,
  isReviewOrder = false,
  editButtonClicked,
  isOrderSummary = false,
}: ITherapyInformation) => {
  const [validator] = useState<NewOrderValidator>(Validator!);
  const [therapyLengths, setTherapyLengths] = useState([]);
  const [therapyGoals, setTherapyGoals] = useState([]);
  const [therapyLengthsText, setTherapyLengthsText] = useState([]);
  const [therapyGoalsText, setTherapyGoalsText] = useState([]);
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  useEffect(() => {
    fetchDropDownContent();
  }, []);

  const fetchDropDownContent = async () => {
    //async and await
    try {
      const ddContent = format(
        "{0},{1}",
        DD_THERAPY_LENGTHS_CONTENT,
        DD_THERAPY_GOALS_CONTENT ?? ""
      );
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const therapyLenthObject = data.items.filter(
          (item: { name: string }) => item.name === DD_THERAPY_LENGTHS_CONTENT
        );
        const therapyLengthData = therapyLenthObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setTherapyLengths(therapyLengthData);
        setTherapyLengthsText(
          therapyLengthData.map((x: { text: string }) => x.text)
        );
        const therapyGoalObject = data.items.filter(
          (item: { name: string }) => item.name === DD_THERAPY_GOALS_CONTENT
        );
        const therapyGoalData = therapyGoalObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setTherapyGoals(therapyGoalData);
        setTherapyGoalsText(
          therapyGoalData.map((x: { text: string }) => x.text)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const validateAndSetData = (e: any) => {
    NewOrderObj?.setIsHandleChangeTriggered(true);
    let isValid = validator.validate(e.target.value, e.target.name);
    if (e.target.name === "lengthOfTherapy") {
      setData(
        Object.assign({}, data, {
          [e.target.name]: {
            value: getCodeFromText(therapyLengths, e.target.value),
            valid: isValid?.status,
          },
        })
      );
    } else {
      setData(
        Object.assign({}, data, {
          [e.target.name]: {
            value: getCodeFromText(therapyGoals, e.target.value),
            valid: isValid?.status,
          },
        })
      );
    }
  };

  return (
    <div className="therapy-information-component">
      {!isReviewOrder && (
        <div className="therapy-information">
          <div className="therapy-information-header">
            <h2
              className="therapy-information-title"
              data-testid="therapy-information-title"
            >
              Therapy Information
            </h2>
          </div>
          <Grid
            className="therapy-information-grid-container"
            container
            spacing={2}
          >
            <Grid item xs={12}>
              <InputWithLabel
                label="Length of Therapy"
                isRequired={true}
                error={data?.lengthOfTherapy.valid === ValidationStatus.INVALID}
                testId={"test-lengthOfTherapy"}
              >
                <CustomDropDown
                  handleChange={validateAndSetData}
                  menuItem={therapyLengthsText}
                  name="lengthOfTherapy"
                  placeHolder="Select Length"
                  selectpropsClassName={
                    data.lengthOfTherapy.value
                      ? "therapy-information-select"
                      : "placeHolder"
                  }
                  selectClassName={
                    data.lengthOfTherapy.value
                      ? "therapy-information-input"
                      : "placeHolder"
                  }
                  testId="therapy-information-lengthOfTherapy"
                  value={
                    data.lengthOfTherapy.value
                      ? getTextFromCode(
                          therapyLengths,
                          data?.lengthOfTherapy.value
                        )
                      : null
                  }
                />
              </InputWithLabel>
            </Grid>
            <Grid item xs={12}>
              <InputWithLabel
                label="Goal of Therapy"
                isRequired={true}
                error={data?.goalOfTherapy.valid === ValidationStatus.INVALID}
                testId={"test-goalOfTherapy"}
              >
                <CustomDropDown
                  handleChange={validateAndSetData}
                  menuItem={therapyGoalsText}
                  name="goalOfTherapy"
                  placeHolder="Select Goal"
                  selectpropsClassName={
                    data.goalOfTherapy.value
                      ? "therapy-information-select"
                      : "placeHolder"
                  }
                  selectClassName={
                    data.goalOfTherapy.value
                      ? "therapy-information-input"
                      : "placeHolder"
                  }
                  testId="therapy-information-goalOfTherapy"
                  value={
                    data?.goalOfTherapy.value
                      ? getTextFromCode(therapyGoals, data?.goalOfTherapy.value)
                      : null
                  }
                />
              </InputWithLabel>
            </Grid>
          </Grid>
        </div>
      )}
      {isReviewOrder && (
        <TherapyInformationReviewOrder
          data={data}
          editButtonClicked={editButtonClicked}
          therapyLengths={therapyLengths}
          therapyGoals={therapyGoals}
          isOrderSummary={isOrderSummary}
        />
      )}
    </div>
  );
};
