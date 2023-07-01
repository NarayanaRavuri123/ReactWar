import React from "react";

import {
  handleEmptyValue,
  makeCapitalEachWordInString,
} from "../../../../../../../util/utilityFunctions";
import { Grid } from "@mui/material";

type Props = {
  title: string;
  value: string;
  valueClassName?: string;
  formatValue?: boolean;
  woundTitleClassName?: string;
  titleClassName?: string;
};
const WoundTitleBedValue = ({
  title,
  value = "-",
  valueClassName = "reviewdata-value",
  formatValue = true,
  woundTitleClassName = "reviewdata-pack",
  titleClassName = "reviewdata-title",
}: Props) => {
  return (
    <Grid className={woundTitleClassName} container>
      <Grid item xs={8}>
        <p className={titleClassName}> {title} </p>
      </Grid>
      <Grid item xs={4}>
        {" "}
        <p className={valueClassName}>
          {formatValue
            ? makeCapitalEachWordInString(handleEmptyValue(value))
            : handleEmptyValue(value)}
        </p>
      </Grid>
    </Grid>
  );
};

export default WoundTitleBedValue;
