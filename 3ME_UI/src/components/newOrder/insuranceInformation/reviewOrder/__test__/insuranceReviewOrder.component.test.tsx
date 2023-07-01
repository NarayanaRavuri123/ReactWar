import { cleanup, render, screen } from "@testing-library/react";
import { getDeepClone } from "../../../../../util/ObjectFunctions";
import { newOrderTestData } from "../../../__test__/newOrder.test.data";
import { InsuranceReviewOrder } from "../insuranceReviewOrder.component";
import { NewOrderContext } from "../../../../../context/NewOrderContext";
import { getMockNewOrderData } from "../../../clinicalInformation/__test__/newOrderMockContextData";
import userEvent from "@testing-library/user-event";

describe("Insurance review order component", () => {
  afterAll(() => {
    cleanup();
  });
  it("Insurance review order component validate header for primary", () => {
    const data = getDeepClone(newOrderTestData);
    const editBtnAction = jest.fn();
    const typePrimary = {
      medicare: false,
      medicareAdvantage: false,
      managedMedicaid: false,
      commercialInsurance: false,
      medicaid: false,
      charityCare: false,
      privatePay: false,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data.primaryInsurance}
          editButtonClicked={editBtnAction}
          insuranceTypes={[]}
          isPrimaryComponent={true}
          type={typePrimary}
          newOrderData={data}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("insurance-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Primary Insurance Information");
    const editBtn = screen.getByTestId("insurance-review-order-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Insurance review order component validate header for secondary", () => {
    const data = getDeepClone(newOrderTestData);
    const editBtnAction = jest.fn();
    const typeSecondary = {
      medicare: false,
      medicareAdvantage: false,
      managedMedicaid: false,
      commercialInsurance: false,
      medicaid: false,
      charityCare: false,
      privatePay: false,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data.secondaryInsurance}
          editButtonClicked={editBtnAction}
          insuranceTypes={[]}
          isPrimaryComponent={false}
          type={typeSecondary}
          newOrderData={data}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("insurance-review-order-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Secondary Insurance Information");
    const editBtn = screen.getByTestId("insurance-review-order-edit-button");
    expect(editBtn).toBeInTheDocument();
    expect(editBtn).toHaveTextContent("Edit");
    userEvent.click(editBtn);
    expect(editBtnAction).toBeCalledTimes(1);
  });

  it("Insurance review order component validate insurance type as medicare for primary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    const data = newOrderData.primaryInsurance;
    data.insuranceTypeCode.value = "Medicare";
    data.medicare.memberID.value = "123";
    data.medicare.relationShipInsured.value = "self";
    const typePrimary = {
      medicare: true,
      medicareAdvantage: false,
      managedMedicaid: false,
      commercialInsurance: false,
      medicaid: false,
      charityCare: false,
      privatePay: false,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={true}
          type={typePrimary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("insurance-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Insurance Type");
    const value = screen.getByTestId("insurance-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Medicare");
    const memberIdTitle = screen.getByTestId("member-id");
    expect(memberIdTitle).toBeInTheDocument();
    expect(memberIdTitle).toHaveTextContent("Member ID");
    const memberIdValue = screen.getByTestId("member-id-value");
    expect(memberIdValue).toBeInTheDocument();
    expect(memberIdValue).toHaveTextContent("123");
    const relationshipTitle = screen.getByTestId("relationship-to-insured");
    expect(relationshipTitle).toBeInTheDocument();
    expect(relationshipTitle).toHaveTextContent("Relationship to Insured");
    const relationshipValue = screen.getByTestId(
      "relationship-to-insured-value"
    );
    expect(relationshipValue).toBeInTheDocument();
    expect(relationshipValue).toHaveTextContent("self");
  });

  it("Insurance review order component validate insurance type as medicare for secondary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    const data = newOrderData.primaryInsurance;
    data.insuranceTypeCode.value = "Medicare";
    data.medicare.memberID.value = "123";
    data.medicare.relationShipInsured.value = "self";
    const typeSecondary = {
      medicare: true,
      medicareAdvantage: false,
      managedMedicaid: false,
      commercialInsurance: false,
      medicaid: false,
      charityCare: false,
      privatePay: false,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={false}
          type={typeSecondary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("insurance-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Insurance Type");
    const value = screen.getByTestId("insurance-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Medicare");
    const memberIdTitle = screen.getByTestId("member-id");
    expect(memberIdTitle).toBeInTheDocument();
    expect(memberIdTitle).toHaveTextContent("Member ID");
    const memberIdValue = screen.getByTestId("member-id-value");
    expect(memberIdValue).toBeInTheDocument();
    expect(memberIdValue).toHaveTextContent("123");
    const relationshipTitle = screen.getByTestId("relationship-to-insured");
    expect(relationshipTitle).toBeInTheDocument();
    expect(relationshipTitle).toHaveTextContent("Relationship to Insured");
    const relationshipValue = screen.getByTestId(
      "relationship-to-insured-value"
    );
    expect(relationshipValue).toBeInTheDocument();
    expect(relationshipValue).toHaveTextContent("self");
  });

  it("Insurance review order component validate insurance type as medicaid for primary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    const data = newOrderData.primaryInsurance;
    data.insuranceTypeCode.value = "Medicaid";
    data.medicaid.memberID.value = "123";
    data.medicaid.relationShipInsured.value = "self";
    const typePrimary = {
      medicare: false,
      medicareAdvantage: false,
      managedMedicaid: false,
      commercialInsurance: false,
      medicaid: true,
      charityCare: false,
      privatePay: false,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={true}
          type={typePrimary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("insurance-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Insurance Type");
    const value = screen.getByTestId("insurance-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Medicaid");
    const memberIdTitle = screen.getByTestId("member-id");
    expect(memberIdTitle).toBeInTheDocument();
    expect(memberIdTitle).toHaveTextContent("Member ID");
    const memberIdValue = screen.getByTestId("member-id-value");
    expect(memberIdValue).toBeInTheDocument();
    expect(memberIdValue).toHaveTextContent("123");
    const relationshipTitle = screen.getByTestId("relationship-to-insured");
    expect(relationshipTitle).toBeInTheDocument();
    expect(relationshipTitle).toHaveTextContent("Relationship to Insured");
    const relationshipValue = screen.getByTestId(
      "relationship-to-insured-value"
    );
    expect(relationshipValue).toBeInTheDocument();
    expect(relationshipValue).toHaveTextContent("self");
  });

  it("Insurance review order component validate insurance type as medicaid for secondary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    const data = newOrderData.primaryInsurance;
    data.insuranceTypeCode.value = "Medicaid";
    data.medicaid.memberID.value = "123";
    data.medicaid.relationShipInsured.value = "self";
    const typeSecondary = {
      medicare: false,
      medicareAdvantage: false,
      managedMedicaid: false,
      commercialInsurance: false,
      medicaid: true,
      charityCare: false,
      privatePay: false,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={false}
          type={typeSecondary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("insurance-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Insurance Type");
    const value = screen.getByTestId("insurance-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Medicaid");
    const memberIdTitle = screen.getByTestId("member-id");
    expect(memberIdTitle).toBeInTheDocument();
    expect(memberIdTitle).toHaveTextContent("Member ID");
    const memberIdValue = screen.getByTestId("member-id-value");
    expect(memberIdValue).toBeInTheDocument();
    expect(memberIdValue).toHaveTextContent("123");
    const relationshipTitle = screen.getByTestId("relationship-to-insured");
    expect(relationshipTitle).toBeInTheDocument();
    expect(relationshipTitle).toHaveTextContent("Relationship to Insured");
    const relationshipValue = screen.getByTestId(
      "relationship-to-insured-value"
    );
    expect(relationshipValue).toBeInTheDocument();
    expect(relationshipValue).toHaveTextContent("self");
  });

  it("Insurance review order component validate insurance type as other for primary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    const data = newOrderData.primaryInsurance;
    data.insuranceTypeCode.value = "Other";
    data.otherAdditionalDetails.value = "Insuracne Payer Name is Rahul Patil";
    const typePrimary = {
      medicare: false,
      medicareAdvantage: false,
      managedMedicaid: false,
      commercialInsurance: false,
      medicaid: false,
      charityCare: false,
      privatePay: false,
      otherAdditionalDetails: true,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={true}
          type={typePrimary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("insurance-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Insurance Type");
    const value = screen.getByTestId("insurance-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Other");
    const additionDetailsTitle = screen.getByTestId("additional-detail");
    expect(additionDetailsTitle).toBeInTheDocument();
    expect(additionDetailsTitle).toHaveTextContent("Additional Details");
    const additionDetailsValue = screen.getByTestId("additional-detail-value");
    expect(additionDetailsValue).toBeInTheDocument();
    expect(additionDetailsValue).toHaveTextContent(
      "Insuracne Payer Name is Rahul Patil"
    );
  });

  it("Insurance review order component validate insurance type as other for secondary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    const data = newOrderData.secondaryInsurance;
    data.insuranceTypeCode.value = "Other";
    data.otherAdditionalDetails.value = "Insuracne Payer Name is Rahul Patil";
    const typeSecondary = {
      medicare: false,
      medicareAdvantage: false,
      managedMedicaid: false,
      commercialInsurance: false,
      medicaid: false,
      charityCare: false,
      privatePay: false,
      otherAdditionalDetails: true,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={false}
          type={typeSecondary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("insurance-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Insurance Type");
    const value = screen.getByTestId("insurance-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Other");
    const additionDetailsTitle = screen.getByTestId("additional-detail");
    expect(additionDetailsTitle).toBeInTheDocument();
    expect(additionDetailsTitle).toHaveTextContent("Additional Details");
    const additionDetailsValue = screen.getByTestId("additional-detail-value");
    expect(additionDetailsValue).toBeInTheDocument();
    expect(additionDetailsValue).toHaveTextContent(
      "Insuracne Payer Name is Rahul Patil"
    );
  });

  it("Insurance review order component validate insurance type as charity care for primary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    const data = newOrderData.primaryInsurance;
    data.insuranceTypeCode.value = "Charity Care";
    const typePrimary = {
      medicare: false,
      medicareAdvantage: false,
      managedMedicaid: false,
      commercialInsurance: false,
      medicaid: false,
      charityCare: true,
      privatePay: false,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={true}
          type={typePrimary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("insurance-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Insurance Type");
    const value = screen.getByTestId("insurance-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Charity Care");
  });

  it("Insurance review order component validate insurance type as charity care for secondary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    const data = newOrderData.primaryInsurance;
    data.insuranceTypeCode.value = "Charity Care";
    const typeSecondary = {
      medicare: false,
      medicareAdvantage: false,
      managedMedicaid: false,
      commercialInsurance: false,
      medicaid: false,
      charityCare: true,
      privatePay: false,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={false}
          type={typeSecondary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("insurance-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Insurance Type");
    const value = screen.getByTestId("insurance-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Charity Care");
  });

  it("Insurance review order component validate insurance type as worker's compensation for primary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    const data = newOrderData.primaryInsurance;
    data.insuranceTypeCode.value = "Worker's Compensation";
    const typePrimary = {
      medicare: false,
      medicareAdvantage: false,
      managedMedicaid: false,
      commercialInsurance: false,
      medicaid: false,
      charityCare: false,
      privatePay: false,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={true}
          type={typePrimary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("insurance-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Insurance Type");
    const value = screen.getByTestId("insurance-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Worker's Compensation");
  });

  it("Insurance review order component validate insurance type as worker's compensation for secondary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    const data = newOrderData.primaryInsurance;
    data.insuranceTypeCode.value = "Worker's Compensation";
    const typeSecondary = {
      medicare: false,
      medicareAdvantage: false,
      managedMedicaid: false,
      commercialInsurance: false,
      medicaid: false,
      charityCare: false,
      privatePay: false,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={false}
          type={typeSecondary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("insurance-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Insurance Type");
    const value = screen.getByTestId("insurance-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Worker's Compensation");
  });

  it("Insurance review order component validate insurance type as private pay for primary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    newOrderData.firstName.value = "Rahul";
    newOrderData.lastName.value = "Patil";
    newOrderData.email.value = "rahul@gmail.com";
    newOrderData.phone.value = "832-940-5422";
    const data = newOrderData.primaryInsurance;
    data.insuranceTypeCode.value = "Private Pay";
    const typePrimary = {
      medicare: false,
      medicareAdvantage: false,
      managedMedicaid: false,
      commercialInsurance: false,
      medicaid: false,
      charityCare: false,
      privatePay: true,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={true}
          type={typePrimary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("insurance-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Insurance Type");
    const value = screen.getByTestId("insurance-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Private Pay");
    const payerNameTitle = screen.getByTestId("payer-name");
    expect(payerNameTitle).toBeInTheDocument();
    expect(payerNameTitle).toHaveTextContent("Payer Name");
    const payerNameValue = screen.getByTestId("payer-name-value");
    expect(payerNameValue).toBeInTheDocument();
    expect(payerNameValue).toHaveTextContent("Rahul Patil");
    const contactDetailsTitle = screen.getByTestId("contact-details");
    expect(contactDetailsTitle).toBeInTheDocument();
    expect(contactDetailsTitle).toHaveTextContent("Contact Details");
    const contactDetailsEmailValue = screen.getByTestId(
      "contact-details-value-email"
    );
    expect(contactDetailsEmailValue).toBeInTheDocument();
    expect(contactDetailsEmailValue).toHaveTextContent("Rahul@gmail.com");
    const contactDetailsPhoneValue = screen.getByTestId(
      "contact-details-value-phone"
    );
    expect(contactDetailsPhoneValue).toBeInTheDocument();
    expect(contactDetailsPhoneValue).toHaveTextContent("832-940-5422");
  });

  it("Insurance review order component validate insurance type as private pay for secondary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    newOrderData.firstName.value = "Rahul";
    newOrderData.lastName.value = "Patil";
    newOrderData.email.value = "rahul@gmail.com";
    newOrderData.phone.value = "832-940-5422";
    const data = newOrderData.primaryInsurance;
    data.insuranceTypeCode.value = "Private Pay";
    const typeSecondary = {
      medicare: false,
      medicareAdvantage: false,
      managedMedicaid: false,
      commercialInsurance: false,
      medicaid: false,
      charityCare: false,
      privatePay: true,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={false}
          type={typeSecondary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const title = screen.getByTestId("insurance-type");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Insurance Type");
    const value = screen.getByTestId("insurance-type-value");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Private Pay");
    const payerNameTitle = screen.getByTestId("payer-name");
    expect(payerNameTitle).toBeInTheDocument();
    expect(payerNameTitle).toHaveTextContent("Payer Name");
    const payerNameValue = screen.getByTestId("payer-name-value");
    expect(payerNameValue).toBeInTheDocument();
    expect(payerNameValue).toHaveTextContent("Rahul Patil");
    const contactDetailsTitle = screen.getByTestId("contact-details");
    expect(contactDetailsTitle).toBeInTheDocument();
    expect(contactDetailsTitle).toHaveTextContent("Contact Details");
    const contactDetailsEmailValue = screen.getByTestId(
      "contact-details-value-email"
    );
    expect(contactDetailsEmailValue).toBeInTheDocument();
    expect(contactDetailsEmailValue).toHaveTextContent("Rahul@gmail.com");
    const contactDetailsPhoneValue = screen.getByTestId(
      "contact-details-value-phone"
    );
    expect(contactDetailsPhoneValue).toBeInTheDocument();
    expect(contactDetailsPhoneValue).toHaveTextContent("832-940-5422");
  });

  it("Insurance review order component validate insurance type as medicare advantage for primary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    const data = newOrderData.primaryInsurance;
    data.insuranceTypeCode.value = "Medicare Advantage";
    data.medicareAdvantage.payerName.value = "Rahul Patil";
    data.medicareAdvantage.memberID.value = "12345";
    data.medicareAdvantage.groupID.value = "111";
    data.medicareAdvantage.relationShipInsured.value = "self";
    data.medicareAdvantage.extension.value = "123";
    data.medicareAdvantage.payerContactNumber.value = "832-940-5422";
    const typePrimary = {
      medicare: false,
      medicareAdvantage: true,
      managedMedicaid: false,
      commercialInsurance: false,
      medicaid: false,
      charityCare: false,
      privatePay: false,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={true}
          type={typePrimary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const payerNameTitle = screen.getByTestId("payer-name");
    expect(payerNameTitle).toBeInTheDocument();
    expect(payerNameTitle).toHaveTextContent("Payer Name");
    const payerNameValue = screen.getByTestId("payer-name-value");
    expect(payerNameValue).toBeInTheDocument();
    expect(payerNameValue).toHaveTextContent("Rahul Patil");
    const payerTypeTitle = screen.getByTestId("payer-type");
    expect(payerTypeTitle).toBeInTheDocument();
    expect(payerTypeTitle).toHaveTextContent("Payer Type");
    const payerTypeValue = screen.getByTestId("payer-type-value");
    expect(payerTypeValue).toBeInTheDocument();
    expect(payerTypeValue).toHaveTextContent("Medicare Advantage");
    const memberIdTitle = screen.getByTestId("member-id");
    expect(memberIdTitle).toBeInTheDocument();
    expect(memberIdTitle).toHaveTextContent("Member ID");
    const memberIdValue = screen.getByTestId("member-id-value");
    expect(memberIdValue).toBeInTheDocument();
    expect(memberIdValue).toHaveTextContent("12345");
    const groupIdTitle = screen.getByTestId("group-id");
    expect(groupIdTitle).toBeInTheDocument();
    expect(groupIdTitle).toHaveTextContent("Group ID");
    const groupIdValue = screen.getByTestId("group-id-value");
    expect(groupIdValue).toBeInTheDocument();
    expect(groupIdValue).toHaveTextContent("111");
    const contactDetailsTitle = screen.getByTestId("payer-contact-number");
    expect(contactDetailsTitle).toBeInTheDocument();
    expect(contactDetailsTitle).toHaveTextContent("Payer Contact Number");
    const contactDetailsValue = screen.getByTestId(
      "payer-contact-number-value"
    );
    expect(contactDetailsValue).toBeInTheDocument();
    expect(contactDetailsValue).toHaveTextContent("832-940-5422 x123");
    const relationshipTitle = screen.getByTestId("relationship-to-insured");
    expect(relationshipTitle).toBeInTheDocument();
    expect(relationshipTitle).toHaveTextContent("Relationship to Insured");
    const relationshipValue = screen.getByTestId(
      "relationship-to-insured-value"
    );
    expect(relationshipValue).toBeInTheDocument();
    expect(relationshipValue).toHaveTextContent("self");
  });

  it("Insurance review order component validate insurance type as medicare advantage for secondary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    const data = newOrderData.secondaryInsurance;
    data.insuranceTypeCode.value = "Medicare Advantage";
    data.medicareAdvantage.payerName.value = "Rahul Patil";
    data.medicareAdvantage.memberID.value = "12345";
    data.medicareAdvantage.groupID.value = "111";
    data.medicareAdvantage.relationShipInsured.value = "self";
    data.medicareAdvantage.extension.value = "123";
    data.medicareAdvantage.payerContactNumber.value = "832-940-5422";
    const typeSecondary = {
      medicare: false,
      medicareAdvantage: true,
      managedMedicaid: false,
      commercialInsurance: false,
      medicaid: false,
      charityCare: false,
      privatePay: false,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={true}
          type={typeSecondary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const payerNameTitle = screen.getByTestId("payer-name");
    expect(payerNameTitle).toBeInTheDocument();
    expect(payerNameTitle).toHaveTextContent("Payer Name");
    const payerNameValue = screen.getByTestId("payer-name-value");
    expect(payerNameValue).toBeInTheDocument();
    expect(payerNameValue).toHaveTextContent("Rahul Patil");
    const payerTypeTitle = screen.getByTestId("payer-type");
    expect(payerTypeTitle).toBeInTheDocument();
    expect(payerTypeTitle).toHaveTextContent("Payer Type");
    const payerTypeValue = screen.getByTestId("payer-type-value");
    expect(payerTypeValue).toBeInTheDocument();
    expect(payerTypeValue).toHaveTextContent("Medicare Advantage");
    const memberIdTitle = screen.getByTestId("member-id");
    expect(memberIdTitle).toBeInTheDocument();
    expect(memberIdTitle).toHaveTextContent("Member ID");
    const memberIdValue = screen.getByTestId("member-id-value");
    expect(memberIdValue).toBeInTheDocument();
    expect(memberIdValue).toHaveTextContent("12345");
    const groupIdTitle = screen.getByTestId("group-id");
    expect(groupIdTitle).toBeInTheDocument();
    expect(groupIdTitle).toHaveTextContent("Group ID");
    const groupIdValue = screen.getByTestId("group-id-value");
    expect(groupIdValue).toBeInTheDocument();
    expect(groupIdValue).toHaveTextContent("111");
    const contactDetailsTitle = screen.getByTestId("payer-contact-number");
    expect(contactDetailsTitle).toBeInTheDocument();
    expect(contactDetailsTitle).toHaveTextContent("Payer Contact Number");
    const contactDetailsValue = screen.getByTestId(
      "payer-contact-number-value"
    );
    expect(contactDetailsValue).toBeInTheDocument();
    expect(contactDetailsValue).toHaveTextContent("832-940-5422 x123");
    const relationshipTitle = screen.getByTestId("relationship-to-insured");
    expect(relationshipTitle).toBeInTheDocument();
    expect(relationshipTitle).toHaveTextContent("Relationship to Insured");
    const relationshipValue = screen.getByTestId(
      "relationship-to-insured-value"
    );
    expect(relationshipValue).toBeInTheDocument();
    expect(relationshipValue).toHaveTextContent("self");
  });

  it("Insurance review order component validate insurance type as managed medicaid for primary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    const data = newOrderData.primaryInsurance;
    data.insuranceTypeCode.value = "Managed Medicaid";
    data.managedMedicaid.payerName.value = "Rahul Patil";
    data.managedMedicaid.memberID.value = "12345";
    data.managedMedicaid.groupID.value = "111";
    data.managedMedicaid.relationShipInsured.value = "self";
    data.managedMedicaid.extension.value = "123";
    data.managedMedicaid.payerContactNumber.value = "832-940-5422";
    const typePrimary = {
      medicare: false,
      medicareAdvantage: false,
      managedMedicaid: true,
      commercialInsurance: false,
      medicaid: false,
      charityCare: false,
      privatePay: false,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={true}
          type={typePrimary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const payerNameTitle = screen.getByTestId("payer-name");
    expect(payerNameTitle).toBeInTheDocument();
    expect(payerNameTitle).toHaveTextContent("Payer Name");
    const payerNameValue = screen.getByTestId("payer-name-value");
    expect(payerNameValue).toBeInTheDocument();
    expect(payerNameValue).toHaveTextContent("Rahul Patil");
    const payerTypeTitle = screen.getByTestId("payer-type");
    expect(payerTypeTitle).toBeInTheDocument();
    expect(payerTypeTitle).toHaveTextContent("Payer Type");
    const payerTypeValue = screen.getByTestId("payer-type-value");
    expect(payerTypeValue).toBeInTheDocument();
    expect(payerTypeValue).toHaveTextContent("Managed Medicaid");
    const memberIdTitle = screen.getByTestId("member-id");
    expect(memberIdTitle).toBeInTheDocument();
    expect(memberIdTitle).toHaveTextContent("Member ID");
    const memberIdValue = screen.getByTestId("member-id-value");
    expect(memberIdValue).toBeInTheDocument();
    expect(memberIdValue).toHaveTextContent("12345");
    const groupIdTitle = screen.getByTestId("group-id");
    expect(groupIdTitle).toBeInTheDocument();
    expect(groupIdTitle).toHaveTextContent("Group ID");
    const groupIdValue = screen.getByTestId("group-id-value");
    expect(groupIdValue).toBeInTheDocument();
    expect(groupIdValue).toHaveTextContent("111");
    const contactDetailsTitle = screen.getByTestId("payer-contact-number");
    expect(contactDetailsTitle).toBeInTheDocument();
    expect(contactDetailsTitle).toHaveTextContent("Payer Contact Number");
    const contactDetailsValue = screen.getByTestId(
      "payer-contact-number-value"
    );
    expect(contactDetailsValue).toBeInTheDocument();
    expect(contactDetailsValue).toHaveTextContent("832-940-5422 x123");
    const relationshipTitle = screen.getByTestId("relationship-to-insured");
    expect(relationshipTitle).toBeInTheDocument();
    expect(relationshipTitle).toHaveTextContent("Relationship to Insured");
    const relationshipValue = screen.getByTestId(
      "relationship-to-insured-value"
    );
    expect(relationshipValue).toBeInTheDocument();
    expect(relationshipValue).toHaveTextContent("self");
  });

  it("Insurance review order component validate insurance type as managed medicaid for secondary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    const data = newOrderData.secondaryInsurance;
    data.insuranceTypeCode.value = "Managed Medicaid";
    data.managedMedicaid.payerName.value = "Rahul Patil";
    data.managedMedicaid.memberID.value = "12345";
    data.managedMedicaid.groupID.value = "111";
    data.managedMedicaid.relationShipInsured.value = "self";
    data.managedMedicaid.extension.value = "123";
    data.managedMedicaid.payerContactNumber.value = "832-940-5422";
    const typeSecondary = {
      medicare: false,
      medicareAdvantage: false,
      managedMedicaid: true,
      commercialInsurance: false,
      medicaid: false,
      charityCare: false,
      privatePay: false,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={true}
          type={typeSecondary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const payerNameTitle = screen.getByTestId("payer-name");
    expect(payerNameTitle).toBeInTheDocument();
    expect(payerNameTitle).toHaveTextContent("Payer Name");
    const payerNameValue = screen.getByTestId("payer-name-value");
    expect(payerNameValue).toBeInTheDocument();
    expect(payerNameValue).toHaveTextContent("Rahul Patil");
    const payerTypeTitle = screen.getByTestId("payer-type");
    expect(payerTypeTitle).toBeInTheDocument();
    expect(payerTypeTitle).toHaveTextContent("Payer Type");
    const payerTypeValue = screen.getByTestId("payer-type-value");
    expect(payerTypeValue).toBeInTheDocument();
    expect(payerTypeValue).toHaveTextContent("Managed Medicaid");
    const memberIdTitle = screen.getByTestId("member-id");
    expect(memberIdTitle).toBeInTheDocument();
    expect(memberIdTitle).toHaveTextContent("Member ID");
    const memberIdValue = screen.getByTestId("member-id-value");
    expect(memberIdValue).toBeInTheDocument();
    expect(memberIdValue).toHaveTextContent("12345");
    const groupIdTitle = screen.getByTestId("group-id");
    expect(groupIdTitle).toBeInTheDocument();
    expect(groupIdTitle).toHaveTextContent("Group ID");
    const groupIdValue = screen.getByTestId("group-id-value");
    expect(groupIdValue).toBeInTheDocument();
    expect(groupIdValue).toHaveTextContent("111");
    const contactDetailsTitle = screen.getByTestId("payer-contact-number");
    expect(contactDetailsTitle).toBeInTheDocument();
    expect(contactDetailsTitle).toHaveTextContent("Payer Contact Number");
    const contactDetailsValue = screen.getByTestId(
      "payer-contact-number-value"
    );
    expect(contactDetailsValue).toBeInTheDocument();
    expect(contactDetailsValue).toHaveTextContent("832-940-5422 x123");
    const relationshipTitle = screen.getByTestId("relationship-to-insured");
    expect(relationshipTitle).toBeInTheDocument();
    expect(relationshipTitle).toHaveTextContent("Relationship to Insured");
    const relationshipValue = screen.getByTestId(
      "relationship-to-insured-value"
    );
    expect(relationshipValue).toBeInTheDocument();
    expect(relationshipValue).toHaveTextContent("self");
  });

  it("Insurance review order component validate insurance type as commercial insurance for primary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    const data = newOrderData.primaryInsurance;
    data.insuranceTypeCode.value = "Commercial Insurance";
    data.commercialInsurance.payerName.value = "Rahul Patil";
    data.commercialInsurance.memberID.value = "12345";
    data.commercialInsurance.groupID.value = "111";
    data.commercialInsurance.relationShipInsured.value = "self";
    data.commercialInsurance.extension.value = "123";
    data.commercialInsurance.payerContactNumber.value = "832-940-5422";
    const typePrimary = {
      medicare: false,
      medicareAdvantage: false,
      managedMedicaid: false,
      commercialInsurance: true,
      medicaid: false,
      charityCare: false,
      privatePay: false,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={true}
          type={typePrimary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const payerNameTitle = screen.getByTestId("payer-name");
    expect(payerNameTitle).toBeInTheDocument();
    expect(payerNameTitle).toHaveTextContent("Payer Name");
    const payerNameValue = screen.getByTestId("payer-name-value");
    expect(payerNameValue).toBeInTheDocument();
    expect(payerNameValue).toHaveTextContent("Rahul Patil");
    const payerTypeTitle = screen.getByTestId("payer-type");
    expect(payerTypeTitle).toBeInTheDocument();
    expect(payerTypeTitle).toHaveTextContent("Payer Type");
    const payerTypeValue = screen.getByTestId("payer-type-value");
    expect(payerTypeValue).toBeInTheDocument();
    expect(payerTypeValue).toHaveTextContent("Commercial Insurance");
    const memberIdTitle = screen.getByTestId("member-id");
    expect(memberIdTitle).toBeInTheDocument();
    expect(memberIdTitle).toHaveTextContent("Member ID");
    const memberIdValue = screen.getByTestId("member-id-value");
    expect(memberIdValue).toBeInTheDocument();
    expect(memberIdValue).toHaveTextContent("12345");
    const groupIdTitle = screen.getByTestId("group-id");
    expect(groupIdTitle).toBeInTheDocument();
    expect(groupIdTitle).toHaveTextContent("Group ID");
    const groupIdValue = screen.getByTestId("group-id-value");
    expect(groupIdValue).toBeInTheDocument();
    expect(groupIdValue).toHaveTextContent("111");
    const contactDetailsTitle = screen.getByTestId("payer-contact-number");
    expect(contactDetailsTitle).toBeInTheDocument();
    expect(contactDetailsTitle).toHaveTextContent("Payer Contact Number");
    const contactDetailsValue = screen.getByTestId(
      "payer-contact-number-value"
    );
    expect(contactDetailsValue).toBeInTheDocument();
    expect(contactDetailsValue).toHaveTextContent("832-940-5422 x123");
    const relationshipTitle = screen.getByTestId("relationship-to-insured");
    expect(relationshipTitle).toBeInTheDocument();
    expect(relationshipTitle).toHaveTextContent("Relationship to Insured");
    const relationshipValue = screen.getByTestId(
      "relationship-to-insured-value"
    );
    expect(relationshipValue).toBeInTheDocument();
    expect(relationshipValue).toHaveTextContent("self");
  });

  it("Insurance review order component validate insurance type as commercial insurance for secondary", () => {
    const newOrderData = getDeepClone(newOrderTestData);
    const data = newOrderData.secondaryInsurance;
    data.insuranceTypeCode.value = "Commercial Insurance";
    data.commercialInsurance.payerName.value = "Rahul Patil";
    data.commercialInsurance.memberID.value = "12345";
    data.commercialInsurance.groupID.value = "111";
    data.commercialInsurance.relationShipInsured.value = "self";
    data.commercialInsurance.extension.value = "123";
    data.commercialInsurance.payerContactNumber.value = "832-940-5422";
    const typeSecondary = {
      medicare: false,
      medicareAdvantage: false,
      managedMedicaid: false,
      commercialInsurance: true,
      medicaid: false,
      charityCare: false,
      privatePay: false,
      otherAdditionalDetails: false,
    };
    render(
      <NewOrderContext.Provider
        value={{
          ...getMockNewOrderData(),
        }}
      >
        <InsuranceReviewOrder
          data={data}
          editButtonClicked={jest.fn()}
          insuranceTypes={[]}
          isPrimaryComponent={true}
          type={typeSecondary}
          newOrderData={newOrderData}
        />
      </NewOrderContext.Provider>
    );
    const payerNameTitle = screen.getByTestId("payer-name");
    expect(payerNameTitle).toBeInTheDocument();
    expect(payerNameTitle).toHaveTextContent("Payer Name");
    const payerNameValue = screen.getByTestId("payer-name-value");
    expect(payerNameValue).toBeInTheDocument();
    expect(payerNameValue).toHaveTextContent("Rahul Patil");
    const payerTypeTitle = screen.getByTestId("payer-type");
    expect(payerTypeTitle).toBeInTheDocument();
    expect(payerTypeTitle).toHaveTextContent("Payer Type");
    const payerTypeValue = screen.getByTestId("payer-type-value");
    expect(payerTypeValue).toBeInTheDocument();
    expect(payerTypeValue).toHaveTextContent("Commercial Insurance");
    const memberIdTitle = screen.getByTestId("member-id");
    expect(memberIdTitle).toBeInTheDocument();
    expect(memberIdTitle).toHaveTextContent("Member ID");
    const memberIdValue = screen.getByTestId("member-id-value");
    expect(memberIdValue).toBeInTheDocument();
    expect(memberIdValue).toHaveTextContent("12345");
    const groupIdTitle = screen.getByTestId("group-id");
    expect(groupIdTitle).toBeInTheDocument();
    expect(groupIdTitle).toHaveTextContent("Group ID");
    const groupIdValue = screen.getByTestId("group-id-value");
    expect(groupIdValue).toBeInTheDocument();
    expect(groupIdValue).toHaveTextContent("111");
    const contactDetailsTitle = screen.getByTestId("payer-contact-number");
    expect(contactDetailsTitle).toBeInTheDocument();
    expect(contactDetailsTitle).toHaveTextContent("Payer Contact Number");
    const contactDetailsValue = screen.getByTestId(
      "payer-contact-number-value"
    );
    expect(contactDetailsValue).toBeInTheDocument();
    expect(contactDetailsValue).toHaveTextContent("832-940-5422 x123");
    const relationshipTitle = screen.getByTestId("relationship-to-insured");
    expect(relationshipTitle).toBeInTheDocument();
    expect(relationshipTitle).toHaveTextContent("Relationship to Insured");
    const relationshipValue = screen.getByTestId(
      "relationship-to-insured-value"
    );
    expect(relationshipValue).toBeInTheDocument();
    expect(relationshipValue).toHaveTextContent("self");
  });
});
