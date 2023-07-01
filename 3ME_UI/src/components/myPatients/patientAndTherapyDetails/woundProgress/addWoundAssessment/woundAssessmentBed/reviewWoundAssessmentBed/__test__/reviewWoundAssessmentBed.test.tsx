import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../../../../util/ObjectFunctions";
import { IAddWoundAssessment } from "../../../addWoundAssessment.interface";
import { defaultAddWoundAssessment } from "../../../addWoundAssessment.model";
import ReviewWoundAssessmentBed from "../reviewWoundAssessmentBed.component";
describe("Wound Assessment Bed component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("To check Wound Bed header validation", () => {
    const defaultValues: IAddWoundAssessment = getDeepClone(
      defaultAddWoundAssessment
    );
    render(<ReviewWoundAssessmentBed data={defaultValues} />);
    const title = screen.getByTestId("review-woundBed");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Bed Description");
  });
  it("To check Wound Bed granulation validation value 0%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.woundBedTotal.value = "0";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Beefy, bright red granulation tissue");
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("0%");
  });
  it("To check Wound Bed granulation validation value 25%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.woundBedTotal.value = "25";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Beefy, bright red granulation tissue");
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("25%");
  });
  it("To check Wound Bed granulation validation value 50%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.woundBedTotal.value = "50";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Beefy, bright red granulation tissue");
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("50%");
  });
  it("To check Wound Bed granulation validation value 75%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.woundBedTotal.value = "75";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Beefy, bright red granulation tissue");
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("75%");
  });
  it("To check Wound Bed granulation validation value 100%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.woundBedTotal.value = "100";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Beefy, bright red granulation tissue");
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("100%");
  });
  it("To check Wound Bed Epthilization Value validation 0%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.epthilizationValue.value = "0";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Dull, pink/red, no or minimal granulation tissue"
    );
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("0%");
  });
  it("To check Wound Bed Epthilization Value validation 25%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.epthilizationValue.value = "25";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Dull, pink/red, no or minimal granulation tissue"
    );
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("25%");
  });
  it("To check Wound Bed Epthilization Value validation 50%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.epthilizationValue.value = "50";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Dull, pink/red, no or minimal granulation tissue"
    );
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("50%");
  });
  it("To check Wound Bed Epthilization Value validation 75%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.epthilizationValue.value = "75";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Dull, pink/red, no or minimal granulation tissue"
    );
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("75%");
  });
  it("To check Wound Bed Epthilization Value validation 100%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.epthilizationValue.value = "100";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Dull, pink/red, no or minimal granulation tissue"
    );
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("100%");
  });
  it("To check Wound Bed slough validation value 0%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.sloughValue.value = "0";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "White, grey, yellow, or brown non-viable tissue"
    );
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("0%");
  });
  it("To check Wound Bed slough validation value 25%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.sloughValue.value = "25";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "White, grey, yellow, or brown non-viable tissue"
    );
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("25%");
  });
  it("To check Wound Bed slough validation value 50%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.sloughValue.value = "50";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "White, grey, yellow, or brown non-viable tissue"
    );
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("50%");
  });
  it("To check Wound Bed slough validation value 75%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.sloughValue.value = "75";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "White, grey, yellow, or brown non-viable tissue"
    );
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("75%");
  });
  it("To check Wound Bed slough validation value 100%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.sloughValue.value = "100";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "White, grey, yellow, or brown non-viable tissue"
    );
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("100%");
  });
  it("To check Wound Bed Eschar Value validation 0%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.escharValue.value = "Black eschar";
    data.woundEscharStatus.value = "yes";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Black eschar");
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Black eschar");
  });
  it("To check Wound Bed Eschar Value validation 25%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.escharValue.value = "25";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Black eschar");
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("25%");
  });
  it("To check Wound Bed Eschar Value validation 50%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.escharValue.value = "50";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Black eschar");
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("50%");
  });
  it("To check Wound Bed Eschar Value validation 75%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.escharValue.value = "75";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Black eschar");
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("75%");
  });
  it("To check Wound Bed Eschar Value validation 100%", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.escharValue.value = "100";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Black eschar");
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("100%");
  });
  it("To check Wound Bed total value validation", () => {
    const data: IAddWoundAssessment = defaultAddWoundAssessment;
    data.woundBedTotal.value = "100";
    render(<ReviewWoundAssessmentBed data={data} />);
    const title = screen.getByTestId("review-woundBed-row");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Total percentage of wound described");
    const value = screen.getByTestId("review-woundBed-row");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("100%");
  });
});
