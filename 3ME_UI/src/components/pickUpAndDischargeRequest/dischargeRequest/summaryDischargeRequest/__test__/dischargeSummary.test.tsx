import { cleanup, render, screen } from "@testing-library/react";
import { SummaryDischargeRequestHeader } from "../summaryDischargeRequestHeader.component";
import React from "react";
import SummaryDischargeRequest from "../summaryDischargeRequest.component";
import { PickUpRequestContext } from "../../../../../context/PickUpRequestContext";
import { getMockPickUpRequestContextData } from "../../../pickUpRequest/__test__/mockPickUpRequestContext";
import { getMockDischargeRequestContextData } from "../../__test__/mockDischargeRequestContext";
import { DischargeRequestContext } from "../../../../../context/DischargeRequestContext";

jest.mock("../../../../../core/popup/Popup.component");
describe("Summary Component", () => {
  afterAll(() => {
    cleanup();
  });
  const wounds = {
    wounds: [
      {
        id: 8457177,
        type: "Pressure Ulcer - Stage four",
        location: "Buttock",
        orientation: null,
        direction: "001",
        evaluationDate: "2023-04-17T00:00:00",
        length: 4.0,
        width: 3.7,
        depth: 1.4,
        therapyResumptionDate: null,
        therapyHoldDate: null,
      },
      {
        id: 8457177,
        type: "Pressure Ulcer - Stage five",
        location: "Buttock 2",
        orientation: null,
        direction: "001",
        evaluationDate: "2023-04-18T00:00:00",
        length: 4.0,
        width: 3.7,
        depth: 1.4,
        therapyResumptionDate: null,
        therapyHoldDate: null,
      },
    ],
  };

  it("Discharge Summary image Present", () => {
    const saveAPILoader = false;
    React.useState = jest.fn().mockReturnValue([saveAPILoader, {}]);
    render(<SummaryDischargeRequestHeader />);
    const title = screen.getByTestId("imgTest");
    expect(title).toBeInTheDocument();
  });

  it("Discharge Summary Text Present", () => {
    const saveAPILoader = false;
    React.useState = jest.fn().mockReturnValue([saveAPILoader, {}]);
    render(<SummaryDischargeRequestHeader />);
    const title = screen.getByTestId("successText");
    expect(title).toBeInTheDocument();
  });
  it("Discharge Summary Text2 Present", () => {
    const saveAPILoader = false;
    React.useState = jest.fn().mockReturnValue([saveAPILoader, {}]);
    render(<SummaryDischargeRequestHeader />);
    const title = screen.getByTestId("successText2");
    expect(title).toBeInTheDocument();
  });
  it("Discharge Summary Text3 Present", () => {
    const saveAPILoader = false;
    React.useState = jest.fn().mockReturnValue([saveAPILoader, {}]);
    render(<SummaryDischargeRequestHeader />);
    const title = screen.getByTestId("successText3");
    expect(title).toBeInTheDocument();
  });
  it("Discharge Success Btn", () => {
    const saveAPILoader = false;
    React.useState = jest.fn().mockReturnValue([saveAPILoader, {}]);
    render(<SummaryDischargeRequestHeader />);
    const title = screen.getByTestId("DischargeSucessTest");
    expect(title).toBeInTheDocument();
  });
  it("Discharge Summary print btn label", () => {
    const setPageSection = jest.fn();
    const setOpen = jest.fn();
    const openFlag = true;
    React.useState = setOpen.mockReturnValue([openFlag, {}]);
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(2),
        }}
      >
        <DischargeRequestContext.Provider
          value={{
            ...getMockDischargeRequestContextData(setPageSection),
          }}
        >
          <SummaryDischargeRequest
            pdfUrls={["url"]}
            patient={getMockPickUpRequestContextData().patient!}
            woundInfoDetails={wounds}
          />
        </DischargeRequestContext.Provider>
      </PickUpRequestContext.Provider>
    );
    const title = screen.getByTestId("button-print-label");
    expect(title).toBeInTheDocument();
  });
  it("Discharge Summary print btn", () => {
    const setPageSection = jest.fn();
    const setOpen = jest.fn();
    const openFlag = true;
    React.useState = setOpen.mockReturnValue([openFlag, {}]);
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(2),
        }}
      >
        <DischargeRequestContext.Provider
          value={{
            ...getMockDischargeRequestContextData(setPageSection),
          }}
        >
          <SummaryDischargeRequest
            pdfUrls={["url"]}
            patient={getMockPickUpRequestContextData().patient!}
            woundInfoDetails={wounds}
          />
        </DischargeRequestContext.Provider>
      </PickUpRequestContext.Provider>
    );
    const title = screen.getByTestId("button-print-btn");
    expect(title).toBeInTheDocument();
  });
  it("Discharge Summary back to MPD btn", () => {
    const setPageSection = jest.fn();
    const setOpen = jest.fn();
    const openFlag = true;
    React.useState = setOpen.mockReturnValue([openFlag, {}]);
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(2),
        }}
      >
        <DischargeRequestContext.Provider
          value={{
            ...getMockDischargeRequestContextData(setPageSection),
          }}
        >
          <SummaryDischargeRequest
            pdfUrls={["url"]}
            patient={getMockPickUpRequestContextData().patient!}
            woundInfoDetails={wounds}
          />
        </DischargeRequestContext.Provider>
      </PickUpRequestContext.Provider>
    );
    const title = screen.getByTestId("button-back-MPD");
    expect(title).toBeInTheDocument();
  });
});
