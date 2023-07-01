import { useContext, useEffect, useState } from "react";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../context/RolesPermissionContext";
import { getCMSContent } from "../../util/cmsService";
import { USER_ROLE_BASE } from "../../util/PermissionName";
import { CMS_TECHNICALSUPPORT_CONTENT } from "../../util/staticText";
import { PageContext } from "../page/page.context";
import "./needHelp.css";
import { ITechnicalSupport } from "./needHelp.interface";

export const NeedHelp = ({
  isLoggedIn,
  userRole,
  isFromHelpSupport,
}: {
  isLoggedIn: boolean | null;
  userRole: string | undefined;
  isFromHelpSupport: boolean | null;
}) => {
  const { salesRepContacts, techRepContacts } = useContext(PageContext);
  const [techSupportInfo, setTechSupportInfo] =
    useState<ITechnicalSupport | null>();
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );

  const loadTechSupport = async () => {
    const { item } = (await getCMSContent(CMS_TECHNICALSUPPORT_CONTENT)) || {};
    const techSupportData: ITechnicalSupport = {
      emailAddress: item.emailAddress,
      phoneNo: item.phoneNo,
    };
    setTechSupportInfo(techSupportData);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      loadTechSupport();
    } else {
      setTechSupportInfo(techRepContacts);
    }
  }, [techRepContacts]);

  return (
    <div
      className={
        userRole !== USER_ROLE_BASE
          ? "help-container"
          : userRole === USER_ROLE_BASE && !isFromHelpSupport
          ? "help-container baseRole"
          : "help-container"
      }
    >
      <h3 className="head">Need help?</h3>
      <div className="section">
        <h5 className="sub-head">Technical Support</h5>
        <div className="sub-section">
          <span className="contact-type" data-testid="phone1">
            Phone:{" "}
          </span>
          <a className="contact-value" href={`tel:${techSupportInfo?.phoneNo}`}>
            {techSupportInfo?.phoneNo}
          </a>
        </div>
        <div className="sub-section">
          <span className="contact-type" data-testid="email1">
            Email:{" "}
          </span>
          <a
            className="contact-value"
            href={`mailto:${techSupportInfo?.emailAddress}`}
          >
            {techSupportInfo?.emailAddress}
          </a>
        </div>
      </div>
      {isLoggedIn &&
        salesRepContacts &&
        !permissionObj?.mappedRolesPermissionData.IsBaseRole &&
        !permissionObj?.mappedRolesPermissionData.IsSupportRole &&
        permissionObj?.mappedRolesPermissionData.IsSalesRepDetails && (
          <div className="section">
            <h5 className="sub-head" data-testid="post-acute-sales-rep">
              Post Acute Sales Rep
            </h5>
            <h6 className="sub-head-2" data-testid="user-name">
              {salesRepContacts.name}
            </h6>
            <div className="sub-section">
              <span className="contact-type" data-testid="phone2">
                Phone:{" "}
              </span>
              <a
                className="contact-value"
                data-testid="user-mobile-number"
                href={`tel:${salesRepContacts.phoneNo}`}
              >
                {salesRepContacts.phoneNo}
              </a>
            </div>
            <div className="sub-section">
              <span className="contact-type" data-testid="email2">
                Email:{" "}
              </span>
              <a
                className="contact-value"
                data-testid="c"
                href={`mailto:${salesRepContacts.emailAddress}`}
              >
                {salesRepContacts.emailAddress}
              </a>
            </div>
          </div>
        )}
    </div>
  );
};
