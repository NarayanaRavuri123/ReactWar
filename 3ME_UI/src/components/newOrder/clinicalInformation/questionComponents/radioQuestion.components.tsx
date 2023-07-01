import { RadioGroup } from "@mui/material";
import { ChangeEvent } from "react";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { CustomRadioButton } from "../../../../core/radioButton/customRadioButton.component";

type RadioProps = {
  name: string;
  label: string;
  required: boolean;
  error: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  value: string;
  testid?: string;
};
export const RadioQuestion = ({
  name,
  label,
  required,
  error,
  onChange,
  value,
  testid,
}: RadioProps) => {
  return (
    <div className="question-container">
      <InputWithLabel
        label={label}
        isRequired={required}
        error={error}
        testId={testid!}
        labelClassName="radio-question-label"
      >
        <RadioGroup
          name={name}
          classes={{ root: "radio-question" }}
          onChange={onChange}
          value={value}
        >
          <CustomRadioButton
            label="Yes"
            textValue="Yes"
            selectedValue={value}
          />
          <CustomRadioButton label="No" textValue="No" selectedValue={value} />
        </RadioGroup>
      </InputWithLabel>
    </div>
  );
};
