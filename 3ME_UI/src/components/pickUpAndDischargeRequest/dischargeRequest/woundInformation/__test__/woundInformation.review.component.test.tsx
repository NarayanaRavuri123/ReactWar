import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PickUpRequestContext } from "../../../../../context/PickUpRequestContext";

import { getMockPickUpRequestContextData } from "../../../pickUpRequest/__test__/mockPickUpRequestContext";

import { DischargeRequestContext } from "../../../../../context/DischargeRequestContext";
import { getMockDischargeRequestContextData } from "../../__test__/mockDischargeRequestContext";
import WoundInformationReview from "../woundInformationReview/woundInformation.review.component";

describe("review wound Request component ->", () => {
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
  it("review wound info ", () => {
    const mockFun = jest.fn;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DischargeRequestContext.Provider
          value={{
            ...getMockDischargeRequestContextData(),
          }}
        >
          <PickUpRequestContext.Provider
            value={{
              ...getMockPickUpRequestContextData(),
            }}
          >
            <WoundInformationReview woundInfoDetails={wounds} />
          </PickUpRequestContext.Provider>
        </DischargeRequestContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("woundInfo-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Information");
    const disDate = screen.getByTestId("wound-therapy-info-div");
    expect(disDate).toBeInTheDocument();
    expect(disDate).toHaveTextContent("Therapy Discontinued Date");
    const woundDiv = screen.getByTestId("wound-info-div");
    expect(woundDiv).toBeInTheDocument();
    expect(woundDiv).toHaveTextContent("Wound Location");
    expect(woundDiv).toHaveTextContent("Last Measurement provided Date");
    expect(woundDiv).toHaveTextContent("Final Measurement Date");
    expect(woundDiv).toHaveTextContent("Wound Type");
    expect(woundDiv).toHaveTextContent("Last measurements Provided");
    expect(woundDiv).toHaveTextContent("Final measurements Provided");
    const secondWound = screen.getByTestId("wound-second");
    expect(secondWound).toBeInTheDocument();
    expect(secondWound).toHaveTextContent("Wound #2");
    const seconWoundetails = screen.getByTestId("woundsecond-info-div");
    expect(seconWoundetails).toHaveTextContent(
      "Last Measurement provided Date"
    );
    expect(seconWoundetails).toHaveTextContent("Final Measurement Date");
    expect(seconWoundetails).toHaveTextContent("Last measurements Provided");
    expect(seconWoundetails).toHaveTextContent("Final measurements Provided");
    expect(seconWoundetails).toHaveTextContent("Wound Type");
    expect(seconWoundetails).toHaveTextContent("Wound Location");
  });

  it("Therapy outcome Edit Button Present", () => {
    const mockFun = jest.fn;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DischargeRequestContext.Provider
          value={{
            ...getMockDischargeRequestContextData(),
          }}
        >
          <PickUpRequestContext.Provider
            value={{
              ...getMockPickUpRequestContextData(),
            }}
          >
            <WoundInformationReview
              woundInfoDetails={wounds}
              dischargeRequestEditBtnClick={() => {}}
            />
          </PickUpRequestContext.Provider>
        </DischargeRequestContext.Provider>
      </MemoryRouter>
    );
    const Title = screen.getByTestId("wound-button-edit-test");
    expect(Title).toBeInTheDocument();
    expect(fireEvent.click(Title)).toBe(true);
  });
});
