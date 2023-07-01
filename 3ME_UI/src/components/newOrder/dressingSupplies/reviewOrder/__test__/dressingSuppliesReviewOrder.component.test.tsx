import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import {
  accessoryTestData,
  canisterTestData,
  dressingTestData,
} from "../../../__test__/newOrder.test.data";
import { IAccessory } from "../../accessories/accessories.interface";
import { DressingSuppliesReviewOrder } from "../dressingSuppliesReviewOrder.component";

describe("Dressing supplies review order component", () => {
  afterAll(() => {
    cleanup();
  });
  it("Dressing supplies review order component validate header", () => {
    const dressing = getDeepClone(dressingTestData);
    const canister = getDeepClone(canisterTestData);
    const accessory = getDeepClone(accessoryTestData);
    const editBtnAction = jest.fn();
    render(
      <DressingSuppliesReviewOrder
        dressing={dressing}
        canister={canister}
        accesssory={accessory}
        editButtonClicked={editBtnAction}
      />
    );
    const title = screen.getByTestId("dressing-supplies-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Dressings/Supplies");
    const editBtn = screen.getByTestId(
      "dressing-supplies-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Dressing supplies review order component validate primary dressing", () => {
    const dressing = getDeepClone(dressingTestData);
    const canister = getDeepClone(canisterTestData);
    const accessory = getDeepClone(accessoryTestData);
    dressing.productQuantity.value = 2;
    dressing.productCode.value = "M8275075/5";
    dressing.productName.value = "V.A.C.® GRANUFOAM™ Dressing";
    render(
      <DressingSuppliesReviewOrder
        dressing={dressing}
        canister={canister}
        accesssory={accessory}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("dressing-kit");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("3M™ V.A.C.® Dressing Kit");
    const value = screen.getByTestId("dressing-kit-value-primary");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent(
      "2 case of 5 - V.A.C.® GRANUFOAM™ Dressing, (M8275075/5)"
    );
  });

  it("Dressing supplies review order component validate primary and secondary dressing", () => {
    const dressing = getDeepClone(dressingTestData);
    const canister = getDeepClone(canisterTestData);
    const accessory = getDeepClone(accessoryTestData);
    dressing.productQuantity.value = 2;
    dressing.productCode.value = "M8275075/5";
    dressing.productName.value = "V.A.C.® GRANUFOAM™ Dressing";
    dressing.secProductQuantity.value = 1;
    dressing.secProductCode.value = "DTGF05PKM";
    dressing.secProductName.value =
      "3M™ Dermatac™ Drape and V.A.C.® GRANUFOAM™";
    render(
      <DressingSuppliesReviewOrder
        dressing={dressing}
        canister={canister}
        accesssory={accessory}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("dressing-kit");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("3M™ V.A.C.® Dressing Kit");
    const primary = screen.getByTestId("dressing-kit-value-primary");
    expect(primary).toBeInTheDocument();
    expect(primary).toHaveTextContent(
      "2 case of 5 - V.A.C.® GRANUFOAM™ Dressing, (M8275075/5)"
    );
    const secondary = screen.getByTestId("dressing-kit-value-primary");
    expect(secondary).toBeInTheDocument();
    expect(secondary).toHaveTextContent(
      "2 case of 5 - V.A.C.® GRANUFOAM™ Dressing, (M8275075/5)"
    );
  });

  it("Dressing supplies review order component validate canister", () => {
    const dressing = getDeepClone(dressingTestData);
    const canister = getDeepClone(canisterTestData);
    const accessory = getDeepClone(accessoryTestData);
    canister.canisterProductQuantity.value = 1;
    canister.canisterProductCode.value = "M8275058/5";
    canister.canisterProductName.value =
      "ACTIV.A.C™ 300mL Canister w/Gel [M8275058/5]";
    render(
      <DressingSuppliesReviewOrder
        dressing={dressing}
        canister={canister}
        accesssory={accessory}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("canister-kit");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("3M™ V.A.C.® Canister(s)");
    const value = screen.getByTestId("canister-kit-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent(
      "1 case of 5 - ACTIV.A.C™ 300mL Canister w/Gel [M8275058/5], (M8275058/5)"
    );
  });

  it("Dressing supplies review order component validate accessories", () => {
    const dressing = getDeepClone(dressingTestData);
    const canister = getDeepClone(canisterTestData);
    const accessory = getDeepClone(accessoryTestData);
    dressing.productQuantity.value = 2;
    dressing.productCode.value = "M8275075/5";
    dressing.productName.value = "V.A.C.® GRANUFOAM™ Dressing";
    canister.canisterProductQuantity.value = 1;
    canister.canisterProductCode.value = "M8275058/5";
    canister.canisterProductName.value =
      "ACTIV.A.C™ 300mL Canister w/Gel [M8275058/5]";
    const firstAccessory: IAccessory = {
      id: 1,
      index: 1,
      code: "M6275066/5",
      value: "V.A.C.® Y-Connector (5 ea.)",
    };
    const secondAccessory: IAccessory = {
      id: 2,
      index: 2,
      code: "M6275034/10",
      value: "WHITEFOAM™ Large (10 ea., foam only)",
    };
    const thirdAccessory: IAccessory = {
      id: 3,
      index: 3,
      code: "M6275009/10",
      value: "V.A.C.® Drape (10 ea.)",
    };
    const fourthAccessory: IAccessory = {
      id: 4,
      index: 4,
      code: "DTAC05LDP",
      value: "3M™ Dermatac™ Drape (05)",
    };
    accessory.accessories = [
      firstAccessory,
      secondAccessory,
      thirdAccessory,
      fourthAccessory,
    ];
    render(
      <DressingSuppliesReviewOrder
        dressing={dressing}
        canister={canister}
        accesssory={accessory}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("accessories-kit");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("3M™ V.A.C.® Therapy Accessories");
    const value1 = screen.getByTestId("accessories-kit-value-1");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent(
      "• 1 Pack of 5 - V.A.C.® Y-Connector (5 ea.), (M6275066/5)"
    );
    const value2 = screen.getByTestId("accessories-kit-value-2");
    expect(value2).toBeInTheDocument();
    expect(value2).toHaveTextContent(
      "• 1 Pack of 10 - WHITEFOAM™ Large (10 ea., foam only), (M6275034/10)"
    );
    const value3 = screen.getByTestId("accessories-kit-value-3");
    expect(value3).toBeInTheDocument();
    expect(value3).toHaveTextContent(
      "• 1 Pack of 10 - V.A.C.® Drape (10 ea.), (M6275009/10)"
    );
    const value4 = screen.getByTestId("accessories-kit-value-4");
    expect(value4).toBeInTheDocument();
    expect(value4).toHaveTextContent(
      "• 1 Pack of 05 - 3M™ Dermatac™ Drape (05), (DTAC05LDP)"
    );
  });
});
