import { PopperDiv, ActionsDiv } from "./patientActions.style";
import { IPatientActionsInterface } from "./patientActions.interface";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { IMenuAction, IPatient } from "../patient.interface";
import { useContext, useEffect, useState } from "react";
import {
  RolesPermissionContextType,
  RolesPermissionContext,
} from "../../../context/RolesPermissionContext";

export const PatientActions = ({
  setSelectedValue,
  clickedOutside,
  menuData,
}: IPatientActionsInterface) => {
  const patientActionOptionList =
    menuData &&
    menuData.map((x: IMenuAction, index: number) => {
      return (
        <ClickAwayListener
          onClickAway={(e) => clickedOutside(e)}
          key={index.toString()}
        >
          <ActionsDiv onClick={(e) => setSelectedValue(e, x.text)} id={x.text}>
            {x.text}
          </ActionsDiv>
        </ClickAwayListener>
      );
    });
  return (
    <PopperDiv data-testid="dotMenuTest">{patientActionOptionList}</PopperDiv>
  );
};
