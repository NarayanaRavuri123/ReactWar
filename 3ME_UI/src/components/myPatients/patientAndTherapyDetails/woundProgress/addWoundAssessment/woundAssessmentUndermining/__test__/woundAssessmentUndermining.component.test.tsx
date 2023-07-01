import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getDeepClone } from "../../../../../../../util/ObjectFunctions";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";
import WoundAssessmentUndermining from "../woundAssessmentUndermining.component";
import AssessmentUnderminingDetails from "../woundAssessmentUnderminingDetails/woundAssessmentUnderminingDetails.component";

describe("Wound Assessment Undermining component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Wound Assessment Undermining validate title", () => {
    const data = getDeepClone(defaultAddWoundAssessment);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessmentUndermining data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("undermining-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Undermining");
  });

  it("Wound Assessment Undermining desp validate title", () => {
    const data = getDeepClone(defaultAddWoundAssessment);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessmentUndermining data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundUndermining-desp");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Is undermining present in the wound?");
  });

  it("Wound Assessment undermining present? no button", () => {
    const data = getDeepClone(defaultAddWoundAssessment);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessmentUndermining data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const noButton = screen.getByTestId("woundUndermining-No");
    expect(noButton).toBeInTheDocument();
    expect(noButton).not.toBeChecked();
  });

  it("Wound Assessment Undermining present? yes button", () => {
    const data = getDeepClone(defaultAddWoundAssessment);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <WoundAssessmentUndermining data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const noButton = screen.getByTestId("woundUndermining-Yes");
    expect(noButton).toBeInTheDocument();
    expect(noButton).not.toBeChecked();
  });

  it("Wound Assessment Undermining details o’clock present?", () => {
    const data = getDeepClone(defaultAddWoundAssessment);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AssessmentUnderminingDetails data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("underminingoclock");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("o’clock");
  });
  it("Assessment Wound Undermining details to present?", () => {
    const data = getDeepClone(defaultAddWoundAssessment);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AssessmentUnderminingDetails data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("undermining-totest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("to");
  });
  it("Assessment Wound Undermining details from present?", () => {
    const data = getDeepClone(defaultAddWoundAssessment);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AssessmentUnderminingDetails data={data} setData={() => {}} />
      </MemoryRouter>
    );
    const title = screen.getByTestId("undermining-fromtest");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("from");
  });
});
