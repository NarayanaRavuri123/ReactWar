import React from "react";
import { NewOrderValidator } from "../../../newOrder.validator";
import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { SecondaryWoundInfo } from "../secondaryWoundInfo.component";
import { ISecondaryWoundInfo } from "../secondaryWoundInfo.interface";
import { newOrderWoundInfoTestData } from "../../../newOrderWoundInfoStepper/__test__/newOrderWoundInfo.test.data";
import { defaultNewOrdeSecondaryWoundInfoTestData } from "./secondaryWoundInfo.test.data";

describe("Secondary Wound Info component ->", () => {
  afterAll(() => {
    cleanup();
  });

  it("Secondary Wound Info validate add second wound info button title", () => {
    const mockSetState = jest.fn();
    const mockSetWoundInfoState = jest.fn();
    const validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const woundInfoData = getDeepClone(
      defaultNewOrdeSecondaryWoundInfoTestData
    );
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetState],
    }));
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetWoundInfoState],
    }));
    React.useState = jest.fn().mockReturnValue([validator!, {}]);
    render(
      <SecondaryWoundInfo
        data={data}
        setData={mockSetWoundInfoState}
        woundInfoData={woundInfoData}
        setWoundInfoData={mockSetState}
        newValidator={validator}
      />
    );
    const title = screen.getByTestId("add-secondary-wound");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("+ Add secondary wound");
  });

  it("Secondary Wound Info validate add second wound info button when show secondary wound title", () => {
    const mockSetState = jest.fn();
    const mockSetWoundInfoState = jest.fn();
    const validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.isShowSecondaryWoundInfo.value = "Yes";
    const woundInfoData = getDeepClone(
      defaultNewOrdeSecondaryWoundInfoTestData
    );
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetState],
    }));
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetWoundInfoState],
    }));
    React.useState = jest.fn().mockReturnValue([validator!, {}]);
    render(
      <SecondaryWoundInfo
        data={data}
        setData={mockSetWoundInfoState}
        woundInfoData={woundInfoData}
        setWoundInfoData={mockSetState}
        newValidator={validator}
      />
    );
    const title = screen.getByTestId("add-secondary-wound");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("- Remove secondary wound");
  });

  it("Secondary Wound Info validate add second wound info button title in reviewOrder Page", () => {
    const mockSetState = jest.fn();
    const mockSetWoundInfoState = jest.fn();
    const validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const woundInfoData = getDeepClone(
      defaultNewOrdeSecondaryWoundInfoTestData
    );
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetState],
    }));
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetWoundInfoState],
    }));
    React.useState = jest.fn().mockReturnValue([validator!, {}]);
    render(
      <SecondaryWoundInfo
        data={data}
        isReviewOrder={true}
        setData={mockSetWoundInfoState}
        woundInfoData={woundInfoData}
        setWoundInfoData={mockSetState}
        newValidator={validator}
      />
    );
    const title = screen.queryByText("+ Add secondary wound");
    expect(title).toBeNull();
  });

  it("Secondary Wound Info validate add second wound info button title in reviewOrder Page", () => {
    const mockSetState = jest.fn();
    const mockSetWoundInfoState = jest.fn();
    const validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    const woundInfoData = getDeepClone(
      defaultNewOrdeSecondaryWoundInfoTestData
    );
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetState],
    }));
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetWoundInfoState],
    }));
    React.useState = jest.fn().mockReturnValue([validator!, {}]);
    render(
      <SecondaryWoundInfo
        data={data}
        isReviewOrder={true}
        setData={mockSetWoundInfoState}
        woundInfoData={woundInfoData}
        setWoundInfoData={mockSetState}
        newValidator={validator}
      />
    );
    const title = screen.queryByText("- Remove secondary wound");
    expect(title).toBeNull();
  });

  it("Secondary Wound Info validate second wound info details", () => {
    const mockSetState = jest.fn();
    const mockSetWoundInfoState = jest.fn();
    const validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.isShowSecondaryWoundInfo.value = "Yes";
    const woundInfoData = getDeepClone(
      defaultNewOrdeSecondaryWoundInfoTestData
    );
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetState],
    }));
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetWoundInfoState],
    }));
    React.useState = jest.fn().mockReturnValue([validator!, {}]);
    render(
      <SecondaryWoundInfo
        data={data}
        setData={mockSetWoundInfoState}
        woundInfoData={woundInfoData}
        setWoundInfoData={mockSetState}
        newValidator={validator}
      />
    );
    const secondWoundProperties = screen.getByTestId("secondary-wound-detail");
    expect(secondWoundProperties).toBeInTheDocument();
  });

  it("Secondary Wound Info validate second wound info details clinical information component", () => {
    const mockSetState = jest.fn();
    const mockSetWoundInfoState = jest.fn();
    const validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.isShowSecondaryWoundInfo.value = "Yes";
    const woundInfoData = getDeepClone(
      defaultNewOrdeSecondaryWoundInfoTestData
    );
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetState],
    }));
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetWoundInfoState],
    }));
    React.useState = jest.fn().mockReturnValue([validator!, {}]);
    render(
      <SecondaryWoundInfo
        data={data}
        setData={mockSetWoundInfoState}
        woundInfoData={woundInfoData}
        setWoundInfoData={mockSetState}
        newValidator={validator}
      />
    );
    const clinicalInformation = screen.getByTestId("clinical-information");
    expect(clinicalInformation).toBeInTheDocument();
    const label = screen.getByTestId("wound-type");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Secondary Wound Type*");
    const dropdown = screen.getByTestId("wound-type-select") as HTMLBaseElement;
    expect(dropdown).toBeInTheDocument();
  });

  it("Secondary Wound Info validate second wound info details debridement component", () => {
    const mockSetState = jest.fn();
    const mockSetWoundInfoState = jest.fn();
    const validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.isShowSecondaryWoundInfo.value = "Yes";
    const woundInfoData = getDeepClone(
      defaultNewOrdeSecondaryWoundInfoTestData
    );
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetState],
    }));
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetWoundInfoState],
    }));
    React.useState = jest.fn().mockReturnValue([validator!, {}]);
    render(
      <SecondaryWoundInfo
        data={data}
        setData={mockSetWoundInfoState}
        woundInfoData={woundInfoData}
        setWoundInfoData={mockSetState}
        newValidator={validator}
      />
    );
    const debridement = screen.getByTestId("debridement-cause");
    expect(debridement).toBeInTheDocument();
  });

  it("Secondary Wound Info validate second wound info details woundDimension component", () => {
    const mockSetState = jest.fn();
    const mockSetWoundInfoState = jest.fn();
    const validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.isShowSecondaryWoundInfo.value = "Yes";
    const woundInfoData = getDeepClone(
      defaultNewOrdeSecondaryWoundInfoTestData
    );
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetState],
    }));
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetWoundInfoState],
    }));
    React.useState = jest.fn().mockReturnValue([validator!, {}]);
    render(
      <SecondaryWoundInfo
        data={data}
        setData={mockSetWoundInfoState}
        woundInfoData={woundInfoData}
        setWoundInfoData={mockSetState}
        newValidator={validator}
      />
    );
    const woundDimension = screen.getByTestId("dimension");
    expect(woundDimension).toBeInTheDocument();
  });

  it("Secondary Wound Info validate second wound info details woundUndermining component", () => {
    const mockSetState = jest.fn();
    const mockSetWoundInfoState = jest.fn();
    const validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.isShowSecondaryWoundInfo.value = "Yes";
    const woundInfoData = getDeepClone(
      defaultNewOrdeSecondaryWoundInfoTestData
    );
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetState],
    }));
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetWoundInfoState],
    }));
    React.useState = jest.fn().mockReturnValue([validator!, {}]);
    render(
      <SecondaryWoundInfo
        data={data}
        setData={mockSetWoundInfoState}
        woundInfoData={woundInfoData}
        setWoundInfoData={mockSetState}
        newValidator={validator}
      />
    );
    const woundUndermining = screen.getByTestId("undermining");
    expect(woundUndermining).toBeInTheDocument();
  });

  it("Secondary Wound Info validate second wound info details woundTunneling component", () => {
    const mockSetState = jest.fn();
    const mockSetWoundInfoState = jest.fn();
    const validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.isShowSecondaryWoundInfo.value = "Yes";
    const woundInfoData = getDeepClone(
      defaultNewOrdeSecondaryWoundInfoTestData
    );
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetState],
    }));
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetWoundInfoState],
    }));
    React.useState = jest.fn().mockReturnValue([validator!, {}]);
    render(
      <SecondaryWoundInfo
        data={data}
        setData={mockSetWoundInfoState}
        woundInfoData={woundInfoData}
        setWoundInfoData={mockSetState}
        newValidator={validator}
      />
    );
    const woundTunneling = screen.getByTestId("tunneling");
    expect(woundTunneling).toBeInTheDocument();
  });

  it("Secondary Wound Info validate second wound info details woundBed component", () => {
    const mockSetState = jest.fn();
    const mockSetWoundInfoState = jest.fn();
    const validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.isShowSecondaryWoundInfo.value = "Yes";
    const woundInfoData = getDeepClone(
      defaultNewOrdeSecondaryWoundInfoTestData
    );
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetState],
    }));
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetWoundInfoState],
    }));
    React.useState = jest.fn().mockReturnValue([validator!, {}]);
    render(
      <SecondaryWoundInfo
        data={data}
        setData={mockSetWoundInfoState}
        woundInfoData={woundInfoData}
        setWoundInfoData={mockSetState}
        newValidator={validator}
      />
    );
    const woundBed = screen.getByTestId("woundBedMainContainer");
    expect(woundBed).toBeInTheDocument();
  });

  it("Secondary Wound Info validate second wound info details exudate component", () => {
    const mockSetState = jest.fn();
    const mockSetWoundInfoState = jest.fn();
    const validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.isShowSecondaryWoundInfo.value = "Yes";
    const woundInfoData = getDeepClone(
      defaultNewOrdeSecondaryWoundInfoTestData
    );
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetState],
    }));
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetWoundInfoState],
    }));
    React.useState = jest.fn().mockReturnValue([validator!, {}]);
    render(
      <SecondaryWoundInfo
        data={data}
        setData={mockSetWoundInfoState}
        woundInfoData={woundInfoData}
        setWoundInfoData={mockSetState}
        newValidator={validator}
      />
    );
    const exudate = screen.getByTestId("exudate-container");
    expect(exudate).toBeInTheDocument();
  });

  it("Secondary Wound Info validate second wound info details exposedStructures component", () => {
    const mockSetState = jest.fn();
    const mockSetWoundInfoState = jest.fn();
    const validator = new NewOrderValidator();
    const data = getDeepClone(newOrderWoundInfoTestData);
    data.isShowSecondaryWoundInfo.value = "Yes";
    const woundInfoData = getDeepClone(
      defaultNewOrdeSecondaryWoundInfoTestData
    );
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetState],
    }));
    jest.mock("react", () => ({
      useState: (dt: ISecondaryWoundInfo) => [dt, mockSetWoundInfoState],
    }));
    React.useState = jest.fn().mockReturnValue([validator!, {}]);
    render(
      <SecondaryWoundInfo
        data={data}
        setData={mockSetWoundInfoState}
        woundInfoData={woundInfoData}
        setWoundInfoData={mockSetState}
        newValidator={validator}
      />
    );
    const exposedStructures = screen.getByTestId("exposed-container");
    expect(exposedStructures).toBeInTheDocument();
  });
});
