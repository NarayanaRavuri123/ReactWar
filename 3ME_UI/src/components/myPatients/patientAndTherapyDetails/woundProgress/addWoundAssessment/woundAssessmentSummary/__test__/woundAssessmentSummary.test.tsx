import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";
import ReviewWoundTherapyStatus from "../../woundTherapyStatus/reviewWoundTherapyStatus/reviewWoundTherapyStatus.component";
import ReviewWoundMeasurement from "../../woundMeasurement/reviewWoundMeasurement/reviewWoundMeasurement.component";
import ReviewWoundMeasurementEschar from "../../woundMeasurementEschar/reviewWoundMeasurementEschar/reviewWoundMeasurementEschar.component";
import ReviewHoldOrHospitalization from "../../holdOrHospitalization/reviewHoldOrHospitalization/reviewHoldOrHospitalization.component";
import ReviewWoundAssessmentInfection from "../../woundAssessmentInfection/reviewWoundAssessmentInfection/reviewWoundAssessmentInfection.component";
import ReviewWoundAssessor from "../../woundAssessor/reviewWoundAssessor/reviewWoundAssessor.component";
import React from "react";

describe("MWP Wound assessment form summary page ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("MWP Wound assessment form summary page wound therapy status", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ReviewWoundTherapyStatus
          data={defaultValues}
          isWoundAssessmentSummary
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("review-therapystatus");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Therapy Status")).toBeInTheDocument();
  });
  it("MWP Wound assessment form summary page wound measurement status", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    defaultValues.woundTherapyStatus.value = "yes";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ReviewWoundMeasurement data={defaultValues} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("review-woundMeasure");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Wound Measurements")).toBeInTheDocument();
  });
  it("MWP Wound assessment form summary page wound Eschar status", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    defaultValues.woundTherapyStatus.value = "yes";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ReviewWoundMeasurementEschar data={defaultValues} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("review-woundEschar");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Eschar")).toBeInTheDocument();
  });
  it("MWP Wound assessment form summary page wound holds and hospitalization status", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    defaultValues.woundTherapyStatus.value = "yes";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ReviewHoldOrHospitalization data={defaultValues} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("review-holdOrHospital");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Holds and Hospitalizations")).toBeInTheDocument();
  });
  it("MWP Wound assessment form summary page wound infection status", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    defaultValues.woundTherapyStatus.value = "yes";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ReviewWoundAssessmentInfection data={defaultValues} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("review-woundInfection");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Infection")).toBeInTheDocument();
  });
  it("MWP Wound assessment form summary page wound Assessor status", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    defaultValues.woundTherapyStatus.value = "yes";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ReviewWoundAssessor data={defaultValues} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("review-woundAssessor");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Wound Assessor")).toBeInTheDocument();
  });
});
