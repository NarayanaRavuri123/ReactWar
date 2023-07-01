import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NewOrderFooterButtonGroup } from "../newOrderFooterBtnGroup.component";
import { MemoryRouter } from "react-router-dom";
import ProgressBar from "../../../progressBar/progressBar.component";
import { PatientInformation } from "../../patientInformation/patientInformation.component";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { newOrderTestData } from "../../__test__/newOrder.test.data";
import { NewOrderPageSection } from "../../NewOrderContainer.enum";
import { NewOrderContext } from "../../../../context/NewOrderContext";
import { getMockNewOrderData } from "../../clinicalInformation/__test__/newOrderMockContextData";
import { NextOrder } from "../nextOrder.component";
import userEvent from "@testing-library/user-event";

describe("NewOrderFooterButtonGroup", () => {
  afterAll(() => {
    cleanup();
  });

  it("Delete Order Present", () => {
    render(
      <NewOrderFooterButtonGroup
        handleSave
        validateAll
        handleCancelOrder
        handlePrevious={() => {}}
        handleSaveExit={() => {}}
        handleShareOrder={() => {}}
        cancelBtnVisibility={true}
        shareOrderButtonText={"Share Order"}
      />
    );
    const dressingLink = screen.getByTestId("cancelOrderTest");
    expect(dressingLink).toBeInTheDocument();
    expect(dressingLink).toHaveTextContent("Delete order");
  });
  it("Save and exit order Present", () => {
    render(
      <NewOrderFooterButtonGroup
        handleSave
        validateAll
        handleCancelOrder
        handlePrevious={() => {}}
        handleSaveExit={() => {}}
        handleShareOrder={() => {}}
        cancelBtnVisibility={true}
        shareOrderButtonText={"Share Order"}
      />
    );
    const dressingLink = screen.getByTestId("saveExitTest");
    expect(dressingLink).toBeInTheDocument();
    expect(dressingLink).toHaveTextContent("Save & exit");
  });
  it("Save order Present", () => {
    render(
      <NewOrderFooterButtonGroup
        handleSave
        validateAll
        handleCancelOrder
        handlePrevious={() => {}}
        handleSaveExit={() => {}}
        handleShareOrder={() => {}}
        cancelBtnVisibility={true}
        shareOrderButtonText={"Share Order"}
      />
    );
    const dressingLink = screen.getByTestId("SaveOrderTest");
    expect(dressingLink).toBeInTheDocument();
    expect(dressingLink).toHaveTextContent("Save");
  });
  it("Share Order Present", () => {
    render(
      <NewOrderFooterButtonGroup
        handleSave
        validateAll
        handleCancelOrder
        handlePrevious={() => {}}
        handleSaveExit={() => {}}
        handleShareOrder={() => {}}
        cancelBtnVisibility={true}
        shareOrderButtonText={"Share Order"}
      />
    );
    const dressingLink = screen.getByTestId("shareOrderTest");
    expect(dressingLink).toBeInTheDocument();
    expect(dressingLink).toHaveTextContent("Share Order");
  });
  it("Stop Share  Present", () => {
    render(
      <NewOrderFooterButtonGroup
        handleSave
        validateAll
        handleCancelOrder
        handlePrevious={() => {}}
        handleSaveExit={() => {}}
        handleShareOrder={() => {}}
        cancelBtnVisibility={true}
        shareOrderButtonText={"Stop Share"}
      />
    );
    const dressingLink = screen.getByTestId("shareOrderTest");
    expect(dressingLink).toBeInTheDocument();
    expect(dressingLink).toHaveTextContent("Stop Share");
  });
  it("Previous Order Present", () => {
    render(
      <NewOrderFooterButtonGroup
        handleSave
        validateAll
        handleCancelOrder
        handlePrevious={() => {}}
        handleSaveExit={() => {}}
        handleShareOrder={() => {}}
        cancelBtnVisibility={true}
        shareOrderButtonText={"Share Order"}
      />
    );
    const dressingLink = screen.getByTestId("prevOrderTest");
    expect(dressingLink).toBeInTheDocument();
    expect(dressingLink).toHaveTextContent("Previous");
  });
  it("Next Order Present", () => {
    render(
      <NewOrderFooterButtonGroup
        handleSave
        validateAll
        handleCancelOrder
        handlePrevious={() => {}}
        handleSaveExit={() => {}}
        handleShareOrder={() => {}}
        cancelBtnVisibility={true}
        shareOrderButtonText={"Share Order"}
      />
    );
    const dressingLink = screen.getByTestId("nextOrderTest");
    expect(dressingLink).toBeInTheDocument();
    expect(dressingLink).toHaveTextContent("Next");
  });
  it("Error when minimnum field not filled and save & Exit clicked", () => {
    const data = getDeepClone(newOrderTestData);
    const mockSetState = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <NewOrderFooterButtonGroup
          handleCancelOrder={() => {}}
          handlePrevious={() => {}}
          handleSave={() => {}}
          handleSaveExit={() => {}}
          handleShareOrder={() => {}}
          validateAll={() => {}}
          cancelBtnVisibility={true}
          shareOrderButtonText={"Share Order"}
        />
      </MemoryRouter>
    );
    const getSaveExitButton = screen.getByTestId("saveExitTest");
    fireEvent.click(getSaveExitButton);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PatientInformation
          data={data}
          setData={mockSetState}
          phoneTypes={[]}
          states={[]}
          statesText={[]}
        />
      </MemoryRouter>
    );
    const newOrderFirstName = screen.getByTestId(
      "newOrder-First-Name"
    ) as HTMLBaseElement;
    expect(newOrderFirstName).toHaveStyle("color: rgb(25, 118, 210)");
  });

  it("ProgressBar exists in page", () => {
    render(<ProgressBar progressValue={25} pageTitle="Home Order" />);
    const bckBtn = screen.getByTestId("signupBckBtn");
    expect(bckBtn).toBeInTheDocument();
  });

  it("Save & Exit button disable for Review Order page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <NewOrderContext.Provider
          value={{
            ...getMockNewOrderData(),
            newOrderPage: NewOrderPageSection.NEWORDER_REVIEW_ORDER,
          }}
        >
          <NewOrderFooterButtonGroup
            validateAll={() => {}}
            handlePrevious={() => {}}
            handleSaveExit={() => {}}
            handleShareOrder={() => {}}
            handleSave={() => {}}
            handleCancelOrder={() => {}}
            cancelBtnVisibility={true}
            shareOrderButtonText={""}
          />
        </NewOrderContext.Provider>
      </MemoryRouter>
    );
    const result = screen.queryByText("Save & exit");
    expect(result).toBeNull();
  });

  it("Save button disable for Review Order page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <NewOrderContext.Provider
          value={{
            ...getMockNewOrderData(),
            newOrderPage: NewOrderPageSection.NEWORDER_REVIEW_ORDER,
          }}
        >
          <NewOrderFooterButtonGroup
            validateAll={() => {}}
            handlePrevious={() => {}}
            handleSaveExit={() => {}}
            handleShareOrder={() => {}}
            handleSave={() => {}}
            handleCancelOrder={() => {}}
            cancelBtnVisibility={true}
            shareOrderButtonText={""}
          />
        </NewOrderContext.Provider>
      </MemoryRouter>
    );
    const result = screen.queryByText("Save");
    expect(result).toBeNull();
  });
  it("Validate partial order popup", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <NextOrder
          nextOrderOpen={true}
          handlenextPopUp={() => {}}
          setNextOrderOpen={() => {}}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("nextOrder-PopupDesc-Test");
    expect(header).toHaveTextContent(
      "If you choose to submit a partial order now, you will be required to add wound information later.Once the order has been created, please go to the Documents tab in the Order Detail to upload patient wound information & documentation."
    );
  });
  it("next Order Partial Button Present", () => {
    render(
      <NextOrder
        nextOrderOpen={true}
        handlenextPopUp={() => {}}
        setNextOrderOpen={() => {}}
      />
    );
    const dressingLink = screen.getByTestId("nextOrderSubmitBtnTest");
    expect(dressingLink).toBeInTheDocument();
    expect(dressingLink).toHaveTextContent("Confirm Partial Order");
  });
  it("confirm partial order button click action", () => {
    const spyFn = jest.fn();
    render(
      <NextOrder
        nextOrderOpen={true}
        handlenextPopUp={() => {}}
        setNextOrderOpen={spyFn}
      />
    );
    const partialorderbtn = screen.getByTestId("nextOrderSubmitBtnTest");
    expect(partialorderbtn).toBeInTheDocument();
    expect(partialorderbtn).toHaveTextContent(`Confirm Partial Order`);
    userEvent.click(partialorderbtn);
    expect(spyFn).toBeCalledTimes(1);
  });
});
