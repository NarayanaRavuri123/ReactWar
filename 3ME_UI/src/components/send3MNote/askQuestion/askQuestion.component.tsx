import "./askQuestion.css";
import { useState } from "react";
import { Grid, InputBase } from "@mui/material";
import { SendNoteValidator } from "../sendNote.validator";
import { IAskQuestion, IAskQuestionProps } from "./askQuestion.interface";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";

export const AskQuestion = ({
  data,
  setData,
  Validator = new SendNoteValidator(),
}: IAskQuestionProps) => {
  const [validator] = useState<SendNoteValidator>(Validator!);

  const validateAndSetData = (e: any) => {
    let { value, name, required } = e.target;
    let isValid = validator.validate(value, name);
    setData((dt: IAskQuestion) => ({
      ...dt,
      [name]: {
        value: value,
        valid: isValid?.status,
        required: required,
      },
    }));
  };

  return (
    <div
      className="ask-question-component"
      data-testid="ask-question-component"
    >
      <div className="short-form">
        <h4
          className="ask-question-info-title"
          data-testid="ask-question-info-title"
        >
          Question Details
        </h4>
        <Grid className="ask-question-info-grid-container" container>
          <Grid className="ask-question-info-grid-item" item xs={12}>
            <InputWithLabel
              error={data.question.valid === ValidationStatus.INVALID}
              isRequired={data.question.required}
              label="Your Question"
              labelClassName="ask-question-info-input-label"
              testId="question-input-label"
            >
              <InputBase
                className="ask-question-info-input"
                data-testid="question-input-value"
                error={data.question.valid === ValidationStatus.INVALID}
                inputProps={{
                  minLength: 5,
                  className:
                    data.question.valid === ValidationStatus.INVALID
                      ? "showCommentError"
                      : "noCommentError",
                }}
                multiline={true}
                name="question"
                onChange={validateAndSetData}
                required={data.question.required}
                rows={3}
                value={data.question.value}
              />
            </InputWithLabel>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
