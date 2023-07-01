import { cleanup, screen, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { woundDetails } from "../../../../../../mockData/woundListMockData";
import OrderOverviewUpcomingWoundAssessmentDetails from "../orderOverviewUpcomingWoundAssessmentDetails.component";
import { any } from "underscore";

describe("Wound Progress Tab component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("WoundAssessmentDetail Tab Header", () => {
    render(
      <MemoryRouter>
        <OrderOverviewUpcomingWoundAssessmentDetails
          woundDetails={woundDetails}
          selectedWoundId={"7360173"}
          upcomingCycle={undefined}
          pendingCycle={undefined}
        />
      </MemoryRouter>
    );
    const woundProgressLabel = screen.getByTestId(
      "wound-assessment-details-tab-wound-number-heading"
    );
    expect(woundProgressLabel).toBeInTheDocument();
    expect(woundProgressLabel).toHaveTextContent("Wound Detail");
  });
  it("WoundAssessmentDetail  location/orientation/direction", () => {
    render(
      <MemoryRouter>
        <OrderOverviewUpcomingWoundAssessmentDetails
          woundDetails={woundDetails}
          selectedWoundId={"7360173"}
          upcomingCycle={undefined}
          pendingCycle={undefined}
        />
      </MemoryRouter>
    );
    const woundLocationOrientationDirection = screen.getByTestId(
      "wound-assessment-details-tab-wound-location"
    );
    expect(woundLocationOrientationDirection).toBeInTheDocument();
    expect(woundLocationOrientationDirection).toHaveTextContent(
      "Pressure Ulcer - Stage IV, Buttock Coccyx"
    );
  });
  it("WoundAssessmentDetail Type", () => {
    render(
      <MemoryRouter>
        <OrderOverviewUpcomingWoundAssessmentDetails
          woundDetails={woundDetails}
          selectedWoundId={"7360173"}
          upcomingCycle={undefined}
          pendingCycle={undefined}
        />
      </MemoryRouter>
    );
    const woundType = screen.getByTestId(
      "wound-assessment-details-tab-wound-type"
    );
    expect(woundType).toBeInTheDocument();
    expect(woundType).toHaveTextContent("Pressure Ulcer - Stage IV");
  });
  it("WoundAssessmentDetail Assessd On", () => {
    render(
      <MemoryRouter>
        <OrderOverviewUpcomingWoundAssessmentDetails
          woundDetails={woundDetails}
          selectedWoundId={"7360173"}
          upcomingCycle={undefined}
          pendingCycle={undefined}
        />
      </MemoryRouter>
    );
    const woundAssessedOn = screen.getByTestId(
      "wound-assessment-details-tab-wound-assessed-on"
    );
    expect(woundAssessedOn).toBeInTheDocument();
    expect(woundAssessedOn).toHaveTextContent("Apr 24, 2018");
  });
  it("Upcoming Assessment title", () => {
    const upcomingAssessmentData = [
      { from: "2023-05-25", to: "2023-05-27" },
      { from: "2023-06-01", to: "2023-06-03" },
    ];
    render(
      <MemoryRouter>
        <OrderOverviewUpcomingWoundAssessmentDetails
          woundDetails={woundDetails}
          selectedWoundId="7360173"
          upcomingCycle={upcomingAssessmentData}
          pendingCycle={upcomingAssessmentData}
        />
      </MemoryRouter>
    );
    const upcomingAssessmentText = screen.getByTestId(
      "upcoming-assessment-title-text"
    );
    expect(upcomingAssessmentText).toBeInTheDocument();
    expect(upcomingAssessmentText).toHaveTextContent("Upcoming Assessments");
  });
  it("Upcoming Assessment Container", () => {
    const upcomingAssessmentData = [
      { from: "2023-05-25", to: "2023-05-27" },
      { from: "2023-06-01", to: "2023-06-03" },
    ];
    render(
      <MemoryRouter>
        <OrderOverviewUpcomingWoundAssessmentDetails
          woundDetails={woundDetails}
          selectedWoundId="7360173"
          upcomingCycle={upcomingAssessmentData}
          pendingCycle={upcomingAssessmentData}
        />
      </MemoryRouter>
    );
    const upcomingAssessmentText = screen.getByTestId(
      "upcoming-assessment-container"
    );
    expect(upcomingAssessmentText).toBeInTheDocument();
    expect(upcomingAssessmentText).toHaveTextContent(
      "May 25, 2023 - May 27, 2023Jun 1, 2023 - Jun 3, 2023"
    );
  });
  it("Upcoming Assessment date", () => {
    const upcomingAssessmentData = null; // Set the upcomingAssessmentData to null
    render(
      <MemoryRouter>
        <OrderOverviewUpcomingWoundAssessmentDetails
          woundDetails={woundDetails}
          selectedWoundId="7360173"
          upcomingCycle={undefined}
          pendingCycle={undefined}
        />
      </MemoryRouter>
    );
    const upcomingAssessmentText = screen.queryByTestId(
      "upcoming-assessment-date"
    );
    expect(upcomingAssessmentText).not.toBeInTheDocument();
  });
});
