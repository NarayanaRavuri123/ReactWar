import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { TherapyOutcomes } from "../therapyOutcomes.component";
import { defaultDischargeRequestTestData } from "../../__test__/dischargeRequest.test.data";
import { getMockDischargeRequestContextData } from "../../__test__/mockDischargeRequestContext";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import userEvent from "@testing-library/user-event";
import { DischargeRequestContext } from "../../../../../context/DischargeRequestContext";
import { TherapyOutcomeReview } from "../therapyOutcomesReview/therapyOutcomes.review.component";
import { MemoryRouter } from "react-router";
import { getMockPickUpRequestContextData } from "../../../pickUpRequest/__test__/mockPickUpRequestContext";
import { PickUpRequestContext } from "../../../../../context/PickUpRequestContext";
describe("PatientAdmissionType", () => {
  afterAll(() => {
    cleanup();
  });
  it("therapy goal header ", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <TherapyOutcomes dischargeData={data} setDischargeData={mockSetState} />
    );
    const header = screen.getByTestId("therapyoutcome-title");
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(
      "Please select the Therapy Outcome(s) applicable"
    );
  });
  it("therapy goal achieved  title ", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <TherapyOutcomes dischargeData={data} setDischargeData={mockSetState} />
    );
    const title = screen.getByTestId("therapygoalachieved");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Therapy Goal Achieved");
  });
  it("therapy outcome achieved checkbox", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <TherapyOutcomes dischargeData={data} setDischargeData={mockSetState} />
    );
    const checkbox1 = screen.getByTestId(
      "Adequate granulation tissue formation"
    );
    expect(checkbox1).toBeInTheDocument();
    userEvent.click(checkbox1);
    expect(mockSetState).toHaveBeenCalled();
    const checkbox2 = screen.getByTestId("Flap");
    expect(checkbox2).toBeInTheDocument();
    userEvent.click(checkbox2);
    expect(mockSetState).toHaveBeenCalled();
    const checkbox3 = screen.getByTestId("Graft");
    expect(checkbox3).toBeInTheDocument();
    userEvent.click(checkbox3);
    expect(mockSetState).toHaveBeenCalled();
    const checkbox4 = screen.getByTestId("Delayed primary closure");
    expect(checkbox4).toBeInTheDocument();
    userEvent.click(checkbox4);
    expect(mockSetState).toHaveBeenCalled();
    const checkbox5 = screen.getByTestId("Wound sutured closed");
    expect(checkbox5).toBeInTheDocument();
    userEvent.click(checkbox5);
    expect(mockSetState).toHaveBeenCalled();
  });
  it("therapy goal not achieved  title ", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <TherapyOutcomes dischargeData={data} setDischargeData={mockSetState} />
    );
    const title = screen.getByTestId("therapygoalnotachieved");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Therapy Goal Not Achieved");
  });
  it("therapy goal not achieved checkbox", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    render(
      <TherapyOutcomes dischargeData={data} setDischargeData={mockSetState} />
    );
    const checkbox1 = screen.getByTestId("Non compliance");
    expect(checkbox1).toBeInTheDocument();
    userEvent.click(checkbox1);
    expect(mockSetState).toHaveBeenCalled();
    const checkbox2 = screen.getByTestId("Coverage criteria");
    expect(checkbox2).toBeInTheDocument();
    userEvent.click(checkbox2);
    expect(mockSetState).toHaveBeenCalled();
    const checkbox3 = screen.getByTestId("Drape sensitivity");
    expect(checkbox3).toBeInTheDocument();
    userEvent.click(checkbox3);
    expect(mockSetState).toHaveBeenCalled();
    const checkbox4 = screen.getByTestId("Unmanaged pain");
    expect(checkbox4).toBeInTheDocument();
    userEvent.click(checkbox4);
    expect(mockSetState).toHaveBeenCalled();
    const checkbox5 = screen.getByTestId("Wound infection");
    expect(checkbox5).toBeInTheDocument();
    userEvent.click(checkbox5);
    expect(mockSetState).toHaveBeenCalled();
    const checkbox6 = screen.getByTestId("Wound not responding");
    expect(checkbox6).toBeInTheDocument();
    userEvent.click(checkbox6);
    expect(mockSetState).toHaveBeenCalled();
  });
  it("Patient died button", () => {
    const patientDiedfuntion = jest.fn();
    render(
      <DischargeRequestContext.Provider
        value={{
          ...getMockDischargeRequestContextData(),
        }}
      >
        <TherapyOutcomes
          dischargeData={defaultDischargeRequestTestData}
          setDischargeData={patientDiedfuntion}
        />
      </DischargeRequestContext.Provider>
    );
    const title = screen.getByTestId("therapy-type-patient-died");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Did the patient expire?");
    const yesButton = screen.getByTestId(
      "therapy-type-patient-died-yes"
    ) as HTMLBaseElement;
    expect(yesButton).toBeInTheDocument();
    userEvent.click(yesButton);
    expect(patientDiedfuntion).toBeCalledTimes(1);
    const noButton = screen.getByTestId(
      "therapy-type-patient-died-no"
    ) as HTMLBaseElement;
    userEvent.click(noButton);
    expect(patientDiedfuntion).toBeCalledTimes(2);
    expect(noButton).toBeInTheDocument();
  });
  it("review therapy goal header", () => {
    const data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
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
            <TherapyOutcomeReview />
          </PickUpRequestContext.Provider>
        </DischargeRequestContext.Provider>
      </MemoryRouter>
    );
    const Title = screen.getByTestId("review-therapy");
    expect(Title).toBeInTheDocument();
    expect(Title).toHaveTextContent("Therapy Outcomes Applicable");
    const subTitle = screen.getByTestId("review-therapy-info");
    expect(subTitle).toBeInTheDocument();
    expect(subTitle).toHaveTextContent("Therapy Goal Achieved");
    expect(subTitle).toHaveTextContent("Therapy Goal Not Achieved");
    expect(subTitle).toHaveTextContent("Did the patient expire?");
  });

  it("Therapy outcome Edit Button Present", () => {
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
            <TherapyOutcomeReview dischargeRequestEditBtnClick={() => {}} />
          </PickUpRequestContext.Provider>
        </DischargeRequestContext.Provider>
      </MemoryRouter>
    );
    const Title = screen.getByTestId("review-therapy-edit-test");
    expect(Title).toBeInTheDocument();
    expect(fireEvent.click(Title)).toBe(true);
  });
});
