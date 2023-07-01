import { cleanup, render, screen } from "@testing-library/react";
import { DischargeRequest } from "../dischargeRequest.component";
import { PickUpRequestContext } from "../../../../context/PickUpRequestContext";
import { getMockDischargeRequestContextData } from "./mockDischargeRequestContext";
import { DischargeRequestContext } from "../../../../context/DischargeRequestContext";
import { getMockPickUpRequestContextData } from "../../pickUpRequest/__test__/mockPickUpRequestContext";

describe("Discharge Request Component", () => {
  afterAll(() => {
    cleanup();
  });
  it("Discharge request component validate component rendered or not", () => {
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <DischargeRequestContext.Provider
          value={{
            ...getMockDischargeRequestContextData(),
          }}
        >
          <DischargeRequest />
        </DischargeRequestContext.Provider>
      </PickUpRequestContext.Provider>
    );
    const component = screen.getByTestId("discharge-main-component");
    expect(component).toBeInTheDocument();
    const container = screen.getByTestId("discharge-main-component-container");
    expect(container).toBeInTheDocument();
    const dischargeRequest = screen.getByTestId("discharge-request-component");
    expect(dischargeRequest).toBeInTheDocument();
  });

  it("Discharge request component validate title", () => {
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <DischargeRequestContext.Provider
          value={{
            ...getMockDischargeRequestContextData(),
          }}
        >
          <DischargeRequest />
        </DischargeRequestContext.Provider>
      </PickUpRequestContext.Provider>
    );
    const title = screen.getByTestId("discharge-request-component-header");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Discharge Request");
  });

  it("Discharge request component validate patient details component rendered or not", () => {
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <DischargeRequestContext.Provider
          value={{
            ...getMockDischargeRequestContextData(),
          }}
        >
          <DischargeRequest />
        </DischargeRequestContext.Provider>
      </PickUpRequestContext.Provider>
    );
    const patientDetails = screen.getByTestId("patient-details-component");
    expect(patientDetails).toBeInTheDocument();
  });

  it("Discharge request component validate submitter info component rendered or not", () => {
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <DischargeRequestContext.Provider
          value={{
            ...getMockDischargeRequestContextData(),
          }}
        >
          <DischargeRequest />
        </DischargeRequestContext.Provider>
      </PickUpRequestContext.Provider>
    );
    const submitterInfo = screen.getByTestId("submitter-info");
    expect(submitterInfo).toBeInTheDocument();
  });

  it("Discharge request component validate patient Admission Type component rendered or not", () => {
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <DischargeRequestContext.Provider
          value={{
            ...getMockDischargeRequestContextData(),
          }}
        >
          <DischargeRequest />
        </DischargeRequestContext.Provider>
      </PickUpRequestContext.Provider>
    );
    const patientAdmissionType = screen.getByTestId("patientadmissiontypeTest");
    expect(patientAdmissionType).toBeInTheDocument();
  });
});
