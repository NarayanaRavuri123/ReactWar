import { useContext } from "react";

import {
  PickUpRequestContext,
  PickUpRequestContextType,
} from "../../../../../context/PickUpRequestContext";
import moment from "moment";
import { useHistory } from "react-router-dom";
import "./productInformationReview.css";
import WoundTitleValue from "../../../../myPatients/patientAndTherapyDetails/woundProgress/addWoundAssessment/woundReviewAssessment/woundTitleValue/woundTitleValue.component";

export const ProductInformationReview = () => {
  const history = useHistory();
  const pickUpRequestObj = useContext<PickUpRequestContextType | null>(
    PickUpRequestContext
  );
  const patient = pickUpRequestObj!.patient;
  const openOrderDetail = () => {
    if (patient) {
      history.push({
        pathname: "/home/orderOverview",
        state: {
          stateData: patient,
        },
      });
    }
  };

  return (
    <>
      <div className="review-product-request">
        <div className="review-product-info" data-testId="product-information">
          Product Information
        </div>

        <div className="review-product-info-div">
          <WoundTitleValue
            title="Product Name"
            value={patient?.productName!}
            formatValue={false}
          />

          <WoundTitleValue
            title="Rental Order #"
            value={patient?.roNumber.toString()!}
            onValueClick={openOrderDetail}
            valueClassName="product-request-overview-value"
            formatValue={false}
          />
          <WoundTitleValue
            title="Product Serial #"
            value={patient?.productSerialNumber!}
            formatValue={false}
          />

          <WoundTitleValue
            title="Placement Date"
            value={moment(patient?.placementDate).format("MM/DD/YYYY")}
            formatValue={false}
          />
        </div>
      </div>
    </>
  );
};
