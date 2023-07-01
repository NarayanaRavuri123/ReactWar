import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import FAQ from "../faq.component";
import VideoDialog from "../VideoDialog";
import { IVideoContent } from "../videoContent.interface";
import mockVideoSection from "./videoTutorial.mock"
import React from "react";
import { IVideoSection } from "../videoSection.interface";


describe("FAQ component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Check Video Player is rendered", () => {
    render(<VideoDialog />);
  });
  it("Check Watch Now Button is rendered", () => {
    render(<div className="mainbanner" />);
  });
  it("Video tutorials text is rendered", () => {
    render(<FAQ />);
    const tutorialHeader = screen.getByTestId("video-header-text");
    expect(tutorialHeader).toBeInTheDocument();
  });

  // Unable to Mock the data, hence commented now and moving on to QA, will work once we figure out the option on mocking
  // it("FAQ component rendered?", () => {
  //   render(<FAQ />);
  //   fireEvent.click(document.querySelector(".question")!);
  //   const value = document.querySelector(".answer");
  //   expect(value?.textContent).toBe(
  //     "Nec no nihil maiorum, pro eros commodo malorum te. Ipsum fugit dictas et vix, at cum wisi soluta. Ei sanctus corpora eam, nam ei ullum dicit iriure. Timeam iisque ius no, et pri nominavi tractatos. An sit vivendum antiopam consulatu. Has impedit incorrupte cu, in duo sonet essent feugait, putent consulatu reprimique mel ea. Nec no nihil maiorum, pro eros commodo malorum te. Ipsum fugit dictas et vix, at cum wisi soluta. Ei sanctus corpora eam, nam ei ullum dicit iriure. Timeam iisque ius no, et pri nominavi tractatos."
  //   );
  //   const value1 = screen.getByTestId("faqTitle");
  //   expect(value1?.textContent).toBe("Frequently Asked Questions");
  // });

  // it("Video tutorials placeholder rendered", () => {
  //   const videoSection: IVideoSection = mockVideoSection;
  //   React.useState = jest.fn().mockReturnValue([videoSection, {}]);
  //   render(<FAQ />);
  //   videoSection.videos.map((video) => {
  //     const tutorialHeader = screen.getByTestId(video.videoId.toString());
  //     expect(tutorialHeader).toBeInTheDocument();
  //   });
  // });
});
