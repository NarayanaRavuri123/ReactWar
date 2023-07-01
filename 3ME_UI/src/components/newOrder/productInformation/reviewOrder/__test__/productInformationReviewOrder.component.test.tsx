import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { productTestData } from "../../../__test__/newOrder.test.data";
import { ProductInformationReviewOrder } from "../productInformationReviewOrder.component";

describe("Product information review order component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Product information review order component validate header", () => {
    const data = getDeepClone(productTestData);
    const editBtnAction = jest.fn();
    render(
      <ProductInformationReviewOrder
        productInfo={data}
        editButtonClicked={editBtnAction}
        productValues={[]}
        isReadyCare={true}
      />
    );
    const title = screen.getByTestId("product-information-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Product Information");
    const editBtn = screen.getByTestId(
      "product-information-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Product information review order component validate product information for yes", () => {
    const data = getDeepClone(productTestData);
    data.productInformation.value = "yes";
    render(
      <ProductInformationReviewOrder
        productInfo={data}
        editButtonClicked={jest.fn()}
        productValues={[]}
        isReadyCare={true}
      />
    );
    const title = screen.getByTestId("product-information");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Will this order be using one of your 3M™ V.A.C.® Ready Care Program Units?"
    );
    const value1 = screen.getByTestId("product-information-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("Yes");
  });

  it("Product information review order component validate product information for no", () => {
    const data = getDeepClone(productTestData);
    data.productInformation.value = "no";
    render(
      <ProductInformationReviewOrder
        productInfo={data}
        editButtonClicked={jest.fn()}
        productValues={[]}
        isReadyCare={true}
      />
    );
    const title = screen.getByTestId("product-information");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Will this order be using one of your 3M™ V.A.C.® Ready Care Program Units?"
    );
    const value1 = screen.getByTestId("product-information-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("No");
  });

  it("Product information review order component validate for is ready care flag true", () => {
    const data = getDeepClone(productTestData);
    data.productInformation.value = "no";
    render(
      <ProductInformationReviewOrder
        productInfo={data}
        editButtonClicked={jest.fn()}
        productValues={[]}
        isReadyCare={false}
      />
    );
    const title = screen.getByTestId("product");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Product");
    const value1 = screen.getByTestId("product-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("--");
  });

  it("Product information review order component validate email", () => {
    const data = getDeepClone(productTestData);
    data.productValue.value = "3M™ ActiV.A.C.™ Therapy Unit";
    render(
      <ProductInformationReviewOrder
        productInfo={data}
        editButtonClicked={jest.fn()}
        productValues={[]}
        isReadyCare={true}
      />
    );
    const title = screen.getByTestId("product");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Product");
    const value1 = screen.getByTestId("product-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("3M™ ActiV.A.C.™ Therapy Unit");
  });
});
