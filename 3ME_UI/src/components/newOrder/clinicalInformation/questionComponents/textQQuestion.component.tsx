import { InputBase } from "@mui/material";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";

type TextProps = {
  name: string;
  label: string;
  required: boolean;
  error: boolean;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  value: string;
  testid?: string;
};
export const TextQuestion = ({
  name,
  label,
  required,
  error,
  onChange,
  value,
  testid,
}: TextProps) => {
  return (
    <div className="question-container">
      <InputWithLabel
        label={label}
        isRequired={required}
        error={error}
        testId={testid!}
      >
        <InputBase
          className="text-question"
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder="Placeholder"
        />
      </InputWithLabel>
    </div>
  );
};
