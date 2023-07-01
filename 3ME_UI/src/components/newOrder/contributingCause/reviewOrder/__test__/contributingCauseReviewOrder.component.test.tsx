import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { newOrderTestData } from "../../../__test__/newOrder.test.data";
import { ContributingCauseReviewOrder } from "../contributingCauseReviewOrder.component";

describe("Contributing cause review order component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Contributing Cause validate header", () => {
    const data = getDeepClone(newOrderTestData);
    const editBtnAction = jest.fn();
    render(
      <ContributingCauseReviewOrder
        accidentTypes={[]}
        data={data}
        editButtonClicked={editBtnAction}
      />
    );
    const title = screen.getByTestId("contributin-cause-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Contributing Cause");
    const editBtn = screen.getByTestId(
      "contributin-cause-review-order-edit-button"
    );
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Contributing cause review order component validate for select yes", () => {
    const data = getDeepClone(newOrderTestData);
    data.contributingCause.value = "yes";
    render(
      <ContributingCauseReviewOrder
        accidentTypes={[]}
        data={data}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("is-wound-direct-result-of-accident");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Is the wound a direct result of an accident?"
    );
    const value = screen.getByTestId(
      "is-wound-direct-result-of-accident-value"
    );
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Yes");
  });

  it("Contributing cause review order component validate for select no", () => {
    let data = getDeepClone(newOrderTestData);
    data.contributingCause.value = "no";
    render(
      <ContributingCauseReviewOrder
        accidentTypes={[]}
        data={data}
        editButtonClicked={jest.fn()}
      />
    );
    const title = screen.getByTestId("is-wound-direct-result-of-accident");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Is the wound a direct result of an accident?"
    );
    const value = screen.getByTestId(
      "is-wound-direct-result-of-accident-value"
    );
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("No");
  });

  it("Contributing cause review order component validate for select yes and validate date", () => {
    let data = getDeepClone(newOrderTestData);
    data.contributingCause.value = "yes";
    data.dateOfAccident.value = "12/19/2022";

    render(
      <ContributingCauseReviewOrder
        accidentTypes={[]}
        data={data}
        editButtonClicked={jest.fn()}
      />
    );
    const title1 = screen.getByTestId("is-wound-direct-result-of-accident");
    expect(title1).toBeInTheDocument();
    expect(title1).toHaveTextContent(
      "Is the wound a direct result of an accident?"
    );
    const value1 = screen.getByTestId(
      "is-wound-direct-result-of-accident-value"
    );
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("Yes");

    const title2 = screen.getByTestId("date-of-accident");
    expect(title2).toBeInTheDocument();
    expect(title2).toHaveTextContent("Date of Accident");
    const value2 = screen.getByTestId("date-of-accident-value");
    expect(value2).toBeInTheDocument();
    expect(value2).toHaveTextContent("12/19/2022");
  });

  it("Contributing cause review order component validate for select yes and validate date", () => {
    let data = getDeepClone(newOrderTestData);
    data.contributingCause.value = "yes";
    data.accidentType.value = "Test";

    render(
      <ContributingCauseReviewOrder
        accidentTypes={[]}
        data={data}
        editButtonClicked={jest.fn()}
      />
    );
    const title1 = screen.getByTestId("is-wound-direct-result-of-accident");
    expect(title1).toBeInTheDocument();
    expect(title1).toHaveTextContent(
      "Is the wound a direct result of an accident?"
    );
    const value1 = screen.getByTestId(
      "is-wound-direct-result-of-accident-value"
    );
    expect(value1).toBeInTheDocument();
    expect(value1).toHaveTextContent("Yes");

    const title2 = screen.getByTestId("accident-type");
    expect(title2).toBeInTheDocument();
    expect(title2).toHaveTextContent("Accident Type");
    const value2 = screen.getByTestId("accident-type-value");
    expect(value2).toBeInTheDocument();
    expect(value2).toHaveTextContent("Test");
  });
});
