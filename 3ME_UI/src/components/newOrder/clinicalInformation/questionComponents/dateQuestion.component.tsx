import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useState } from "react";
import { InputWithLabel } from "../../../../core/inputWithLabel/inputWithLabel.component";
import { ReactComponent as CalendarIcon } from "../../../../assets/calendar.svg";
import "./dateQuestion.css";
type DateProps = {
  name: string;
  label: string;
  required: boolean;
  error: boolean;
  onChange: (value: string | null, keyboardInputValue?: string) => void;
  value: string;
  testid?: string;
};
export const DateQuestion = ({
  name,
  label,
  required,
  error,
  onChange,
  value,
  testid,
}: DateProps) => {
  const [focusClasses, setFocusClasses] = useState({ phone: "", dob: "" });
  const setClasses = (e: any, classname: string) => {
    setFocusClasses(
      Object.assign({}, focusClasses, { [e.target.name]: classname })
    );
  };
  return (
    <div className="question-container">
      <InputWithLabel label={label} isRequired={required} error={error}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            InputAdornmentProps={{
              classes: {
                root: "adornedRoot",
              },
            }}
            InputProps={{
              classes: {
                root: `dateQuestionRoot ${error ? "showError" : "noError"}`,
                input: "dateQuestionInput",
                notchedOutline: "outline",
              },
            }}
            components={{ OpenPickerIcon: CalendarIcon }}
            value={value}
            onChange={(value: string | null) => onChange(value)}
            renderInput={(params) => {
              params.error = false;
              params.inputProps!.placeholder = "__/__/____";
              return (
                <TextField
                  name={name}
                  onFocus={(e) => setClasses(e, "Mui-focused")}
                  onBlur={(e) => setClasses(e, "")}
                  {...params}
                  data-testid={testid}
                />
              );
            }}
          />
        </LocalizationProvider>
      </InputWithLabel>
    </div>
  );
};
