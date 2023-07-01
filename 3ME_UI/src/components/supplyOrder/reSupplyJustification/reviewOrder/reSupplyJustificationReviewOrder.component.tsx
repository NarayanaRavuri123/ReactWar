import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { format } from "react-string-format";
import { getdropDownContent } from "../../../../util/dropDownService";
import { DD_RESUPPLY_JUSTIFICATION } from "../../../../util/staticText";
import { getTextFromCode } from "../../../../util/utilityFunctions";
import { ISupplyOrder } from "../../supplyOrder.interface";
import "./reSupplyJustificationReviewOrder.css";

type Props = {
  data: ISupplyOrder;
  openSupplyOrderPageEdit?: any;
  isOrderSummary?: boolean;
};

const ReSupplyJustificationReviewOrder = ({
  data,
  openSupplyOrderPageEdit,
  isOrderSummary,
}: Props) => {
  const [resupplyJustification, setResupplyJustification] = useState([]);
  const [resupplyJustificationText, setResupplyJustificationText] = useState(
    []
  );
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
  return (
    <div className="resupply-Justification-review-order">
      <div className="resupply-Justification-component-title">
        <h2
          className="resupply-Justification-review-order-title"
          data-testid="resupply-Justification-review-order-title"
        >
          Resupply Justification
        </h2>
        {!isOrderSummary && (
          <Button
            classes={{
              root: "resupply-Justification-review-order-edit-button",
            }}
            data-testid="resupply-Justification-review-order-edit-button"
            onClick={openSupplyOrderPageEdit}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="all-content-div">
        <div className="sub-content-div">
          <h5
            className="resupply-Justification-review-order-content-title"
            data-testid="resupply-Justification-review-order-content-title"
          >
            Resupply Justification
          </h5>
          <h5
            className="resupply-Justification-review-order-content-value"
            data-testid="resupply-Justification-review-order-content-value"
          >
            {`${
              data?.resupplyJustification.value
                ? getTextFromCode(
                    resupplyJustification,
                    data?.resupplyJustification.value
                  )
                : null
            }`}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ReSupplyJustificationReviewOrder;
