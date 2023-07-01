import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import "./summaryDischargeRequestHeader.css";
import OrderSummarySuccess from "../../../../assets/OrderSummarySuccess.svg";
import { ExpressButton } from "../../../../core/expressButton/expressButton.component";
import { getCMSContent } from "../../../../util/cmsService";
import { CMS_TECHNICALSUPPORT_CONTENT } from "../../../../util/staticText";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../../../core/loader/LoadingSpinner";
import { IDischargeSummary } from "./summaruDischargeRequest.interface";
import { Popup } from "../../../../core/popup/popup.component";

export const SummaryDischargeRequestHeader = () => {
  const history = useHistory();
  const [saveAPILoader, setsaveAPILoader] = useState(false);
  const [techSupportInfo, setTechSupportInfo] =
    useState<IDischargeSummary | null>();

  const loadTechicalSupport = async () => {
    try {
      setsaveAPILoader(true);
      const { item } =
        (await getCMSContent(CMS_TECHNICALSUPPORT_CONTENT)) || {};
      const techSupportData: IDischargeSummary = {
        phoneNo: item.phoneNo,
      };
      setTechSupportInfo(techSupportData);
      setsaveAPILoader(false);
    } catch (error) {}
  };

  useEffect(() => {
    loadTechicalSupport();
  }, []);

  const spinner = () => {
    return (
      <div>
        <div className="saveapi-header">Saving Order</div>
        <div className="saveapi-spinner">
          <LoadingSpinner />
        </div>
      </div>
    );
  };

  return (
    <Grid className="gridLine">
      <div className="summaryDischargeRequestHeader">
        {saveAPILoader ? (
          <Popup
            hideCloseButton={true}
            openFlag={saveAPILoader}
            closeHandler={() => {}}
          >
            {spinner()}
          </Popup>
        ) : (
          <>
            <Grid
              className="orderSummaryForm"
              container
              display="flex"
              flexDirection="row"
            >
              <Grid xs={1.5} flexDirection="row">
                <div
                  data-testid="imgTest"
                  className="clipboardIcon"
                  style={{
                    alignSelf: "center",
                    marginLeft: 2,
                    background: "red",
                  }}
                >
                  <img src={OrderSummarySuccess} alt={OrderSummarySuccess} />
                </div>
              </Grid>
              <Grid xs={9}>
                <Grid display="flex" flexDirection="column">
                  <Grid>
                    <p
                      className="dischargeSuccessPara"
                      data-testid="successText"
                    >
                      Success!
                    </p>
                  </Grid>
                  <Grid>
                    <p
                      className="dischargeSuccessPara2"
                      data-testid="successText2"
                    >
                      Your discharge request has been submitted.
                    </p>
                  </Grid>
                  <Grid>
                    <p
                      className="dischargeSuccessPara3"
                      data-testid="successText3"
                    >
                      For assistance, please contact the National Contact Center
                      at
                      <span> </span>
                      <a
                        className="contact-value"
                        href={`tel:${techSupportInfo?.phoneNo}`}
                      >
                        {techSupportInfo?.phoneNo}
                      </a>
                      <p>
                        Your document has been submitted. If you did not see
                        your document in a newly opened window, you may need to
                        turn off or disable pop-up blockers. Click the “Save &
                        Print Discharge Summary” button below to try again.
                        Please print the form and keep it as a part of the
                        patients’s medical records.
                      </p>
                      <p> Please upload or fax any relevant medical records.</p>
                    </p>
                  </Grid>
                  <Grid className="dischargeSummaryBtn">
                    <ExpressButton
                      clickHandler={() => {
                        history.push("/home");
                      }}
                      parentClass="backtoPatientBtn"
                      testId="DischargeSucessTest"
                      variant="contained"
                    >
                      Back to My Patients
                    </ExpressButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </Grid>
  );
};
