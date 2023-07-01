import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactOptions from "../contactOptions.component";
import { profileTestData } from "../../../components/manageProfile/__test__/manageProfile.test.data";

describe("communication preference component ->", () => {
  const chkboxmocFn = jest.fn(() => {});
  afterEach(() => {
    cleanup();
  });
  beforeEach(() => {
    chkboxmocFn.mockClear();
  });
  it("initial render", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ContactOptions
          data={profileTestData}
          emailChecked={false}
          onAcceptTncClick={chkboxmocFn}
          onEmailCheckboxClick={chkboxmocFn}
          onSmsCheckboxClick={chkboxmocFn}
          smsChecked={false}
          tncAcceptChecked={false}
          tncAcceptDisabled={true}
          toTncPath={"/"}
          headerLabel={"Communication preferences"}
          emailCheckboxLabel={"Email"}
          smsCheckboxLabel={"SMS"}
          tncAcceptLabel={"Accept Terms $ Conditions"}
          tncDisclaimerLabel={"You are agreeing to our conditions"}
          smsDisabled={false}
          setIsTnCOpen={jest.fn()}
        />
      </MemoryRouter>
    );
    expect(within(screen.getByText("Communication preferences"))).toBeTruthy();
    expect(within(screen.getByText("Email"))).toBeTruthy();
    expect(within(screen.getByText("SMS"))).toBeTruthy();
    expect(within(screen.getByText("Accept Terms $ Conditions"))).toBeTruthy();
    expect(
      within(screen.getByText("You are agreeing to our conditions"))
    ).toBeTruthy();
  });
  it("functions are called", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ContactOptions
          data={profileTestData}
          emailChecked={false}
          onAcceptTncClick={() => {}}
          onEmailCheckboxClick={chkboxmocFn}
          onSmsCheckboxClick={() => {}}
          smsChecked={false}
          tncAcceptChecked={false}
          tncAcceptDisabled={true}
          toTncPath={"/"}
          headerLabel={"Communication preferences"}
          emailCheckboxLabel={"Email"}
          smsCheckboxLabel={"SMS"}
          tncAcceptLabel={"Accept Terms $ Conditions"}
          tncDisclaimerLabel={"You are agreeing to our conditions"}
          smsDisabled={false}
          setIsTnCOpen={jest.fn()}
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId("email-checkbox"));
    expect(chkboxmocFn).toHaveBeenCalled();
    fireEvent.click(screen.getByTestId("sms-checkbox"));
    expect(chkboxmocFn).toHaveBeenCalled();
    fireEvent.click(screen.getByTestId("tnc-checkbox"));
    expect(chkboxmocFn).toHaveBeenCalled();
    expect(screen.getByTestId("tnc-checkbox")).toHaveClass("Mui-disabled");
  });
});
