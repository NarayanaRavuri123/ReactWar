import "./footer.css";
import { Box } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBarStyle,
  ToolBarStyle,
  BoxMainContainer,
  BoxLeftContainer,
  BoxRightContainer,
  BoxLeftTextStyle,
  BoxVertical,
  BoxWhiteLinks,
  CopyRightParaGraph,
  ImgWhiteLink,
  LinksBox,
  SocialLink,
  SocialAnchor,
} from "./footer.style";
import React from "react";
import { getCMSContent } from "../../util/cmsService";
import { IFooterContent } from "./footerConten.interface";
import { CMS_FOOTER_CONTENT } from "../../util/staticText";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { RouteWithStickyFooter } from "../../constants/index";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../context/SupplyOrderContext";
import { SupplyOrderPageSection } from "../../components/supplyOrder/SupplyOrderPageSection.enum";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../context/NewOrderContext";
import { NewOrderPageSection } from "../newOrder/NewOrderContainer.enum";
import {
  WoundAssessmentContext,
  WoundAssessmentContextType,
} from "../../context/WoundAssessmentContext";
import { WoundAssessmentPageSection } from "../myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundAssessmentPageSection.enum";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import {
  DischargeRequestContext,
  DischargeRequestContextType,
} from "../../context/DischargeRequestContext";
import { DischargeRequestionPageSection } from "../pickUpAndDischargeRequest/dischargeRequest/dischargeRequestPageSection.enum";

const Footer = ({ history, location }: RouteComponentProps) => {
  const stateLocation = useLocation();
  const [footerContent, setFooterContent] = React.useState<
    Array<IFooterContent>
  >([]);
  const [shouldAccomodateStickyFooter, setShouldAccomodateStickyFooter] =
    useState<boolean>(false);
  const SupplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const dischargeRequestObj = useContext<DischargeRequestContextType | null>(
    DischargeRequestContext
  );
  const WoundAssessmentObj = useContext<WoundAssessmentContextType | null>(
    WoundAssessmentContext
  );
  const authObj = useContext<AuthContextType | null>(AuthContext);
  useEffect(() => {
    fetchFooterContent();
    // sticky footer section
    // first check: in case a page with sticky footer is refreshed
    stickyFooterHandler();
    // second check: adding listener in case route change to a page with sticky footer
    history.listen((location) => {
      stickyFooterHandler(location);
    });
    // eslint-disable-next-line
  }, []);

  const stickyFooterHandler = (locationRef = location) => {
    if (
      RouteWithStickyFooter.findIndex((x) => x === locationRef.pathname) !== -1
    ) {
      setShouldAccomodateStickyFooter(true);
    } else {
      setShouldAccomodateStickyFooter(false);
    }
  };

  const fetchFooterContent = async () => {
    //async and await
    try {
      const data = await getCMSContent(CMS_FOOTER_CONTENT);
      if (data.items !== undefined) {
        setFooterContent(data.items);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  function renderJSONContent() {
    return footerContent
      .filter((item) => item.type === 2)
      .sort((a, b) => (a.label > b.label ? 1 : -1))
      .map((item, index) => {
        return (
          <BoxLeftTextStyle
            p={1}
            key={index}
            data-testid={item.label + "-test"}
          >
            <Link className="cms-content-link" to={"/cmsContent/" + item.label}>
              {item.label}
            </Link>
            <BoxVertical />
          </BoxLeftTextStyle>
        );
      });
  }

  function renderHyperlinkContent() {
    return footerContent
      .filter((item) => item.type === 0)
      .sort((a, b) => (a.label > b.label ? 1 : -1))
      .map((item, index) => {
        return (
          <BoxLeftTextStyle p={1} key={index}>
            <BoxWhiteLinks href={item.data} target="_blank">
              {item.label}
            </BoxWhiteLinks>
            <BoxVertical />
          </BoxLeftTextStyle>
        );
      });
  }

  function renderTextContent() {
    return footerContent
      .filter((item) => item.type === 3)
      .map((item, index) => {
        return (
          <CopyRightParaGraph key={index}>
            {item.data} {process.env.REACT_APP_VERSION}
          </CopyRightParaGraph>
        );
      });
  }

  function renderMediaContent() {
    return footerContent
      .filter((item) => item.type === 1)
      .sort((a, b) => (a.icon > b.icon ? 1 : -1))
      .map((item, index) => {
        var image = null;
        switch (item.icon) {
          case "twitter":
            image = require("../../assets/twitter.svg");
            break;
          case "facebook":
            image = require("../../assets/facebook.svg");
            break;
          case "instagram":
            image = require("../../assets/instagram.svg");
            break;
          case "youtube":
            image = require("../../assets/youtube.svg");
            break;
          case "linkedin":
            image = require("../../assets/linkedin.svg");
            break;
        }
        return (
          <SocialLink p={1} key={index}>
            <SocialAnchor href={item.data} target="_blank" rel="noreferrer">
              <ImgWhiteLink alt={item.label} src={image.default} />
            </SocialAnchor>
          </SocialLink>
        );
      });
  }

  useEffect(() => {}, [WoundAssessmentObj?.woundAssessmentPageSection]);

  const footerClassName = (): string => {
    let className = "footerMainDiv";
    switch (stateLocation.pathname) {
      case "/orders/newOrder":
        className =
          NewOrderObj?.newOrderPage === NewOrderPageSection.NEWORDER_SUMMARY
            ? "footerMainDiv"
            : "footerMainDivNewOrder";
        break;
      case "/home/pickUpRequest":
        className = "footerMainDiv";
        break;
      case "/home/dischargeRequest":
        if (
          dischargeRequestObj?.dischargeRequestPageSection ===
          DischargeRequestionPageSection.SUMMARY_DISCHARGE_REQUEST_FORM
        ) {
          className = "footerMainDiv";
        } else {
          className = "footerForDischargeRequest";
        }
        break;
      case "/home/sendNote":
      case "/facilitySettings":
      case "/inventory/inventoryAdjustment":
      case "/administration/rolesPermissions":
      case "/administration/manageUsers/userProfile":
        className = "footerForPickUpOrDischargeRequest";
        break;
      case "/orders/supplyOrderList":
        if (
          SupplyOrderObj?.supplyOrderPage ===
            SupplyOrderPageSection.SUPPLYORDER_PATIENT_LIST ||
          SupplyOrderObj?.supplyOrderPage ===
            SupplyOrderPageSection.SUPPLYORDER_SUMMARY
        ) {
          className = "footerMainDiv";
        } else {
          className = "footerSupplyOrderDiv";
        }
        break;
      case "/addWoundAssessment":
        if (
          WoundAssessmentObj?.woundAssessmentPageSection ===
          WoundAssessmentPageSection.WOUND_ASSESSMENT_SUMMARY
        ) {
          className = "footerMainDiv";
        } else {
          className = "footerForAddWoundAssessment";
        }
        break;
      case "/internalUsersManageProfile":
        if (!authObj?.isInternalUser) {
          className = "footerMainDiv";
        } else {
          className = "footerForInternalUser";
        }
        break;
      default:
        break;
    }
    return className;
  };

  useEffect(() => {
    footerClassName();
  }, []);

  return (
    <Box className={footerClassName()}>
      <AppBarStyle sticky={shouldAccomodateStickyFooter}>
        <ToolBarStyle disableGutters>
          <BoxMainContainer>
            <BoxLeftContainer flexWrap="wrap">
              <LinksBox p={1} data-testid="footer-box-test">
                {renderJSONContent()}
                {renderHyperlinkContent()}
              </LinksBox>
              <Box>{renderTextContent()}</Box>
            </BoxLeftContainer>
            <BoxRightContainer flexWrap="wrap">
              {renderMediaContent()}
            </BoxRightContainer>
          </BoxMainContainer>
        </ToolBarStyle>
      </AppBarStyle>
    </Box>
  );
};

export default withRouter(Footer);
