import { useContext, useState } from "react";
import "./facilityBaseUserRole.css";
import Icons from "../../../assets/Icons.jpg";
import { PageContext } from "../../page/page.context";
import { Grid, Box } from "@mui/material";

export const FacilityBaseUserRole = () => {
  const techSupport = useContext(PageContext);
  

  return (
    
    <div className="facilityBaseUserRole"   data-testid="facilityBaseUserRole">
      <div className="facilityimg" data-testid="facilityimg">
        <img src={Icons} alt={Icons}></img>
      </div>

      <div className="baseroletitle" data-testid="baseroletitle">
        Your account is not associated with <p>a facility in 3M Express</p>
      </div>
      <Grid className="baserole-desc-container">
        <div className="baseroledesc" data-testid="baseroledesc">
          <span>
            If you've already applied to be associated with a facility, please<p>
              note that it can take 1-3 business days to complete. If it has</p>
            <p>been longer than that, please contact our National Contact </p>
            Center at
          </span>

          <div className="sub-sections">
            <span className="contact-type" data-testid="phone1">
              {" "}
            </span>
            <a
              className="contact-values"
              href={`tel:${techSupport.techRepContacts?.phoneNo}`}
            >
              {techSupport.techRepContacts?.phoneNo + "."}
            </a>
          </div>
        </div>
      </Grid>
    </div>
    
  );
};
