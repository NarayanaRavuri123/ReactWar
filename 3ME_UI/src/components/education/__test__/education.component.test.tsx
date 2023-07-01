import React from "react";
import { Education } from "../education.component";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { cleanup, render, screen } from "@testing-library/react";
import { mockEducationOptionData } from "./educationOptions.data";

describe("Education Component", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate loader", () => {
    render(<Education />);
    const title = screen.getByTestId("loading-text-large");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Loading");
    const description = screen.getByTestId("loading-text-small");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("Processing your request...");
  });

  it("Validate education title", () => {
    const showLoader = false;
    React.useState = jest.fn().mockReturnValue([showLoader, {}]);
    render(<Education />);
    const title = screen.getByTestId("education-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Education");
  });

  it("Validate education options", () => {
    const educationOptions = mockEducationOptionData;
    React.useState = jest.fn().mockReturnValue([educationOptions, {}]);
    const showLoader = false;
    React.useState = jest.fn().mockReturnValue([showLoader, {}]);
    render(<Education />);
    const optionsView = screen.getByTestId("education-options");
    expect(optionsView).toBeInTheDocument();
  });
});
