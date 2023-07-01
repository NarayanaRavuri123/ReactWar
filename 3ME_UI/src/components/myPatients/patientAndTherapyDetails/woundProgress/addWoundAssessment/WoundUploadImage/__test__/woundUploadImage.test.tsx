import React from "react";
import WoundUploadImages from "../woundUploadImage.component";
import { cleanup, render, screen } from "@testing-library/react";
import { defaultAddWoundAssessment } from "../../addWoundAssessment.model";

describe("Wound assessment upload images ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("verify upload image header one", () => {
    React.useState = jest.fn().mockReturnValue([defaultAddWoundAssessment, {}]);
    render(<WoundUploadImages isTestingComponent={true} />);
    const imag = screen.getByTestId("wounduploadImage");
    expect(imag).toBeInTheDocument();
  });

  it("verify upload image second header", () => {
    React.useState = jest.fn().mockReturnValue([defaultAddWoundAssessment, {}]);
    render(<WoundUploadImages isTestingComponent={true} />);
    const woundimag = screen.getByTestId("woundimage");
    expect(woundimag).toBeInTheDocument();
  });

  it("verify upload image header text", () => {
    React.useState = jest.fn().mockReturnValue([defaultAddWoundAssessment, {}]);
    render(<WoundUploadImages isTestingComponent={true} />);
    const header = screen.getByTestId("wounduploadImageTxt").textContent;
    expect(header).toBe(
      `Please upload any additional wound photos or documentation`
    );
  });
});
