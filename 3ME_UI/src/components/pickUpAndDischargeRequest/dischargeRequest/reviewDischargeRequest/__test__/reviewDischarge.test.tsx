import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PickUpRequestContext } from "../../../../../context/PickUpRequestContext";
import { LoadingSpinner } from "../../../../../core/loader/LoadingSpinner";
import { getMockPickUpRequestContextData } from "../../../pickUpRequest/__test__/mockPickUpRequestContext";
import { ReviewDischargeRequest } from "../reviewDischargeRequest.component";
import { DischargeRequestContext } from "../../../../../context/DischargeRequestContext";
import { getMockDischargeRequestContextData } from "../../__test__/mockDischargeRequestContext";
import userEvent from "@testing-library/user-event";

describe("review Discharge Request component ->", () => {
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
  it("Validate Spinner", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LoadingSpinner />
      </MemoryRouter>
    );
    const loaderText = screen.getByTestId("loading-text-large");
    expect(loaderText).toBeInTheDocument();
  });
  it("review Discharge Request", () => {
    const setPageSection = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
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
            <ReviewDischargeRequest woundInfoDetails={wounds} />
          </DischargeRequestContext.Provider>
        </PickUpRequestContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("review-discharge-header");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Review Discharge Request");
    const summary = screen.getByTestId("review-summary");
    expect(summary).toBeInTheDocument();
    expect(summary).toHaveTextContent(
      "Please review and confirm the information entered for this wound assessment is an accurate reflection of the patient's medical record."
    );
    const patientInfo = screen.getByTestId("patient-info");
    expect(patientInfo).toBeInTheDocument();
    expect(patientInfo).toHaveTextContent("Patient Information");
    const patientName = screen.getByTestId(
      "discharge-request-title-patient-name"
    );
    expect(patientName).toBeInTheDocument();
    const patientNameValue = screen.getByTestId(
      "discharge-request-value-patient-name"
    );
    expect(patientNameValue).toBeInTheDocument();
    const dob = screen.getByTestId("discharge-request-title-dob-date");
    expect(dob).toBeInTheDocument();
    expect(dob).toHaveTextContent("Date of Birth");
    const dobval = screen.getByTestId("discharge-request-value-dob-date");
    expect(dobval).toBeInTheDocument();

    const attest = screen.getByTestId("attestationAndSign");
    expect(attest).toBeInTheDocument();

    const submitRequestBtn = screen.getByTestId(
      "thirdButton-test"
    ) as HTMLInputElement;
    expect(submitRequestBtn).toBeInTheDocument();
    expect(submitRequestBtn).toHaveTextContent("Submit Request");
  });

  it("review Discharge Request cancel button", () => {
    const reSettingData = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PickUpRequestContext.Provider
          value={{
            ...getMockPickUpRequestContextData(2, reSettingData),
          }}
        >
          <DischargeRequestContext.Provider
            value={{
              ...getMockDischargeRequestContextData(),
            }}
          >
            <ReviewDischargeRequest woundInfoDetails={wounds} />
          </DischargeRequestContext.Provider>
        </PickUpRequestContext.Provider>
      </MemoryRouter>
    );
    const cancelBtn = screen.getByTestId(
      "firstButton-test"
    ) as HTMLInputElement;
    expect(cancelBtn).toBeInTheDocument();
    expect(cancelBtn).toHaveTextContent("Cancel");
    userEvent.click(cancelBtn);
  });

  it("review Discharge Request previous button", () => {
    const setPageSection = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
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
            <ReviewDischargeRequest woundInfoDetails={wounds} />
          </DischargeRequestContext.Provider>
        </PickUpRequestContext.Provider>
      </MemoryRouter>
    );
    const previousBtn = screen.getByTestId(
      "secondButton-test"
    ) as HTMLInputElement;
    expect(previousBtn).toBeInTheDocument();
    expect(previousBtn).toHaveTextContent("Previous");
    userEvent.click(previousBtn);
    expect(setPageSection).toBeCalledTimes(1);
  });
});
