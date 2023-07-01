import * as React from "react";
import userEvent from "@testing-library/user-event";
import { VideoLibrary } from "../videoLibrary.component";
import { BrowserRouter as Router } from "react-router-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { IMainSection } from "../../../helpAndSupport/faq/mainSection.interface";
import { IVideoContent } from "../../../helpAndSupport/faq/videoContent.interface";
import { IVideoSection } from "../../../helpAndSupport/faq/videoSection.interface";

describe("Education Video Library Component", () => {
  afterAll(() => {
    cleanup();
  });

  const getVideos = (): IVideoContent[] => {
    const videos = [
      {
        category: "Product",
        order: 1,
        text: "How to use: 3M™ V.A.C.® Ulta 4 Therapy System",
        accountId: "2635130879001",
        videoId: "6284778619001",
        duration: "7:30",
        poster:
          "https://multimedia.3m.com/mws/media/2123904Y/3m-vac-ulta-therapy-system-4-therapy-system-video-1080.jpg",
      },
      {
        category: "Product",
        order: 2,
        text: "How it works: 3M™ V.A.C. Veraflo Cleanse Choice™ Dressing",
        accountId: "2635130879001",
        videoId: "6258691804001",
        duration: "5:26",
        poster:
          "https://multimedia.3m.com/mws/media/2041730Y/3m-v-a-c-veraflo-cleanse-choice-dressing-mechanism-of-action-video.jpg",
      },
      {
        category: "Product",
        order: 3,
        text: "3M™ Snap™ Therapy System Application & Mechanism of Action (MOA)",
        accountId: "2635130879001",
        videoId: "6262145033001",
        duration: "0:00",
        poster:
          "https://multimedia.3m.com/mws/media/2058832Y/3m-snap-therapy-system-application-mechanism-of-action-moa.jpg",
      },
      {
        category: "Product",
        order: 4,
        text: "3M™ ActiV.A.C.™ Therapy System Clinician Instructional Video",
        accountId: "2635130879001",
        videoId: "6259643509001",
        duration: "5:29",
        poster:
          "https://multimedia.3m.com/mws/media/2050481Y/3m-activ-a-c-therapy-system-clinician-instructional-video.jpg",
      },
      {
        category: "Product",
        order: 5,
        text: "3M™ V.A.C. Dermatac™ Drape Basic Application Video",
        accountId: "2635130879001",
        videoId: "6275281006001",
        duration: "1:53",
        poster:
          "https://multimedia.3m.com/mws/media/2097826Y/3m-v-a-c-dermatac-drape-basic-application-video.jpg",
      },
      {
        category: "Product",
        order: 6,
        text: "How to apply: 3M™ V.A.C.® Dressings",
        accountId: "2635130879001",
        videoId: "6263106776001",
        duration: "5:09",
        poster:
          "https://multimedia.3m.com/mws/media/2060716Y/3m-v-a-c-dressing-basic-application-video.jpg",
      },
      {
        category: "Product",
        order: 7,
        text: "3M™ Cavilon™ Advanced Skin Protectant Application",
        accountId: "2635130879001",
        videoId: "5343888807001",
        duration: "6:31",
        poster:
          "https://multimedia.3m.com/mws/media/1360748Y/3m-cavilon-advanced-skin-protectant-application.jpg",
      },
      {
        category: "Product",
        order: 8,
        text: "3M™ Cavilon™ Advanced Skin Protectant Barrier Effectiveness Demo Video",
        accountId: "2635130879001",
        videoId: "6258690762001",
        duration: "1:35",
        poster:
          "https://multimedia.3m.com/mws/media/2042111Y/3m-cavilon-advanced-skin-protectant-barrier-effectiveness-demo-video.jpg",
      },
      {
        category: "Product",
        order: 9,
        text: "Meet the Scientist Driven to End IAD",
        accountId: "2635130879001",
        videoId: "5422320658001",
        duration: "2:44",
        poster:
          "https://multimedia.3m.com/mws/media/1377309Y/meet-the-scientist-driven-to-end-iad.jpg",
      },
      {
        category: "Product",
        order: 10,
        text: "No Sting Barrier Film Features & Benefits",
        accountId: "2635130879001",
        videoId: "5847731588001",
        duration: "1:09",
        poster:
          "https://multimedia.3m.com/mws/media/1602636Y/cavilon-no-sting-barrier-film-features-benefits.jpg",
      },
      {
        category: "Product",
        order: 11,
        text: "Fistula Solution® Devices: Chapter 1 Overview",
        accountId: "2635130879001",
        videoId: "6182809980001",
        duration: "4:33",
        poster:
          "https://multimedia.3m.com/mws/media/1878657Y/fistula-solution-featuring-mary-anne-obst-chapter-1-fistula-overview.jpg",
      },
      {
        category: "Product",
        order: 12,
        text: "Fistula Solution® Devices: Chapter 2 Fistula Solution Devices",
        accountId: "2635130879001",
        videoId: "6182814404001",
        duration: "3:48",
        poster:
          "https://multimedia.3m.com/mws/media/1878735Y/fistula-solution-featuring-mary-anneobst-chapter-2fistula-solution-devices.jpg",
      },
      {
        category: "Product",
        order: 13,
        text: "Fistula Solution® Devices: Chapter 3 the Patient's Journey",
        accountId: "2635130879001",
        videoId: "6182810208001",
        duration: "3:10",
        poster:
          "https://multimedia.3m.com/mws/media/1878719Y/fistula-solution-featuring-mary-anneobst-chapter-3-the-patients-journey.jpg",
      },
      {
        category: "Product",
        order: 14,
        text: "Fistula Solution® Devices: Chapter 4 Frequently Asked Questions",
        accountId: "2635130879001",
        videoId: "6182810209001",
        duration: "5:33",
        poster:
          "https://multimedia.3m.com/mws/media/1878726Y/fistula-solution-featuring-mary-anneobst-chapter-4-frequently-asked-questions.jpg",
      },
      {
        category: "Product",
        order: 15,
        text: "Fistula Solution® Devices: Chapter 5 Technique Tips ",
        accountId: "2635130879001",
        videoId: "6182810206001",
        duration: "3:16",
        poster:
          "https://multimedia.3m.com/mws/media/1878709Y/fistula-solution-featuring-mary-anneobst-chapter-5technique-tips.jpg",
      },
    ];
    return videos;
  };

  it("Validate education video library main section", () => {
    const mainVideo: IVideoContent = {
      order: 0,
      text: "Learn about the newest wound care advancements in silicone dressings.",
      accountId: "2635130879001",
      videoId: "5676257161001",
      duration: "1:08",
      poster:
        "https://multimedia.3m.com/mws/media/1469401Y/3m-tegaderm-silicone-foam-dressing-heel-application.jpg",
    };
    const mainSection: IMainSection = {
      title:
        "Learn about the newest wound care advancements in silicone dressings.",
      image: "",
      text: "",
      video: mainVideo,
    };
    render(
      <Router>
        <VideoLibrary isLoading={false} mainSectionData={mainSection} />
      </Router>
    );
    const mainSectionImage = screen.getByTestId("main-section-image");
    expect(mainSectionImage).toBeInTheDocument();
    const mainsSectionTitle = screen.getByTestId("main-section-watch-text");
    expect(mainsSectionTitle).toBeInTheDocument();
    expect(mainsSectionTitle).toHaveTextContent(
      "Learn about the newest wound care advancements in silicone dressings."
    );
    const mainsSectionVideoDuration = screen.getByTestId(
      "main-section-watch-button-text"
    );
    expect(mainsSectionVideoDuration).toBeInTheDocument();
    expect(mainsSectionVideoDuration).toHaveTextContent("Watch Now (1:08)");
  });

  it("Validate education video library section option 1", () => {
    const allVideos = getVideos();
    const videoSection: IVideoSection = {
      title: "Video Library",
      videos: allVideos,
    };
    render(
      <Router>
        <VideoLibrary
          allVideos={allVideos}
          isLoading={false}
          videoSection={videoSection}
        />
      </Router>
    );
    const sectionTitle = screen.getByTestId("education-video-header-text");
    expect(sectionTitle).toBeInTheDocument();
    expect(sectionTitle).toHaveTextContent("Video Library");

    const option1Image = screen.getByTestId("education-video-poster-1");
    expect(option1Image).toBeInTheDocument();
    const option1Category = screen.getByTestId("education-video-product-1");
    expect(option1Category).toBeInTheDocument();
    expect(option1Category).toHaveTextContent("Product");
    const option1NameAndDuration = screen.getByTestId("education-video-name-1");
    expect(option1NameAndDuration).toBeInTheDocument();
    expect(option1NameAndDuration).toHaveTextContent(
      "How it works: 3M™ V.A.C. Veraflo Cleanse Choice™ Dressing (5:26)"
    );
  });

  it("Validate education video library section option 2", () => {
    const allVideos = getVideos();
    const videoSection: IVideoSection = {
      title: "Video Library",
      videos: allVideos,
    };
    render(
      <Router>
        <VideoLibrary
          allVideos={allVideos}
          isLoading={false}
          videoSection={videoSection}
        />
      </Router>
    );
    const sectionTitle = screen.getByTestId("education-video-header-text");
    expect(sectionTitle).toBeInTheDocument();
    expect(sectionTitle).toHaveTextContent("Video Library");

    const option2Image = screen.getByTestId("education-video-poster-2");
    expect(option2Image).toBeInTheDocument();
    const option2Category = screen.getByTestId("education-video-product-2");
    expect(option2Category).toBeInTheDocument();
    expect(option2Category).toHaveTextContent("Product");
    const option2NameAndDuration = screen.getByTestId("education-video-name-2");
    expect(option2NameAndDuration).toBeInTheDocument();
    expect(option2NameAndDuration).toHaveTextContent(
      "3M™ Snap™ Therapy System Application & Mechanism of Action (MOA) (0:00)"
    );
  });

  it("Validate education video library section option 3", () => {
    const allVideos = getVideos();
    const videoSection: IVideoSection = {
      title: "Video Library",
      videos: allVideos,
    };
    render(
      <Router>
        <VideoLibrary
          allVideos={allVideos}
          isLoading={false}
          videoSection={videoSection}
        />
      </Router>
    );
    const sectionTitle = screen.getByTestId("education-video-header-text");
    expect(sectionTitle).toBeInTheDocument();
    expect(sectionTitle).toHaveTextContent("Video Library");

    const option3Image = screen.getByTestId("education-video-poster-3");
    expect(option3Image).toBeInTheDocument();
    const option3Category = screen.getByTestId("education-video-product-3");
    expect(option3Category).toBeInTheDocument();
    expect(option3Category).toHaveTextContent("Product");
    const option3NameAndDuration = screen.getByTestId("education-video-name-3");
    expect(option3NameAndDuration).toBeInTheDocument();
    expect(option3NameAndDuration).toHaveTextContent(
      "3M™ ActiV.A.C.™ Therapy System Clinician Instructional Video (5:29)"
    );
  });
});
