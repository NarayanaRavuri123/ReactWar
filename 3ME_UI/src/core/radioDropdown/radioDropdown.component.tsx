import { Radio } from "@mui/material";
import { useState } from "react";
import { IRadioDropdownProps } from "./radioDropdown.interface";
import { ControlSpan, DisplaySpan, ExpandLessIcon, ExpandMoreIcon, FormLabelOption, OpenedRadioGroupOption, ParentDiv, RadioGroupOption } from "./radioDropdown.style";

export const RadioDropdown = <T extends unknown>({data, displayLabel, setChosenValue}: IRadioDropdownProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, item: T) => {
    setSelectedValue(e.target.value);
    setChosenValue(item);
    clickHandler();
  }
  const clickHandler = () => {
    setOpen(x => !x);
  }
  const optionRenderer = data.map((x: any, index: number) => <FormLabelOption
    value={x[displayLabel]}
    control={<Radio onChange={(e) => changeHandler(e, x)} />}
    label={x[displayLabel]}
    key={index}
  />);
  return (
    <ParentDiv>
      <ControlSpan onClick={clickHandler}>
        <DisplaySpan>{selectedValue}</DisplaySpan>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ControlSpan>
      {open ? <OpenedRadioGroupOption value={selectedValue}>{optionRenderer}</OpenedRadioGroupOption> : <RadioGroupOption value={selectedValue}>{optionRenderer}</RadioGroupOption>}
    </ParentDiv>
  );
}