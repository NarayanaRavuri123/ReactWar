import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";
import WoundUploadDocument from "../woundUploadDocument.component";

describe("Wound assessment upload documents ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("verify upload document header one", () => {
    React.useState = jest.fn().mockReturnValue([defaultAddWoundAssessment, {}]);
    render(<WoundUploadDocument isTestingComponent={true} />);
    const doc = screen.getByTestId("wound-doc-header");
    expect(doc).toBeInTheDocument();
  });
  it("verify upload doc description text", () => {
    React.useState = jest.fn().mockReturnValue([defaultAddWoundAssessment, {}]);
    render(<WoundUploadDocument isTestingComponent={true} />);
    const header = screen.getByTestId("wound-doc-desc").textContent;
    expect(header).toBe(
      `Documents uploaded are associated with the patient above and submitted to 3M for order processing. Files must be in one of the following formats: JPG, GIF, JPEG, PNG, TIFF or PDF. Each file cannot exceed 10 MB (10240 KB) in size.`
    );
  });
});
