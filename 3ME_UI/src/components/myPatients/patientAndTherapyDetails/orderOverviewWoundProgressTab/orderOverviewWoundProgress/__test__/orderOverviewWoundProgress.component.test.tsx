import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WoundProgress from "../orderOverviewWoundProgress.component";
import { woundDetails } from "../../../../../../mockData/woundListMockData";

describe("Wound Progress Tab component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("WoundProgress Tab Header", () => {
    render(
      <MemoryRouter>
        <WoundProgress woundDetails={woundDetails} />
      </MemoryRouter>
    );
    const woundProgressLabel = screen.getByTestId(
      "wound-progresss-tab-wound-number-heading"
    );
    expect(woundProgressLabel).toBeInTheDocument();
    expect(woundProgressLabel).toHaveTextContent("Wound #1");
  });
  it("WoundProgress Tab location/orientation/direction", () => {
    render(
      <MemoryRouter>
        <WoundProgress woundDetails={woundDetails} />
      </MemoryRouter>
    );
    const woundLocationOrientationDirection = screen.getByTestId(
      "wound-progresss-tab-wound-location"
    );
    expect(woundLocationOrientationDirection).toBeInTheDocument();
    expect(woundLocationOrientationDirection).toHaveTextContent(
      "Pressure Ulcer - Stage IV, Buttock Coccyx"
    );
  });
  it("WoundProgress Tab Type", () => {
    render(
      <MemoryRouter>
        <WoundProgress woundDetails={woundDetails} />
      </MemoryRouter>
    );
    const woundType = screen.getByTestId("wound-progresss-tab-wound-type");
    expect(woundType).toBeInTheDocument();
    expect(woundType).toHaveTextContent("Pressure Ulcer - Stage IV");
  });
  it("WoundProgress Assessd On", () => {
    render(
      <MemoryRouter>
        <WoundProgress woundDetails={woundDetails} />
      </MemoryRouter>
    );
    const woundAssessedOn = screen.getByTestId(
      "wound-progresss-tab-wound-assessed-on"
    );
    expect(woundAssessedOn).toBeInTheDocument();
    expect(woundAssessedOn).toHaveTextContent("Apr 24, 2018");
  });
});
