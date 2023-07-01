import "./inventoryRequestSuccess.css";
import { ExpressButton } from "../../../../../core/expressButton/expressButton.component";
import { IInventoryRequestSucuessProps } from "./inventoryRequestSuccess.interface";

export const InventoryRequestSucuess = ({
  backButtonAction,
}: IInventoryRequestSucuessProps) => {
  return (
    <div className="inventory-success-pop-up">
      <h2 className="title" data-testid="title">
        Inventory Adjustment Request Sent
      </h2>
      <h4 className="description1" data-testid="description1">
        Thank you for submitting your request. Your request will be reviewed by
        your Ready Care Operations Planning Team within the next few days and
        you should receive a response within one week.
      </h4>
      <h4 className="description2" data-testid="description2">
        For urgent assistance, please call our National Contact Center at:
        <a
          className="phone-value"
          data-testid="phone-value"
          href={`tel:8002754524`}
        >
          (800) 275-4524 Ext. 41858.
        </a>{" "}
      </h4>
      <ExpressButton
        clickHandler={() => {
          backButtonAction();
        }}
        parentClass="back-button"
        testId="back-button"
        variant="contained"
      >
        Back to inventory
      </ExpressButton>
    </div>
  );
};
