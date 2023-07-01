import "./snackBar.css";
import closeIcon from "../../assets/bluecross.svg";
import { useEffect } from "react";

type Props = {
  openFlag: boolean;
  msg: string;
  phoneNumber?: string;
  handleCloseAlert: () => void;
  toastStyle: any;
  autoClose?: boolean;
};

const SnackBar = ({
  openFlag,
  msg,
  phoneNumber,
  handleCloseAlert,
  toastStyle,
  autoClose = false,
}: Props) => {
  useEffect(() => {
    autoClose && setTimeout(handleCloseAlert, 3000);
  });
  return (
    <div className={`${toastStyle} ${openFlag ? "active" : "inactive"} `}>
      <div className="modal-content">
        <p className="codeSentText">
          {msg}{" "}
          {phoneNumber && <span className="phoneNumber">{phoneNumber}</span>}
        </p>

        <img
          onClick={handleCloseAlert}
          src={closeIcon}
          alt={closeIcon}
          className="codeSentAlertClose"
        />
      </div>
    </div>
  );
};

export default SnackBar;
