import { cleanup, render, screen } from "@testing-library/react";
import { ValidationStatus } from "../../../../../core/interfaces/input.interface";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { pickUpRequestTestData } from "../../__test__/pickUpRequest.test.data";
import { DeviceInformation } from "../deviceInformation.component";

describe("Device Information component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Check for Injury caused by 3M device Radio Buttons rendered or not", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    render(<DeviceInformation data={data} setData={mockSetData} />);
    const title = screen.getByTestId(
      "device-information-injuryCauseBy3MDevice"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Did the 3M device potentially cause or contribute to an injury?"
    );
    const yesButton = screen.getByTestId(
      "device-information-injuryCauseBy3MDevice-yes"
    );
    expect(yesButton).toBeInTheDocument();
    expect(yesButton).toHaveTextContent("Yes");
    const noButton = screen.getByTestId(
      "device-information-injuryCauseBy3MDevice-no"
    );
    expect(noButton).toBeInTheDocument();
    expect(noButton).toHaveTextContent("No");
    const unknownButton = screen.getByTestId(
      "device-information-injuryCauseBy3MDevice-unknown"
    );
    expect(unknownButton).toBeInTheDocument();
    expect(unknownButton).toHaveTextContent("Unknown");
  });

  it("Check for problem with 3M device Radio Buttons rendered or not", () => {
    const data = getDeepClone(pickUpRequestTestData);
    const mockSetData = jest.fn();
    render(<DeviceInformation data={data} setData={mockSetData} />);
    const title = screen.getByTestId("device-information-problemWith3MDevice");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Is there a problem with the functionality of the 3M device?"
    );
    const yesButton = screen.getByTestId(
      "device-information-problemWith3MDevice-yes"
    );
    expect(yesButton).toBeInTheDocument();
    expect(yesButton).toHaveTextContent("Yes");
    const noButton = screen.getByTestId(
      "device-information-problemWith3MDevice-no"
    );
    expect(noButton).toBeInTheDocument();
    expect(noButton).toHaveTextContent("No");
    const unknownButton = screen.getByTestId(
      "device-information-problemWith3MDevice-unknown"
    );
    expect(unknownButton).toBeInTheDocument();
    expect(unknownButton).toHaveTextContent("Unknown");
  });

  it("Check for describe the injury textview rendered or not", () => {
    const data = getDeepClone(pickUpRequestTestData);
    data.injuryCauseBy3MDevice = {
      value: "yes",
      valid: ValidationStatus.VALID,
      require: true,
    };
    const mockSetData = jest.fn();
    render(<DeviceInformation data={data} setData={mockSetData} />);
    const title = screen.getByTestId("device-information-describe-the-injury");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Describe the injury.*");
  });

  it("Check for describe the problem textview rendered or not", () => {
    const data = getDeepClone(pickUpRequestTestData);
    data.problemWith3MDevice = {
      value: "yes",
      valid: ValidationStatus.VALID,
      require: true,
    };
    const mockSetData = jest.fn();
    render(<DeviceInformation data={data} setData={mockSetData} />);
    const title = screen.getByTestId("device-information-describe-the-problem");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Describe the problem with the 3M Device.*"
    );
  });
});
