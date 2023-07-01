import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { PickUpRequestContext } from "../../../../../context/PickUpRequestContext";
import { getMockPickUpRequestContextData } from "../../__test__/mockPickUpRequestContext";
import PatientTransferDetails from "../patientTransferDetails.component";

describe("Pick Up Request component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Pick Up Request check Transfer Patient component", () => {
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <BrowserRouter>
          <PatientTransferDetails />
        </BrowserRouter>
      </PickUpRequestContext.Provider>
    );
    const component = screen.getByTestId("transfer-detail");
    expect(component).toBeInTheDocument();
  });
});
