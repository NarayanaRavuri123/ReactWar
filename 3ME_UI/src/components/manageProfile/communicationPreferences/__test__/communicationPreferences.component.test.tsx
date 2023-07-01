import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { profileTestData } from "../../__test__/manageProfile.test.data";

import CommunicationPreferences from "../communicationPrefrences.component";

describe("communication preference component ->", () => {
  afterEach(() => {
    cleanup();
  });
  it("initial render", () => {
    const mockFn = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CommunicationPreferences
          data={profileTestData}
          emailChecked={false}
          onAcceptTncClick={mockFn}
          onEmailCheckboxClick={mockFn}
          onSmsCheckboxClick={mockFn}
          smsCheckboxDisabled={false}
          smsChecked={false}
          tncAcceptChecked={false}
          tncAcceptDisabled={true}
          toTncPath={"/"}
          setIsTnCOpen={mockFn}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("Communication preferences")).toBeTruthy();
  });
});
