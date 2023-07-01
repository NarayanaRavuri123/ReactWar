import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import ChangeEPrescription from "../changeEPrescription.component";
import {
  IPrescriberDetailInterface,
  defaultPrescriberDetail,
} from "../../../missingRxEPrescription/prescriberDetail.interface";

describe("Missing RX change type e-precription->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Verify prescriber in review mode component rendered or not", () => {
    const data: IPrescriberDetailInterface = defaultPrescriberDetail;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeEPrescription
          showErrorMessage={false}
          changePopUpSection={() => {}}
          editPrescriberMode={false}
          setEditPrescriberMode={() => {}}
          prescriberDetails={data}
          setPrescriberDetails={() => {}}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("prescriber-review-mode");
    expect(header).toBeInTheDocument();
  });

  it("Verify error message for prescriber in review mode", () => {
    const data: IPrescriberDetailInterface = defaultPrescriberDetail;
    data.prescriberName.value = "Rahul Patil";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeEPrescription
          showErrorMessage={true}
          changePopUpSection={() => {}}
          editPrescriberMode={false}
          setEditPrescriberMode={() => {}}
          prescriberDetails={data}
          setPrescriberDetails={() => {}}
        />
      </MemoryRouter>
    );
    const errorMessage = screen.getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(
      "This email address has been rejected. Please change the prescription type or call 1-800-275-4524 ext 41858 for help."
    );
    const editButton = screen.queryByText("edit");
    expect(editButton).not.toBeInTheDocument();
    const resendButton = screen.queryByText("resend");
    expect(resendButton).not.toBeInTheDocument();
  });

  it("Verify prescriber name for prescriber in review mode", () => {
    const data: IPrescriberDetailInterface = defaultPrescriberDetail;
    data.prescriberName.value = "Rahul Patil";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeEPrescription
          showErrorMessage={false}
          changePopUpSection={() => {}}
          editPrescriberMode={false}
          setEditPrescriberMode={() => {}}
          prescriberDetails={data}
          setPrescriberDetails={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("prescriber-name-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Prescriber Name");
    const value = screen.getByTestId("prescriber-name-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Rahul Patil");
  });

  it("Verify prescriber name for prescriber in review mode without value", () => {
    const data: IPrescriberDetailInterface = defaultPrescriberDetail;
    data.prescriberName.value = "";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeEPrescription
          showErrorMessage={false}
          changePopUpSection={() => {}}
          editPrescriberMode={false}
          setEditPrescriberMode={() => {}}
          prescriberDetails={data}
          setPrescriberDetails={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("prescriber-name-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Prescriber Name");
    const value = screen.getByTestId("prescriber-name-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("--");
  });

  it("Verify prescriber email for prescriber in review mode", () => {
    const data: IPrescriberDetailInterface = defaultPrescriberDetail;
    data.updatedPrescriberEmail.value = "rahul@gmail.com";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeEPrescription
          showErrorMessage={false}
          changePopUpSection={() => {}}
          editPrescriberMode={false}
          setEditPrescriberMode={() => {}}
          prescriberDetails={data}
          setPrescriberDetails={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("prescriber-email-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Prescriber Email Address");
    const value = screen.getByTestId("prescriber-email-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("rahul@gmail.com");
  });

  it("Verify prescriber email for prescriber in review mode without value", () => {
    const data: IPrescriberDetailInterface = defaultPrescriberDetail;
    data.updatedPrescriberEmail.value = "";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeEPrescription
          showErrorMessage={false}
          changePopUpSection={() => {}}
          editPrescriberMode={false}
          setEditPrescriberMode={() => {}}
          prescriberDetails={data}
          setPrescriberDetails={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("prescriber-email-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Prescriber Email Address");
    const value = screen.getByTestId("prescriber-email-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("--");
  });

  it("Verify prescriber edit for prescriber in review mode", () => {
    const data: IPrescriberDetailInterface = defaultPrescriberDetail;
    const mockEditAction = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeEPrescription
          showErrorMessage={false}
          changePopUpSection={() => {}}
          editPrescriberMode={false}
          setEditPrescriberMode={() => {}}
          prescriberDetails={data}
          setPrescriberDetails={() => {}}
          editEmailClicked={mockEditAction}
        />
      </MemoryRouter>
    );
    const edit = screen.getByTestId("prescriber-edit-button");
    expect(edit).toBeInTheDocument();
    expect(edit).toHaveTextContent("edit");
    userEvent.click(edit);
    expect(mockEditAction).toBeCalledTimes(1);
  });

  it("Verify prescriber resend for prescriber in review mode", () => {
    const data: IPrescriberDetailInterface = defaultPrescriberDetail;
    const mockResendAction = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeEPrescription
          showErrorMessage={false}
          changePopUpSection={() => {}}
          editPrescriberMode={false}
          setEditPrescriberMode={() => {}}
          prescriberDetails={data}
          setPrescriberDetails={() => {}}
          resendPrescriptionClicked={mockResendAction}
        />
      </MemoryRouter>
    );
    const resend = screen.getByTestId("prescriber-resend-button");
    expect(resend).toBeInTheDocument();
    expect(resend).toHaveTextContent("resend");
    userEvent.click(resend);
    expect(mockResendAction).toBeCalledTimes(1);
  });

  it("Verify prescriber in edit mode component rendered or not", () => {
    const data: IPrescriberDetailInterface = defaultPrescriberDetail;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeEPrescription
          showErrorMessage={false}
          changePopUpSection={() => {}}
          editPrescriberMode={true}
          setEditPrescriberMode={() => {}}
          prescriberDetails={data}
          setPrescriberDetails={() => {}}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("prescriber-edit-mode");
    expect(header).toBeInTheDocument();
  });

  it("Verify prescriber name for prescriber in edit mode", () => {
    const data: IPrescriberDetailInterface = defaultPrescriberDetail;
    data.prescriberName.value = "Rahul Patil";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeEPrescription
          showErrorMessage={false}
          changePopUpSection={() => {}}
          editPrescriberMode={true}
          setEditPrescriberMode={() => {}}
          prescriberDetails={data}
          setPrescriberDetails={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("prescriber-name-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Prescriber Name");
    const value = screen.getByTestId("prescriber-name-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Rahul Patil");
  });

  it("Verify prescriber name for prescriber in edit mode without value", () => {
    const data: IPrescriberDetailInterface = defaultPrescriberDetail;
    data.prescriberName.value = "";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeEPrescription
          showErrorMessage={false}
          changePopUpSection={() => {}}
          editPrescriberMode={true}
          setEditPrescriberMode={() => {}}
          prescriberDetails={data}
          setPrescriberDetails={() => {}}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("prescriber-name-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Prescriber Name");
    const value = screen.getByTestId("prescriber-name-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("--");
  });

  it("Verify prescriber email for prescriber in edit mode", () => {
    const data: IPrescriberDetailInterface = defaultPrescriberDetail;
    const mockUpdateEmail = jest.fn();
    const newEmail = "rahul@gmail.com";
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeEPrescription
          showErrorMessage={false}
          changePopUpSection={() => {}}
          editPrescriberMode={true}
          setEditPrescriberMode={() => {}}
          prescriberDetails={data}
          setPrescriberDetails={mockUpdateEmail}
        />
      </MemoryRouter>
    );
    const title = screen.getByTestId("prescriber-email-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Prescriber Email Address");
    const value = screen.getByTestId(
      "prescriber-email-value"
    ) as HTMLBaseElement;
    userEvent.type(value, newEmail);
    expect(mockUpdateEmail).toBeCalledTimes(newEmail.length);
  });

  it("Verify prescriber update button for prescriber in edit mode", () => {
    const data: IPrescriberDetailInterface = defaultPrescriberDetail;
    data.updatedPrescriberEmail.value = "rahul@gmail.com";
    const mockUpdateAction = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeEPrescription
          showErrorMessage={false}
          changePopUpSection={() => {}}
          editPrescriberMode={true}
          setEditPrescriberMode={() => {}}
          prescriberDetails={data}
          setPrescriberDetails={() => {}}
          updatePrescriptionClicked={mockUpdateAction}
        />
      </MemoryRouter>
    );
    const update = screen.getByTestId("prescriber-update-button");
    expect(update).toBeInTheDocument();
    expect(update).toHaveTextContent("update");
    userEvent.click(update);
    expect(mockUpdateAction).toBeCalledTimes(1);
  });

  it("Verify prescriber close button for prescriber in edit mode", () => {
    const data: IPrescriberDetailInterface = defaultPrescriberDetail;
    const mockCloseAction = jest.fn();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <ChangeEPrescription
          showErrorMessage={false}
          changePopUpSection={() => {}}
          editPrescriberMode={true}
          setEditPrescriberMode={() => {}}
          prescriberDetails={data}
          setPrescriberDetails={() => {}}
          closeEmailUpdateClicked={mockCloseAction}
        />
      </MemoryRouter>
    );
    const close = screen.getByTestId("popupCloseIcon");
    expect(close).toBeInTheDocument();
    userEvent.click(close);
    expect(mockCloseAction).toBeCalledTimes(1);
  });
});
