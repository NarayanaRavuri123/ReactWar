import React, { useContext, useEffect, useState } from "react";
import "./dressingSuppliesLink.css";
import newTab from "../../../../assets/newTab.png";
import dressingType from "../../../../assets/dressingtype.jpg";
import dressingsizeinches from "../../../../assets/dressingsizeinches.jpg";
import dressingsizecm from "../../../../assets/dressingsizecm.jpg";
import { Popup } from "../../../../core/popup/popup.component";
import { AuthContext, AuthContextType } from "../../../../context/AuthContext";
import { Buffer } from "buffer";

export const DressingSuppliesLink = () => {
  const [dressingGuideDialog, setDressingGuideDialog] =
    React.useState<boolean>(false);
  const [dressingSizeDialog, setDressingSizeDialog] =
    React.useState<boolean>(false);
  const AuthObj = useContext<AuthContextType | null>(AuthContext);
  const [encryptedUserName, setEncryptedUserName] = useState("");

  const handleDressingGuide = () => {
    setDressingGuideDialog(true);
  };
  const handleDressingSize = () => {
    setDressingSizeDialog(true);
  };

  useEffect(() => {
    if (AuthObj && AuthObj?.userProfile !== null) {
      const sa = AuthObj?.userProfile?.emailAddress!;
      if (sa) {
        setEncryptedUserName(Buffer.from(sa).toString("base64"));
      }
    }
  }, [AuthObj?.userProfile]);

  const clientType = Buffer.from("3ME").toString("base64");

  return (
    <div className="linkMain">
      <span
        className="linkButton linkbuttonMargin"
        onClick={handleDressingGuide}
        data-testid="dressingGuideTest"
      >
        Dressing Guide
      </span>
      <span
        className="linkButton linkbuttonMargin"
        onClick={handleDressingSize}
        data-testid="dressingSizeTest"
      >
        Size Guide
      </span>

      <a
        href={
          process.env.REACT_APP_WTG_URL +
          `?userID=${encryptedUserName}&clientType=${clientType}`
        }
        target="_blank"
        rel="noreferrer"
        className="wtgAnchor"
      >
        <span className="linkButton linkButtonWtg" data-testid="wtgTest">
          Wound Therapy Guide
        </span>
        <img
          className="newTabImg"
          src={newTab}
          alt={newTab}
          title="Wound Therapy Guide"
        />
      </a>
      <Popup
        dialogParentClass="dressing-dialog"
        closeHandler={() => setDressingGuideDialog(false)}
        openFlag={dressingGuideDialog}
      >
        <div className="body-dailog" data-testid="dailogTest">
          <img src={dressingType} alt={dressingType}></img>
        </div>
      </Popup>

      <Popup
        dialogParentClass="dressingsize-dialog"
        closeHandler={() => setDressingSizeDialog(false)}
        openFlag={dressingSizeDialog}
      >
        <div className="size-maincontainer" data-testid="sizeTest">
          <h3 className="size-header">What size dressing do I need?</h3>
          <p className="size-text">
            {" "}
            Dressing size required is determined by the length and width of
            wound.{" "}
          </p>
          <div className="dressingsizebody-dailog">
            <img src={dressingsizecm} alt={dressingsizecm}></img>
            <img src={dressingsizeinches} alt={dressingsizeinches}></img>
          </div>
        </div>
      </Popup>
    </div>
  );
};
