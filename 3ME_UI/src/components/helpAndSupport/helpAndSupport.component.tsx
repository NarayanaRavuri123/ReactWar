import { useContext, useEffect, useState } from "react";
import {
  HelpAndSupportDiv,
  HelpAndSupportSubDiv,
  StyledCardContent,
  RightMenuDiv,
  HeaderDiv,
  OptionsDiv,
  OptionDiv,
  TitleAndDescriptionDiv,
  Title,
  Description,
} from "./helpAndSupport.style";
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import "./helpAndSupport.css";
import FAQ from "./faq/faq.component";
import SystemRequirements from "../systemRequirements/systemReq.components";
import { Grid } from "@mui/material";
import { Navigator } from "./Navigator/navigator.component";
import { NeedHelp } from "../needHelp/needHelp.component";
import { ContactUs } from "./contactUs/contactUs.component";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { ContactUsAcknowledgement } from "./contactUsAcknowledgement/contactUsAcknowledgement.component";
import { ReactComponent as Bullet } from "../../assets/bullet.svg";
import { ReactComponent as SelectIcon } from "../../assets/selectIcon.svg";
import { CMS_HELPSUPPORT_CONTENT } from "../../util/staticText";
import { getCMSContent } from "../../util/cmsService";
import { IHelpAndSupport } from "./helpAndSupport.interface";



export const HelpAndSupport = () => {
  let history = useHistory();

  const redirectToContactUs = () => {
    history.push("/helpAndSupport/ContactUs");
  };

  const redirectToFAQ = () => {
    history.push("/helpAndSupport/faq");
  };

  let { path } = useRouteMatch();

  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const isLoggedIn = AuthObj?.isLoggedIn ? AuthObj?.isLoggedIn : false;
  const termsOfUseAccepted = AuthObj?.termsOfUseAccepted
    ? AuthObj?.termsOfUseAccepted
    : false;
  const [pageContent, setPageContent] = useState<IHelpAndSupport>();

  useEffect(() => {
    fetchPageContent();
  }, []);

  const fetchPageContent = async () => {
    //async and await
    try {
      const data = await getCMSContent(CMS_HELPSUPPORT_CONTENT);
      if (data.item !== undefined) {
        setPageContent(data.item);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const helpAndSupport = (
    <HelpAndSupportDiv>
      <HelpAndSupportSubDiv>
        <StyledCardContent>
          <HeaderDiv>
            <div className="help-header">Help & Support</div>
            <OptionsDiv>
              <OptionDiv>
                <TitleAndDescriptionDiv
                  onClick={redirectToFAQ}
                  data-testid="video-tutorials-faq"
                >
                  <Title>FAQ & Video Tutorials</Title>
                  <Description>Learn how to use 3M Express</Description>
                </TitleAndDescriptionDiv>
              </OptionDiv>
              <OptionDiv>
                <TitleAndDescriptionDiv
                  onClick={redirectToContactUs}
                  data-testid="contact-us"
                >
                  <Title>Contact Us</Title>
                  <Description>Send us a message if you need help</Description>
                </TitleAndDescriptionDiv>
              </OptionDiv>
            </OptionsDiv>
          </HeaderDiv>

          {pageContent && (
            <>
              <div className="resourcediv">
                <div className="resource-header">Resources</div>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  className="gridContainer"
                  classes={{ root: "gridRoot" }}
                >
                  <Grid
                    item
                    xs={6}
                    className="list-item"
                    classes={{ root: "list-root" }}
                  >
                    <Bullet height={10} />
                    <Link to="/helpAndSupport/sysreq" className="anchorfont">
                      {pageContent?.systemRequirement?.labelText}
                    </Link>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    className="list-item"
                    classes={{ root: "list-root" }}
                  >
                    <Bullet height={10} />
                    <a
                      href={pageContent?.ePrescription?.fileLink}
                      target="_blank"
                      rel="noreferrer"
                      className="anchorfont"
                    >
                      {pageContent?.ePrescription?.labelText}
                    </a>
                    <span className="spanFont">{`- ${pageContent?.ePrescription?.fileType}, ${pageContent?.ePrescription?.fileSize}`}</span>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    className="list-item"
                    classes={{ root: "list-root" }}
                  >
                    <Bullet height={10} />
                    <a
                      href={pageContent?.readycareHelp?.fileLink}
                      target="_blank"
                      rel="noreferrer"
                      className="anchorfont"
                    >
                      {pageContent?.readycareHelp?.labelText}
                    </a>
                    <span className="spanFont">{`- ${pageContent?.readycareHelp?.fileType}, ${pageContent?.readycareHelp?.fileSize}`}</span>
                  </Grid>
                </Grid>
              </div>
              <div className="printdiv">
                <div className="froms-header">Printable Forms</div>
                <div className="subHeaderText" data-testid="subHeaderText">
                  Easily access 3M documents for order processing. Tap on a
                  document below to email, print or download to your device.
                </div>
                <Grid
                  container
                  direction="column"
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  className="gridContainer"
                  classes={{ root: "gridRoot" }}
                >
                  {pageContent?.authorizationForm && (
                    <Grid
                      item
                      xs={6}
                      className="list-item"
                      classes={{ root: "list-root" }}
                    >
                      <Bullet height={10} />
                      <a
                        href={pageContent?.authorizationForm?.fileLink}
                        target="_blank"
                        rel="noreferrer"
                        className="anchorfont"
                      >
                        {pageContent?.authorizationForm?.labelText}
                      </a>
                      <span className="spanFont">{`- ${pageContent?.authorizationForm?.fileType}, ${pageContent?.authorizationForm?.fileSize}`}</span>
                      <div className="subText">
                        {pageContent?.authorizationForm?.description}
                      </div>
                    </Grid>
                  )}
                  {pageContent?.orderPad && (
                    <Grid
                      item
                      xs={6}
                      className="list-item"
                      classes={{ root: "list-root" }}
                    >
                      <Bullet height={10} />
                      <a
                        href={pageContent?.orderPad?.fileLink}
                        target="_blank"
                        rel="noreferrer"
                        className="anchorfont"
                      >
                        {pageContent?.orderPad?.labelText}
                      </a>
                      <span className="spanFont">{`- ${pageContent?.orderPad?.fileType}, ${pageContent?.orderPad?.fileSize}`}</span>
                      <div className="subText">
                        {pageContent?.orderPad?.description}
                      </div>
                    </Grid>
                  )}
                  {pageContent?.letterofMedicalNecessity && (
                    <Grid
                      item
                      xs={6}
                      className="list-item"
                      classes={{ root: "list-root" }}
                    >
                      <Bullet height={10} />
                      <a
                        href={pageContent?.letterofMedicalNecessity?.fileLink}
                        target="_blank"
                        rel="noreferrer"
                        className="anchorfont"
                      >
                        {pageContent?.letterofMedicalNecessity?.labelText}
                      </a>
                      <span className="spanFont">{`- ${pageContent?.letterofMedicalNecessity?.fileType}, ${pageContent?.letterofMedicalNecessity?.fileSize}`}</span>
                      <div className="subText">
                        {pageContent?.letterofMedicalNecessity?.description}
                      </div>
                    </Grid>
                  )}
                  {pageContent?.rentalReturnInstructions && (
                    <Grid
                      item
                      xs={6}
                      className="list-item"
                      classes={{ root: "list-root" }}
                    >
                      <Bullet height={10} />
                      <a
                        href={pageContent?.rentalReturnInstructions?.fileLink}
                        target="_blank"
                        rel="noreferrer"
                        className="anchorfont"
                      >
                        {pageContent?.rentalReturnInstructions?.labelText}
                      </a>
                      <span className="spanFont">{`- ${pageContent?.rentalReturnInstructions?.fileType}, ${pageContent?.rentalReturnInstructions?.fileSize}`}</span>
                      <div
                        className="subText"
                        data-testid="subTextRentalReturn"
                      >
                        {pageContent?.rentalReturnInstructions?.description}
                      </div>
                    </Grid>
                  )}
                  {pageContent?.mwhBroucher && (
                    <Grid
                      item
                      xs={6}
                      className="list-item"
                      classes={{ root: "list-root" }}
                    >
                      <Bullet height={10} />
                      <a
                        href={pageContent?.mwhBroucher?.fileLink}
                        target="_blank"
                        rel="noreferrer"
                        className="anchorfont"
                      >
                        {pageContent?.mwhBroucher?.labelText}
                      </a>
                      <span className="spanFont">{`- ${pageContent?.mwhBroucher?.fileType}, ${pageContent?.mwhBroucher?.fileSize}`}</span>
                      <div className="subText">
                        {pageContent?.mwhBroucher?.description}
                      </div>
                    </Grid>
                  )}
                </Grid>
              </div>
            </>
          )}
        </StyledCardContent>
      </HelpAndSupportSubDiv>
      <RightMenuDiv>
        <NeedHelp
          isLoggedIn={isLoggedIn && termsOfUseAccepted}
          userRole={AuthObj?.userRolePermissionData?.userRole}
          isFromHelpSupport={true}
        />
      </RightMenuDiv>
    </HelpAndSupportDiv>
  );

  const contactUsNavigator = (
    <div className="route-section">
      <Navigator
        array={[
          {
            pageName: "Help & Support",
            route: "/helpAndSupport",
          },
        ]}
        title="Contact Us"
      />
    </div>
  );

  const sysreqNavigator = (
    <div className="route-section-sys-req">
      <Link className="link-to-help" to="/helpAndSupport">
        Help & Support
      </Link>
      <SelectIcon className="arrow-right" />
      <span className="contact-us-txt">System Requirements</span>
    </div>
  );

  const FAQNavigator = (
    <div className="route-section">
      <Navigator
        array={[
          {
            pageName: "Help & Support",
            route: "/helpAndSupport",
          },
        ]}
        title="FAQ & Video Tutorials"
      />
    </div>
  );

  return (
    <>
      <Switch>
        <Route exact path={path}>
          {helpAndSupport}
        </Route>
        <Route path={`${path}/faq`}>
          <div
            className={`faq-section 
            ${
              !isLoggedIn && !termsOfUseAccepted ? "faq-section-no-margin" : ""
            }`}
          >
            {FAQNavigator}
            <FAQ />
          </div>
        </Route>
        <Route path={`${path}/contactUs`}>
          <div className="contact-us-section">
            {contactUsNavigator}
            <ContactUs />
          </div>
        </Route>
        <Route path={`${path}/contactUsSent`}>
          <div className="contact-us-sent-section">
            {contactUsNavigator}
            <ContactUsAcknowledgement />
          </div>
        </Route>
        <Route path={`${path}/sysreq`}>
          <div
            className={`sys-req-section 
            ${!isLoggedIn && !termsOfUseAccepted ? "sys-req-no-margin" : ""}`}
          >
            {sysreqNavigator}
            <SystemRequirements
              data={pageContent?.systemRequirement?.description!}
            />
          </div>
        </Route>
      </Switch>
    </>
  );
};
