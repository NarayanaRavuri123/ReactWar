import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { mockResponseOrderTrackingResponse } from "../../orderDetailsTracking/__test__/mockOrderDetailContext";
import { OrderDetails3MContacts } from "../orderDetails3MContacts.component";

describe("Order Overview stepper component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("3M Contact Header", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <OrderDetails3MContacts
          orderDetailsTrackingData={mockResponseOrderTrackingResponse}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("contact-title");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("3M Contacts");
  });
  it("3M Contact Sales Rep header", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <OrderDetails3MContacts
          orderDetailsTrackingData={mockResponseOrderTrackingResponse}
        />
      </MemoryRouter>
    );
    const sub_header = screen.getByTestId("name");
    expect(sub_header).toBeInTheDocument();
    expect(sub_header).toHaveTextContent("Sales Rep");
    const sub_header_value = screen.getByTestId("name-value-salesrep");
    expect(sub_header_value).toBeInTheDocument();
    expect(sub_header_value).toHaveTextContent("Sanvi");
    const sub_header_phone_value = screen.getByTestId("phone-value-salesrep");
    expect(sub_header_phone_value).toBeInTheDocument();
    expect(sub_header_phone_value).toHaveTextContent("080222222");
  });
  it("3M Contact Customer Serv Rep header", () => {
    render(
      <MemoryRouter initialEntries={["/home/orderOverview"]}>
        <OrderDetails3MContacts
          orderDetailsTrackingData={mockResponseOrderTrackingResponse}
        />
      </MemoryRouter>
    );
    const sub_header = screen.getByTestId("cust-serv-rep");
    expect(sub_header).toBeInTheDocument();
    expect(sub_header).toHaveTextContent("Customer Service Rep");
    const sub_header_value = screen.getByTestId("name-value-csr-name");
    expect(sub_header_value).toBeInTheDocument();
    expect(sub_header_value).toHaveTextContent("Ver");
  });
});
