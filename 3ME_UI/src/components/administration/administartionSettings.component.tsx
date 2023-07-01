import "./administration.css";
import { ExpressButton } from "../../core/expressButton/expressButton.component";
import { Grid } from "@mui/material";

const AdministrationSettings = ({ buttonArray, handleBtnClick }: any) => {
  return (
    <div>
      <Grid>
        {buttonArray.length > 0 &&
          buttonArray.map((x: any, index: number) => {
            return (
              <Grid item className="adminBtnGrid">
                <ExpressButton
                  variant="outlined"
                  parentClass="adminBtnMain"
                  clickHandler={handleBtnClick}
                  id={x}
                  testId={x + index}
                >
                  {x}
                </ExpressButton>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default AdministrationSettings;
