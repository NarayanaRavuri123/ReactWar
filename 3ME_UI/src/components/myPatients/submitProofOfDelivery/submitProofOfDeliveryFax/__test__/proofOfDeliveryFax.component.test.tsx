import { MemoryRouter } from "react-router-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ProofOfDeliveryFax } from "../proofOfDeliveryFax.component";

describe("ProofOfDelivery Fax component->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Proof of delivery fax component present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProofOfDeliveryFax />
      </MemoryRouter>
    );
    const component = screen.getByTestId("pod-fax-main");
    expect(component).toBeInTheDocument();
  });
  it("Proof of delivery fax subtitle present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProofOfDeliveryFax />
      </MemoryRouter>
    );
    const subtitle = screen.getByTestId("pod-fax-msg");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveTextContent(
      "A POD/AOB signed and dated by the patient or authorized agent is required to receive care"
    );
  });
  it("Proof of delivery fax Download print button present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProofOfDeliveryFax />
      </MemoryRouter>
    );
    const downloadbtn = screen.getByTestId("downLoad-print-pod");
    expect(downloadbtn).toBeInTheDocument();
    expect(downloadbtn).toHaveTextContent("Download & Print POD");
  });
  it("Proof of delivery fax static text pod button present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProofOfDeliveryFax />
      </MemoryRouter>
    );
    const staticTextBtn = screen.getByTestId("pod-static-txt-btn");
    expect(staticTextBtn).toBeInTheDocument();
    expect(staticTextBtn).toHaveTextContent(
      "Please fax the signed POD to 1-888-245-2295"
    );
  });
  it("opens the popup on button click", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ProofOfDeliveryFax />
      </MemoryRouter>
    );
    const button = screen.getByTestId("downLoad-print-pod");
    fireEvent.click(button);
    const popup = screen.getByRole("dialog");
    expect(popup).toBeInTheDocument();
  });
});
