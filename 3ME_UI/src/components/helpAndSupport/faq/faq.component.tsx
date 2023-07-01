import React, { Fragment, useEffect, useState } from "react";
import "./faq.css";
import { FaqCard, ExpandCollapseImg } from "./faq.style";
import playIcon from "../../../assets/playIcon.svg";
import expandIcon from "../../../assets/expand.svg";
import collapseIcon from "../../../assets/collapse.svg";
import VideoDialog from "./VideoDialog";
import { useHistory } from "react-router-dom";
import { Grid } from "@mui/material";
import { IVideoContent } from "./videoContent.interface";
import { CMS_FAQ_VIDEO_CONTENT } from "../../../util/staticText";
import { getCMSContent } from "../../../util/cmsService";
import { IMainSection } from "./mainSection.interface";
import { IVideoSection } from "./videoSection.interface";
import defaultImage from "../../../assets/grey_background.jpg";
import { IFAQContent } from "./faqContent.interface";
import { IFAQSection } from "./faqSection.interface";

type Props = {};

function FAQ(Props: Props) {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [faqList, setFaqList] = React.useState<IFAQContent[]>();
  const [faqSection, setFaqSection] = React.useState<IFAQSection>();
  const [videoTutorialSection, setVideoTutorialSection] =
    React.useState<IVideoSection>();
  const [mainSection, setMainSection] = React.useState<IMainSection>();
  const [video, setVideo] = React.useState<IVideoContent>();

  useEffect(() => {
    fetchFAQVideoContent();
  }, []);

  const handleClickOpen = (video: any) => {
    setVideo(video);
    setOpen(true);
  };

  const fetchFAQVideoContent = async () => {
    //async and await
    try {
      const data = await getCMSContent(CMS_FAQ_VIDEO_CONTENT);
      if (data.item !== undefined) {
        setMainSection(data.item.main);
        setVideoTutorialSection(data.item.videoTutorial);
        setFaqList(data.item.faq.resources);
        setFaqSection(data.item.faq);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleQAClick = (index: any) => {
    if (faqList) {
      const updatelist = faqList.map((faq, ix) =>
        ix === index ? { ...faq, active: !faq.active } : { ...faq }
      );
      setFaqList(updatelist);
    }
  };

  const handleContactUsClick = () => {
    history.push("/helpAndSupport/ContactUs");
  };

  return (
    <Fragment>
      <FaqCard>
        <div className="mainbanner">
          <div className="mainbanner-image">
            <img
              className="mainbanner-poster"
              src={mainSection?.video.poster}
              alt=""
            />
          </div>
          <div className="mainbanner-fullframe"></div>
          <div className="mainbanner-partialframe"></div>
          <div className="mainbanner-watch">
            <label className="mainbanner-watch-text">
              {mainSection?.title}
            </label>
            <div
              className="mainbanner-watch-button"
              onClick={() => handleClickOpen(mainSection?.video)}
            >
              <img
                className="mainbanner-watch-button-icon"
                src={playIcon}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = defaultImage;
                }}
              ></img>
              <label className="mainbanner-watch-button-text">
                Watch Now ({mainSection?.video.duration})
              </label>
            </div>
          </div>
        </div>
        <div className="faq">
          <label className="title" data-testid="faqTitle">
            {faqSection?.title}
          </label>
          <label className="desc">
            We’ve collected a list of common questions about 3M Express. You can{" "}
            <span onClick={handleContactUsClick} className="contactus">
              contact us
            </span>{" "}
            if your question is not addressed here.
          </label>
        </div>
        <div className="faqList">
          {faqList?.map((rec, index) => {
            return (
              <div className="question-answer" key={index}>
                <div className="questionblock">
                  {!rec.active ? (
                    <ExpandCollapseImg
                      src={expandIcon}
                      onClick={() => {
                        handleQAClick(index);
                      }}
                    />
                  ) : (
                    <ExpandCollapseImg
                      src={collapseIcon}
                      onClick={() => {
                        handleQAClick(index);
                      }}
                    />
                  )}
                  <span
                    onClick={() => {
                      handleQAClick(index);
                    }}
                    className="question"
                    data-testId="questionTest"
                  >
                    {rec.text}
                  </span>
                </div>
                <p
                  className={`answer ${
                    rec.active ? `answer-active ` : ` answer-inactive`
                  }`}
                >
                  {rec.response}
                </p>
                <div
                  className={`collapse ${
                    rec.active ? `answer-active ` : ` answer-inactive`
                  }`}
                  onClick={() => {
                    handleQAClick(index);
                  }}
                >
                  Collapse
                </div>
              </div>
            );
          })}
        </div>
        <label
          className="video-tutorials-header"
          data-testid="video-header-text"
        >
          {videoTutorialSection?.title}
        </label>
        <Grid
          className="video-container"
          classes={{ root: "video-container-root" }}
          container
          spacing={2}
        >
          {videoTutorialSection?.videos.map((video, index) => {
            return (
              <Grid
                item
                key={video.videoId.toString()}
                xs={12}
                md={6}
                lg={4}
                className="video-banner"
                classes={{ root: "video-banner-root" }}
                data-testid={video.videoId.toString()}
                onClick={() => handleClickOpen(video)}
              >
                <div className="video-box">
                  <img
                    alt=""
                    className="video-poster"
                    src={video.poster}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = defaultImage;
                    }}
                  ></img>
                </div>
                <div className="video-text">
                  <label className="video-name">
                    {video.text} ({video.duration})
                  </label>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </FaqCard>
      {video && (
        <VideoDialog
          accountId={video.accountId}
          duration={video.duration}
          open={open}
          setOpen={setOpen}
          text={video.text}
          videoId={video.videoId}
        />
      )}
    </Fragment>
  );
}

export default FAQ;
