import "./educationOption.css";
import { Buffer } from "buffer";
import { useContext, useEffect, useState } from "react";
import { WindowService } from "../../../util/window.service";
import defaultImage from "../../../assets/grey_background.jpg";
import { IEducationOptionProp } from "./educationOption.inteface";
import { AuthContext, AuthContextType } from "../../../context/AuthContext";

export const EducationOption = ({
  openVideoLibrary,
  option,
}: IEducationOptionProp) => {
  const authObj = useContext<AuthContextType | null>(AuthContext);
  const [encryptedUserName, setEncryptedUserName] = useState(
    Buffer.from("").toString("base64")
  );
  const clientType = Buffer.from("3ME").toString("base64");

  useEffect(() => {
    if (authObj && authObj.userProfile && authObj.userProfile.emailAddress) {
      const emailAddress = authObj.userProfile.emailAddress;
      setEncryptedUserName(Buffer.from(emailAddress).toString("base64"));
    }
  }, []);

  const openItemAction = (e: any) => {
    if (option.resourceLink) {
      const windowService = new WindowService();
      if (option.labelText === "Wound Therapy Guide") {
        const url =
          process.env.REACT_APP_WTG_URL +
          `?userID=${encryptedUserName}&clientType=${clientType}`;
        windowService.openPdf(url);
      } else if (option.labelText == "Video Library") {
        openVideoLibrary();
      } else {
        windowService.openPdf(option.resourceLink);
      }
    }
  };

  return (
    <div
      className={`education-option-component ${
        option.resourceOrder === "3"
          ? "center centerMobile"
          : option.resourceOrder === "2"
          ? "left leftMobile"
          : "right rightMobile"
      }`}
      data-testid={`education-option-component-${option.resourceOrder}`}
      key={option.resourceOrder}
    >
      <div className="education-option-image-div">
        <img
          className="education-option-image"
          data-testid="education-option-image"
          src={option.imageLink}
          alt={defaultImage}
          onClick={openItemAction}
        />
      </div>
      <h3
        className="education-option-title"
        data-testid={`education-option-title-${option.resourceOrder}`}
        onClick={openItemAction}
      >
        {option.labelText}
      </h3>
      <h5
        className="education-option-body"
        data-testid={`education-option-body-${option.resourceOrder}`}
      >
        {option.bodyCopy}
      </h5>
    </div>
  );
};
