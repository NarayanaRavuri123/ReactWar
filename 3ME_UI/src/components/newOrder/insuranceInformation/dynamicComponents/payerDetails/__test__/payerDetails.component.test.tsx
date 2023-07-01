import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { defaultNewOrderData } from "../../../../newOrder.model";
import PayerDetails from "../payerDetails.component";

describe("PayerDetails component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("PayerDetails validate payer-memberid input field", () => {
    render(
      <PayerDetails
        data={defaultNewOrderData}
        insuranceTypeSelected={""}
        isPrimaryComponent={true}
        setData={() => {}}
        insuredRelation={[]}
      />
    );
    const title = screen.getByTestId("payer-memberid");
    expect(title).toBeInTheDocument();
  });

  it("PayerDetails validate payer-relationshiptype input field", () => {
    render(
      <PayerDetails
        data={defaultNewOrderData}
        insuranceTypeSelected={""}
        isPrimaryComponent={true}
        setData={() => {}}
        insuredRelation={[]}
      />
    );
    const title = screen.getByTestId("payer-relationshiptype");
    expect(title).toBeInTheDocument();
  });
});
