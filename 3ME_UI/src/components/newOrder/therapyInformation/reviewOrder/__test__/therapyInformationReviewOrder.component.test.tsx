import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { newOrderTestData } from "../../../__test__/newOrder.test.data";
import { TherapyInformationReviewOrder } from "../therapyInformationReviewOrder.component";

describe("Therapy information address review order component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Therapy information review order component validate header", () => {
    const data = getDeepClone(newOrderTestData);
    const editBtnAction = jest.fn();
    render(
      <TherapyInformationReviewOrder
        data={data}
        editButtonClicked={editBtnAction}
        therapyGoals={[]}
        therapyLengths={[]}
      />
    );
    const title = screen.getByTestId("therapy-information-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Therapy Information");
    const editBtn = screen.getByTestId(
      "therapy-information-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Therapy information review order component validate length of therapy", () => {
    const data = getDeepClone(newOrderTestData);
    data.lengthOfTherapy.value = "1 Week";
    render(
      <TherapyInformationReviewOrder
        data={data}
        editButtonClicked={jest.fn()}
        therapyGoals={[]}
        therapyLengths={[]}
      />
    );
    const title = screen.getByTestId("lengthOfTherapy");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Length of Therapy");
    const value1 = screen.getByTestId("lengthOfTherapy-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("1 Week");
  });

  it("Therapy information review order component validate gaol of therapy", () => {
    const data = getDeepClone(newOrderTestData);
    data.goalOfTherapy.value = "Flap";
    render(
      <TherapyInformationReviewOrder
        data={data}
        editButtonClicked={jest.fn()}
        therapyGoals={[]}
        therapyLengths={[]}
      />
    );
    const title = screen.getByTestId("goalOfTherapy");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Goal of Therapy");
    const value1 = screen.getByTestId("goalOfTherapy-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("Flap");
  });

  it("Therapy information review order component validate prescription type as Fax in Later", () => {
    const data = getDeepClone(newOrderTestData);
    data.submitPrescription.value = "Fax";
    render(
      <TherapyInformationReviewOrder
        data={data}
        editButtonClicked={jest.fn()}
        therapyGoals={[]}
        therapyLengths={[]}
      />
    );
    const title = screen.getByTestId("submitPrescription");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Prescription Type");
    const value1 = screen.getByTestId("submitPrescription-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("Fax in Later");
  });

  it("Therapy information review order component validate prescription type as Rx Upload", () => {
    const data = getDeepClone(newOrderTestData);
    data.submitPrescription.value = "RxImage";
    render(
      <TherapyInformationReviewOrder
        data={data}
        editButtonClicked={jest.fn()}
        therapyGoals={[]}
        therapyLengths={[]}
      />
    );
    const title = screen.getByTestId("submitPrescription");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Prescription Type");
    const value1 = screen.getByTestId("submitPrescription-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("Rx Upload");
  });

  it("Therapy information review order component validate prescription type as Rx Upload", () => {
    const data = getDeepClone(newOrderTestData);
    data.submitPrescription.value = "EPrescription";
    render(
      <TherapyInformationReviewOrder
        data={data}
        editButtonClicked={jest.fn()}
        therapyGoals={[]}
        therapyLengths={[]}
      />
    );
    const title = screen.getByTestId("submitPrescription");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Prescription Type");
    const value1 = screen.getByTestId("submitPrescription-value");
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("E-Prescription");
  });
});
