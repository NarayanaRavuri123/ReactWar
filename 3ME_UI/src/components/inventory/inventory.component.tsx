import { Grid } from "@mui/material";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./inventory.css";
import {
  NewOrderContext,
  NewOrderContextType,
} from "../../context/NewOrderContext";
import Table from "../../core/customSortingTable/table.component";
import { ExpressButton } from "../../core/expressButton/expressButton.component";
import { LoadingSpinner } from "../../core/loader/LoadingSpinner";
import { Popup } from "../../core/popup/popup.component";
import { useSortableTable } from "../../util/utilityFunctions";
import {
  RolesPermissionContext,
  RolesPermissionContextType,
} from "../../context/RolesPermissionContext";
import {
  InventoryContext,
  InventoryContextType,
} from "../../context/InventoryContext";

import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { SendNoteFailure } from "../send3MNote/popUps/failurePopUp/sendNoteFailure.component";
import { GET_INVENTORY_LIST_FAILED } from "../../util/staticText";
import { getInventoryInfoList } from "../../util/inventoryMgrService";
interface Props {
  redirectToNewOrderPage?: MouseEventHandler<HTMLButtonElement>;
  redirectToInventoryAdjPage?: MouseEventHandler<HTMLButtonElement>;
}
const Inventory = ({
  redirectToNewOrderPage,
  redirectToInventoryAdjPage,
}: Props) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [openErrorMessagePopup, setOpenErrorMessagePopup] =
    useState<boolean>(false);
  const [facilityAccountNumber, setFacilityAccountNumber] = useState<
    number | null
  >();
  const NewOrderObj = useContext<NewOrderContextType | null>(NewOrderContext);
  const history = useHistory();
  const columns = [
    { label: "Product", accessor: "product", sortable: true },
    { label: "Serial Number", accessor: "serialNumber", sortable: true },
    { label: "Location", accessor: "storageLocation", sortable: true },
  ];
  const [sortedData, setSortedData, handleSorting] = useSortableTable(
    [],
    columns
  );
  const permissionObj = useContext<RolesPermissionContextType | null>(
    RolesPermissionContext
  );
  const inventoryObj = useContext<InventoryContextType | null>(
    InventoryContext
  );
  const authObj = useContext<AuthContextType | null>(AuthContext);

  const redirectToVacOrder = () => {
    setOpenErrorMessagePopup(false);
    setError(false);
    NewOrderObj?.resetNewOrderForm();
    NewOrderObj?.setInventoryProductCount(sortedData.length);
    history.push("/orders/newOrder");
  };
  const redirectToRequestAdjpage = () => {
    inventoryObj?.resetInventoryData();
    history.push("/inventory/inventoryAdjustment");
  };

  const getInventoryList = async () => {
    const customerNumber = authObj?.registeredFaciltyAddress?.accountNumber;
    let reqParams = {
      customerNumber: customerNumber,
    };
    setLoader(true);
    try {
      const response = await getInventoryInfoList(reqParams);
      if (!response || response.error) {
        setLoader(false);
        setOpenErrorMessagePopup(true);
        setError(true);
      } else {
        setLoader(false);
        const inventoryList = response.items;
        setSortedData(inventoryList);
      }
    } catch (error) {
      console.log("error", error);
      setLoader(false);
      setError(true);
      return false;
    }
  };

  const closePopup = () => {
    setOpenErrorMessagePopup(false);
    setError(false);
    history.push("/home");
  };
  useEffect(() => {
    setFacilityAccountNumber(authObj?.registeredFaciltyAddress?.accountNumber);
    if (
      facilityAccountNumber !== authObj?.registeredFaciltyAddress?.accountNumber
    ) {
      getInventoryList();
    }
  }, [facilityAccountNumber, authObj?.registeredFaciltyAddress?.accountNumber]);

  return (
    <div className="inventory-main-component">
      <div className="inventory-subcomponent">
        <div className="inventoryTitle" data-testid="inventoryTitle_test">
          Inventory
        </div>
        <Popup
          closeHandler={() => setLoader(false)}
          openFlag={loader}
          hideCloseButton={true}
        >
          <div className="inventory-spinner">
            <LoadingSpinner />
          </div>
        </Popup>
        <div className="inventory-button-group">
          <Grid className="inventory-button-container" container>
            <Grid item xs={12} className="inventory-class">
              <ExpressButton
                variant="outlined"
                testId="requestAdjBtnTest"
                clickHandler={
                  redirectToInventoryAdjPage === undefined
                    ? redirectToRequestAdjpage
                    : redirectToInventoryAdjPage
                }
                parentClass="inventory-button"
                disabled={
                  permissionObj?.mappedRolesPermissionData.IsSupportRole
                }
              >
                Request Inventory Adjustment
              </ExpressButton>
              <ExpressButton
                variant="contained"
                parentClass="start-ready-care-order"
                testId="startNewOrderBtn"
                clickHandler={
                  redirectToNewOrderPage === undefined
                    ? redirectToVacOrder
                    : redirectToNewOrderPage
                }
                disabled={
                  permissionObj?.mappedRolesPermissionData.IsSupportRole
                }
              >
                Start V.A.C.® Ready Care Order
              </ExpressButton>
            </Grid>
          </Grid>
        </div>
        <div className="inventory_table_container" data-testid="inventory-list">
          <Table
            tableClassName="inventory_table"
            tableColumns={columns}
            handleSorting={handleSorting}
          >
            {columns && sortedData && sortedData.length > 0 ? (
              <tbody>
                {sortedData.map((data: any) => {
                  return (
                    <tr key={data.id}>
                      <td className="tables-static-data">{data.product}</td>
                      <td className="tables-static-data">
                        {data.serialNumber}
                      </td>
                      <td className="tables-static-data">
                        {data.storageLocation}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : null}
          </Table>
        </div>
      </div>
      {error && (
        <Popup
          openFlag={openErrorMessagePopup}
          closeHandler={() => closePopup()}
        >
          <SendNoteFailure
            rootClass="inventory-error-pop-up"
            message={GET_INVENTORY_LIST_FAILED}
            backButtonAction={closePopup}
          />
        </Popup>
      )}
    </div>
  );
};

export default Inventory;
