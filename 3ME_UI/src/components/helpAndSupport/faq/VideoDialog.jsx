import "./faq.css";
import React, { useRef, useContext } from "react";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import { ImgCloseVideoButton } from "./faq.style";
import DialogTitle from "@mui/material/DialogTitle";
import closeIcon from "../../../assets/closeicon.svg";
import DialogContent from "@mui/material/DialogContent";
import BrightcovePlayer from "@brightcove/react-player-loader";
import { MobileDisplayContext } from "../../../context/MobileDisplayContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} timeout={500} />;
});

export default function VideoDialog(Props) {
  const mediaRef = useRef();
  const { open, setOpen, videoId, accountId, text, duration } = Props;
  const handleClose = () => {
    setOpen(false);
    mediaRef.current.player.pause();
    mediaRef.current.player.reset();
  };
  const { isMobileScreen } = useContext(MobileDisplayContext);
  return (
    <div>
      {accountId && (
        <Dialog
          classes={isMobileScreen?"dialogPaperResponsive":{ paper: "dialogPaper" }}
          className="dialogClassRoot"
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <div className="content-div">
          <ImgCloseVideoButton src={closeIcon} onClick={handleClose} className="closeBtnMobile" />
            <DialogTitle classes={{ root: "dialogVideoTitleRoot" }}>
              {text} {!duration ? "" : `(${duration})`}
            </DialogTitle>
            <DialogContent className="dialogcontent">
              <BrightcovePlayer
                accountId={accountId}
                embedOptions={{ responsive: true }}
                ref={mediaRef}
                videoId={videoId}
                wrapperClassName={`my-custom-class`}
              />
            </DialogContent>
          </div>
        </Dialog>
      )}
    </div>
  );
}
