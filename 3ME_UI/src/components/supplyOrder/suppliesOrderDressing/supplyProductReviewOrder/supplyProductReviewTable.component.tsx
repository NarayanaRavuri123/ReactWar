import React from "react";
import Table from "../../../../core/customSortingTable/table.component";
import "./supplyProductReviewOrder.css";
import { ISupplyOrder } from "../../supplyOrder.interface";
import {
  ICanister,
  IDressingKit,
  IProductAccessory,
} from "../../../newOrder/newOrder.interface";

type Props = {
  columns: any;
  dressing: IDressingKit;
  canister: ICanister;
  accessories: IProductAccessory;
};

const SupplyProductReviewTable = ({
  columns,
  dressing,
  canister,
  accessories,
}: Props) => {
  const createSelectedProductList = () => {
    let productList = [];
    if (dressing.productName.value !== "") {
      let productSizeName =
        dressing.productSizeName.value !== ""
          ? `, ${dressing.productSizeName.value.split("(")[0]}`
          : "";
      productList.push({
        qty: dressing.productQuantity.value,
        productName: `${
          dressing.productName.value
        }${productSizeName} (Case of ${
          dressing.productCode.value && dressing.productCode.value !== ""
            ? dressing.productCode.value.split("/")[1] ??
              dressing.productCode.value
                .match(/\d/g)
                ?.join("")
                .replace(/^0+/, "")
            : dressing.productSizeCode.value.split("/")[1] ??
              dressing.productSizeCode.value
                .match(/\d/g)
                ?.join("")
                .replace(/^0+/, "")
        })`,
      });
    }
    if (dressing.secProductName.value !== "") {
      let secProductSizeName =
        dressing.secProductSizeName.value !== ""
          ? `, ${dressing.secProductSizeName.value.split("(")[0]}`
          : "";
      productList.push({
        qty: dressing.secProductQuantity.value,
        productName: `${
          dressing.secProductName.value
        }${secProductSizeName} (Case of ${
          dressing.secProductCode.value && dressing.secProductCode.value !== ""
            ? dressing.secProductCode.value.split("/")[1] ??
              dressing.secProductCode.value
                .match(/\d/g)
                ?.join("")
                .replace(/^0+/, "")
            : dressing.secProductSizeCode.value.split("/")[1] ??
              dressing.secProductSizeCode.value
                .match(/\d/g)
                ?.join("")
                .replace(/^0+/, "")
        })`,
      });
    }
    if (canister.canisterProductName.value !== "") {
      productList.push({
        qty: canister.canisterProductQuantity.value,
        productName:
          canister.canisterProductName.value +
          ` (${canister.canisterProductCode.value})` +
          ` (Case of ${
            canister.canisterProductCode.value.split("/")[1] ??
            canister.canisterProductCode.value.match(/\d/g)?.join("")
          })`,
      });
    }
    accessories.accessories.forEach((x: any) => {
      productList.push({
        qty: "1",
        productName:
          x.value.split("(")[0] +
          ` (Pack of ${x.code.split("/")[1] ?? x.code.match(/\d/g)?.join("")})`,
      });
    });

    return productList.map((productdetails: any) => (
      <tr>
        <td className="table-static-review-data-quantity">
          <div className="quantity-review">{productdetails.qty}</div>
        </td>
        <td className="table-static-review-data">
          {productdetails.productName}
        </td>
      </tr>
    ));
  };
  return (
    <div>
      <Table
        tableClassName="table"
        tableColumns={columns}
        handleSorting={() => {}}
      >
        <tbody>{createSelectedProductList()}</tbody>
      </Table>
    </div>
  );
};

export default SupplyProductReviewTable;
