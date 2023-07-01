import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { patientMockData } from "../../../../../mockData/patientFound";
import SupplyOrderDetailsTracking from "../supplyOrderDetailsTracking.component";
import { mocksupplyOrderDetailsTrackingData } from "./supplyOrderDetailsTracking.test.data";
import { OrderDetailContext } from "../../../../../context/OrderDetailsContext";
import {
  mocksupplyOrderDetailsData,
  mocksupplyOrderInfoDetailsData,
} from "./supplyOrderDetails.test.data";
import userEvent from "@testing-library/user-event";
import { OrderOverViewTabsTitle } from "../../orderOverview/orderOverviewContainer.enum";

describe("Supply Order Details stepper component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Supply Order Detail header", () => {
    render(
      <MemoryRouter initialEntries={["/home/supplyOrderDetail"]}>
        <SupplyOrderDetailsTracking
          patientData={patientMockData}
          supplyOrderTrackingData={mocksupplyOrderDetailsTrackingData}
          selectedSupplyOrderData={mocksupplyOrderInfoDetailsData}
          therapyStartDate={"12-12-2021"}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("detail-header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(
      OrderOverViewTabsTitle.ORDER_DETAIL_TAB_TITLE
    );
  });
  it("Supply Order Detail Status", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <SupplyOrderDetailsTracking
          patientData={patientMockData}
          supplyOrderTrackingData={mocksupplyOrderDetailsTrackingData}
          selectedSupplyOrderData={mocksupplyOrderInfoDetailsData}
        />
      </MemoryRouter>
    );
    const label = screen.getByTestId("detail-status-label");
    expect(label).toBeInTheDocument();
  });
  it("Supply Order Content", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <SupplyOrderDetailsTracking
          patientData={patientMockData}
          supplyOrderTrackingData={mocksupplyOrderDetailsTrackingData}
          selectedSupplyOrderData={mocksupplyOrderInfoDetailsData}
        />
      </MemoryRouter>
    );
    const content = screen.getByTestId("order-Details-content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent(
      /No tracking information available|Order Received|Shipped|Track Package|Delivered/
    );
  });
  it("Supply Order Error", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <SupplyOrderDetailsTracking
          patientData={patientMockData}
          supplyOrderTrackingData={undefined}
          selectedSupplyOrderData={mocksupplyOrderInfoDetailsData}
        />
      </MemoryRouter>
    );
    const errorDiv = screen.getByTestId("order-Details-error");
    expect(errorDiv).toBeInTheDocument();
    expect(errorDiv).toHaveTextContent("No tracking information available");
  });
  it("Order Detail Column", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <SupplyOrderDetailsTracking
          patientData={patientMockData}
          supplyOrderTrackingData={mocksupplyOrderDetailsTrackingData}
          selectedSupplyOrderData={mocksupplyOrderInfoDetailsData}
        />
      </MemoryRouter>
    );
    const LeftValue = screen.getByTestId("order-Details-Column-Value");
    expect(LeftValue).toBeInTheDocument();
  });
  it("Order Container", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <SupplyOrderDetailsTracking
          patientData={patientMockData}
          supplyOrderTrackingData={mocksupplyOrderDetailsTrackingData}
          selectedSupplyOrderData={mocksupplyOrderInfoDetailsData}
        />
      </MemoryRouter>
    );
    const ContainerValue = screen.getByTestId("detail-container");
    expect(ContainerValue).toBeInTheDocument();
  });
  it("SupplyOrder Milestone", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <SupplyOrderDetailsTracking
          patientData={patientMockData}
          supplyOrderTrackingData={mocksupplyOrderDetailsTrackingData}
          selectedSupplyOrderData={mocksupplyOrderInfoDetailsData}
        />
      </MemoryRouter>
    );
    const MilestoneValue = screen.getByTestId("supplyorder-milestone");
    expect(MilestoneValue).toBeInTheDocument();
  });
  it("SupplyOrder Column", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <SupplyOrderDetailsTracking
          patientData={patientMockData}
          supplyOrderTrackingData={mocksupplyOrderDetailsTrackingData}
          selectedSupplyOrderData={mocksupplyOrderInfoDetailsData}
        />
      </MemoryRouter>
    );
    const SupplyordercolumnValue = screen.getByTestId("supplyorder-column");
    expect(SupplyordercolumnValue).toBeInTheDocument();
  });
  it("SupplyOrder Track", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <SupplyOrderDetailsTracking
          patientData={patientMockData}
          supplyOrderTrackingData={mocksupplyOrderDetailsTrackingData}
          selectedSupplyOrderData={mocksupplyOrderInfoDetailsData}
        />
      </MemoryRouter>
    );
    const OrdertrackValue = screen.getByTestId("supplyorder-ordertrack");
    expect(OrdertrackValue).toBeInTheDocument();
  });
});
