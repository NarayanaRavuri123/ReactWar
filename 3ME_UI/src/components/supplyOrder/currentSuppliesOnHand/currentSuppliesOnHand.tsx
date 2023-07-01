import { Grid } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { format } from "react-string-format";
import { CustomDropDown } from "../../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import QuantityButton from "../../../core/quantityButton/quantityButton.component";
import { getdropDownContent } from "../../../util/dropDownService";
import { DD_DRESSING_CHANGE_FREQUENCY } from "../../../util/staticText";
import {
  getCodeFromText,
  getTextFromCode,
} from "../../../util/utilityFunctions";
import { ISupplyOrder } from "../supplyOrder.interface";
import { SupplyOrderValidator } from "../supplyOrder.validator";
import "./currentSuppliesOnHand.css";
import CurrentSuppliesOnHandReviewOrder from "./reviewOrder/currentSuppliesOnHandReviewOrder.component";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../../context/SupplyOrderContext";

export interface IcurrentSuppliesOnHand {
  data: ISupplyOrder;
  setData: any;
  Validator?: SupplyOrderValidator;
  isReviewOrder: boolean;
  openSupplyOrderPageEdit: any;
}

export const CurrentSuppliesOnHand = ({
  data,
  setData,
  Validator,
  isReviewOrder,
  openSupplyOrderPageEdit,
}: IcurrentSuppliesOnHand) => {
  const [changeFrequency, setChangeFrequency] = useState([]);
  const [changeFrequencyText, setChangeFrequencyText] = useState([]);
  const SupplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const [validator] = useState<SupplyOrderValidator>(Validator!);
  useEffect(() => {
    fetchDressingChangeFrequencyContent();
  }, []);

  const fetchDressingChangeFrequencyContent = async () => {
    //async and await
    try {
      const ddContent = format("{0}", DD_DRESSING_CHANGE_FREQUENCY);
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const commonDocObject = data.items.filter(
          (item: { name: string }) => item.name === DD_DRESSING_CHANGE_FREQUENCY
        );
        const commonDocArray = commonDocObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        setChangeFrequency(commonDocArray);
        setChangeFrequencyText(
          commonDocArray.map((x: { text: string }) => x.text)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const validateAndSetData = (e: any) => {
    const val = e.target.value;
    const isValid = validator.validate(val, e.target.name);
    const value = getCodeFromText(changeFrequency, e.target.value);
    setData(
      Object.assign({}, data, {
        [e.target.name]: {
          value: value,
          valid: isValid?.status,
        },
      })
    );
  };

  const handleVacDressingPlusClick = () => {
    SupplyOrderObj?.setIsVacDressingMinusDisabled(false);
    SupplyOrderObj?.setIsVacDressingPlusDisabled(false);
    const dressingPlus =
      parseInt(data?.currentSuppliesVacDressingQuantity.value) + 1;
    if (dressingPlus === 3) {
      SupplyOrderObj?.setIsVacDressingPlusDisabled(true);
    }
    setData(
      Object.assign({}, data, {
        currentSuppliesVacDressingQuantity: {
          value: dressingPlus.toString(),
          valid: ValidationStatus.VALID,
        },
      })
    );
  };
  const handleVacDressingMinusClick = () => {
    SupplyOrderObj?.setIsVacDressingMinusDisabled(false);
    const dressingPlus =
      parseInt(data?.currentSuppliesVacDressingQuantity.value) - 1;
    if (dressingPlus === 0) {
      SupplyOrderObj?.setIsVacDressingMinusDisabled(true);
    }
    if (dressingPlus < 3) {
      SupplyOrderObj?.setIsVacDressingPlusDisabled(false);
    }
    setData(
      Object.assign({}, data, {
        currentSuppliesVacDressingQuantity: {
          value: dressingPlus.toString(),
          valid: ValidationStatus.VALID,
        },
      })
    );
  };

  const handleCannisterDressingPlusClick = () => {
    SupplyOrderObj?.setIsVacCannisterMinusDisabled(false);
    SupplyOrderObj?.setIsVacCannisterPlusDisabled(false);
    const dressingPlus =
      parseInt(data?.currentSuppliesVacCannisterQuantity.value) + 1;
    if (dressingPlus === 3) {
      SupplyOrderObj?.setIsVacCannisterPlusDisabled(true);
    }
    setData(
      Object.assign({}, data, {
        currentSuppliesVacCannisterQuantity: {
          value: dressingPlus.toString(),
          valid: ValidationStatus.VALID,
        },
      })
    );
  };
  const handleCannisterDressingMinusClick = () => {
    SupplyOrderObj?.setIsVacCannisterMinusDisabled(false);
    const dressingPlus =
      parseInt(data?.currentSuppliesVacCannisterQuantity.value) - 1;
    if (dressingPlus === 0) {
      SupplyOrderObj?.setIsVacCannisterMinusDisabled(true);
    }
    if (dressingPlus < 3) {
      SupplyOrderObj?.setIsVacCannisterPlusDisabled(false);
    }
    setData(
      Object.assign({}, data, {
        currentSuppliesVacCannisterQuantity: {
          value: dressingPlus.toString(),
          valid: ValidationStatus.VALID,
        },
      })
    );
  };
  return (
    <div>
      {!isReviewOrder && (
        <>
          <div
            className="currentSuppliesTitle"
            data-testid="currentsuppliesTitleTest"
          >
            Current Supplies on Hand{" "}
          </div>
          <Grid className="currentMainGrid">
            <Grid item xs={8.5}>
              <label
                className="currentSuppliesLabel"
                data-testid="vacdressingTest"
              >
                Individual 3M™ V.A.C.® Dressings
                <span style={{ color: "red", marginLeft: "3px" }}>*</span>
              </label>
            </Grid>
            <Grid item xs={3}>
              <QuantityButton
                value={data.currentSuppliesVacDressingQuantity.value}
                onPlusClick={handleVacDressingPlusClick}
                onMinusClick={handleVacDressingMinusClick}
                isPlusDisabled={SupplyOrderObj?.isVacDressingPlusDisabled}
                isMinusDisabled={SupplyOrderObj?.isVacDressingMinusDisabled}
                showLabel={true}
              />
            </Grid>
          </Grid>
          <Grid className="currentMainGrid cannister">
            <Grid item xs={8.5}>
              <label
                className="currentSuppliesLabel"
                data-testid="cannisterDressingTest"
              >
                Individual 3M™ V.A.C.® Canisters
                <span style={{ color: "red", marginLeft: "3px" }}>*</span>
              </label>
            </Grid>
            <Grid item className="supplyButton" xs={3}>
              <QuantityButton
                value={data.currentSuppliesVacCannisterQuantity.value}
                onPlusClick={handleCannisterDressingPlusClick}
                onMinusClick={handleCannisterDressingMinusClick}
                isPlusDisabled={SupplyOrderObj?.isVacCannisterPlusDisabled}
                isMinusDisabled={SupplyOrderObj?.isVacCannisterMinusDisabled}
                showLabel={false}
              />
            </Grid>
          </Grid>
          <Grid className="currentMainGrid" container spacing={2}>
            <Grid item xs={6}>
              <div className="changeFrequencyDropdown">
                <InputWithLabel
                  label="Dressing Change Frequency"
                  isRequired={true}
                  error={
                    data.dressingChangeFrequency.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="dressinglabelTest"
                >
                  <CustomDropDown
                    handleChange={validateAndSetData}
                    menuItem={changeFrequencyText}
                    name="dressingChangeFrequency"
                    placeHolder="Select times per week"
                    selectpropsClassName={
                      data.dressingChangeFrequency.value
                        ? "changeFrequency-select"
                        : "placeHolder"
                    }
                    selectClassName={
                      data.dressingChangeFrequency.value
                        ? "changeFrequency-input"
                        : "placeHolder"
                    }
                    testId=""
                    value={
                      data?.dressingChangeFrequency.value
                        ? getTextFromCode(
                            changeFrequency,
                            data?.dressingChangeFrequency.value
                          )
                        : null
                    }
                  />
                </InputWithLabel>
              </div>
            </Grid>
          </Grid>
        </>
      )}
      {isReviewOrder && (
        <CurrentSuppliesOnHandReviewOrder
          data={data}
          openSupplyOrderPageEdit={openSupplyOrderPageEdit}
        />
      )}
    </div>
  );
};
