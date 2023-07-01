import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import {
  IWoundAssesments,
  IWoundDetail,
} from "../../../orderOverview/orderOverview.interface";
import { OrderOverviewWoundDetailAssessment } from "../OrderOverviewWoundDetailAssessment.component";
import React from "react";

describe("order overview detail assessment component ->", () => {
  afterAll(() => {
    cleanup();
  });
  const mockResponseData: IWoundAssesments[] = [
    {
      status: "",
      color: "",
      images: [],
      assessmentType: "MWP",
      volume: "1",
      volumeDifference: -6,
      evaluationDate: "23-05-1946",
      boneExposed: "",
      comorbidities: [],
      cycleDateRangeFrom: "",
      cycleDateRangeTo: "",
      debridementDate: "",
      debridementDone: "",
      debridementType: "",
      exudateAppearance: "",
      holdVacTherapyDate: "",
      isEschar: "",
      isTherapyInUSe: "",
      isTunnelingPresent: "",
      isUnderMiningPresent: "",
      muscelExposed: "",
      otherComorbidities: "",
      subcutaneousTissueExposed: "",
      tissueExposed: "",
      tunnelingLength1: "",
      tunnelingLength2: "",
      tunnelingLocation1: "",
      tunnelingLocation2: "",
      underMiningLocation1From: "",
      underMiningLocation1Size: "",
      underMiningLocation1To: "",
      underMiningLocation2From: "",
      underMiningLocation2Size: "",
      underMiningLocation2To: "",
      woundDepth: "",
      woundDescriptionBeefyRed: "",
      woundDescriptionBlackEschar: "",
      woundDescriptionDullPink: "",
      woundDescriptionWhite: "",
      woundExudate: "",
      woundLength: "",
      woundWidth: "",
    },
  ];

  const mockResponseData1: IWoundDetail = {
    assessments: mockResponseData,
    initialVolume: "30",
    latestVolume: "",
    changeInVolume: "",
    daysOnVACTherapy: "",
  };
  it("Wound Assessment component", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <OrderOverviewWoundDetailAssessment
          woundAssessmentDetails={mockResponseData1}
        />
      </MemoryRouter>
    );
    const component = screen.getByTestId("woundAssessment-main");
    expect(component).toBeInTheDocument();
  });
  it("Wound Assessment Header", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <OrderOverviewWoundDetailAssessment
          woundAssessmentDetails={mockResponseData1}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("woundAssessment-header");
    expect(header).toBeInTheDocument();
  });
  it("Assessed on lable present", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IWoundAssesments[]) => [dt, mockSetState],
    }));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <OrderOverviewWoundDetailAssessment
          woundAssessmentDetails={mockResponseData1}
        />
      </MemoryRouter>
    );
    const assessedlable = screen.getByTestId("assessed-on-lable");
    expect(assessedlable).toBeInTheDocument();
  });
  it("assessdDate lable present", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IWoundAssesments[]) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <OrderOverviewWoundDetailAssessment
          woundAssessmentDetails={mockResponseData1}
        />
      </MemoryRouter>
    );
    const assessdDate = screen.getByTestId("greenarrow-image");
    expect(assessdDate).toBeInTheDocument();
  });
  it("volume text present", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IWoundAssesments[]) => [dt, mockSetState],
    }));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <OrderOverviewWoundDetailAssessment
          woundAssessmentDetails={mockResponseData1}
        />
      </MemoryRouter>
    );
    const increasevolume = screen.getByTestId("increasedVolume");
    expect(increasevolume).toBeInTheDocument();
  });
  it("status present", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IWoundAssesments[]) => [dt, mockSetState],
    }));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <OrderOverviewWoundDetailAssessment
          woundAssessmentDetails={mockResponseData1}
        />
      </MemoryRouter>
    );
    const status = screen.getByTestId("therapy-status");
    expect(status).toBeInTheDocument();
  });
  it("image present", () => {
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IWoundAssesments[]) => [dt, mockSetState],
    }));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <OrderOverviewWoundDetailAssessment
          woundAssessmentDetails={mockResponseData1}
        />
      </MemoryRouter>
    );
    const image = screen.getByTestId("wound-image-div");
    expect(image).toBeInTheDocument();
  });
  it("hypen present", () => {
    const mockResponseData: IWoundAssesments[] = [
      {
        status: "",
        color: "",
        assessmentType: "MWP",
        images: [],
        volume: "1",
        volumeDifference: 0,
        evaluationDate: "23-05-1946",
        boneExposed: "",
        comorbidities: [],
        cycleDateRangeFrom: "",
        cycleDateRangeTo: "",
        debridementDate: "",
        debridementDone: "",
        debridementType: "",
        exudateAppearance: "",
        holdVacTherapyDate: "",
        isEschar: "",
        isTherapyInUSe: "",
        isTunnelingPresent: "",
        isUnderMiningPresent: "",
        muscelExposed: "",
        otherComorbidities: "",
        subcutaneousTissueExposed: "",
        tissueExposed: "",
        tunnelingLength1: "",
        tunnelingLength2: "",
        tunnelingLocation1: "",
        tunnelingLocation2: "",
        underMiningLocation1From: "",
        underMiningLocation1Size: "",
        underMiningLocation1To: "",
        underMiningLocation2From: "",
        underMiningLocation2Size: "",
        underMiningLocation2To: "",
        woundDepth: "",
        woundDescriptionBeefyRed: "",
        woundDescriptionBlackEschar: "",
        woundDescriptionDullPink: "",
        woundDescriptionWhite: "",
        woundExudate: "",
        woundLength: "",
        woundWidth: "",
      },
    ];

    const mockResponseData1: IWoundDetail = {
      assessments: mockResponseData,
      initialVolume: "30",
      latestVolume: "",
      changeInVolume: "",
      daysOnVACTherapy: "",
    };
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IWoundAssesments[]) => [dt, mockSetState],
    }));

    render(
      <MemoryRouter initialEntries={["/"]}>
        <OrderOverviewWoundDetailAssessment
          woundAssessmentDetails={mockResponseData1}
        />
      </MemoryRouter>
    );
    const hypen = screen.getByTestId("hypen");
    expect(hypen).toBeInTheDocument();
  });
});
