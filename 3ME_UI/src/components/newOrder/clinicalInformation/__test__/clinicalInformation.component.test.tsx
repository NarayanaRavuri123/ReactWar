import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { NewOrderContext } from "../../../../context/NewOrderContext";
import { getDeepClone } from "../../../../util/ObjectFunctions";
import { NewOrderValidator } from "../../newOrder.validator";
import { INewOrderWoundInfo } from "../../newOrderWoundInfoStepper/newOrderWoundInfo.interface";
import { newOrderWoundInfoTestData } from "../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import { ClinicalInformation } from "../clinicalInformation.component";
import { getMockNewOrderData } from "./newOrderMockContextData";

describe("Clinical Information component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Clinical Information validate title", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrderWoundInfo) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <ClinicalInformation
          woundInfoData={data}
          setWoundInfoData={mockSetState}
          newValidator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("clinical-information-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Clinical Information");
  });

  it("Clinical Information validate short notes", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrderWoundInfo) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <ClinicalInformation
          woundInfoData={data}
          setWoundInfoData={mockSetState}
          newValidator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId(
      "shortNarrativeOfPossibleConsequences-lable"
    );
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Please provide a short narrative of possible consequences if V.A.C.® Therapy is not used. (Please include/attach any clinical data such as H&P)"
    );
    const textField = screen.getByTestId(
      "shortNarrativeOfPossibleConsequences-textField"
    ) as HTMLTextAreaElement;
    expect(textField).toBeInTheDocument();
  });

  it("Clinical Information validate wound ages", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrderWoundInfo) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <ClinicalInformation
          woundInfoData={data}
          setWoundInfoData={mockSetState}
          newValidator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("clinical-information-woundAge");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Age");
    const value = screen.getByTestId("clinical-information-woundAge-value");
    expect(value).toBeInTheDocument();
    userEvent.type(value, "5673");
    expect(mockSetState).toBeCalled();
  });

  it("Clinical Information validate wound location", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrderWoundInfo) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <ClinicalInformation
          woundInfoData={data}
          setWoundInfoData={mockSetState}
          newValidator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("clinical-information-wound-location");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Location");
    const value = screen.getByTestId(
      "clinical-information-wound-location-value"
    );
    expect(value).toBeInTheDocument();
  });

  it("Clinical Information validate wound direction", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrderWoundInfo) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <ClinicalInformation
          woundInfoData={data}
          setWoundInfoData={mockSetState}
          newValidator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("clinical-information-wound-direction");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Direction");
    const value = screen.getByTestId(
      "clinical-information-wound-direction-value"
    );
    expect(value).toBeInTheDocument();
  });

  it("Clinical Information validate wound orientation", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrderWoundInfo) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <ClinicalInformation
          woundInfoData={data}
          setWoundInfoData={mockSetState}
          newValidator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("clinical-information-wound-orientation");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Wound Orientation");
    const value = screen.getByTestId(
      "clinical-information-wound-orientation-value"
    );
    expect(value).toBeInTheDocument();
  });

  it("Clinical Information validate is tissue present for yes", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrderWoundInfo) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <ClinicalInformation
          woundInfoData={data}
          setWoundInfoData={mockSetState}
          newValidator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("clinical-information-isTissuePresent");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Is there eschar tissue present in the wound?*"
    );
    const yesButton = screen.getByTestId(
      "clinical-information-isTissuePresent-Yes"
    ) as HTMLBaseElement;
    expect(yesButton).toBeInTheDocument();
  });

  it("Clinical Information validate is tissue present for no", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrderWoundInfo) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <ClinicalInformation
          woundInfoData={data}
          setWoundInfoData={mockSetState}
          newValidator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("clinical-information-isTissuePresent");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      "Is there eschar tissue present in the wound?*"
    );
    const noButton = screen.getByTestId(
      "clinical-information-isTissuePresent-No"
    ) as HTMLBaseElement;
    expect(noButton).toBeInTheDocument();
  });

  it("Clinical Information primary wound type dropdown rendered", () => {
    const Validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const mockSetState = jest.fn();
    jest.mock("react", () => ({
      useState: (dt: INewOrderWoundInfo) => [dt, mockSetState],
    }));
    React.useState = jest.fn().mockReturnValue([Validator!, {}]);
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <ClinicalInformation
          woundInfoData={data}
          setWoundInfoData={mockSetState}
          newValidator={Validator}
        />
      </NewOrderContext.Provider>
    );
    const label = screen.getByTestId("wound-type");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Primary Wound Type*");
    const dropdown = screen.getByTestId("wound-type-select") as HTMLBaseElement;
    expect(dropdown).toBeInTheDocument();
  });
});
