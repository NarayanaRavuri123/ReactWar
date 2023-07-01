import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { PickUpRequestContext } from "../../../../context/PickUpRequestContext";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { PickUpRequest } from "../pickUpRequest.component";
import { IPickUpRequest } from "../pickUpRequest.interface";
import { getMockPickUpRequestContextData } from "./mockPickUpRequestContext";
import { pickUpRequestTestData } from "./pickUpRequest.test.data";

describe("Pick Up Request component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Pick Up Request Header", () => {
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <BrowserRouter>
          <PickUpRequest />
        </BrowserRouter>
      </PickUpRequestContext.Provider>
    );
    const title = screen.getByTestId("pickup-request-component-header");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Pickup/Discharge Request");
  });

  it("Pick Up Request check Patiet Details component", () => {
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <BrowserRouter>
          <PickUpRequest />
        </BrowserRouter>
      </PickUpRequestContext.Provider>
    );
    const component = screen.getByTestId("patient-details-component");
    expect(component).toBeInTheDocument();
  });

  it("Pick Up Request check reason for discharge component", () => {
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <BrowserRouter>
          <PickUpRequest />
        </BrowserRouter>
      </PickUpRequestContext.Provider>
    );
    const component = screen.getByTestId("reason-for-discahrge");
    expect(component).toBeInTheDocument();
  });

  it("Pick Up Request check Pick up Details component", () => {
    const data: IPickUpRequest = getDeepClone(pickUpRequestTestData);
    data.reasonForDischarge.value = "yes";
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(1),
        }}
      >
        <BrowserRouter>
          <PickUpRequest />
        </BrowserRouter>
      </PickUpRequestContext.Provider>
    );
    const component = screen.getByTestId("pick-up-details");
    expect(component).toBeInTheDocument();
    expect(component).toHaveTextContent("yes");
  });
  it("Pick Up Request check footer button component", () => {
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <BrowserRouter>
          <PickUpRequest />
        </BrowserRouter>
      </PickUpRequestContext.Provider>
    );
    const component = screen.getByTestId("footer-btn-group");
    expect(component).toBeInTheDocument();
  });
});
