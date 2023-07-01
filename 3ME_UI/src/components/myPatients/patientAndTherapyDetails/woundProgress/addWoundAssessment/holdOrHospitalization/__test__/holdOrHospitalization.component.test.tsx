import * as React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import { IAddWoundAssessment } from "../../addWoundAssessment.interface";
import { HoldOrHospitalization } from "../holdOrHospitalization.component";
import { VacTherapyResumeStatus } from "../vacTherapyResumeStatus/vacTherapyResumeStatus.component";
import { ResumptionMeasurement } from "../resumptionMeasurement/resumptionMeasurement.component";

describe("Validate Holds and Hospitalization component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate Holds and Hospitalization component title", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HoldOrHospitalization data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("holdOrHospitalization-header");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Holds and Hospitalizations")).toBeInTheDocument();
  });
  it("Validate Holds and Hospitalization component desp", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HoldOrHospitalization data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("holdOrHospitalizationtitleid");
    expect(title).toBeInTheDocument();
    expect(
      screen.getByText("Has V.A.C.® Therapy been placed on hold?")
    ).toBeInTheDocument();
  });
  it("Validate Holds and Hospitalization component hold date field", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    defaultValues.vacTherapyBeenHold.value = "yes";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HoldOrHospitalization data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("formControl-vacHoldStartDate");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Hold Start Date")).toBeInTheDocument();
  });
  it("Validate Holds and Hospitalization component hold reason field", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    defaultValues.vacTherapyBeenHold.value = "yes";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HoldOrHospitalization data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("formControl-vacHoldReason");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Reason for hold")).toBeInTheDocument();
  });
  it("Validate Holds and Hospitalization component resumption status field", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    defaultValues.vacTherapyBeenHold.value = "yes";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <VacTherapyResumeStatus data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("vacResumeStatustitleid");
    expect(title).toBeInTheDocument();
    expect(
      screen.getByText("Has V.A.C.® Therapy been resumed?")
    ).toBeInTheDocument();
  });
  it("Validate Holds and Hospitalization component resumption status yes field", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    defaultValues.vacTherapyBeenHold.value = "yes";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <VacTherapyResumeStatus data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("vacResumeStatus-yes");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
  });
  it("Validate Holds and Hospitalization component resumption status no field", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    defaultValues.vacTherapyBeenHold.value = "yes";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <VacTherapyResumeStatus data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("vacResumeStatus-no");
    expect(title).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });
  it("Validate Holds and Hospitalization component resumption measumre component", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    defaultValues.vacTherapyBeenHold.value = "yes";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ResumptionMeasurement data={defaultValues} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("resumptionMeasureStatustitleid");
    expect(title).toBeInTheDocument();
    expect(
      screen.getByText("Were measurements taken at resumption?")
    ).toBeInTheDocument();
  });
});
