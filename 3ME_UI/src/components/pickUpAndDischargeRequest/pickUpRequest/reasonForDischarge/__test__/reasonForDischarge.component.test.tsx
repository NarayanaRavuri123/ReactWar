import { cleanup, render, screen } from "@testing-library/react";
import { ReasonForDischarge } from "../reasonForDischarge.component";
import { PickUpRequestContext } from "../../../../../context/PickUpRequestContext";
import { getMockPickUpRequestContextData } from "../../__test__/mockPickUpRequestContext";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { pickUpRequestTestData } from "../../__test__/pickUpRequest.test.data";

describe("Reason For Discharge component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Check Radio Button rendered or not", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <ReasonForDischarge data={data} setData={mockSetData} />
      </PickUpRequestContext.Provider>
    );
    const title = screen.getByTestId("pickup-request-reason-for-discharge");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Reason for discharge");
    const yesButton = screen.getByTestId(
      "pickup-request-reason-for-discharge-yes"
    );
    expect(yesButton).toBeInTheDocument();
    const noButton = screen.getByTestId(
      "pickup-request-reason-for-discharge-no"
    );
    expect(noButton).toBeInTheDocument();
  });
});
