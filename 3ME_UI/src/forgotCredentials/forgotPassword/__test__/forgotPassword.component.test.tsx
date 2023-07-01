import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ForgotCredentialContainer from "../../forgotCredentialContainer/forgotCredentialContainer.component";
import { containerPageType } from "../../forgotCredentialContainer/pageType.enum";
import ForgotPassword from "../forgotPassword.component";
import { ForgotPasswordOption } from "../forgotPasswordContainer/forgotCredentialPages.enum";

describe("Validate Forgot password UI ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Validate Forgot Credential Container", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ForgotCredentialContainer
          pageType={containerPageType.CONFIRMATION_PAGE}
        >
          <span>Test</span>
        </ForgotCredentialContainer>
      </MemoryRouter>
    );
    const getTextExpress = screen.getByText("Express");
    expect(getTextExpress).toBeInTheDocument();
  });

  it("Validate Forgot Password Component", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ForgotPassword
          errorMessage=""
          preferedOption={ForgotPasswordOption.NONE}
          resetPasswordAction={() => {}}
          setErrorMessage={() => {}}
          setPreferedOption={() => {}}
        />
      </MemoryRouter>
    );
    const getTextExpress = screen.getByText("Express");
    expect(getTextExpress).toBeInTheDocument();
  });

  it("Validate entered user Name with wrong userName", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ForgotPassword
          errorMessage=""
          preferedOption={ForgotPasswordOption.NONE}
          resetPasswordAction={() => {}}
          setErrorMessage={() => {}}
          setPreferedOption={() => {}}
        />
      </MemoryRouter>
    );
    const userName2Reset = screen.getByTestId("userNamey") as HTMLBaseElement;
    expect(userName2Reset).toBeInTheDocument();
    userEvent.type(userName2Reset, "123!!!");
    expect(userName2Reset).toHaveValue("123!!!");
    const ele3 = screen.getByTestId("userNameyLabel") as HTMLBaseElement;
    expect(ele3).toHaveStyle("color: rgb(211, 47, 47)");
  });

  it("Validate entered user Name with proper userName", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ForgotPassword
          errorMessage=""
          preferedOption={ForgotPasswordOption.NONE}
          resetPasswordAction={() => {}}
          setErrorMessage={() => {}}
          setPreferedOption={() => {}}
        />
      </MemoryRouter>
    );
    const userName2Reset = screen.getByTestId("userNamey") as HTMLBaseElement;
    expect(userName2Reset).toBeInTheDocument();
    userEvent.type(userName2Reset, "123@.-+_Aa");
    expect(userName2Reset).toHaveValue("123@.-+_Aa");
    const ele3 = screen.getByTestId("userNameyLabel") as HTMLBaseElement;
    expect(ele3).toHaveStyle("color: rgb(25, 118, 210)");
  });
});
