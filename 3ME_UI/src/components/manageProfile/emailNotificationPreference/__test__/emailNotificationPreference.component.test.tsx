import { MemoryRouter } from "react-router-dom";
import { profileTestData } from "../../__test__/manageProfile.test.data";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { EmailNotificationPreference } from "../emailNotificationPreference.component";

describe("Email Notification Preference component", () => {
  afterAll(() => {
    cleanup();
  });

  it("Validate Email Notification Preference Header", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <EmailNotificationPreference
          manageProfileData={profileTestData}
          setManageProfileData={jest.fn()}
        />
      </MemoryRouter>
    );
    const header = screen.getByTestId("email-notification-preferences-header");
    // verify email notification preference header rendered and verify content
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Email notification preferences");
  });

  it("Validate Email Notification Preference body text", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <EmailNotificationPreference
          manageProfileData={profileTestData}
          setManageProfileData={jest.fn()}
        />
      </MemoryRouter>
    );
    const body = screen.getByTestId("email-notification-preferences-body");
    // verify email notification preference body rendered and verify content
    expect(body).toBeInTheDocument();
    expect(body).toHaveTextContent(
      "The selections below control which emails you receive as notification of actions you take as a user."
    );
  });

  it("Validate Email Notification Preference as rentalAcitivity", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <EmailNotificationPreference
          manageProfileData={profileTestData}
          setManageProfileData={jest.fn()}
        />
      </MemoryRouter>
    );

    const title = screen.getByTestId("preference-title-rentalActivity");
    const yesRadioButton = screen.getByTestId(
      "preference-yes-for-rentalActivity"
    ) as HTMLInputElement;
    const noRadioButton = screen.getByTestId(
      "preference-no-for-rentalActivity"
    ) as HTMLInputElement;

    // verify preference title and radio button rendered or not
    expect(title).toBeInTheDocument();
    expect(yesRadioButton).toBeInTheDocument();
    expect(noRadioButton).toBeInTheDocument();

    // verify title content
    expect(title).toHaveTextContent("Rental activity: Home");

    // verify radio buttons state
    expect(yesRadioButton).not.toBeChecked();
    expect(noRadioButton).toBeChecked();

    // select yes and verify radio buttons state
    fireEvent.click(yesRadioButton, { target: { checked: true } });
    expect(yesRadioButton).toBeChecked();
    expect(noRadioButton).not.toBeChecked();

    // select no and verify radio buttons state
    fireEvent.click(noRadioButton, { target: { checked: true } });
    expect(noRadioButton).toBeChecked();
    expect(yesRadioButton).not.toBeChecked();
  });

  it("Validate Email Notification Preference as salesActivity", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <EmailNotificationPreference
          manageProfileData={profileTestData}
          setManageProfileData={jest.fn()}
        />
      </MemoryRouter>
    );

    const title = screen.getByTestId("preference-title-salesActivity");
    const yesRadioButton = screen.getByTestId(
      "preference-yes-for-salesActivity"
    ) as HTMLInputElement;
    const noRadioButton = screen.getByTestId(
      "preference-no-for-salesActivity"
    ) as HTMLInputElement;

    // verify preference title and radio button rendered or not
    expect(title).toBeInTheDocument();
    expect(yesRadioButton).toBeInTheDocument();
    expect(noRadioButton).toBeInTheDocument();

    // verify title content
    expect(title).toHaveTextContent("Sales Activity");

    // verify radio buttons state
    expect(yesRadioButton).not.toBeChecked();
    expect(noRadioButton).toBeChecked();

    // select yes and verify radio buttons state
    fireEvent.click(yesRadioButton, { target: { checked: true } });
    expect(yesRadioButton).toBeChecked();
    expect(noRadioButton).not.toBeChecked();

    // select no and verify radio buttons state
    fireEvent.click(noRadioButton, { target: { checked: true } });
    expect(noRadioButton).toBeChecked();
    expect(yesRadioButton).not.toBeChecked();
  });

  it("Validate Email Notification Preference as pickUpRequest", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <EmailNotificationPreference
          manageProfileData={profileTestData}
          setManageProfileData={jest.fn()}
        />
      </MemoryRouter>
    );

    const title = screen.getByTestId("preference-title-pickUpRequest");
    const yesRadioButton = screen.getByTestId(
      "preference-yes-for-pickUpRequest"
    ) as HTMLInputElement;
    const noRadioButton = screen.getByTestId(
      "preference-no-for-pickUpRequest"
    ) as HTMLInputElement;

    // verify preference title and radio button rendered or not
    expect(title).toBeInTheDocument();
    expect(yesRadioButton).toBeInTheDocument();
    expect(noRadioButton).toBeInTheDocument();

    // verify title content
    expect(title).toHaveTextContent("Pickup Requests");

    // verify radio buttons state
    expect(yesRadioButton).not.toBeChecked();
    expect(noRadioButton).toBeChecked();

    // select yes and verify radio buttons state
    fireEvent.click(yesRadioButton, { target: { checked: true } });
    expect(yesRadioButton).toBeChecked();
    expect(noRadioButton).not.toBeChecked();

    // select no and verify radio buttons state
    fireEvent.click(noRadioButton, { target: { checked: true } });
    expect(noRadioButton).toBeChecked();
    expect(yesRadioButton).not.toBeChecked();
  });

  it("Validate Email Notification Preference description text", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <EmailNotificationPreference
          manageProfileData={profileTestData}
          setManageProfileData={jest.fn()}
        />
      </MemoryRouter>
    );
    const description = screen.getByTestId(
      "email-notification-preferences-description"
    );
    const phoneNumber = screen.getByTestId("phone-number-bold");
    // verify email notification preference body rendered
    expect(description).toBeInTheDocument();
    expect(phoneNumber).toBeInTheDocument();

    // verify content for description and phone
    expect(description).toHaveTextContent(
      "For any questions regarding your account, please contact 3M™ Medical Solutions Customer Support at 1-800-275-4524 extension 41858"
    );
    expect(phoneNumber).toHaveTextContent("1-800-275-4524");
  });
});
