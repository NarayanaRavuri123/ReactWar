import "./supplyOrderVacAccessories.css";
import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  SupplyOrderContext,
  SupplyOrderContextType,
} from "../../../../context/SupplyOrderContext";
import { useContext, useEffect, useState } from "react";
import { SupplyOrderValidator } from "../../supplyOrder.validator";
import {
  DropdownValueWithOrder,
  IAccessory,
} from "../../../newOrder/dressingSupplies/accessories/accessories.interface";
import { ISupplyOrderVacDressingAccessories } from "./supplyOrderVacAccessories.interface";
import { CustomRemovableDropDown } from "../../../../core/customRemovableDropdown/customRemovableDropdown.component";

export const SupplyOrderVacDressingAccessories = ({
  accessoriesList,
  accessoriesDetails,
  loadAccesory,
  setAccessoriesDetails,
  setLoadAccesory,
  Validator = new SupplyOrderValidator(),
}: ISupplyOrderVacDressingAccessories) => {
  const [accessories, setAccessories] = useState<IAccessory[]>([]);
  const [accessoryTypes, setAccessoryTypes] = useState<
    DropdownValueWithOrder[]
  >([]);
  const supplyOrderObj = useContext<SupplyOrderContextType | null>(
    SupplyOrderContext
  );
  const [validator] = useState<SupplyOrderValidator>(Validator!);

  const addAccessoryAction = () => {
    const newAccesory = {
      id: 0,
      code: "",
      value: "",
      index: getNewAccessoryId(),
    };
    setAccessories((array) => [...array, newAccesory]);
  };

  const closeAccessoryAction = (index: number) => {
    setAccessories((array) =>
      array.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const updateAccessoryAction = (e: any, index: number) => {
    const accessory = accessoriesList.filter(
      (accessory) => accessory.text === e.target.value
    )[0];
    setAccessories((curr) =>
      curr.map((item) => {
        if (item.index === index) {
          item.code = accessory.code;
          item.value = e.target.value;
          item.id = accessory.id;
        }
        return item;
      })
    );
    validator.validateOrderSupplyProducts(supplyOrderObj!, true);
  };

  const getNewAccessoryId = (): number => {
    const existingIds = accessories.map((item) => item.index).sort();
    if (existingIds.length > 0) {
      const remaingIds = [1, 2, 3, 4].filter(
        (x) => ![...existingIds].includes(x)
      );
      return remaingIds[0];
    }
    return 1;
  };

  const checkDataAndUpdateAccessories = () => {
    const updatedAccessories: IAccessory[] = accessoriesDetails.accessories.map(
      (
        accessory: { code: string; value: string; id: number },
        index: number
      ) => {
        return {
          id: accessory.id,
          code: accessory.code,
          value: accessory.value,
          index: index,
        };
      }
    );
    setAccessories(updatedAccessories);
  };

  const updateAccessoriesToData = () => {
    const tempData = {
      accessories: accessories.filter(
        (accessory) => accessory.value !== "" && accessory.id !== 0
      ),
    };
    setAccessoriesDetails(tempData);
  };

  const updateAccessoryTypes = () => {
    if (accessoriesList.length > 0) {
      const selectedValues = accessories.map((accessory) => accessory.value);
      const remaingAccessoryType = accessoriesList.filter(
        (x) => !selectedValues.includes(x.text)
      );
      setAccessoryTypes(remaingAccessoryType);
    }
  };

  useEffect(() => {
    checkDataAndUpdateAccessories();
  }, []);

  useEffect(() => {
    updateAccessoriesToData();
    updateAccessoryTypes();
  }, [accessories]);

  useEffect(() => {
    if (
      !loadAccesory &&
      supplyOrderObj &&
      !supplyOrderObj.isBackFromReviewPage
    ) {
      checkDataAndUpdateAccessories();
      setLoadAccesory(true);
    }
  }, [accessoriesDetails]);

  useEffect(() => {
    updateAccessoryTypes();
  }, [accessoriesList]);

  return (
    <div
      className={`supply-add-accessories ${
        !supplyOrderObj?.isSuppliesSelected
          ? `supply-add-accessoriesError`
          : `supply-add-accessories`
      }`}
    >
      <Grid className="supply-add-accessories-grid-container" container>
        <Grid className="supply-add-accessories-grid-item" item xs={12}>
          <div className="supply-add-accessories-header-div">
            <h2
              className="supply-add-accessories-header"
              data-testid="supply-add-accessories-header"
            >
              3M™ V.A.C.® Therapy Accessories
            </h2>
          </div>
        </Grid>
        {accessories && Array.isArray(accessories) && (
          <Grid className="supply-add-accessories-grid-item" item xs={12}>
            <div
              className={
                accessories.length === 4
                  ? "accessories-list bottom"
                  : "accessories-list"
              }
            >
              {accessories.map((item: IAccessory, index: number) => {
                return (
                  <CustomRemovableDropDown
                    closeBtnClassName="reomove-accessory-button"
                    closeHandler={() => closeAccessoryAction(index)}
                    customDropdownKey={`accessory-dropdown-${index}`}
                    dropdownClassName="custom-removable-dropdown"
                    dropdownInputClassName="add-accessories-input"
                    dropDownMenuObj={accessoryTypes}
                    dropdownSelectPropClassName="add-accessories-select"
                    error={false}
                    handleChange={(e: any) =>
                      updateAccessoryAction(e, item.index)
                    }
                    inputTitle="Accessory"
                    inputTitleClassName="accessory-title"
                    inputLabelKey={`accessory-input-label-${index}`}
                    name="accessory"
                    placeHolder="Select an accessory"
                    requiredInput={false}
                    testId={`custom-removable-dropDown-${index}`}
                    value={item.value}
                  />
                );
              })}
            </div>
            {accessories.length < 4 && (
              <Button
                classes={{ root: "supply-add-accessory-button" }}
                data-testid="supply-add-accessory-button"
                onClick={addAccessoryAction}
                startIcon={
                  <AddIcon classes={{ root: "supply-add-accessory-icon" }} />
                }
              >
                Add Accessory
              </Button>
            )}
          </Grid>
        )}
      </Grid>
    </div>
  );
};
