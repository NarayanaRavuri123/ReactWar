import React from "react";
import userEvent from "@testing-library/user-event";
import ContactInfoEdit from "../contactInfoEdit.component";
import { cleanup, render, screen } from "@testing-library/react";
import { ManageProfileValidator } from "../../../manageProfile.validator";
import { profileTestData } from "../../../__test__/manageProfile.test.data";
import { IManageProfile } from "../../../manageProfile.interface";
import { ValidationStatus } from "../../../../../core/interfaces/input.interface";

describe("Manage Profile contact information  Edit->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate Contact information  Edit section", async () => {
    render(<ContactInfoEdit data={profileTestData} setData={() => {}} />);
    const contactInfoTitle = screen.getByTestId("phone-number-mp");
    expect(contactInfoTitle).toBeInTheDocument();
  });

  it("Enter extension number", async () => {
    const Validator = new ManageProfileValidator();
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: IManageProfile) => [dt, mockSetState],
    }));
    let newData = profileTestData;
    newData.phoneType = { value: "phone", valid: ValidationStatus.VALID };
    render(
      <ContactInfoEdit
        data={profileTestData}
        setData={mockSetState}
        Validator={Validator}
      />
    );
    const title = screen.getByTestId("extensionlabel-mp-test");
    expect(title).toHaveTextContent("Extension");
    const extensionValue = screen.getByTestId(
      "extension-mp-test"
    ) as HTMLBaseElement;
    expect(extensionValue).toBeInTheDocument();
    userEvent.type(extensionValue, "1234");
    expect(mockSetState).toBeCalledTimes(4);
  });
});
