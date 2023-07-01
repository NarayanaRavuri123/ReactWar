import React from "react";
import "./woundTitleValue.css";
import {
  handleEmptyValue,
  makeCapitalEachWordInString,
} from "../../../../../../../util/utilityFunctions";
type Props = {
  title: string;
  value: string;
  valueClassName?: string;
  formatValue?: boolean;
  woundTitleClassName?: string;
  titleClassName?: string;
  onValueClick?: any;
  testID?: string;
};
const WoundTitleValue = ({
  title,
  value = "-",
  valueClassName = "reviewdata-value",
  formatValue = true,
  woundTitleClassName = "reviewdata-pack",
  titleClassName = "reviewdata-title",
  onValueClick = () => {},
  testID = "defaultTestIDValue",
}: Props) => {
  return (
    <div className={woundTitleClassName}>
      <div className={titleClassName} data-testId={`${testID}-title`}>
        {title}
      </div>
      <div
        className={valueClassName}
        onClick={onValueClick}
        data-testId={`${testID}-value`}
      >
        {formatValue
          ? makeCapitalEachWordInString(handleEmptyValue(value))
          : handleEmptyValue(value)}
      </div>
    </div>
  );
};

export default WoundTitleValue;
