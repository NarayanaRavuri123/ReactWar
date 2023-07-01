import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import PayerAllDetails from "../PayerAllDetails.component";
import { defaultNewOrderData } from "../../../../newOrder.model";

describe("PayerAllDetails component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("PayerAllDetails validate payer name input field", () => {
    render(
      <PayerAllDetails
        data={defaultNewOrderData}
        insuranceTypeSelected={""}
        isPrimaryComponent={true}
        setData={() => {}}
        insuredRelation={[]}
      />
    );
    const title = screen.getByTestId("PayerNameID");
    expect(title).toBeInTheDocument();
  });
  it("PayerAllDetails validate member id input field", () => {
    render(
      <PayerAllDetails
        data={defaultNewOrderData}
        insuranceTypeSelected={""}
        isPrimaryComponent={true}
        setData={() => {}}
        insuredRelation={[]}
      />
    );
    const title = screen.getByTestId("memberTestID");
    expect(title).toBeInTheDocument();
  });
  it("PayerAllDetails validate group id input field", () => {
    render(
      <PayerAllDetails
        data={defaultNewOrderData}
        insuranceTypeSelected={""}
        isPrimaryComponent={true}
        setData={() => {}}
        insuredRelation={[]}
      />
    );
    const title = screen.getByTestId("groupTestID");
    expect(title).toBeInTheDocument();
  });
  it("PayerAllDetails validate payerContactNumberID input field", () => {
    render(
      <PayerAllDetails
        data={defaultNewOrderData}
        insuranceTypeSelected={""}
        isPrimaryComponent={true}
        setData={() => {}}
        insuredRelation={[]}
      />
    );
    const title = screen.getByTestId("payerContactNumberID");
    expect(title).toBeInTheDocument();
  });
  it("PayerAllDetails validate extensionID input field", () => {
    render(
      <PayerAllDetails
        data={defaultNewOrderData}
        insuranceTypeSelected={""}
        isPrimaryComponent={true}
        setData={() => {}}
        insuredRelation={[]}
      />
    );
    const title = screen.getByTestId("extensionID");
    expect(title).toBeInTheDocument();
  });
  it("PayerAllDetails validate relationship-type input field", () => {
    render(
      <PayerAllDetails
        data={defaultNewOrderData}
        insuranceTypeSelected={""}
        isPrimaryComponent={true}
        setData={() => {}}
        insuredRelation={[]}
      />
    );
    const title = screen.getByTestId("relationshiptypeLabel");
    expect(title).toBeInTheDocument();
  });
});
