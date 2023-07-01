import { Grid } from "@mui/material";
import { IcharityCareDetails } from "../../../woundBed/vacTherapyInformation.interface";
import "./charityCare.css";
type Props = {
  charitycareData: IcharityCareDetails;
};
export const CharityCare = ({ charitycareData }: Props) => {
  return (
    <Grid container className="charity-care-container" flexDirection="row">
      <div className="charity-desc" data-testid="charity-desc">
        Please complete the charity care loaner program application to the
        V.A.C.® Therapy Order to expedite processing.
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <ul>
          <li>
            <a
              href={charitycareData.fileLink}
              className="charity-pdf-link"
              data-testid="charity-pdf-link"
              target="_blank"
              rel="noreferrer"
            >
              {charitycareData.labelText}
            </a>
          </li>
        </ul>
        <span className="pdf-size">{`- PDF, ${charitycareData.fileSize}`}</span>
      </div>
      <div className="charity-instruction">
        Include the completed application using{" "}
        <div className="upload-doc">Upload Documents</div> below
      </div>
    </Grid>
  );
};
