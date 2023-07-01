import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { WindowService } from "../../../util/window.service";
import "./contactUsAcknowledgement.css";
import { IContactUsAcknowledgement } from "./contactUsAcknowledgement.interface";
import { getStaticContent } from "../../../util/staticContentService";
import { SC_HELPLINE_PHONENUMBER } from "../../../util/staticText";
import { format } from "react-string-format";

export const ContactUsAcknowledgement = ({
  windowService = new WindowService(),
}: IContactUsAcknowledgement) => {
  let history = useHistory();
  const redirectToHelpPage = () => {
    history.push("/helpAndSupport");
  };
  useEffect(() => {
    windowService.scrollToTop();
    fetchStaticContentHelpLineNum();
    // eslint-disable-next-line
  }, []);
  const [helplineNumberInfo, sethelplineNumberInfo] = useState("");
  const fetchStaticContentHelpLineNum = async () => {
    //async and await
    try {
      const staticContentHelplineNum = format("{0}", SC_HELPLINE_PHONENUMBER);
      const data = await getStaticContent(staticContentHelplineNum);
      if (data.items.length > 0) {
        const helpLineNumberobj = data.items.filter(
          (item: { key: string }) => item.key === SC_HELPLINE_PHONENUMBER
        );
        const helplineNum = helpLineNumberobj[0].value;
        sethelplineNumberInfo(helplineNum);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="contact-us-sent-page">
      <h2>Contact Us</h2>
      <span className="info">
        Thank you for submitting your request. Your request will be reviewed by
        your Ready Care Operations Planning Team within the next few days and
        you should receive a response within one week
      </span>
      <span className="info" data-testid="contactDes">
        For urgent assistance, please call our National Contact Center at:{" "}
        {helplineNumberInfo}
      </span>
      <Button
        className="returnBtn"
        variant="contained"
        onClick={redirectToHelpPage}
      >
        Return to Help & Support
      </Button>
    </div>
  );
};
