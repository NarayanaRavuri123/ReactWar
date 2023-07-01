import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as ResizeObserverModule from "resize-observer-polyfill";
import {
  assesmentListData,
  woundAsesmentDetailsSingleAssesment,
} from "../../../../../../mockData/woundListMockData";
import { OrderOverviewWoundOverview } from "../orderOverviewWoundOverview.component";
(global as any).ResizeObserver = ResizeObserverModule.default;

describe("Wound Progress Tab component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("WoundOverview Tab Header", () => {
    render(
      <MemoryRouter>
        <OrderOverviewWoundOverview
          assesmentList={assesmentListData}
          interval={0}
        />
      </MemoryRouter>
    );
    const woundoverviewLabel = screen.getByTestId(
      "wound-overview-info-info-title"
    );
    expect(woundoverviewLabel).toBeInTheDocument();
    expect(woundoverviewLabel).toHaveTextContent("Wound Overview");
  });

  it("WoundOverview Tab Static Text First", () => {
    render(
      <MemoryRouter>
        <OrderOverviewWoundOverview
          assesmentList={assesmentListData}
          interval={0}
        />
      </MemoryRouter>
    );
    const statictext = screen.getByTestId("static-text-test-id-first");
    expect(statictext).toBeInTheDocument();
    expect(statictext).toHaveTextContent(
      "Note: Information shown represents data collected by 3M Medical Solutions from multiple sources and health care professionals. Refer to the manufacturer's instructions for use and V.A.C.® Therapy Clinical Guidelines for guidance on therapy application. Information requested is required by Medicare, Medicaid, and/or private insurance."
    );
  });
  it("WoundOverview Tab Static Text Second", () => {
    render(
      <MemoryRouter>
        <OrderOverviewWoundOverview
          assesmentList={assesmentListData}
          interval={0}
        />
      </MemoryRouter>
    );
    const statictext = screen.getByTestId("static-text-test-id-second");
    expect(statictext).toBeInTheDocument();
    expect(statictext).toHaveTextContent(
      "This patient requires wound measurements be submitted monthly to justify the insurance billing process for a patient on V.A.C.® Therapy."
    );
  });
  it("WoundOverview Chart Component", () => {
    render(
      <MemoryRouter>
        <OrderOverviewWoundOverview
          assesmentList={assesmentListData}
          interval={0}
        />
      </MemoryRouter>
    );
    const lineChart = screen.getByTestId("line-chart-component");
    expect(lineChart).toBeInTheDocument();
  });

  it("WoundOverview Initial Volume", () => {
    render(
      <MemoryRouter>
        <OrderOverviewWoundOverview
          assesmentList={assesmentListData}
          interval={0}
        />
      </MemoryRouter>
    );
    const labelObj = screen.getByTestId("initial-volume");
    expect(labelObj).toBeInTheDocument();
    expect(labelObj).toHaveTextContent("Initial Volume");
    const labelObjLastVol = screen.getByTestId("last-volume");
    expect(labelObjLastVol).toBeInTheDocument();
    expect(labelObjLastVol).toHaveTextContent("Last Volume");
    const labelObjdaysOnTherapy = screen.getByTestId("days-on-therapy");
    expect(labelObjdaysOnTherapy).toBeInTheDocument();
    expect(labelObjdaysOnTherapy).toHaveTextContent("Days on Therapy");
  });
  it("WoundOverview static label values value", () => {
    render(
      <MemoryRouter>
        <OrderOverviewWoundOverview
          assesmentList={assesmentListData}
          interval={0}
          woundAssessmentDetails={woundAsesmentDetailsSingleAssesment}
        />
      </MemoryRouter>
    );
    const initialValueObj = screen.getByTestId("initial-volume-value");
    expect(initialValueObj).toBeInTheDocument();
    expect(initialValueObj).toHaveTextContent("23 cm³");
    const lastValueObj = screen.getByTestId("last-volume-value");
    expect(lastValueObj).toBeInTheDocument();
    expect(lastValueObj).toHaveTextContent("cm³");
    const daysOnTherapyObj = screen.getByTestId("days-on-therapy-value");
    expect(daysOnTherapyObj).toBeInTheDocument();
    expect(daysOnTherapyObj).toHaveTextContent("2 days");
  });
  it("WoundOverview static label values null", () => {
    render(
      <MemoryRouter>
        <OrderOverviewWoundOverview
          assesmentList={assesmentListData}
          interval={0}
          woundAssessmentDetails={woundAsesmentDetailsSingleAssesment}
        />
      </MemoryRouter>
    );
    const initialValueObj = screen.getByTestId("initial-volume-value");
    expect(initialValueObj).toBeInTheDocument();
    expect(initialValueObj).toHaveTextContent("23 cm³");
    const lastValueObj = screen.getByTestId("last-volume-value");
    expect(lastValueObj).toBeInTheDocument();
    expect(lastValueObj).toHaveTextContent("cm³");
    const daysOnTherapyObj = screen.getByTestId("days-on-therapy-value");
    expect(daysOnTherapyObj).toBeInTheDocument();
    expect(daysOnTherapyObj).toHaveTextContent("days");
  });
});
