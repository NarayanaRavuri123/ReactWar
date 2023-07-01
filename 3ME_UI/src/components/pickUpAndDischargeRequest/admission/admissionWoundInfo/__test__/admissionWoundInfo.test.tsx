import { cleanup, render, screen } from "@testing-library/react";
import { AdmissionWoundInfo } from "../admissionWoundInfo.component";
import { defaultDischargeRequestTestData } from "../../../dischargeRequest/__test__/dischargeRequest.test.data";

describe("AdmissionWoundInfo", () => {
  afterAll(() => {
    cleanup();
  });
   
  it("Admission wound info component validate for select yes", () => {
    render(
      <AdmissionWoundInfo
        dischargeData={defaultDischargeRequestTestData}
        setDischargeData={() => {}}
      />
    );
    const title = screen.getByTestId("admissionwoundinfo-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Was the admission related to a wound?*");
    const yesButton = screen.getByTestId(
      "admissionwoundinfo-type-yes"
    ) as HTMLBaseElement;
    expect(yesButton).toBeInTheDocument();
  });
  it("Admission wound info component validate for select no", () => {
    render(
      <AdmissionWoundInfo
        dischargeData={defaultDischargeRequestTestData}
        setDischargeData={() => {}}
      />
    );
    const title = screen.getByTestId("admissionwoundinfo-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Was the admission related to a wound?*");
    const noButton = screen.getByTestId(
      "admissionwoundinfo-type-no"
    ) as HTMLBaseElement;
    expect(noButton).toBeInTheDocument();
  });
});
