import { MemoryRouter } from "react-router-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { SubmitProofOfDelivery } from "../submitProofOfDelivery.component";
import { SubmitProofOfDeliveryContext } from "../../../../context/submitProofOfDeliveryContext";
import { getMockSubitProofOfDeliveryContextData } from "../submitProofOfDeliveryMockContextData";
import React from "react";

describe("SubmitProofOfDelivery component->", () => {
  afterAll(() => {
    cleanup();
  });
  it("SubmitProofOfDelivery component present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitProofOfDeliveryContext.Provider
          value={{
            ...getMockSubitProofOfDeliveryContextData(),
          }}
        >
          <SubmitProofOfDelivery />
        </SubmitProofOfDeliveryContext.Provider>
      </MemoryRouter>
    );
    const component = screen.getByTestId("proofOfDelivery-main");
    expect(component).toBeInTheDocument();
  });
  it("SubmitProofOfDelivery header present", () => {
    const setIsLoading = jest.fn();
    jest.spyOn(React, "useState").mockReturnValue([false, setIsLoading]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitProofOfDeliveryContext.Provider
          value={{
            ...getMockSubitProofOfDeliveryContextData(),
          }}
        >
          <SubmitProofOfDelivery />
        </SubmitProofOfDeliveryContext.Provider>
      </MemoryRouter>
    );
    const header = screen.getByTestId("pod-heading");
    expect(header).toBeInTheDocument();
  });
  it("Submit Proof of Delivery component validate patient details component rendered or not", () => {
    const setIsLoading = jest.fn();
    jest.spyOn(React, "useState").mockReturnValue([false, setIsLoading]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitProofOfDeliveryContext.Provider
          value={{
            ...getMockSubitProofOfDeliveryContextData(),
          }}
        >
          <SubmitProofOfDelivery />
        </SubmitProofOfDeliveryContext.Provider>
      </MemoryRouter>
    );
    const patientDetails = screen.getByTestId("patient-details-component");
    expect(patientDetails).toBeInTheDocument();
  });
  it("SubmitProofOfDelivery alert present", () => {
    const setIsLoading = jest.fn();
    jest.spyOn(React, "useState").mockReturnValue([false, setIsLoading]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitProofOfDeliveryContext.Provider
          value={{
            ...getMockSubitProofOfDeliveryContextData(),
          }}
        >
          <SubmitProofOfDelivery />
        </SubmitProofOfDeliveryContext.Provider>
      </MemoryRouter>
    );
    const alertText = screen.getByTestId("pod-alert-text");
    expect(alertText).toBeInTheDocument();
  });
  it("SubmitProofOfDelivery subtitle present", () => {
    const setIsLoading = jest.fn();
    jest.spyOn(React, "useState").mockReturnValue([false, setIsLoading]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitProofOfDeliveryContext.Provider
          value={{
            ...getMockSubitProofOfDeliveryContextData(),
          }}
        >
          <SubmitProofOfDelivery />
        </SubmitProofOfDeliveryContext.Provider>
      </MemoryRouter>
    );
    const subTitle = screen.getByTestId("pod-subTitle");
    expect(subTitle).toBeInTheDocument();
  });
  it("SubmitProofOfDelivery paragraph present", () => {
    const setIsLoading = jest.fn();
    jest.spyOn(React, "useState").mockReturnValue([false, setIsLoading]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitProofOfDeliveryContext.Provider
          value={{
            ...getMockSubitProofOfDeliveryContextData(),
          }}
        >
          <SubmitProofOfDelivery />
        </SubmitProofOfDeliveryContext.Provider>
      </MemoryRouter>
    );
    const paragraph = screen.getByTestId("pod-paragragh");
    expect(paragraph).toBeInTheDocument();
  });
  it("SubmitProofOfDelivery previous button present", () => {
    const setIsLoading = jest.fn();
    jest.spyOn(React, "useState").mockReturnValue([false, setIsLoading]);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SubmitProofOfDeliveryContext.Provider
          value={{
            ...getMockSubitProofOfDeliveryContextData(),
          }}
        >
          <SubmitProofOfDelivery />
        </SubmitProofOfDeliveryContext.Provider>
      </MemoryRouter>
    );
    const prvbutton = screen.getByTestId("previousButton-test");
    expect(prvbutton).toBeInTheDocument();
    expect(prvbutton).toHaveTextContent("Back to My Patients");
  });
});
