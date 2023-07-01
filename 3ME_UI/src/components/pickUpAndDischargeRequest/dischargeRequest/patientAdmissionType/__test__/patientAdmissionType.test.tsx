import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { PatientAdmissionType } from "../patientAdmissionType.component";
import { defaultDischargeRequestTestData } from "../../../dischargeRequest/__test__/dischargeRequest.test.data";
import { IDischargeRequest } from "../../../dischargeRequest/dischargeRequest.interface";
import { DischargeRequestContext } from "../../../../../context/DischargeRequestContext";
import { getMockDischargeRequestContextData } from "../../../dischargeRequest/__test__/mockDischargeRequestContext";
import { DischargeRequestValidator } from "../../../dischargeRequest/dischargeRequest.validator";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { PatientAdmissionTypeReview } from "../patientAdmissionTypeReview/patientAdmissionType.review.component";
import { PickUpRequestContext } from "../../../../../context/PickUpRequestContext";
import { getMockPickUpRequestContextData } from "../../../pickUpRequest/__test__/mockPickUpRequestContext";

describe("PatientAdmissionType", () => {
  afterAll(() => {
    cleanup();
  });
  it("Patient Admission Type validate Title", () => {
    render(
      <PatientAdmissionType
        dischargeData={defaultDischargeRequestTestData}
        setDischargeData={() => {}}
      />
    );
    const title = screen.getByTestId("patientadmissiontype-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Admission or Readmission to Higher Level of Care"
    );
  });
  it("Patient Admission Type component validate for select yes", () => {
    render(
      <PatientAdmissionType
        dischargeData={defaultDischargeRequestTestData}
        setDischargeData={() => {}}
      />
    );
    const title = screen.getByTestId("patientadmissiontype-higherlevel-care");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Was the patient admitted to a higher level of care?*"
    );
    const yesButton = screen.getByTestId(
      "patientadmissiontype-higherlevel-care-yes"
    ) as HTMLBaseElement;
    expect(yesButton).toBeInTheDocument();
  });
  it("Patient Admission Type component for select yes and validate", () => {
    const Validator = new DischargeRequestValidator();
    let data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IDischargeRequest) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DischargeRequestContext.Provider
        value={{
          ...getMockDischargeRequestContextData(),
          patientAdmissionTypeActive: true,
        }}
      >
        <PatientAdmissionType
          dischargeData={data}
          setDischargeData={mockSetState}
        />
      </DischargeRequestContext.Provider>
    );
    const yesButton = screen.getByTestId(
      "patientadmissioninfo-type-yes"
    ) as HTMLBaseElement;
    expect(yesButton).toBeInTheDocument();
    const noButton = screen.getByTestId(
      "patientadmissioninfo-type-no"
    ) as HTMLBaseElement;
    expect(noButton).toBeInTheDocument();
    const facilitytype = screen.getByTestId("test-facilitytype");
    expect(facilitytype).toBeInTheDocument();
    const admissionscheduleinfo = screen.getByTestId(
      "admissionscheduleinfo-type"
    );
    expect(admissionscheduleinfo).toBeInTheDocument();
    const admissionwoundinfo = screen.getByTestId("admissionwoundinfo-type");
    expect(admissionwoundinfo).toBeInTheDocument();
  });
  it("Patient Admission Type component for select no and validate", () => {
    const Validator = new DischargeRequestValidator();
    let data = getDeepClone(defaultDischargeRequestTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IDischargeRequest) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <DischargeRequestContext.Provider
        value={{
          ...getMockDischargeRequestContextData(),
          patientAdmissionTypeActive: true,
        }}
      >
        <PatientAdmissionType
          dischargeData={data}
          setDischargeData={mockSetState}
        />
      </DischargeRequestContext.Provider>
    );
    const patientadmissioninfo = screen.queryByText(
      "patientadmissioninfo-type"
    );
    expect(patientadmissioninfo).not.toBeInTheDocument();
    const facilitytype = screen.queryByText("test-facilitytype");
    expect(facilitytype).not.toBeInTheDocument();
    const admissionscheduleinfo = screen.queryByText(
      "admissionscheduleinfo-type"
    );
    expect(admissionscheduleinfo).not.toBeInTheDocument();
    const admissionwoundinfo = screen.queryByText("admissionwoundinfo-type");
    expect(admissionwoundinfo).not.toBeInTheDocument();
  });
  it("Patient Review Admission Type validate Title", () => {
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <DischargeRequestContext.Provider
          value={{
            ...getMockDischargeRequestContextData(),
          }}
        >
          <PatientAdmissionTypeReview />
        </DischargeRequestContext.Provider>
      </PickUpRequestContext.Provider>
    );
    const title = screen.getByTestId("admission-type-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Admisson or Readmission to Higher level of Care"
    );
    const patient = screen.getByTestId("review-admisson-info");
    expect(patient).toBeInTheDocument();
    expect(patient).toHaveTextContent(
      "Was the patient admitted to higher level of care?"
    );
    expect(patient).toHaveTextContent(
      "Was this a first admission or readmission?"
    );
    const facility = screen.getByTestId("facility-info");
    expect(facility).toBeInTheDocument();
    expect(facility).toHaveTextContent("Facility type admitted to");
    expect(facility).toHaveTextContent("Facility Name");
    const woundRelatedAdmisson = screen.getByTestId("review-woundadmission");
    expect(woundRelatedAdmisson).toBeInTheDocument();
    expect(woundRelatedAdmisson).toHaveTextContent(
      "Was the admission scheduled or unscheduled?"
    );
    expect(woundRelatedAdmisson).toHaveTextContent(
      "Was the admission related to a wound?"
    );
  });

  it("Patient Review Admission Type Dit button clicked", () => {
    render(
      <PickUpRequestContext.Provider
        value={{
          ...getMockPickUpRequestContextData(),
        }}
      >
        <DischargeRequestContext.Provider
          value={{
            ...getMockDischargeRequestContextData(),
          }}
        >
          <PatientAdmissionTypeReview dischargeRequestEditBtnClick={() => {}} />
        </DischargeRequestContext.Provider>
      </PickUpRequestContext.Provider>
    );
    const Title = screen.getByTestId("review-submitter-edit-test");
    expect(Title).toBeInTheDocument();
    expect(fireEvent.click(Title)).toBe(true);
  });
});
