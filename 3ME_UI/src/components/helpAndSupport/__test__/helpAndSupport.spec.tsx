import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { HelpAndSupport } from "../helpAndSupport.component";
import { mockData } from "./printFormCmsTestData";

describe("Help and support component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Help & Support", () => {
    React.useState = jest.fn().mockReturnValue([mockData, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HelpAndSupport />
      </MemoryRouter>
    );
    expect(screen.getByText("Help & Support")).toBeInTheDocument();
  });

  it("Video Tutorials & FAQ", () => {
    React.useState = jest.fn().mockReturnValue([mockData, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HelpAndSupport />
      </MemoryRouter>
    );
    expect(screen.getByText("FAQ & Video Tutorials")).toBeInTheDocument();
    expect(screen.getByText("Learn how to use 3M Express")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(
      screen.getByText("Send us a message if you need help")
    ).toBeInTheDocument();
  });

  it("Contact Us", () => {
    React.useState = jest.fn().mockReturnValue([mockData, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HelpAndSupport />
      </MemoryRouter>
    );
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(
      screen.getByText("Send us a message if you need help")
    ).toBeInTheDocument();
  });

  it("Resource Header Present", () => {
    React.useState = jest.fn().mockReturnValue([mockData, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HelpAndSupport />
      </MemoryRouter>
    );
    expect(screen.getByText("Resources")).toBeTruthy();
  });

  it("All resource subheader Present", () => {
    React.useState = jest.fn().mockReturnValue([mockData, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HelpAndSupport />
      </MemoryRouter>
    );
    expect(screen.getByText("System Requirements")).toBeTruthy();
    expect(screen.getByText("E-Prescription Help")).toBeTruthy();
    expect(screen.getByText("V.A.C.® Ready Care Help")).toBeTruthy();
  });

  it("Printable form Present", () => {
    React.useState = jest.fn().mockReturnValue([mockData, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HelpAndSupport />
      </MemoryRouter>
    );
    expect(screen.getByText("Printable Forms")).toBeTruthy();
  });

  it("Printable Form Subdiv Present", () => {
    React.useState = jest.fn().mockReturnValue([mockData, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HelpAndSupport />
      </MemoryRouter>
    );
    expect(screen.getByTestId("subHeaderText")).toBeInTheDocument();
  });

  it("Printable Form Subheader Present", () => {
    React.useState = jest.fn().mockReturnValue([mockData, {}]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HelpAndSupport />
      </MemoryRouter>
    );
    expect(screen.getByText("Test desc")).toBeInTheDocument();
  });
});
