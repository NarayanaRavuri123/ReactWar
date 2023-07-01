import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { Popup } from "../../../../../core/popup/popup.component";
import { getPdfUrlGif } from "../../../../../util/utilityFunctions";
import { AddPhotos } from "../../../myPatients.style";
import "./imageViewer.css";
import { ReactComponent as Vectorrightarrow } from "../../../../../assets/Vectorrightarrow.svg";
import { ReactComponent as Vectorleftarrow } from "../../../../../assets/Vectorleftarrow.svg";
import { ReactComponent as CloseImageIcon } from "../../../../../assets/CloseImageIcon.svg";

type Props = {
  Images: string[];
  woundAssessmentDate: any;
};

type IImageProps = {
  name: "";
  index: number;
};

export const ImageWindowViewer = ({ Images, woundAssessmentDate }: Props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [imgUrl, setImgURL] = useState([]);
  const [imgProps, setImgProps] = useState<IImageProps[]>([]);

  const openImageViewer = useCallback((index: React.SetStateAction<number>) => {
    setCurrentImage(index);
    handleOpen();
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };
  function getImage(image: string[]) {
    let url: any = [];
    if (image.length > 0) {
      image.map((src, index) =>
        getPdfUrlGif(src).then(function (result) {
          if (result) {
            url.push(result);
          }
        })
      );
      setImgURL(url);
    }
  }
  useEffect(() => {
    if (Images) {
      getImage(Images);
    }
  }, [Images]);

  return (
    <>
      <div className="image-viewer_popup">
        {imgUrl.slice(0, 4).map((src, index) => (
          <img
            className="image-viewer-align"
            src={src}
            onClick={(e) => {
              e.stopPropagation();
              openImageViewer(index);
            }}
            key={index}
            alt=""
          />
        ))}

        <Popup
          openFlag={isViewerOpen}
          closeHandler={handleClose}
          dialogParentClass={"img-pop-up"}
          data-testid="image-popup"
          onClickHandler={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="image-viewer">
            <p className="wound-assessment-lable">
              Wound Assessment Photo
              {" (Assessed on " +
                moment.utc(woundAssessmentDate).local().format("ll") +
                ")"}
            </p>

            <ImageViewer
              src={imgUrl}
              currentIndex={currentImage}
              onClose={closeImageViewer}
              disableScroll={false}
              backgroundStyle={{
                backgroundColor: "#323234",
                width: "491px",
                height: "342px",
                marginLeft: "10px",
                marginTop: "15px",
                borderRadius: "7px",
                position: "relative",
              }}
              closeOnClickOutside={false}
              rightArrowComponent={
                <Vectorrightarrow className="vectorrightarrow" />
              }
              leftArrowComponent={
                <Vectorleftarrow className="vectorleftarrow" />
              }
              closeComponent={
                <CloseImageIcon
                  onClick={(e) => {
                    closeImageViewer();
                  }}
                />
              }
            />
          </div>
        </Popup>
      </div>

      <div className="link-div">
        {imgUrl?.length > 4 ? (
          <AddPhotos
            onClick={(e) => {
              e.stopPropagation();
              openImageViewer(0);
            }}
          >
            {imgUrl?.length > 5
              ? "+" + `${imgUrl?.length - 4}` + " Photos"
              : "+" + `${imgUrl?.length - 4}` + " Photo"}
          </AddPhotos>
        ) : null}
      </div>
    </>
  );
};
