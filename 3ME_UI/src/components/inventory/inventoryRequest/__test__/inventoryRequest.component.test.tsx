import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { InventoryRequest } from "../inventoryRequest.component";
import { InventoryContext } from "../../../../context/InventoryContext";
import { getMockInventoryRequestData } from "./InventoryMockContext.data";

describe("Inventory Request component", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate Navigator", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData(),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const navigator = screen.getByTestId("inventory-adjustment-route-section");
    expect(navigator).toBeInTheDocument();
    const navigatorFirstLink = screen.getByTestId("link-to-navigator-0");
    expect(navigatorFirstLink).toBeInTheDocument();
    expect(navigatorFirstLink).toHaveTextContent("Inventory");
    const arrowIcon = screen.getByTestId("arrow-right-0");
    expect(arrowIcon).toBeInTheDocument();
    const navigatorLastTitle = screen.getByTestId("title-txt");
    expect(navigatorLastTitle).toBeInTheDocument();
    expect(navigatorLastTitle).toHaveTextContent("Inventory Adjustment");
  });

  it("Validate title", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData(),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("inventory-request-header-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Inventory Adjustment Request");
  });

  it("validate description", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData(),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const description1 = screen.getByTestId(
      "inventory-request-header-description-1"
    );
    expect(description1).toBeInTheDocument();
    expect(description1).toHaveTextContent(
      "Please complete this form if you would like to increase or decrease the inventory stock level of VACs used for Ready Care™ in your facility. A change to your inventory stock level may affect the frequency of replenishment and will also adjust your disposable inventory level."
    );
    const description2 = screen.getByTestId(
      "inventory-request-header-description-2"
    );
    expect(description2).toBeInTheDocument();
    expect(description2).toHaveTextContent(
      "If you are in immediate need of units, contact the 3M™ Express Support team at (800) 275-4524 ext. 41858 or kciexpress@kci1.com."
    );
  });

  it("Validate inventory request", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData(),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("inventory-request-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Request Type");
  });

  it("Validate inventory request yes selected", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData("Add Inventory"),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const radioBtn = screen.getByTestId("radio-yes");
    expect(radioBtn).toBeInTheDocument();
    const title = screen.getByTestId("inventory-request-type-yes");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Add Inventory");
  });

  it("Validate inventory request no selected", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData("Remove Inventory"),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const radioBtn = screen.getByTestId("radio-no");
    expect(radioBtn).toBeInTheDocument();
    const title = screen.getByTestId("inventory-request-type-no");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Remove Inventory");
  });

  it("Validate inventory quantity to add with empty", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData("Add Inventory"),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("inventory-request-quantity");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Quantity to add");
    const quantity = screen.getByTestId("quantityInput");
    expect(quantity).toBeInTheDocument();
    expect(quantity).toHaveValue("");
    const minusBtnDisabled = screen.getByTestId("minus-button-disabled");
    expect(minusBtnDisabled).toBeInTheDocument();
    const plusBtn = screen.getByTestId("plus-button");
    expect(plusBtn).toBeInTheDocument();
    expect(plusBtn).not.toBeDisabled();
  });

  it("Validate inventory quantity to add with 1 quantity", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData("Add Inventory", "1"),
          }}
        >
          <InventoryRequest decrementButtonDisabled={false} />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("inventory-request-quantity");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Quantity to add");
    const quantity = screen.getByTestId("quantityInput");
    expect(quantity).toBeInTheDocument();
    expect(quantity).toHaveValue("1");
    const minusBtn = screen.getByTestId("minus-button");
    expect(minusBtn).toBeInTheDocument();
    expect(minusBtn).not.toBeDisabled();
    const plusBtn = screen.getByTestId("plus-button");
    expect(plusBtn).toBeInTheDocument();
    expect(plusBtn).not.toBeDisabled();
  });

  it("Validate inventory quantity to add with 15 quantity", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData("Add Inventory", "15"),
          }}
        >
          <InventoryRequest
            decrementButtonDisabled={false}
            incrementButtonDisabled={true}
          />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("inventory-request-quantity");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Quantity to add");
    const quantity = screen.getByTestId("quantityInput");
    expect(quantity).toBeInTheDocument();
    expect(quantity).toHaveValue("15");
    const minusBtn = screen.getByTestId("minus-button");
    expect(minusBtn).toBeInTheDocument();
    expect(minusBtn).not.toBeDisabled();
    const plusBtn = screen.getByTestId("plus-button-disabled");
    expect(plusBtn).toBeInTheDocument();
    expect(plusBtn).not.toBeDisabled();
  });

  it("Validate inventory quantity to remove with empty", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData("Remove Inventory"),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("inventory-request-quantity");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Quantity to remove");
    const quantity = screen.getByTestId("quantityInput");
    expect(quantity).toBeInTheDocument();
    expect(quantity).toHaveValue("");
    const minusBtnDisabled = screen.getByTestId("minus-button-disabled");
    expect(minusBtnDisabled).toBeInTheDocument();
    const plusBtn = screen.getByTestId("plus-button");
    expect(plusBtn).toBeInTheDocument();
    expect(plusBtn).not.toBeDisabled();
  });

  it("Validate inventory quantity to remove with 1 quantity", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData("Remove Inventory", "1"),
          }}
        >
          <InventoryRequest decrementButtonDisabled={false} />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("inventory-request-quantity");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Quantity to remove");
    const quantity = screen.getByTestId("quantityInput");
    expect(quantity).toBeInTheDocument();
    expect(quantity).toHaveValue("1");
    const minusBtn = screen.getByTestId("minus-button");
    expect(minusBtn).toBeInTheDocument();
    expect(minusBtn).not.toBeDisabled();
    const plusBtn = screen.getByTestId("plus-button");
    expect(plusBtn).toBeInTheDocument();
    expect(plusBtn).not.toBeDisabled();
  });

  it("Validate inventory quantity to remove with 15 quantity", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData("Remove Inventory", "15"),
          }}
        >
          <InventoryRequest
            decrementButtonDisabled={false}
            incrementButtonDisabled={true}
          />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("inventory-request-quantity");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Quantity to remove");
    const quantity = screen.getByTestId("quantityInput");
    expect(quantity).toBeInTheDocument();
    expect(quantity).toHaveValue("15");
    const minusBtn = screen.getByTestId("minus-button");
    expect(minusBtn).toBeInTheDocument();
    expect(minusBtn).not.toBeDisabled();
    const plusBtn = screen.getByTestId("plus-button-disabled");
    expect(plusBtn).toBeInTheDocument();
    expect(plusBtn).not.toBeDisabled();
  });

  it("Validate inventory requester information header", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData(),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const title = screen.getByTestId("inventory-requester-information-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Requester Information");
    const description = screen.getByTestId(
      "inventory-requester-information-description"
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(
      "The person indicated below will be contacted within 2 business days."
    );
  });

  it("Validate inventory requester information contact name", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData(),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const name = screen.getByTestId("inventory-requester-information-name");
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent("Contact Name");
    const nameValue = screen.getByTestId(
      "inventory-requester-information-name-value"
    );
    expect(nameValue).toBeInTheDocument();
    expect(nameValue).toHaveValue("");
    expect(nameValue).toBeRequired();
  });

  it("Validate inventory requester information contact name with value", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData("", "", "Rahul Patil"),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const name = screen.getByTestId("inventory-requester-information-name");
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent("Contact Name");
    const nameValue = screen.getByTestId(
      "inventory-requester-information-name-value"
    );
    expect(nameValue).toBeInTheDocument();
    expect(nameValue).toHaveValue("Rahul Patil");
    expect(nameValue).toBeRequired();
  });

  it("Validate inventory requester information contact phone", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData(),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const phone = screen.getByTestId("inventory-requester-information-phone");
    expect(phone).toBeInTheDocument();
    expect(phone).toHaveTextContent("Contact Phone");
    const phoneValue = screen.getByTestId(
      "inventory-requester-information-phone-value"
    );
    expect(phoneValue).toBeInTheDocument();
    expect(phoneValue).toHaveValue("");
    expect(phoneValue).toBeRequired();
  });

  it("Validate inventory requester information contact phone with value", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData("", "", "", "3133265290"),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const phone = screen.getByTestId("inventory-requester-information-phone");
    expect(phone).toBeInTheDocument();
    expect(phone).toHaveTextContent("Contact Phone");
    const phoneValue = screen.getByTestId(
      "inventory-requester-information-phone-value"
    );
    expect(phoneValue).toBeInTheDocument();
    expect(phoneValue).toHaveValue("(313) 326-5290");
    expect(phoneValue).toBeRequired();
  });

  it("Validate inventory requester information extension", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData(),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const extension = screen.getByTestId(
      "inventory-requester-information-extension"
    );
    expect(extension).toBeInTheDocument();
    expect(extension).toHaveTextContent("Ext");
    const extensionValue = screen.getByTestId(
      "inventory-requester-information-extension-value"
    );
    expect(extensionValue).toBeInTheDocument();
    expect(extensionValue).toHaveValue("");
    expect(extensionValue).not.toBeRequired();
  });

  it("Validate inventory requester information extension with value", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData("", "", "", "", "123"),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const extension = screen.getByTestId(
      "inventory-requester-information-extension"
    );
    expect(extension).toBeInTheDocument();
    expect(extension).toHaveTextContent("Ext");
    const extensionValue = screen.getByTestId(
      "inventory-requester-information-extension-value"
    );
    expect(extensionValue).toBeInTheDocument();
    expect(extensionValue).toHaveValue("123");
    expect(extensionValue).not.toBeRequired();
  });

  it("Validate inventory requester information email", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData(),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const extension = screen.getByTestId(
      "inventory-requester-information-email"
    );
    expect(extension).toBeInTheDocument();
    expect(extension).toHaveTextContent("Email");
    const extensionValue = screen.getByTestId(
      "inventory-requester-information-email-value"
    );
    expect(extensionValue).toBeInTheDocument();
    expect(extensionValue).toHaveValue("");
    expect(extensionValue).toBeRequired();
  });

  it("Validate inventory requester information email with value", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData(
              "",
              "",
              "",
              "",
              "",
              "rahul.p@healthasyst.com"
            ),
          }}
        >
          <InventoryRequest />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const extension = screen.getByTestId(
      "inventory-requester-information-email"
    );
    expect(extension).toBeInTheDocument();
    expect(extension).toHaveTextContent("Email");
    const extensionValue = screen.getByTestId(
      "inventory-requester-information-email-value"
    );
    expect(extensionValue).toBeInTheDocument();
    expect(extensionValue).toHaveValue("rahul.p@healthasyst.com");
    expect(extensionValue).toBeRequired();
  });

  it("Validate footer buttons", () => {
    const mockCancelBtnAction = jest.fn();
    const mockSubmitBtnAction = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <InventoryContext.Provider
          value={{
            ...getMockInventoryRequestData(),
          }}
        >
          <InventoryRequest
            cancelBtnAction={mockCancelBtnAction}
            submitBtnAction={mockSubmitBtnAction}
          />
        </InventoryContext.Provider>
      </MemoryRouter>
    );
    const cancelBtn = screen.getByTestId("firstButton-test");
    expect(cancelBtn).toBeInTheDocument();
    expect(cancelBtn).toHaveTextContent("Cancel");
    userEvent.click(cancelBtn);
    expect(mockCancelBtnAction).toBeCalledTimes(1);
    const submitBtn = screen.getByTestId("secondButton-test");
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toHaveTextContent("Submit");
    userEvent.click(submitBtn);
    expect(mockSubmitBtnAction).toBeCalledTimes(1);
  });
});
