import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { OrderDetailContext } from "../../../../../context/OrderDetailsContext";

import { patientMockData } from "../../../../../mockData/patientFound";

import { OrderCurrentTherapy } from "../orderCurrentTherapy.component";
import {
  getMockOrderDetailContextData,
  mockResponseOrderTrackingResponse,
} from "../../orderDetailsTracking/__test__/mockOrderDetailContext";

describe("Order Overview stepper component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Order Current Therapy header", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <OrderCurrentTherapy
          patientData={patientMockData}
          orderDetailsTrackingData={mockResponseOrderTrackingResponse}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("sec-header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Current Therapy");
  });
  it("Order Current Therapy Staus", () => {
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
        }}
      >
        <MemoryRouter initialEntries={["/home/orderOverview"]}>
          <OrderCurrentTherapy
            patientData={patientMockData}
            orderDetailsTrackingData={mockResponseOrderTrackingResponse}
          />
        </MemoryRouter>
      </OrderDetailContext.Provider>
    );
    const label = screen.getByTestId("status-testid");
    expect(label).toBeInTheDocument();
  });
  it("Order Current Therapy Content", () => {
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
        }}
      >
        <MemoryRouter initialEntries={["/home/orderOverview"]}>
          <OrderCurrentTherapy
            patientData={patientMockData}
            orderDetailsTrackingData={mockResponseOrderTrackingResponse}
          />
        </MemoryRouter>
      </OrderDetailContext.Provider>
    );
    const content = screen.getByTestId("current-therapy-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("RO# : 12345678");
  });
  it("Order Current Therapy Error", () => {
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
        }}
      >
        <MemoryRouter initialEntries={["/home/orderOverview"]}>
          <OrderCurrentTherapy
            patientData={patientMockData}
            orderDetailsTrackingData={mockResponseOrderTrackingResponse}
          />
        </MemoryRouter>
      </OrderDetailContext.Provider>
    );
    const therapyLocation = screen.getByTestId("current-therapy-loaction");
    expect(therapyLocation).toBeInTheDocument();
    expect(therapyLocation).toHaveTextContent("Location : home");
  });

  it("Order Current Therapy OrderSupplies Text Presnet", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <OrderCurrentTherapy
          patientData={patientMockData}
          orderDetailsTrackingData={mockResponseOrderTrackingResponse}
        />
      </MemoryRouter>
    );
    const orderSuppliesText = screen.getByTestId("order-supplies-info-title");
    expect(orderSuppliesText).toBeInTheDocument();
  });
  it("Order Current Therapy OrderSupplies Button Presnet", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <OrderCurrentTherapy
          patientData={patientMockData}
          orderDetailsTrackingData={mockResponseOrderTrackingResponse}
        />
      </MemoryRouter>
    );
    const orderSuppliesText = screen.getByTestId("order-supplies-button");
    expect(orderSuppliesText).toBeInTheDocument();
  });
});
