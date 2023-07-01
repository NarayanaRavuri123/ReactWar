import "./orderUploadDocumentReviewOrder.css";
import { Button, Grid } from "@mui/material";
import { IDropZoneDocumentSelect } from "../../../../core/customDropZone/dropZoneDocumentSelect.interface";

type Props = {
  editButtonClicked?: any;
  isOrderSummary?: boolean;
  newOrderDocuments?: IDropZoneDocumentSelect[];
};
export const OrderUploadDocumentReviewOrder = ({
  editButtonClicked,
  isOrderSummary,
  newOrderDocuments,
}: Props) => {
  return (
    <div className="order-upload-review-order">
      <div className="order-upload-review-order-header">
        <h2
          className="order-upload-review-order-title"
          data-testid="order-upload-review-order-title"
        >
          Documents
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "order-upload-review-order-edit-button" }}
            data-testid="order-upload-review-order-edit-button"
            onClick={editButtonClicked}
          >
            Edit
          </Button>
        )}
      </div>

      <Grid className="order-upload-review-order-grid-item" item xs={12}>
        {newOrderDocuments &&
          newOrderDocuments.map((obj: IDropZoneDocumentSelect) => (
            <h5
              className="order-upload-review-order-content-value"
              data-testid="order-upload-value"
            >
              <span className="dot-with-space">&bull; </span>
              {obj.documentName}
              <br></br>
            </h5>
          ))}
      </Grid>
    </div>
  );
};
