import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import CodeVerification from "../codeVerification.component";
import { getDeepClone } from "../../../util/ObjectFunctions";
import { defaultForgotPassordInfoData } from "../../forgotPassword/forgotPasswordContainer/forgotCredential.model";

describe("Validate code verification page for Forgot password UI ->", () => {
  afterAll(() => {
    cleanup();
  });
  it("Validate Forgot Credential Container", () => {
    const data = getDeepClone(defaultForgotPassordInfoData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CodeVerification
          data={data}
          setData={() => {}}
          errorMessage=""
          backButtonAction={() => {}}
          resendCodeAction={() => {}}
          verifyCodeAction={() => {}}
        />
      </MemoryRouter>
    );
    const getTextSent = screen.getByTestId("sent");
    expect(getTextSent).toBeInTheDocument();
  });
  it("Validate wrongly entered code", () => {
    const data = getDeepClone(defaultForgotPassordInfoData);
    render(
      <MemoryRouter initialEntries={["/"]}>
        <CodeVerification
          data={data}
          setData={() => {}}
          errorMessage=""
          backButtonAction={() => {}}
          resendCodeAction={() => {}}
          verifyCodeAction={() => {}}
        />
      </MemoryRouter>
    );
    const verificationCode = screen.getByTestId("code") as HTMLBaseElement;
    expect(verificationCode).toBeInTheDocument();
    userEvent.type(verificationCode, "123!!!");
    expect(verificationCode).toHaveValue("123!!!");
    const codelabel = screen.getByTestId("codeLabel") as HTMLBaseElement;
    expect(codelabel).toHaveStyle("color: rgb(211, 47, 47)");
  });

  it("Validate correctly entered code", () => {
    const data = getDeepClone(defaultForgotPassordInfoData);

    render(
      <MemoryRouter initialEntries={["/"]}>
        <CodeVerification
          data={data}
          setData={() => {}}
          errorMessage=""
          backButtonAction={() => {}}
          resendCodeAction={() => {}}
          verifyCodeAction={() => {}}
        />
      </MemoryRouter>
    );
    const verificationCode = screen.getByTestId("code") as HTMLBaseElement;
    expect(verificationCode).toBeInTheDocument();
    userEvent.type(verificationCode, "123456");
    expect(verificationCode).toHaveValue("123456");
    const codelabel = screen.getByTestId("codeLabel") as HTMLBaseElement;
    expect(codelabel).toHaveStyle("color: rgb(25, 118, 210)");
  });
});
