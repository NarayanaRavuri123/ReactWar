import { makeCapitalEachWordInString } from "../../../../../util/utilityFunctions";
import {
  ISupplyOrderCanister,
  ISupplyOrderDressingKit,
  ISupplyOrderInfoMapper,
} from "../../supplyOrderDetails/supplyOrderResponseInterface";
import "./supplyOrderCurrentSuppliesInHand.css";

type Props = {
  data: ISupplyOrderInfoMapper;
  dressing: ISupplyOrderDressingKit;
  canister: ISupplyOrderCanister;
};

const SupplyOrderCurrentSuppliesInHand = ({
  data,
  dressing,
  canister,
}: Props) => {
  return (
    <div className="currentSupplies-orderoverview">
      <div className="all-content-div">
        <div className="currentSupplies-info-component-title">
          <h2
            className="currentSupplies-info-orderoverview-title"
            data-testid="currentSupplies-orderoverview-title"
          >
            Current Supplies on Hand
          </h2>
        </div>
        <div className="content-div">
          <div className="sub-content-div">
            <h5
              className="currentSupplies-info-orderoverview-content-title"
              data-testid="currentSupplies-info-orderoverview-content-title"
            >
              Individual V.A.C.® Dressings
            </h5>
            {dressing?.dressing &&
            dressing.dressing.length > 0 &&
            dressing.dressing[0].remainingQuantity !== null &&
            dressing.dressing[0].remainingQuantity !== "" ? (
              <h5
                className="currentSupplies-info-orderoverview-content-value"
                data-testid="currentSupplies-info-orderoverview-content-value"
              >
                {`${dressing.dressing[0].remainingQuantity}` + " dressing kits"}
              </h5>
            ) : (
              "--"
            )}
          </div>
          <div className="sub-content-div">
            <h5
              className="currentSupplies-info-orderoverview-content-title"
              data-testid="currentSupplies-info-orderoverview-content-title-canister"
            >
              Individual V.A.C.® Canisters
            </h5>
            {canister?.canister &&
            canister?.canister.length > 0 &&
            canister.canister[0].remainingQuantity !== null &&
            canister.canister[0].remainingQuantity !== "" ? (
              <h5
                className="currentSupplies-info-orderoverview-content-value"
                data-testid="currentSupplies-info-orderoverview-content-value-canister"
              >
                {`${canister.canister[0].remainingQuantity}` + " canister"}
              </h5>
            ) : (
              "--"
            )}
          </div>
          <div className="sub-content-div">
            <h5
              className="currentSupplies-info-orderoverview-content-title"
              data-testid="currentSupplies-info-orderoverview-content-title-frequency"
            >
              Dressing Change Frequency
            </h5>
            {data?.dressingChangeFrequency &&
            data?.dressingChangeFrequency !== "" ? (
              <h5
                className="currentSupplies-info-orderoverview-content-value"
                data-testid="currentSupplies-info-orderoverview-content-value-frequency"
              >
                {`${data?.dressingChangeFrequency}`}
              </h5>
            ) : (
              "--"
            )}
          </div>
        </div>
      </div>
      <div className="all-content-div">
        <div className="currentSupplies-info-component-title">
          <h2
            className="currentSupplies-info-orderoverview-title"
            data-testid="currentSupplies-orderoverview-title"
          >
            Resupply Justification
          </h2>
        </div>
        <div className="content-div">
          <div className="sub-content-div">
            <h5
              className="currentSupplies-info-orderoverview-content-title"
              data-testid="currentSupplies-info-orderoverview-content-title"
            >
              Resupply Justfication
            </h5>
            {data?.reSupplyJustification &&
            data?.reSupplyJustification !== "" ? (
              <h5
                className="currentSupplies-info-orderoverview-content-value"
                data-testid="currentSupplies-info-orderoverview-content-value-frequency"
              >
                {`${data?.reSupplyJustification}`}
              </h5>
            ) : (
              "--"
            )}
          </div>
        </div>
      </div>
      <div className="all-content-div">
        <div className="currentSupplies-info-component-title">
          <h2
            className="currentSupplies-info-orderoverview-title"
            data-testid="currentSupplies-orderoverview-title"
          >
            Delivery Information
          </h2>
        </div>
        <div className="content-div">
          <div className="sub-content-div">
            <h5
              className="currentSupplies-info-orderoverview-content-title"
              data-testid="currentSupplies-info-orderoverview-content-title"
            >
              Address
            </h5>
            {data?.shipAddress1 &&
            data?.shipAddress1 !== "" &&
            data?.shipAddress2 &&
            data?.shipAddress2 !== "" ? (
              <h5
                className="currentSupplies-info-orderoverview-content-value"
                data-testid="currentSupplies-info-orderoverview-content-value-frequency"
              >
                {`${makeCapitalEachWordInString(data?.shipAddress1)}, ${
                  data.shipAddress2 !== null && data.shipAddress2 !== ""
                    ? makeCapitalEachWordInString(data.shipAddress2)
                    : ""
                }`}
              </h5>
            ) : (
              ""
            )}
            {data?.shipAddress1 &&
            data?.shipAddress1 !== "" &&
            (data?.shipAddress2 === "" || data?.shipAddress2 === null) ? (
              <h5
                className="currentSupplies-info-orderoverview-content-value"
                data-testid="currentSupplies-info-orderoverview-content-value-frequency"
              >
                {`${makeCapitalEachWordInString(data?.shipAddress1)} ${
                  data.shipAddress2 !== null && data.shipAddress2 !== ""
                    ? makeCapitalEachWordInString(data.shipAddress2)
                    : ""
                }`}
              </h5>
            ) : (
              ""
            )}

            {data?.shipCity && data?.shipCity !== null ? (
              <h5
                className="currentSupplies-info-orderoverview-content-value"
                data-testid="currentSupplies-info-orderoverview-content-value-frequency"
              >
                {`${
                  data?.shipCity !== null
                    ? makeCapitalEachWordInString(data?.shipCity)
                    : ""
                }, ${data.shipState !== null ? data.shipState : ""} ${
                  data.shipZipCode !== null
                    ? makeCapitalEachWordInString(data.shipZipCode)
                    : ""
                }`}
              </h5>
            ) : (
              "--"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SupplyOrderCurrentSuppliesInHand;
