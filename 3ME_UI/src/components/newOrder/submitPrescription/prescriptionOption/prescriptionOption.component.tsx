import "./prescriptionOption.css";
import RadioButtonIcon from "../../../../assets/radioButton.svg";
import SelectedRadioButtonIcon from "../../../../assets/selectedRadioButton.svg";
import { IPrescriptionOption } from "./prescriptionOption.interface";

export const PrescriptionOption = ({
  id,
  title,
  description,
  isOptionSelected,
  buttonOnClick,
  prescriptionClassName,
  isFaxLater = false,
  phoneNumber,
}: IPrescriptionOption) => {
  return (
    <div className={prescriptionClassName} data-testid={"option-test-" + id}>
      <button
        className="radio-button"
        data-testid={"test-" + id}
        id={id}
        onClick={buttonOnClick}
      >
        <img
          data-testid={"test-image-" + id}
          id={"image-" + id}
          src={isOptionSelected ? SelectedRadioButtonIcon : RadioButtonIcon}
          alt={isOptionSelected ? SelectedRadioButtonIcon : RadioButtonIcon}
        />
      </button>
      <div
        className="prescription-option-text"
        data-testid={"option-text-test-" + id}
      >
        <h4 className="radio-title" data-testid={title}>
          {title}
        </h4>
        <h4 className="radio-description" data-testid={description}>
          {description}{" "}
          {phoneNumber && (
            <span className="phone-number" data-testid="phone-number">
              {phoneNumber}
            </span>
          )}{" "}
        </h4>
      </div>
    </div>
  );
};
