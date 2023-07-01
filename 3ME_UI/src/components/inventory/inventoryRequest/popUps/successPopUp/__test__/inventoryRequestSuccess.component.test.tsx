import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { InventoryRequestSucuess } from "../inventoryRequestSuccess.component";

describe("Inventory Request Success Pop up component", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate title", () => {
    const backButtonAction = jest.fn();
    render(<InventoryRequestSucuess backButtonAction={backButtonAction} />);
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Inventory Adjustment Request Sent");
  });

  it("Validate description", () => {
    const backButtonAction = jest.fn();
    render(<InventoryRequestSucuess backButtonAction={backButtonAction} />);
    const description1 = screen.getByTestId("description1");
    expect(description1).toBeInTheDocument();
    expect(description1).toHaveTextContent(
      "Thank you for submitting your request. Your request will be reviewed by your Ready Care Operations Planning Team within the next few days and you should receive a response within one week."
    );
    const description2 = screen.getByTestId("description2");
    expect(description2).toBeInTheDocument();
    expect(description2).toHaveTextContent(
      "For urgent assistance, please call our National Contact Center at:(800) 275-4524 Ext. 41858."
    );
  });

  it("Validate back to dashboard button", () => {
    const backButtonAction = jest.fn();
    render(<InventoryRequestSucuess backButtonAction={backButtonAction} />);
    const description = screen.getByTestId("back-button");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent("Back to inventory");
    userEvent.click(description);
    expect(backButtonAction).toBeCalledTimes(1);
  });
});
