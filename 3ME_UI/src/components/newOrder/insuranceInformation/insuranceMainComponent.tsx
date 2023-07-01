import {
  NewOrderContext,
  NewOrderContextType,
} from "../../../context/NewOrderContext";
import { Button, Grid } from "@mui/material";
import { format } from "react-string-format";
import AddIcon from "@mui/icons-material/Add";
import { INewOrder } from "../newOrder.interface";
import RemoveIcon from "@mui/icons-material/Remove";
import { useContext, useEffect, useState } from "react";
import "./insuranceInformation/insuranceInformation.css";
import { DD_INSURED_RELATION } from "../../../util/staticText";
import { getdropDownContent } from "../../../util/dropDownService";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import PrivatePay from "./dynamicComponents/privatePay/privatePay.component";
import { OtherDescription } from "./dynamicComponents/other/otherDesc.component";
import PayerDetails from "./dynamicComponents/payerDetails/payerDetails.component";
import { CharityCare } from "./dynamicComponents/charityCare/charityCare.Component";
import { InsuranceReviewOrder } from "./reviewOrder/insuranceReviewOrder.component";
import { IInsuranceMainInfo } from "./insuranceInformation/insuranceInformation.interface";
import PayerAllDetails from "./dynamicComponents/payerAllDetails/PayerAllDetails.component";
import { InsuranceInformation } from "./insuranceInformation/insuranceInformation.component";
import { InsuranceInformationValidator } from "./insuranceInformation/insuranceInformation.validator";

export const InsuranceMainComponent = ({
  data,
  setData,
  hideAddButton,
  addOrRemoveButtonAction,
  dropDownDataArray,
  dropDownTextArray,
  vacTherapyInformationData,
  isReviewOrder,
  primaryEdiitButtonClicked,
  secondaryEditButtonClicked,
  isOrderSummary,
  showAdditionalFields,
}: IInsuranceMainInfo) => {
  const newOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const [validator] = useState<InsuranceInformationValidator>(
    new InsuranceInformationValidator()
  );
  const [insuredRelation, setInsuredRelation] = useState([]);

  useEffect(() => {
    fetchDropDownContent();
  }, []);

  const fetchDropDownContent = async () => {
    //async and await
    try {
      const ddContent = format("{0}", DD_INSURED_RELATION);
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const insuredRelationObj = data.items.filter(
          (item: { name: string }) => item.name === DD_INSURED_RELATION
        );
        const insuredRelationData = insuredRelationObj[0].data
          .sort((a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
          )
          .map((x: { code: any }) => x.code);
        setInsuredRelation(insuredRelationData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const validateAndSetData = (e: any, isPrimary: boolean) => {
    newOrderObj?.setIsHandleChangeTriggered(true);
    const { value, name } = e.target;
    const isValid = validator.validate(value, name);
    if (isPrimary) {
      setData((dt: INewOrder) => ({
        ...dt,
        primaryInsurance: {
          insuranceType: dt.primaryInsurance.insuranceType,
          insuranceTypeCode: dt.primaryInsurance.insuranceTypeCode,
          [name]: {
            value: value,
            valid: isValid?.status,
            required: true,
            isOptional: false,
          },
        },
      }));
    } else {
      setData((dt: INewOrder) => ({
        ...dt,
        secondaryInsurance: {
          insuranceType: dt.secondaryInsurance.insuranceType,
          insuranceTypeCode: dt.secondaryInsurance.insuranceTypeCode,
          [name]: {
            value: value,
            valid: isValid?.status,
            required: true,
            isOptional: false,
          },
        },
      }));
    }
  };

  const editButtonAction = (isPrimaryComponent: Boolean) => {
    if (isPrimaryComponent) {
      primaryEdiitButtonClicked();
    } else {
      secondaryEditButtonClicked();
    }
  };

  return (
    <div className="insuranceInformationMain">
      <div className="insuranceInformationMain-primary">
        {!isReviewOrder && (
          <div>
            <InsuranceInformation
              data={data}
              setData={setData}
              isPrimaryComponent={true}
              dropDownDataArray={dropDownDataArray}
              dropDownTextArray={dropDownTextArray}
            />
            {showAdditionalFields.typePrimary.medicare && (
              <PayerDetails
                data={data}
                setData={setData}
                isPrimaryComponent={true}
                insuranceTypeSelected="medicare"
                insuredRelation={insuredRelation}
              />
            )}
            {showAdditionalFields.typePrimary.medicaid && (
              <PayerDetails
                data={data}
                setData={setData}
                isPrimaryComponent={true}
                insuranceTypeSelected="medicaid"
                insuredRelation={insuredRelation}
              />
            )}
            {showAdditionalFields.typePrimary.medicareAdvantage && (
              <PayerAllDetails
                data={data}
                setData={setData}
                isPrimaryComponent={true}
                insuranceTypeSelected="medicareAdvantage"
                insuredRelation={insuredRelation}
              />
            )}
            {showAdditionalFields.typePrimary.managedMedicaid && (
              <PayerAllDetails
                data={data}
                setData={setData}
                isPrimaryComponent={true}
                insuranceTypeSelected="managedMedicaid"
                insuredRelation={insuredRelation}
              />
            )}
            {showAdditionalFields.typePrimary.commercialInsurance && (
              <PayerAllDetails
                data={data}
                setData={setData}
                isPrimaryComponent={true}
                insuredRelation={insuredRelation}
                insuranceTypeSelected="commercialInsurance"
              />
            )}
            {showAdditionalFields.typePrimary.charityCare &&
              vacTherapyInformationData !== undefined && (
                <CharityCare
                  charitycareData={vacTherapyInformationData.charityCarePdf}
                />
              )}
            {showAdditionalFields.typePrimary.privatePay && <PrivatePay />}
            {showAdditionalFields.typePrimary.otherAdditionalDetails && (
              <OtherDescription
                error={
                  data.primaryInsurance.otherAdditionalDetails.valid ===
                  ValidationStatus.INVALID
                }
                value={data.primaryInsurance.otherAdditionalDetails.value}
                required={
                  data.primaryInsurance.otherAdditionalDetails.required!
                }
                onChange={validateAndSetData}
                primary={true}
              />
            )}
          </div>
        )}
        {isReviewOrder && (
          <InsuranceReviewOrder
            data={data.primaryInsurance}
            editButtonClicked={() => editButtonAction(true)}
            insuranceTypes={dropDownDataArray}
            isPrimaryComponent={true}
            newOrderData={data}
            type={showAdditionalFields.typePrimary}
            isOrderSummary={isOrderSummary}
          />
        )}
      </div>
      {data?.isSecondaryInsurancePresent.value && (
        <div className="insuranceInformationMain-secondary">
          {!isReviewOrder && (
            <div>
              <InsuranceInformation
                data={data}
                setData={setData}
                isPrimaryComponent={false}
                dropDownDataArray={dropDownDataArray}
                dropDownTextArray={dropDownTextArray}
              />
              {showAdditionalFields.typeSecondary.privatePay && <PrivatePay />}
              {showAdditionalFields.typeSecondary.charityCare &&
                vacTherapyInformationData !== undefined && (
                  <CharityCare
                    charitycareData={vacTherapyInformationData.charityCarePdf}
                  />
                )}
              {showAdditionalFields.typeSecondary.medicare && (
                <PayerDetails
                  insuranceTypeSelected="medicare"
                  data={data}
                  setData={setData}
                  isPrimaryComponent={false}
                  insuredRelation={insuredRelation}
                />
              )}
              {showAdditionalFields.typeSecondary.medicaid && (
                <PayerDetails
                  insuranceTypeSelected="medicaid"
                  data={data}
                  setData={setData}
                  isPrimaryComponent={false}
                  insuredRelation={insuredRelation}
                />
              )}
              {showAdditionalFields.typeSecondary.medicareAdvantage && (
                <PayerAllDetails
                  data={data}
                  setData={setData}
                  isPrimaryComponent={false}
                  insuranceTypeSelected="medicareAdvantage"
                  insuredRelation={insuredRelation}
                />
              )}
              {showAdditionalFields.typeSecondary.managedMedicaid && (
                <PayerAllDetails
                  data={data}
                  setData={setData}
                  isPrimaryComponent={false}
                  insuranceTypeSelected="managedMedicaid"
                  insuredRelation={insuredRelation}
                />
              )}
              {showAdditionalFields.typeSecondary.commercialInsurance && (
                <PayerAllDetails
                  data={data}
                  setData={setData}
                  isPrimaryComponent={false}
                  insuranceTypeSelected="commercialInsurance"
                  insuredRelation={insuredRelation}
                />
              )}
              {showAdditionalFields.typeSecondary.otherAdditionalDetails && (
                <OtherDescription
                  error={
                    data.secondaryInsurance.otherAdditionalDetails.valid ===
                    ValidationStatus.INVALID
                  }
                  value={data.secondaryInsurance.otherAdditionalDetails.value}
                  required={
                    data.secondaryInsurance.otherAdditionalDetails.required!
                  }
                  onChange={validateAndSetData}
                  primary={false}
                />
              )}
            </div>
          )}
          {isReviewOrder && (
            <InsuranceReviewOrder
              data={data.secondaryInsurance}
              editButtonClicked={() => editButtonAction(false)}
              insuranceTypes={dropDownDataArray}
              isPrimaryComponent={false}
              newOrderData={data}
              type={showAdditionalFields.typeSecondary}
              isOrderSummary={isOrderSummary}
            />
          )}
        </div>
      )}
      {!isReviewOrder && (
        <Grid className="secondaryBtnGrid">
          <Grid item xs={12}>
            <Button
              classes={{
                text: hideAddButton
                  ? "insurance-informantion-button remove-button"
                  : "insurance-informantion-button add-button",
              }}
              data-testid="insurance-informantion-addOrRemove-button"
              onClick={addOrRemoveButtonAction}
              startIcon={
                !hideAddButton ? (
                  <AddIcon classes={{ root: "addOrRemove-icon" }} />
                ) : (
                  <RemoveIcon classes={{ root: "addOrRemove-icon" }} />
                )
              }
            >
              {`${!hideAddButton ? "Add " : "Remove "}Secondary Insurance`}
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
