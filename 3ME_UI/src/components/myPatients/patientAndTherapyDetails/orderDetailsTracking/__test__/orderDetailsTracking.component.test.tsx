import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { OrderDetailContext } from "../../../../../context/OrderDetailsContext";

import { patientMockData } from "../../../../../mockData/patientFound";
import { OrderDetailsTracking } from "../orderDetailsTracking.component";
import {
  getMockOrderDetailContextData,
  mockResponseOrderTrackingResponse,
} from "./mockOrderDetailContext";
import { OrderOverViewTabsTitle } from "../../orderOverview/orderOverviewContainer.enum";

describe("Order Overview stepper component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Order Detail header", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <OrderDetailsTracking
          patientData={patientMockData}
          orderDetailsTrackingData={mockResponseOrderTrackingResponse}
          pdfUrl={""}
          isOrderFlow={false}
          alertsForRO={undefined}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("detail-header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(
      OrderOverViewTabsTitle.ORDER_DETAIL_TAB_TITLE
    );
  });
  it("Order Staus", () => {
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
        }}
      >
        <MemoryRouter initialEntries={["/home/orderOverview"]}>
          <OrderDetailsTracking
            patientData={patientMockData}
            orderDetailsTrackingData={mockResponseOrderTrackingResponse}
            pdfUrl={""}
            isOrderFlow={false}
            alertsForRO={undefined}
          />
        </MemoryRouter>
      </OrderDetailContext.Provider>
    );
    const label = screen.getByTestId("detail-status-label");
    expect(label).toBeInTheDocument();
  });
  it("Order Content", () => {
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
        }}
      >
        <MemoryRouter initialEntries={["/home/orderOverview"]}>
          <OrderDetailsTracking
            patientData={patientMockData}
            orderDetailsTrackingData={mockResponseOrderTrackingResponse}
            pdfUrl={""}
            isOrderFlow={false}
            alertsForRO={undefined}
          />
        </MemoryRouter>
      </OrderDetailContext.Provider>
    );
    const content = screen.getByTestId("order-Details-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent("No tracking information available");
  });
  it("Order Error", () => {
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
        }}
      >
        <MemoryRouter initialEntries={["/home/orderOverview"]}>
          <OrderDetailsTracking
            patientData={patientMockData}
            orderDetailsTrackingData={mockResponseOrderTrackingResponse}
            pdfUrl={""}
            isOrderFlow={false}
            alertsForRO={undefined}
          />
        </MemoryRouter>
      </OrderDetailContext.Provider>
    );
    const errorDiv = screen.getByTestId("order-Details-error");
    expect(errorDiv).toBeInTheDocument();
    expect(errorDiv).toHaveTextContent("No tracking information available");
  });
  it("Order Error false value", () => {
    let data = getMockOrderDetailContextData();
    data.error = false;
    render(
      <OrderDetailContext.Provider
        value={{
          ...data,
        }}
      >
        <MemoryRouter initialEntries={["/home/orderOverview"]}>
          <OrderDetailsTracking
            patientData={patientMockData}
            orderDetailsTrackingData={mockResponseOrderTrackingResponse}
            pdfUrl={""}
            isOrderFlow={false}
            alertsForRO={undefined}
          />
        </MemoryRouter>
      </OrderDetailContext.Provider>
    );
    const stepperDiv = screen.getByTestId("milestone-stepper");
    expect(stepperDiv).toBeInTheDocument();
  });
  it("Order Detail Column", () => {
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
        }}
      >
        <MemoryRouter initialEntries={["/home/orderOverview"]}>
          <OrderDetailsTracking
            patientData={patientMockData}
            orderDetailsTrackingData={mockResponseOrderTrackingResponse}
            pdfUrl={""}
            isOrderFlow={false}
            alertsForRO={undefined}
          />
        </MemoryRouter>
      </OrderDetailContext.Provider>
    );
    const LeftValue = screen.getByTestId("order-Details-Column-Value");
    expect(LeftValue).toBeInTheDocument();
  });
  it("Order Container", () => {
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
        }}
      >
        <MemoryRouter initialEntries={["/home/orderOverview"]}>
          <OrderDetailsTracking
            patientData={patientMockData}
            orderDetailsTrackingData={mockResponseOrderTrackingResponse}
            pdfUrl={""}
            isOrderFlow={false}
            alertsForRO={undefined}
          />
        </MemoryRouter>
      </OrderDetailContext.Provider>
    );
    const ContainerValue = screen.getByTestId("detail-container");
    expect(ContainerValue).toBeInTheDocument();
  });
  it("Order tracking null data", () => {
    let data = getMockOrderDetailContextData();
    data.error = false;
    data.orderDetailsTrackingData = null;
    render(
      <OrderDetailContext.Provider
        value={{
          ...data,
        }}
      >
        <MemoryRouter initialEntries={["/home/orderOverview"]}>
          <OrderDetailsTracking
            patientData={patientMockData}
            orderDetailsTrackingData={mockResponseOrderTrackingResponse}
            pdfUrl={""}
            isOrderFlow={false}
            alertsForRO={undefined}
          />
        </MemoryRouter>
      </OrderDetailContext.Provider>
    );
    const stepperDiv = screen.getByTestId("milestone-stepper");
    expect(stepperDiv).toBeInTheDocument();
  });
});
