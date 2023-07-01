import { cleanup, render, screen } from "@testing-library/react";
import { AdmissionScheduleInfo } from "../admissionScheduleInfo.component";
import { defaultDischargeRequestTestData } from "../../../dischargeRequest/__test__/dischargeRequest.test.data";

describe("AdmissionScheduleInfo", () => {
  afterAll(() => {
    cleanup();
  });
  
  it("Admission schedule info component validate for select yes", () => {
    render(
      <AdmissionScheduleInfo
        dischargeData={defaultDischargeRequestTestData}
        setDischargeData={() => {}}
      />
    );
    const title = screen.getByTestId("admissionscheduleinfo-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Was the admission scheduled or unscheduled?*"
    );
    const yesButton = screen.getByTestId(
      "admissionscheduleinfo-type-yes"
    ) as HTMLBaseElement;
    expect(yesButton).toBeInTheDocument();
  });
  it("Admission schedule info component validate for select no", () => {
    render(
      <AdmissionScheduleInfo
        dischargeData={defaultDischargeRequestTestData}
        setDischargeData={() => {}}
      />
    );
    const title = screen.getByTestId("admissionscheduleinfo-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Was the admission scheduled or unscheduled?*"
    );
    const noButton = screen.getByTestId(
      "admissionscheduleinfo-type-no"
    ) as HTMLBaseElement;
    expect(noButton).toBeInTheDocument();
  });
   
});
