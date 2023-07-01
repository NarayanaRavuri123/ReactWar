import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import OrderSummarySuccess from "../../../assets/OrderSummarySuccess.svg";
import { ExpressButton } from "../../../core/expressButton/expressButton.component";

const SupplyOrderSummaryHeader = () => {
  const history = useHistory();
  return (
    <Grid
      className="orderSummaryForm"
      container
      display="flex"
      flexDirection="row"
    >
      <Grid xs={1.5}>
        <div data-testid="successimgTest">
          <img src={OrderSummarySuccess} alt={OrderSummarySuccess} />
        </div>
      </Grid>
      <Grid xs={9}>
        <Grid display="flex" flexDirection="column">
          <Grid>
            <p className="orderSuccessPara" data-testid="successTextTest">
              Thank you!
            </p>
          </Grid>
          <Grid>
            <p className="orderSuccessPara2" data-testid="successText2Test">
              Your Patient Supply Order has been submitted.
            </p>
          </Grid>
          <Grid>
            <p className="orderSuccessPara3" data-testid="successText3Test">
              A 3M Medical Solutions representative will contact you if
              additional information is required for your order.
            </p>
          </Grid>
          <Grid className="orderSummaryBtn">
            <ExpressButton
              clickHandler={() => {
                history.push("/home");
              }}
              parentClass="backtoPatientBtn"
              testId="OrderSucessTest"
              variant="contained"
            >
              Back to My Patients
            </ExpressButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SupplyOrderSummaryHeader;
