import React, { useContext } from "react";
import { AuthContextType, AuthContext } from "../../../../context/AuthContext";
import { IUser } from "../../user.interface";

interface Props {
  data: IUser | undefined;
}

const InternalUserContact = ({ data }: Props) => {
  const authObj = useContext<AuthContextType | null>(AuthContext);

  const formatNumber = (inputNumber: any) => {
    var mobile = "--";
    if (inputNumber) {
      mobile = inputNumber.slice(-10);
      mobile = mobile.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }
    return mobile;
  };

  const displayPhone = () => {
    if (data?.mobilePhoneNo === null) {
      return `${formatNumber(data?.phoneNo)} ${
        data?.extension.length === 3 ? ` x${data?.extension}` : ""
      }`;
    }
  };

  return (
    <div
      className="internalUser-mp-container-main"
      data-testid="internalUser-mp-container-main"
    >
      <div className="InterUser-Email-container">
        <div className="internalUser-Ma-sub">
          <div className="internalUserManageAccountNameLable">
            Name
            {authObj && (
              <div className="internalUserManageAccountName">
                {authObj!.userName}
              </div>
            )}
          </div>
          <div className="internalUserManageAccountEmailLable">
            Email Address
            <div className="internalUserManageAccountEmailName">
              {data && data!.emailAddress}
            </div>
          </div>
        </div>
      </div>
      <div className="internalUser-Phone-container">
        <div
          data-testid="phoneTitle-mp-test"
          className="internalUser-mp-contactNo"
        >
          Contact Phone Number
          <div className="internalUser-contact-value">{displayPhone()}</div>
        </div>
      </div>

      <div className="InternalPhoneDetailType-mp">
        <div className="InternalPhoneValue-mp">
          {data && data!.phoneNo === "mobile" ? "Mobile" : ""}
        </div>
      </div>
    </div>
  );
};

export default InternalUserContact;
