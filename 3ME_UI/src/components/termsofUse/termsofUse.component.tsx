import "./termsofUse.css";
import parse from "html-react-parser";
import { Box, Card } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { getUser } from "../../util/userService";
import { getCMSContent } from "../../util/cmsService";
import { useContext, useEffect, useState } from "react";
import { SVC_GET_UPDATEEULADATE } from "../../util/staticText";
import { AuthContextType, AuthContext } from "../../context/AuthContext";
import { ExpressButton } from "../../core/expressButton/expressButton.component";

export const TermsOfUse = () => {
  const history = useHistory();
  const { oktaAuth } = useOktaAuth();
  const [terms, setTerms] = useState<string>();
  const AuthObj = useContext<AuthContextType | null>(AuthContext);

  useEffect(() => {
    if (AuthObj?.terms === undefined) {
      getCMSContent("Legal").then((content) => {
        if (content.item !== undefined) setTerms(content.item.data);
        else setTerms(content);
      });
    } else {
      const da = AuthObj?.terms!;
      setTerms(da);
    }
  }, []);

  const confirmLogout = async () => {
    localStorage.clear();
    AuthObj?.setUserProfile(undefined);
    await oktaAuth.signOut();
  };

  const handleAccept = async () => {
    await getUser(AuthObj?.preferredUserName, SVC_GET_UPDATEEULADATE);
    history.push(AuthObj?.deepLinkPath ? AuthObj?.deepLinkPath : "/home");
    localStorage.setItem("eulaAcceptedDate", "true");
    AuthObj?.setTermsOfUseAccepted(true);
  };

  return (
    <>
      <Card className="maincontainer">
        <Box className="mainbox">
          <p data-testid="para-terms-test" className="parastyle">
            {parse(terms || "")}
          </p>
        </Box>
        <Box className="buttoncontainer">
          <ExpressButton
            clickHandler={confirmLogout}
            parentClass="backbutton"
            variant="outlined"
            testId="terms-back"
          >
            Back
          </ExpressButton>
          <ExpressButton
            clickHandler={handleAccept}
            parentClass="acceptbutton"
            variant="contained"
            testId="terms-accept"
          >
            I accept
          </ExpressButton>
        </Box>
      </Card>
    </>
  );
};
