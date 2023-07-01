import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { DressingSuppliesLink } from "../dressingSuppliesLink";

describe("Dressing Supplies Link", () => {
  afterAll(() => {
    cleanup();
  });

  it("Dressing Guide Present", () => {
    render(<DressingSuppliesLink />);
    const dressingLink = screen.getByTestId("dressingGuideTest");
    expect(dressingLink).toBeInTheDocument();
    expect(dressingLink).toHaveTextContent("Dressing Guide");
  });

  it("Dressing Size Present", () => {
    render(<DressingSuppliesLink />);
    const dressingSize = screen.getByTestId("dressingSizeTest");
    expect(dressingSize).toBeInTheDocument();
    expect(dressingSize).toHaveTextContent("Size Guide");
  });

  it("Wound Therapy Guide Present", () => {
    render(<DressingSuppliesLink />);
    const dressingSize = screen.getByTestId("wtgTest");
    expect(dressingSize).toBeInTheDocument();
    expect(dressingSize).toHaveTextContent("Wound Therapy Guide");
  });

  it("onclick of dressing guide image in modal present", () => {
    render(<DressingSuppliesLink />);
    const dressingGuide = screen.getByTestId("dressingGuideTest");
    fireEvent.click(dressingGuide);
    const modal = screen.getByTestId("dailogTest") as HTMLBaseElement;
    expect(modal).toHaveClass("body-dailog");
  });

  it("onclick of size guide image in modal present", () => {
    render(<DressingSuppliesLink />);
    const dressingSize = screen.getByTestId("dressingSizeTest");
    fireEvent.click(dressingSize);
    const modal = screen.getByTestId("sizeTest") as HTMLBaseElement;
    expect(modal).toHaveTextContent("What size dressing do I need?");
  });
});
