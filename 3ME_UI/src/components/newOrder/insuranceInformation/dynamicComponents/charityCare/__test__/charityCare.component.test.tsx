import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { CharityCare } from "../charityCare.Component";
import { charityCareMockData } from "../../../../../../mockData/charityCareMockData";

describe("Charity care component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Charity care component charity description", () => {
    render(<CharityCare charitycareData={charityCareMockData} />);
    const title = screen.getByTestId("charity-desc");
    expect(title).toBeInTheDocument();
  });
  it("Charity care component pdf link", () => {
    render(<CharityCare charitycareData={charityCareMockData} />);
    const title = screen.getByTestId("charity-pdf-link");
    expect(title).toBeInTheDocument();
  });
});
