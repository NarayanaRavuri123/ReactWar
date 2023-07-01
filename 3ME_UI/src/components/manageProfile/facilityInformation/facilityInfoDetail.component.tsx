import { Typography } from "@mui/material";
import { IFacility } from "./facility.interface";
import trash from "../../../assets/trash.svg";
import "./facilityInformation.css";
import { makeCapitalEachWordInString } from "../../../util/utilityFunctions";

type Props = {
  facilityInfo: IFacility;
  showTrash: boolean;
  index: number;
  openConfirmationBox: any;
};

export const FacilityInfoDetail = ({
  facilityInfo,
  index,
  showTrash,
  openConfirmationBox,
}: Props) => {
  return (
    <div className="facilitywrapper">
      <div className="facility-detail">
        <div key={index} className="leftfaciltydetails">
          <div className="facilityname">
            {makeCapitalEachWordInString(facilityInfo.accountName)}
          </div>
          <Typography className="facilitytitle">Address</Typography>
          <Typography className="facilityvalue">
            {makeCapitalEachWordInString(facilityInfo.address1)},{" "}
            {makeCapitalEachWordInString(facilityInfo.address2)}
          </Typography>
          <Typography className="facilityvalue">
            {makeCapitalEachWordInString(facilityInfo.city)},{" "}
            {facilityInfo.state} {facilityInfo.zip}
          </Typography>
        </div>
        <div className="rightfaciltydetails">
          <Typography className="facilitytitle">Facility Type</Typography>
          <Typography className="facilityvalue">
            {makeCapitalEachWordInString(facilityInfo.typeName)}
          </Typography>
          {facilityInfo.accountNumber !== null && (
            <>
              <Typography className="facilitytitle">Facility number</Typography>
              <Typography className="facilityvalue">
                {facilityInfo.accountNumber}
              </Typography>
            </>
          )}
        </div>
        <div className="lastfaciltydetails">
          {showTrash && (
            <img
              className="trash"
              src={trash}
              alt={trash}
              onClick={() => openConfirmationBox(facilityInfo)}
            />
          )}
        </div>
      </div>
      {facilityInfo.accountNumber === null && (
        <h4 className="facility-detail-warning">
          Manual entry will require facility setup which may take 1 to 5
          business days to complete. You will receive an email notification when
          that access request has been approved.
        </h4>
      )}
    </div>
  );
};
