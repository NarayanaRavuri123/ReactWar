import { cleanup, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { OrderDetailContext } from "../../../../../context/OrderDetailsContext";
import { patientMockData } from "../../../../../mockData/patientFound";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { newOrderWoundInfoTestData } from "../../../../newOrder/newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import { INewOrderWoundInfo } from "../../../../newOrder/newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { getMockOrderDetailContextData } from "../../orderDetailsTracking/__test__/mockOrderDetailContext";
import { IOrderDetailResponse } from "../../orderDetailsTracking/orderDetailsTracking.interface";
import { OrderOverview } from "../orderOverview.component";
describe("Order Overview component ->", () => {
  afterAll(() => {
    cleanup();
  });
  const orderDetailMockResponse: IOrderDetailResponse = {
    orderNumber: "123",
    patientFirstName: "Pallavi",
    patientLastName: "Nayek",
    salesRepName: "Sanvi",
    orderDate: "12-MAR-2021",
    salesRepPhone: "080222222",
    salesRepEmail: "p@mmm.com",
    csrName: "ver",
    csrPhone: "sion",
    csrEmail: "sion@mmm.com",
    trackingLink: "",
    trackingNumber: "3456777",
    receivedFlag: "",
    releaseToShipFlag: "",
    releaseDate: "12-MAR-2021",
    validatedFlag: "",
    benefitsComplDate: "12-MAR-2021",
    therapyFlag: "",
    therapyDate: "",
    deliveredDate: "12-MAR-2021",
    deliveredFlag: "",
    rentalProduct: "",
    outForDeliveryFlag: "",
    outDeliveryDate: "12-MAR-2021",
    deliverySiteType: "",
  };

  const defaultValues: INewOrderWoundInfo = getDeepClone(
    newOrderWoundInfoTestData
  );
  it("Order Overview  title", async () => {
    const history = createMemoryHistory();
    history.push({
      pathname: "/home/orderOverview",
      state: {
        stateData: patientMockData,
      },
    });
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
          orderDetailsTrackingData: orderDetailMockResponse,
          woundInfoData: defaultValues,
        }}
      >
        <Router history={history}>
          <OrderOverview />
        </Router>
      </OrderDetailContext.Provider>
    );

    const backButton = screen.getByTestId("orderOverviewBckBtn");
    expect(backButton).toBeInTheDocument();
  });
  it("Order Overview  select drop down", () => {
    const history = createMemoryHistory();
    history.push({
      pathname: "/home/orderOverview",
      state: {
        stateData: patientMockData,
      },
    });
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
          orderDetailsTrackingData: orderDetailMockResponse,
          woundInfoData: defaultValues,
        }}
      >
        <Router history={history}>
          <OrderOverview />
        </Router>
      </OrderDetailContext.Provider>
    );
    const dropdown = screen.getByTestId("customeselect");
    expect(dropdown).toBeInTheDocument();
  });
  it("Order Overview  check tab name", () => {
    const history = createMemoryHistory();
    history.push({
      pathname: "/home/orderOverview",
      state: {
        stateData: patientMockData,
      },
    });
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
          orderDetailsTrackingData: orderDetailMockResponse,
          woundInfoData: defaultValues,
        }}
      >
        <Router history={history}>
          <OrderOverview />
        </Router>
      </OrderDetailContext.Provider>
    );
    const taborders = screen.getByTestId("tab-orders");
    expect(taborders).toBeInTheDocument();
    expect(taborders).toHaveTextContent("");
  });
  it("Order Overview tab present or not", () => {
    const history = createMemoryHistory();
    history.push({
      pathname: "/home/orderOverview",
      state: {
        stateData: patientMockData,
      },
    });
    render(
      <OrderDetailContext.Provider
        value={{
          ...getMockOrderDetailContextData(),
          orderDetailsTrackingData: orderDetailMockResponse,
          woundInfoData: defaultValues,
        }}
      >
        <Router history={history}>
          <OrderOverview />
        </Router>
      </OrderDetailContext.Provider>
    );
    const tabFinInfo = screen.getByTestId("tab-nav");
    expect(tabFinInfo).toBeInTheDocument();
  });
});
