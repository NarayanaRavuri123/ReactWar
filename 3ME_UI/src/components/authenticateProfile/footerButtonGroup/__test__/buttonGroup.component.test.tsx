import { MemoryRouter } from "react-router-dom";
import { cleanup, render, screen } from "@testing-library/react";
import { FooterButtonGroup } from "../footerButtonGroup.component";
import { IManageProfile } from "../../../manageProfile/manageProfile.interface";
import { ManageProfileValidator } from "../../../manageProfile/manageProfile.validator";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

describe("Footer button group ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Validate next prev button", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITEKEY ?? ""}
        >
          <FooterButtonGroup
            pathType="manageprofile"
            button1Text="Back"
            button2Text="Next"
            data={{} as IManageProfile}
            toPath="/signin"
            Validator={new ManageProfileValidator()}
            setData={() => {}}
            setProgbarVal={() => {}}
          />
        </GoogleReCaptchaProvider>
      </MemoryRouter>
    );

    const nextBtn = screen.getByText("Next");
    expect(nextBtn).toBeInTheDocument();
    const bckBtn = screen.getByText("Back");
    expect(bckBtn).toBeInTheDocument();
  });
});
