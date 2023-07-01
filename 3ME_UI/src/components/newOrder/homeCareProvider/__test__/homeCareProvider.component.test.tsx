import React from "react";
import { MemoryRouter } from "react-router-dom";
import { INewOrder } from "../../newOrder.interface";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { cleanup, render, screen } from "@testing-library/react";
import { newOrderTestData } from "../../__test__/newOrder.test.data";
import { HomeCareProvider } from "../homeCareProvider.component";
import { NewOrderContext } from "../../../../context/NewOrderContext";
import { getMockNewOrderData } from "../../clinicalInformation/__test__/newOrderMockContextData";
jest.mock("../../../../core/popup/popup.component");
describe("Home Care Provider Component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Home Care Provider validate title", () => {
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <HomeCareProvider
          data={data}
          setData={mockSetState}
          states={[]}
          statesText={[]}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("homecareprovider-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Home Care Provider");
  });

  it("Home Care Provider component validate for select yes", () => {
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrder) => [dt, mockSetState],
    }));
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeCareProvider
          data={data}
          setData={mockSetState}
          states={[]}
          statesText={[]}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("homecareprovider-administering-dress");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Do you know who will be administering the patient's dressing changes?*"
    );
    const yesButton = screen.getByTestId(
      "homecareprovider-administering-dress-yes"
    ) as HTMLBaseElement;
    expect(yesButton).toBeInTheDocument();
  });
});
