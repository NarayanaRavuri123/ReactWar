import { useEffect, useState } from "react";
import { format } from "react-string-format";
import { CustomDropDown } from "../../../core/customDropdown/customDropdown.component";
import { InputWithLabel } from "../../../core/inputWithLabel/inputWithLabel.component";

import { getdropDownContent } from "../../../util/dropDownService";
import { DD_RESUPPLY_JUSTIFICATION } from "../../../util/staticText";
import { ISupplyOrder } from "../supplyOrder.interface";
import { SupplyOrderValidator } from "../supplyOrder.validator";
import "./reSupplyJustification.css";
import { ValidationStatus } from "../../../core/interfaces/input.interface";
import ReSupplyJustificationReviewOrder from "./reviewOrder/reSupplyJustificationReviewOrder.component";
import {
  getCodeFromText,
  getTextFromCode,
} from "../../../util/utilityFunctions";
import { Grid } from "@mui/material";

export interface IcurrentSuppliesOnHand {
  data: ISupplyOrder;
  setData: any;
  Validator?: SupplyOrderValidator;
  isReviewOrder: boolean;
  openSupplyOrderPageEdit: any;
}

export const ReSupplyJustification = ({
  data,
  setData,
  Validator,
  isReviewOrder,
  openSupplyOrderPageEdit,
}: IcurrentSuppliesOnHand) => {
  const [resupplyJustification, setResupplyJustification] = useState([]);
  const [resupplyJustificationText, setResupplyJustificationText] = useState(
    []
  );

  const [validator] = useState<SupplyOrderValidator>(Validator!);
  useEffect(() => {
    fetchResupplyJustificationContent();
  }, []);

  const fetchResupplyJustificationContent = async () => {
    //async and await
    try {
      const ddContent = format("{0}", DD_RESUPPLY_JUSTIFICATION);
      const data = await getdropDownContent(ddContent);
      if (data.items.length > 0) {
        const commonDocObject = data.items.filter(
          (item: { name: string }) => item.name === DD_RESUPPLY_JUSTIFICATION
        );
        const reSupplyObj = commonDocObject[0].data.sort(
          (a: { order: number }, b: { order: number }) =>
            a.order > b.order ? 1 : -1
        );
        const reSupplyText = reSupplyObj.map((x: { text: any }) => x.text);
        setResupplyJustificationText(reSupplyText);
        setResupplyJustification(reSupplyObj);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const validateAndSetData = (e: any) => {
    const val = e.target.value;
    const isValid = validator.validate(val, e.target.name);
    const value = getCodeFromText(resupplyJustification, e.target.value);
    setData(
      Object.assign({}, data, {
        [e.target.name]: {
          value: value,
          valid: isValid?.status,
        },
      })
    );
  };

  return (
    <div>
      {!isReviewOrder && (
        <>
          <div
            className="resupplyJustificationTitle"
            data-testid="resupplyJustificationTest"
          >
            Choose a Resupply Justification{" "}
          </div>
          <Grid
            className="resupplyJustificatio-grid-container"
            container
            spacing={2}
          >
            <Grid className="resupplyJustificatio-grid-item" item xs={6}>
              <div className="resupplyJustificationDropdown">
                <InputWithLabel
                  label="Resupply Justification"
                  isRequired={true}
                  error={
                    data.resupplyJustification.valid ===
                    ValidationStatus.INVALID
                  }
                  testId="resupplyJustificationlabelTest"
                >
                  <CustomDropDown
                    handleChange={validateAndSetData}
                    dropDownMenuObj={resupplyJustification}
                    hasBothCodeValue={true}
                    menuItem={[]}
                    name="resupplyJustification"
                    placeHolder="Select justification"
                    selectpropsClassName={
                      data.resupplyJustification.value
                        ? "resupplyJustification-select"
                        : "placeHolder"
                    }
                    selectClassName={
                      data.resupplyJustification.value
                        ? "resupplyJustification-input"
                        : "placeHolder"
                    }
                    testId="resupplyJustificationDropDownTest"
                    value={
                      data?.resupplyJustification.value
                        ? getTextFromCode(
                            resupplyJustification,
                            data?.resupplyJustification.value
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
        <ReSupplyJustificationReviewOrder
          data={data}
          openSupplyOrderPageEdit={openSupplyOrderPageEdit}
        />
      )}
    </div>
  );
};
