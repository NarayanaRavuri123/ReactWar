import { Checkbox } from "@mui/material";
import { ReactComponent as UncheckIcon } from "../../assets/uncheckedcheckbox.svg";
import { ReactComponent as CheckedIcon } from "../../assets/checkedcheckbox.svg";
import { ReactComponent as DisabledUncheckIcon } from "../../assets/disabled-checkbox.svg";
import { ReactComponent as DisabledCheckedIcon } from "../../assets/disabled-checked-checkbox.svg";

import "./checkBox.css";

type Props = {
  defaultValue?: any;
  checked?: boolean;
  isDisabled?: boolean;
  value: any;
  handleChange: any;
  labelClassName: string;
  selectClassName?: string;
  selectpropsClassName?: string;
  testId?: string;
  name?: string;
  labelText?: string;
  required?: boolean;
};

export const CustomCheckBox = ({
  defaultValue,
  checked,
  isDisabled = false,
  value,
  handleChange,
  labelClassName,
  selectClassName,
  selectpropsClassName,
  testId,
  labelText,
  name,
  required,
}: Props) => {
  return (
    <div className="chkBoxMain">
      <Checkbox
        disabled={isDisabled}
        icon={isDisabled ? <DisabledUncheckIcon /> : <UncheckIcon />}
        checkedIcon={isDisabled ? <DisabledCheckedIcon /> : <CheckedIcon />}
        className={selectClassName}
        classes={{ root: selectpropsClassName }}
        checked={checked}
        onClick={handleChange}
        value={value}
        data-testid={testId}
        name={name}
        defaultValue={defaultValue}
      />
      <div className={labelClassName}>{labelText}</div>
      {required === true && <span className="chkBoxRequiredStar">*</span>}
    </div>
  );
};
