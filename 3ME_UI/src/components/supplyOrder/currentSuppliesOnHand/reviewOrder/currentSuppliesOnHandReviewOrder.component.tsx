import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { format } from "react-string-format";
import { getdropDownContent } from "../../../../util/dropDownService";
import { DD_DRESSING_CHANGE_FREQUENCY } from "../../../../util/staticText";
import { getTextFromCode } from "../../../../util/utilityFunctions";
import { ISupplyOrder } from "../../supplyOrder.interface";
import "./currentSuppliesOnHandReviewOrder.css";

type Props = {
  data: ISupplyOrder;
  openSupplyOrderPageEdit?: any;
  isOrderSummary?: boolean;
};

const CurrentSuppliesOnHandReviewOrder = ({
  data,
  openSupplyOrderPageEdit,
  isOrderSummary,
}: Props) => {
  const [changeFrequency, setChangeFrequency] = useState([]);
  const [changeFrequencyText, setChangeFrequencyText] = useState([]);
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
  return (
    <div className="currentSupplies-review-order">
      <div className="currentSupplies-info-component-title">
        <h2
          className="currentSupplies-info-review-order-title"
          data-testid="currentSupplies-review-order-title"
        >
          Current Supplies on Hand
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{ root: "currentSuppliesInfo-review-order-edit-button" }}
            data-testid="currentSuppliesInfo-review-order-edit-button"
            onClick={openSupplyOrderPageEdit}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="all-content-div">
        <div className="content-div">
          <div className="sub-content-div">
            <h5
              className="currentSupplies-info-review-order-content-title"
              data-testid="currentSupplies-info-review-order-content-title"
            >
              Individual V.A.C.® Dressings
            </h5>
            <h5
              className="currentSupplies-info-review-order-content-value"
              data-testid="currentSupplies-info-review-order-content-value"
            >
              {`${data.currentSuppliesVacDressingQuantity.value}` +
                " dressing kits"}
            </h5>
          </div>
          <div className="sub-content-div">
            <h5
              className="currentSupplies-info-review-order-content-title"
              data-testid="currentSupplies-info-review-order-content-title-canister"
            >
              Individual V.A.C.® Canisters
            </h5>
            <h5
              className="currentSupplies-info-review-order-content-value"
              data-testid="currentSupplies-info-review-order-content-value-canister"
            >
              {`${data.currentSuppliesVacCannisterQuantity.value}` +
                " canister"}
            </h5>
          </div>
        </div>
        <div className="content-div">
          <div className="sub-content-div">
            <h5
              className="currentSupplies-info-review-order-content-title"
              data-testid="currentSupplies-info-review-order-content-title-frequency"
            >
              Dressing Change Frequency
            </h5>
            <h5
              className="currentSupplies-info-review-order-content-value"
              data-testid="currentSupplies-info-review-order-content-value-frequency"
            >
              {`${
                data?.dressingChangeFrequency.value
                  ? getTextFromCode(
                      changeFrequency,
                      data?.dressingChangeFrequency.value
                    )
                  : null
              }`}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CurrentSuppliesOnHandReviewOrder;
