import { AddButton } from "../myPatients.style";
import { IAddPatientButton } from "./addPatientButton.interface";
import AddIcon from "@mui/icons-material/AddCircleOutline";

export const AddPatientButton = ({
  isBtnVisible,
  isBtnDisabled,
  onClickHandler,
  testId,
}: IAddPatientButton) => {
  return isBtnVisible ? (
    <AddButton
      startIcon={<AddIcon />}
      onClick={onClickHandler}
      disabled={isBtnDisabled ?? false}
      data-testid={testId}
    >
      Add Patient
    </AddButton>
  ) : null;
};
