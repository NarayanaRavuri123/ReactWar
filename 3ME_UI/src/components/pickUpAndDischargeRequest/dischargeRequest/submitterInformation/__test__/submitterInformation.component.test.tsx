import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { defaultDischargeRequestTestData } from "../../__test__/dischargeRequest.test.data";
import SubmitterInformation from "../submitterInformation.component";
import Moment from "moment";
import { SubmitterInformationReview } from "../submitterInformationReview/submitterInformation.review.component";
import { PickUpRequestContext } from "../../../../../context/PickUpRequestContext";
import { DischargeRequestContext } from "../../../../../context/DischargeRequestContext";
import { MemoryRouter } from "react-router";
import { getMockDischargeRequestContextData } from "../../__test__/mockDischargeRequestContext";
import { getMockPickUpRequestContextData } from "../../../pickUpRequest/__test__/mockPickUpRequestContext";
import { defaultDischargeRequestData } from "../../dischargeRequest.model";

describe("Pick Up Request component ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Submitter Information Title", () => {
    render(
      <SubmitterInformation
        dischargeData={defaultDischargeRequestTestData}
        setDischargeData={() => {}}
      />
    );
    const title = screen.getByTestId("submitterinfo-header");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Submitter Information");
  });

  it("Submitter Information Desp", () => {
    render(
      <SubmitterInformation
        dischargeData={defaultDischargeRequestTestData}
        setDischargeData={() => {}}
      />
    );
    const title = screen.getByTestId("submitterinfo-desp");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      `Your invoice will reflect billing through ${Moment(new Date()).format(
        "L"
      )}`
    );
  });

  it("Submitter Information Validate FirstName", () => {
    render(
      <SubmitterInformation
        dischargeData={defaultDischargeRequestTestData}
        setDischargeData={() => {}}
      />
    );
    const FirstName = screen.getByTestId("submitterinfo-First-Name");
    expect(FirstName).toBeInTheDocument();
    expect(FirstName).toHaveTextContent("First Name");
  });

  it("Submitter Information Validate Last-Name", () => {
    render(
      <SubmitterInformation
        dischargeData={defaultDischargeRequestTestData}
        setDischargeData={() => {}}
      />
    );
    const FirstName = screen.getByTestId("submitterinfo-Last-Name");
    expect(FirstName).toBeInTheDocument();
    expect(FirstName).toHaveTextContent("Last Name");
  });

  it("Submitter Information Validate Title", () => {
    render(
      <SubmitterInformation
        dischargeData={defaultDischargeRequestTestData}
        setDischargeData={() => {}}
      />
    );
    const Title = screen.getByTestId("submitterinfo-Submitter-Title");
    expect(Title).toBeInTheDocument();
    expect(Title).toHaveTextContent("Title");
  });
  it("Submitter review page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DischargeRequestContext.Provider
          value={{
            ...getMockDischargeRequestContextData(),
          }}
        >
          <PickUpRequestContext.Provider
            value={{
              ...getMockPickUpRequestContextData(),
            }}
          >
            <SubmitterInformationReview
              discharge={defaultDischargeRequestData}
            />
          </PickUpRequestContext.Provider>
        </DischargeRequestContext.Provider>
      </MemoryRouter>
    );
    const Title = screen.getByTestId("title-submitter");
    expect(Title).toBeInTheDocument();
    expect(Title).toHaveTextContent("Submitter Information");
    const submitterName = screen.getByTestId("submitter-name");
    expect(submitterName).toBeInTheDocument();
    expect(submitterName).toHaveTextContent("Submitter Name");
    const submitterNumber = screen.getByTestId("submitter-number");
    expect(submitterNumber).toBeInTheDocument();
    expect(submitterNumber).toHaveTextContent("Phone Number");
    const title = screen.getByTestId("Title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Title");
    const employer = screen.getByTestId("employer");
    expect(employer).toBeInTheDocument();
    expect(employer).toHaveTextContent("Employer");
  });

  it("Submitter review page Edit Button Present", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <DischargeRequestContext.Provider
          value={{
            ...getMockDischargeRequestContextData(),
          }}
        >
          <PickUpRequestContext.Provider
            value={{
              ...getMockPickUpRequestContextData(),
            }}
          >
            <SubmitterInformationReview
              discharge={defaultDischargeRequestData}
              dischargeRequestEditBtnClick={() => {}}
            />
          </PickUpRequestContext.Provider>
        </DischargeRequestContext.Provider>
      </MemoryRouter>
    );
    const Title = screen.getByTestId("review-submitter-edit-test");
    expect(Title).toBeInTheDocument();
    expect(fireEvent.click(Title)).toBe(true);
  });
});
